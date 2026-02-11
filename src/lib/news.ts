import Anthropic from "@anthropic-ai/sdk";
import { Category, CATEGORIES } from "./types";
import { slugify, insertArticles } from "./db";

const client = new Anthropic();

function getCategoryInfo(category: Category) {
  return CATEGORIES.find((c) => c.slug === category)!;
}

export async function generateArticlesForCategory(category: Category): Promise<void> {
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
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
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
    const datePrefix = new Date().toISOString().slice(0, 10); // e.g. "2026-02-09"

    articles = parsed.map((item: Record<string, unknown>) => ({
      slug: `${slugify(item.headline as string)}-${datePrefix}`,
      headline: item.headline as string,
      summary: item.summary as string,
      body: item.body as string,
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

  for (const cat of categories) {
    try {
      await generateArticlesForCategory(cat);
    } catch (error) {
      console.error(`Failed to generate articles for ${cat}:`, error);
    }
  }
}
