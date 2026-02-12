import Anthropic from "@anthropic-ai/sdk";
import { Category, CATEGORIES } from "./types";
import { slugify, insertArticles } from "./db";

const client = new Anthropic();

function getCategoryInfo(category: Category) {
  return CATEGORIES.find((c) => c.slug === category)!;
}

export async function generateArticlesForCategory(category: Category): Promise<void> {
  const categoryInfo = getCategoryInfo(category);
  // Use AEST timezone for date display and slug generation
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Australia/Sydney",
  });

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 16000,
    tools: [
      {
        type: "web_search_20250305",
        name: "web_search",
        max_uses: 10,
      },
    ],
    messages: [
      {
        role: "user",
        content: `You are a senior news editor for "The Signal", an impartial news aggregator. Today is ${today}.

Search for the most important ${categoryInfo.label.toLowerCase()} news story from TODAY. Focus on: ${categoryInfo.description}.

Search for the very latest breaking news and developments from the last few hours. Use multiple searches to find the most current story. Prioritise stories that are actively developing right now over older stories.

Find 1 significant news story. Search for multiple sources to ensure balanced coverage.

After researching, respond with ONLY a JSON array (no markdown fencing, no explanation) of exactly 1 article in this format:
[
  {
    "headline": "Clear, factual headline (no sensationalism)",
    "summary": "2-3 sentence neutral summary of the story",
    "body": "4-6 paragraph comprehensive article written in neutral, factual journalistic tone. Present multiple perspectives where applicable. Include relevant context, data, and quotes from sources. Each paragraph should be separated by \\n\\n",
    "sources": ["source name 1", "source name 2"]
  }
]

Guidelines:
- Write in the style of Reuters or AP News — neutral, factual, no opinion
- Present multiple sides of controversial topics
- Headlines should be informative, not clickbait
- The article body should be substantive (4-6 paragraphs)`,
      },
    ],
  });

  // Extract the text response (after tool use)
  let jsonText = "";
  for (const block of response.content) {
    if (block.type === "text") {
      jsonText += block.text;
    }
  }

  // Parse the JSON from the response
  jsonText = jsonText.trim();
  // Remove markdown code fencing if present
  if (jsonText.includes("```")) {
    const match = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (match) jsonText = match[1].trim();
  }
  // Extract JSON array if there's preamble text before it
  const arrayStart = jsonText.indexOf("[");
  const arrayEnd = jsonText.lastIndexOf("]");
  if (arrayStart !== -1 && arrayEnd !== -1 && arrayStart < arrayEnd) {
    jsonText = jsonText.slice(arrayStart, arrayEnd + 1);
  }

  let articles: {
    slug: string;
    headline: string;
    summary: string;
    body: string;
    category: Category;
    sources: string[];
  }[];

  try {
    const parsed = JSON.parse(jsonText);
    // Use AEST date for slug so it matches the local publication date
    const datePrefix = new Date().toLocaleDateString("en-CA", { timeZone: "Australia/Sydney" }); // e.g. "2026-02-13"

    // Strip <cite> tags injected by the web_search tool
    const stripCites = (text: string) => text.replace(/<\/?cite[^>]*>/g, "");

    articles = parsed.map((item: Record<string, unknown>) => ({
      slug: `${slugify(item.headline as string)}-${datePrefix}`,
      headline: stripCites(item.headline as string),
      summary: stripCites(item.summary as string),
      body: stripCites(item.body as string),
      category,
      sources: (item.sources as string[]) || [],
    }));
  } catch {
    console.error("Failed to parse news response:", jsonText.substring(0, 500));
    throw new Error("Failed to parse AI-generated news articles");
  }

  // Insert into Supabase
  await insertArticles(articles);
  console.log(`Inserted ${articles.length} article(s) for ${category}`);
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
    // Wait 90s between categories to stay within rate limits (30k input tokens/min)
    if (i < categories.length - 1) {
      console.log("Waiting 90s for rate limit cooldown...");
      await new Promise((r) => setTimeout(r, 90_000));
    }
  }
}
