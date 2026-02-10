import { NextRequest, NextResponse } from "next/server";
import { fetchNewsForCategory, fetchAllNews } from "@/lib/news";
import { Category, CATEGORIES } from "@/lib/types";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category") as Category | null;

  try {
    if (category) {
      const valid = CATEGORIES.some((c) => c.slug === category);
      if (!valid) {
        return NextResponse.json({ error: "Invalid category" }, { status: 400 });
      }
      const articles = await fetchNewsForCategory(category);
      return NextResponse.json({ articles });
    }

    // Fetch all categories
    const allNews = await fetchAllNews();
    return NextResponse.json(allNews);
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
