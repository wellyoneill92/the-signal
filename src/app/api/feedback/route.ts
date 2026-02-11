import { NextRequest, NextResponse } from "next/server";
import { submitFeedback, getFeedbackSummary } from "@/lib/db";

// ─── Rate Limiting (in-memory, per IP) ───────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max 10 requests per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

// Clean up stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  rateLimitMap.forEach((entry, ip) => {
    if (now > entry.resetAt) rateLimitMap.delete(ip);
  });
}, 300_000);

// ─── Validation ──────────────────────────────────────────
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const ALLOWED_TAGS = [
  "Missing perspective",
  "Outdated information",
  "Misleading headline",
  "Factual error",
  "Lacks context",
  "One-sided framing",
];

function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ─── Routes ──────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    // Reject oversized payloads (rough check via content-length)
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength) > 10_000) {
      return NextResponse.json({ error: "Request too large" }, { status: 413 });
    }

    const body = await request.json();

    // Validate articleId is a UUID
    if (!body.articleId || typeof body.articleId !== "string") {
      return NextResponse.json({ error: "articleId is required" }, { status: 400 });
    }
    if (!UUID_RE.test(body.articleId)) {
      return NextResponse.json({ error: "Invalid articleId format" }, { status: 400 });
    }

    // Validate and filter tags against allowlist
    let tags: string[] = [];
    if (Array.isArray(body.tags)) {
      tags = body.tags
        .filter((t: unknown) => typeof t === "string" && ALLOWED_TAGS.includes(t))
        .slice(0, 6);
    }

    // Validate ratings
    const validRating = (v: unknown): boolean | null => {
      if (v === true || v === false) return v;
      return null;
    };

    await submitFeedback({
      articleId: body.articleId,
      accurate: validRating(body.ratings?.accurate),
      balanced: validRating(body.ratings?.balanced),
      important: validRating(body.ratings?.important),
      tags,
      comment: typeof body.comment === "string" ? body.comment.slice(0, 1000) : "",
    });

    // Return updated summary
    const summary = await getFeedbackSummary(body.articleId);
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
  if (!UUID_RE.test(articleId)) {
    return NextResponse.json({ error: "Invalid articleId format" }, { status: 400 });
  }

  const summary = await getFeedbackSummary(articleId);
  return NextResponse.json(summary);
}
