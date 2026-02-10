import { getSupabase, getServiceClient } from "./supabase";
import { Article, Category, CATEGORIES, FeedbackSummary } from "./types";

// ─── Utilities ───────────────────────────────────────────

export function slugify(headline: string): string {
  return headline
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function rowToArticle(row: Record<string, unknown>): Article {
  return {
    id: row.id as string,
    slug: row.slug as string,
    headline: row.headline as string,
    summary: row.summary as string,
    body: row.body as string,
    category: row.category as Category,
    sources: (row.sources as string[]) || [],
    timestamp: row.published_at as string,
    isBreaking: (row.is_breaking as boolean) || false,
  };
}

// ─── Article Reads ───────────────────────────────────────

export async function getArticlesByCategory(
  category: Category,
  limit = 10
): Promise<Article[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("category", category)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  return (data || []).map(rowToArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return rowToArticle(data);
}

export async function getArticleById(id: string): Promise<Article | null> {
  const supabase = getSupabase();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return rowToArticle(data);
}

export async function getAllLatestArticles(): Promise<Record<Category, Article[]>> {
  const result: Record<string, Article[]> = {};

  for (const cat of CATEGORIES) {
    result[cat.slug] = await getArticlesByCategory(cat.slug, 5);
  }

  return result as Record<Category, Article[]>;
}

export async function getRelatedArticles(
  article: Article,
  limit = 3
): Promise<Article[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("category", article.category)
    .neq("id", article.id)
    .order("published_at", { ascending: false })
    .limit(limit);

  if (error || !data) return [];
  return data.map(rowToArticle);
}

// ─── Article Writes ──────────────────────────────────────

export async function insertArticles(
  articles: {
    slug: string;
    headline: string;
    summary: string;
    body: string;
    category: Category;
    sources: string[];
    isBreaking: boolean;
  }[]
): Promise<void> {
  const admin = getServiceClient();

  const rows = articles.map((a) => ({
    slug: a.slug,
    headline: a.headline,
    summary: a.summary,
    body: a.body,
    category: a.category,
    sources: a.sources,
    is_breaking: a.isBreaking,
    published_at: new Date().toISOString(),
  }));

  const { error } = await admin.from("articles").insert(rows);

  if (error) {
    console.error("Error inserting articles:", error);
    throw error;
  }
}

// ─── Feedback ────────────────────────────────────────────

export async function submitFeedback(entry: {
  articleId: string;
  accurate: boolean | null;
  balanced: boolean | null;
  important: boolean | null;
  tags: string[];
  comment: string;
}): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) throw new Error("Supabase not configured");

  const { error } = await supabase.from("feedback").insert({
    article_id: entry.articleId,
    accurate: entry.accurate,
    balanced: entry.balanced,
    important: entry.important,
    tags: entry.tags,
    comment: entry.comment,
  });

  if (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
}

export async function getFeedbackSummary(
  articleId: string
): Promise<FeedbackSummary> {
  const empty: FeedbackSummary = {
    totalResponses: 0,
    accurate: { yes: 0, no: 0 },
    balanced: { yes: 0, no: 0 },
    important: { yes: 0, no: 0 },
    topTags: [],
    recentComments: [],
  };

  const supabase = getSupabase();
  if (!supabase) return empty;

  const { data, error } = await supabase
    .from("feedback")
    .select("*")
    .eq("article_id", articleId)
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) return empty;

  const summary = { ...empty, totalResponses: data.length };
  const tagCounts: Record<string, number> = {};

  for (const row of data) {
    if (row.accurate === true) summary.accurate.yes++;
    if (row.accurate === false) summary.accurate.no++;
    if (row.balanced === true) summary.balanced.yes++;
    if (row.balanced === false) summary.balanced.no++;
    if (row.important === true) summary.important.yes++;
    if (row.important === false) summary.important.no++;

    for (const tag of (row.tags as string[]) || []) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  summary.topTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  summary.recentComments = data
    .filter((r) => r.comment?.trim())
    .map((r) => ({ comment: r.comment, createdAt: r.created_at }))
    .slice(0, 5);

  return summary;
}
