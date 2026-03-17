import Anthropic from "@anthropic-ai/sdk";
import { Category, CATEGORIES, ArticleSource } from "./types";
import { slugify, insertArticles } from "./db";

const client = new Anthropic();

const webSearchTool = (max_uses: number) => ({
  type: "web_search_20250305" as const,
  name: "web_search" as const,
  max_uses,
});

function getCategoryInfo(category: Category) {
  return CATEGORIES.find((c) => c.slug === category)!;
}

// Extract the final text block from a response (after tool use)
function extractText(response: Anthropic.Message): string {
  return response.content
    .filter((b) => b.type === "text")
    .map((b) => (b as Anthropic.TextBlock).text)
    .join("");
}

// Parse JSON from a response, stripping markdown fencing and preamble
function parseJson(raw: string): unknown {
  let text = raw.trim();
  if (text.includes("```")) {
    const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) text = match[1].trim();
  }
  // Find the first { or [ and the last matching closer
  const objStart = text.indexOf("{");
  const arrStart = text.indexOf("[");
  const start = objStart !== -1 && (arrStart === -1 || objStart < arrStart) ? objStart : arrStart;
  const isArr = text[start] === "[";
  const end = isArr ? text.lastIndexOf("]") : text.lastIndexOf("}");
  if (start !== -1 && end !== -1) text = text.slice(start, end + 1);
  return JSON.parse(text);
}

function stripCites(text: string): string {
  return text.replace(/<\/?cite[^>]*>/g, "");
}

function parseSources(raw: unknown[]): ArticleSource[] {
  return raw.map((s) => {
    if (typeof s === "string") return { name: stripCites(s), url: "" };
    const src = s as Record<string, string>;
    return { name: stripCites(src.name || ""), url: src.url || "" };
  });
}

// ─── Step 1: Find the story and extract consensus facts ───────────────────────
async function fetchFacts(category: Category, today: string): Promise<{
  headline: string;
  summary: string;
  body: string;
  sources: ArticleSource[];
}> {
  const categoryInfo = getCategoryInfo(category);

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514", // Sonnet for fact-finding: needs broad reasoning + source quality judgement
    max_tokens: 8000,
    tools: [webSearchTool(8)],
    messages: [{
      role: "user",
      content: `You are a fact-extraction engine for "The Signal", an impartial news aggregator. Today is ${today}.

Your task: Find the single most important ${categoryInfo.label.toLowerCase()} story breaking TODAY and extract only the facts that are consistent and agreed upon across the entire media spectrum — left, right, and centre.

Search broadly across many different outlets. Use multiple searches. Look for:
- What actually happened (the event, decision, or development)
- Who was involved and in what capacity
- Verified numbers, data, official statements, and confirmed outcomes
- Context that is not in dispute anywhere

Write ONLY what is factually verifiable and consistent across coverage regardless of political leaning. If something is contested, spun differently, or only reported by one side — leave it out. No framing, no interpretation, no editorial colour.

Respond with ONLY a JSON object (no markdown fencing, no explanation):
{
  "headline": "Clear, factual headline — informative not clickbait",
  "summary": "2-3 sentence neutral summary of confirmed facts only",
  "body": "4-6 paragraphs of consensus facts. Neutral AP/Reuters tone. Separate paragraphs with \\n\\n",
  "sources": [{"name": "Publication Name", "url": "https://actual-article-url"}]
}`,
    }],
  });

  const text = extractText(response);
  const parsed = parseJson(text) as Record<string, unknown>;

  return {
    headline: stripCites(parsed.headline as string),
    summary: stripCites(parsed.summary as string),
    body: stripCites(parsed.body as string),
    sources: parseSources((parsed.sources as unknown[]) || []),
  };
}

// ─── Step 2: Left + Right perspectives (single Haiku call) ────────────────────
async function fetchPerspectives(headline: string, summary: string): Promise<{
  perspectiveLeft: string;
  sourcesLeft: ArticleSource[];
  perspectiveRight: string;
  sourcesRight: ArticleSource[];
}> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001", // Haiku: ~4x cheaper, sufficient for targeted search + summarise
    max_tokens: 4000,
    tools: [webSearchTool(6)], // 3 searches per side is plenty for perspective coverage
    messages: [{
      role: "user",
      content: `You are researching how left-leaning and right-leaning media are covering a news story.

Story: "${headline}"
Summary: ${summary}

Do TWO sets of searches:

1. LEFT-LEANING outlets: The Guardian, New York Times, Washington Post, MSNBC, Vox, HuffPost, Mother Jones, The Atlantic.
2. RIGHT-LEANING outlets: Fox News, New York Post, The Daily Wire, Breitbart, National Review, Washington Times, The Federalist.

For each side, find actual articles and summarise in 3-4 sentences: what angle they take, what they emphasise, and which outlets you found. Record the real article URLs.

Respond with ONLY a JSON object (no markdown fencing):
{
  "perspective_left": "3-4 sentences on left-leaning framing, naming specific outlets",
  "sources_left": [{"name": "Publication", "url": "https://article-url"}],
  "perspective_right": "3-4 sentences on right-leaning framing, naming specific outlets",
  "sources_right": [{"name": "Publication", "url": "https://article-url"}]
}`,
    }],
  });

  const text = extractText(response);
  const parsed = parseJson(text) as Record<string, unknown>;

  return {
    perspectiveLeft: stripCites(parsed.perspective_left as string),
    sourcesLeft: parseSources((parsed.sources_left as unknown[]) || []),
    perspectiveRight: stripCites(parsed.perspective_right as string),
    sourcesRight: parseSources((parsed.sources_right as unknown[]) || []),
  };
}

// ─── Main export ──────────────────────────────────────────────────────────────
export async function generateArticlesForCategory(category: Category): Promise<void> {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Australia/Sydney",
  });
  const datePrefix = new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" });

  console.log(`[${category}] Step 1: Extracting consensus facts...`);
  const facts = await fetchFacts(category, today);

  console.log(`[${category}] Step 2: Fetching left + right perspectives...`);
  const perspectives = await fetchPerspectives(facts.headline, facts.summary);

  const article = {
    slug: `${slugify(facts.headline)}-${datePrefix}`,
    headline: facts.headline,
    summary: facts.summary,
    body: facts.body,
    category,
    sources: facts.sources,
    sourcesLeft: perspectives.sourcesLeft,
    sourcesRight: perspectives.sourcesRight,
    perspectiveLeft: perspectives.perspectiveLeft,
    perspectiveRight: perspectives.perspectiveRight,
  };

  await insertArticles([article]);
  console.log(`[${category}] Done — inserted "${facts.headline}"`);
}

export async function generateAllArticles(): Promise<void> {
  const categories = CATEGORIES.map((c) => c.slug);

  for (let i = 0; i < categories.length; i++) {
    const cat = categories[i];
    try {
      await generateArticlesForCategory(cat);
    } catch (error) {
      console.error(`Failed to generate articles for ${cat}:`, error);
    }
    // Wait 90s between categories to stay within rate limits
    if (i < categories.length - 1) {
      console.log("Waiting 90s for rate limit cooldown...");
      await new Promise((r) => setTimeout(r, 90_000));
    }
  }
}
