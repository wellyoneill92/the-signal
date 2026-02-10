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

export type Category = "politics" | "technology" | "business" | "world";

export const CATEGORIES: { slug: Category; label: string; description: string }[] = [
  { slug: "politics", label: "Politics", description: "Government, policy and domestic political affairs" },
  { slug: "technology", label: "Technology", description: "Tech industry, AI, science and innovation" },
  { slug: "business", label: "Business", description: "Markets, economy and corporate news" },
  { slug: "world", label: "World", description: "International affairs, conflicts and diplomacy" },
];

export interface CachedData {
  articles: Article[];
  fetchedAt: number;
}
