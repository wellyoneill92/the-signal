/**
 * Daily article generation script.
 * Run by GitHub Actions cron at 4am AEST (6pm UTC previous day).
 *
 * Usage: npx tsx scripts/generate-articles.ts
 *
 * Required env vars:
 *   ANTHROPIC_API_KEY
 *   NEXT_PUBLIC_SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 */

import { config } from "dotenv";
config({ path: ".env.local" });
import { generateAllArticles } from "../src/lib/news";

async function main() {
  console.log("=== The Signal: Daily Article Generation ===");
  console.log(`Started at: ${new Date().toISOString()}`);
  console.log();

  try {
    await generateAllArticles();
    console.log();
    console.log("Generation complete.");
  } catch (error) {
    console.error("Generation failed:", error);
    process.exit(1);
  }
}

main();
