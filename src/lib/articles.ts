import { Article, CATEGORIES, Category } from "./types";
import * as db from "./db";
import { MOCK_ARTICLES } from "./mock-data";

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  // Try Supabase first
  const article = await db.getArticleBySlug(slug);
  if (article) return article;

  // Fall back to mock data (match by slug)
  for (const cat of CATEGORIES) {
    const articles = MOCK_ARTICLES[cat.slug as Category];
    if (articles) {
      const found = articles.find((a) => a.slug === slug);
      if (found) return found;
    }
  }

  return null;
}

export async function getArticleById(id: string): Promise<Article | null> {
  // Try Supabase
  const article = await db.getArticleById(id);
  if (article) return article;

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

export async function getRelatedArticles(
  article: Article,
  limit = 3
): Promise<Article[]> {
  // Try Supabase first
  const related = await db.getRelatedArticles(article, limit);
  if (related.length > 0) return related;

  // Fall back to mock data
  const pool = MOCK_ARTICLES[article.category] ?? [];
  return pool.filter((a) => a.id !== article.id).slice(0, limit);
}

export async function getArticlesByCategory(
  category: Category,
  limit = 10
): Promise<Article[]> {
  const articles = await db.getArticlesByCategory(category, limit);
  if (articles.length > 0) return articles;

  // Fall back to mock data
  return (MOCK_ARTICLES[category] ?? []).slice(0, limit);
}

export async function getAllLatestArticles(): Promise<Record<Category, Article[]>> {
  const result = await db.getAllLatestArticles();

  // Check if we got real data
  const hasAny = Object.values(result).some((a) => a.length > 0);
  if (hasAny) return result;

  // Fall back to mock data
  return MOCK_ARTICLES;
}
