import { Article, CATEGORIES, Category } from "./types";
import { getCachedArticles } from "./cache";
import { MOCK_ARTICLES } from "./mock-data";

export function getArticleById(id: string): Article | null {
  // Search cached (API-generated) articles first
  for (const cat of CATEGORIES) {
    const cached = getCachedArticles(cat.slug as Category);
    if (cached) {
      const found = cached.articles.find((a) => a.id === id);
      if (found) return found;
    }
  }

  // Fall back to mock data
  for (const cat of CATEGORIES) {
    const articles = MOCK_ARTICLES[cat.slug as Category];
    if (articles) {
      const found = articles.find((a) => a.id === id);
      if (found) return found;
    }
  }

  return null;
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  // Try cached articles first, then mock
  const cached = getCachedArticles(article.category);
  const pool = cached?.articles ?? MOCK_ARTICLES[article.category] ?? [];
  return pool.filter((a) => a.id !== article.id).slice(0, limit);
}
