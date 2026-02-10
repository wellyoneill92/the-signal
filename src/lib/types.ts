export interface Article {
  id: string;
  headline: string;
  summary: string;
  body: string;
  category: Category;
  sources: string[];
  timestamp: string;
  isBreaking?: boolean;
}

export type Category = "global" | "sports" | "entertainment" | "technology" | "business";

export const CATEGORIES: { slug: Category; label: string; description: string }[] = [
  { slug: "global", label: "Global", description: "World news and international affairs" },
  { slug: "sports", label: "Sports", description: "Latest in sports worldwide" },
  { slug: "entertainment", label: "Entertainment", description: "Film, music, culture and media" },
  { slug: "technology", label: "Technology", description: "Tech industry, science and innovation" },
  { slug: "business", label: "Business", description: "Markets, economy and corporate news" },
];

export interface CachedData {
  articles: Article[];
  fetchedAt: number;
}
