import { NextRequest, NextResponse } from "next/server";
import { CATEGORIES, Category } from "@/lib/types";
import { getArticlesByCategory, getAllLatestArticles } from "@/lib/articles";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") as Category | null;

  try {
    if (category) {
      const valid = CATEGORIES.some((c) => c.slug === category);
      if (!valid) {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
      }
      const articles = await getArticlesByCategory(category);
      return NextResponse.json({ articles });
    }

    // Fetch all categories
    const allNews = await getAllLatestArticles();
    return NextResponse.json(allNews);
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
