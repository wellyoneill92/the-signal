import fs from "fs";
import path from "path";
import { CachedData, Category } from "./types";

const CACHE_DIR = path.join(process.cwd(), ".cache");
const CACHE_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function getCachePath(category: Category): string {
  return path.join(CACHE_DIR, `${category}.json`);
}

export function getCachedArticles(category: Category): CachedData | null {
  ensureCacheDir();
  const cachePath = getCachePath(category);

  if (!fs.existsSync(cachePath)) {
    return null;
  }

  try {
    const raw = fs.readFileSync(cachePath, "utf-8");
    const data: CachedData = JSON.parse(raw);

    if (Date.now() - data.fetchedAt > CACHE_TTL) {
      return null;
    }

    return data;
  } catch {
    return null;
  }
}

export function setCachedArticles(category: Category, data: CachedData): void {
  ensureCacheDir();
  const cachePath = getCachePath(category);
  fs.writeFileSync(cachePath, JSON.stringify(data, null, 2), "utf-8");
}
