import Anthropic from "@anthropic-ai/sdk";
import { Article, Category, CATEGORIES } from "./types";
import { getCachedArticles, setCachedArticles } from "./cache";

const client = new Anthropic();

function getCategoryInfo(category: Category) {
  return CATEGORIES.find((c) => c.slug === category)!;
}

export async function fetchNewsForCategory(category: Category): Promise<Article[]> {
  // Check cache first
  const cached = getCachedArticles(category);
  if (cached) {
    return cached.articles;
  }

  const categoryInfo = getCategoryInfo(category);
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
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

Search for the most important ${categoryInfo.label.toLowerCase()} news stories happening today or in the last 24 hours. Focus on: ${categoryInfo.description}.

Find 5 significant, distinct news stories. For each story, search for multiple sources to ensure balanced coverage.

After researching, respond with ONLY a JSON array (no markdown fencing, no explanation) of exactly 5 articles in this format:
[
  {
    "headline": "Clear, factual headline (no sensationalism)",
    "summary": "2-3 sentence neutral summary of the story",
    "body": "4-6 paragraph comprehensive article written in neutral, factual journalistic tone. Present multiple perspectives where applicable. Include relevant context, data, and quotes from sources. Each paragraph should be separated by \\n\\n",
    "sources": ["source name 1", "source name 2"],
    "isBreaking": false
  }
]

Guidelines:
- Write in the style of Reuters or AP News — neutral, factual, no opinion
- Present multiple sides of controversial topics
- Mark at most 1 story as "isBreaking": true (only if truly breaking news)
- Headlines should be informative, not clickbait
- Each article body should be substantive (4-6 paragraphs)`,
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
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  let articles: Article[];
  try {
    const parsed = JSON.parse(jsonText);
    articles = parsed.map((item: Record<string, unknown>, index: number) => ({
      id: `${category}-${Date.now()}-${index}`,
      headline: item.headline,
      summary: item.summary,
      body: item.body,
      category,
      sources: item.sources || [],
      timestamp: new Date().toISOString(),
      isBreaking: item.isBreaking || false,
    }));
  } catch {
    console.error("Failed to parse news response:", jsonText.substring(0, 500));
    throw new Error("Failed to parse AI-generated news articles");
  }

  // Cache the results
  setCachedArticles(category, {
    articles,
    fetchedAt: Date.now(),
  });

  return articles;
}

export async function fetchAllNews(): Promise<Record<Category, Article[]>> {
  const categories = CATEGORIES.map((c) => c.slug);

  const results = await Promise.allSettled(
    categories.map((cat) => fetchNewsForCategory(cat))
  );

  const allNews: Record<string, Article[]> = {};
  categories.forEach((cat, i) => {
    const result = results[i];
    allNews[cat] = result.status === "fulfilled" ? result.value : [];
  });

  return allNews as Record<Category, Article[]>;
}
