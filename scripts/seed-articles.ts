/**
 * Seeds the Supabase database with mock articles.
 * Usage: npx tsx scripts/seed-articles.ts
 */

import { config } from "dotenv";
config({ path: ".env.local" });
import { MOCK_ARTICLES } from "../src/lib/mock-data";
import { insertArticles } from "../src/lib/db";
import { Category } from "../src/lib/types";

async function main() {
  console.log("Seeding database with mock articles...\n");

  const categories: Category[] = ["politics", "technology", "business", "world"];

  for (const category of categories) {
    const articles = MOCK_ARTICLES[category];
    const rows = articles.map((a) => ({
      slug: a.slug,
      headline: a.headline,
      summary: a.summary,
      body: a.body,
      category: a.category,
      sources: a.sources,
    }));

    try {
      await insertArticles(rows);
      console.log(`  ${category}: ${rows.length} articles inserted`);
    } catch (error) {
      console.error(`  ${category}: FAILED -`, error);
    }
  }

  console.log("\nDone.");
}

main();
