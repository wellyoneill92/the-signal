import { NextRequest, NextResponse } from "next/server";
import { saveFeedback, getFeedbackSummary, FeedbackEntry } from "@/lib/feedback";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const entry: FeedbackEntry = {
      articleId: body.articleId,
      ratings: {
        accurate: body.ratings?.accurate ?? null,
        balanced: body.ratings?.balanced ?? null,
        important: body.ratings?.important ?? null,
      },
      tags: Array.isArray(body.tags) ? body.tags : [],
      comment: typeof body.comment === "string" ? body.comment.slice(0, 1000) : "",
      createdAt: new Date().toISOString(),
    };

    if (!entry.articleId) {
      return NextResponse.json({ error: "articleId is required" }, { status: 400 });
    }

    saveFeedback(entry);

    // Return updated summary
    const summary = getFeedbackSummary(entry.articleId);
    return NextResponse.json({ success: true, summary });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET(request: NextRequest) {
  const articleId = request.nextUrl.searchParams.get("articleId");
  if (!articleId) {
    return NextResponse.json({ error: "articleId is required" }, { status: 400 });
  }

  const summary = getFeedbackSummary(articleId);
  return NextResponse.json(summary);
}
