import fs from "fs";
import path from "path";

const FEEDBACK_DIR = path.join(process.cwd(), ".feedback");

export interface FeedbackEntry {
  articleId: string;
  ratings: {
    accurate: boolean | null;
    balanced: boolean | null;
    important: boolean | null;
  };
  tags: string[];
  comment: string;
  createdAt: string;
}

export interface FeedbackSummary {
  totalResponses: number;
  accurate: { yes: number; no: number };
  balanced: { yes: number; no: number };
  important: { yes: number; no: number };
  topTags: { tag: string; count: number }[];
  recentComments: { comment: string; createdAt: string }[];
}

function ensureFeedbackDir() {
  if (!fs.existsSync(FEEDBACK_DIR)) {
    fs.mkdirSync(FEEDBACK_DIR, { recursive: true });
  }
}

function getFeedbackPath(articleId: string): string {
  // Sanitize the articleId for use as a filename
  const safe = articleId.replace(/[^a-zA-Z0-9_-]/g, "_");
  return path.join(FEEDBACK_DIR, `${safe}.json`);
}

export function saveFeedback(entry: FeedbackEntry): void {
  ensureFeedbackDir();
  const filePath = getFeedbackPath(entry.articleId);

  let existing: FeedbackEntry[] = [];
  if (fs.existsSync(filePath)) {
    try {
      existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    } catch {
      existing = [];
    }
  }

  existing.push(entry);
  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2), "utf-8");
}

export function getFeedbackSummary(articleId: string): FeedbackSummary {
  ensureFeedbackDir();
  const filePath = getFeedbackPath(articleId);

  const empty: FeedbackSummary = {
    totalResponses: 0,
    accurate: { yes: 0, no: 0 },
    balanced: { yes: 0, no: 0 },
    important: { yes: 0, no: 0 },
    topTags: [],
    recentComments: [],
  };

  if (!fs.existsSync(filePath)) return empty;

  let entries: FeedbackEntry[];
  try {
    entries = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  } catch {
    return empty;
  }

  const tagCounts: Record<string, number> = {};

  for (const entry of entries) {
    if (entry.ratings.accurate === true) empty.accurate.yes++;
    if (entry.ratings.accurate === false) empty.accurate.no++;
    if (entry.ratings.balanced === true) empty.balanced.yes++;
    if (entry.ratings.balanced === false) empty.balanced.no++;
    if (entry.ratings.important === true) empty.important.yes++;
    if (entry.ratings.important === false) empty.important.no++;

    for (const tag of entry.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }

  empty.totalResponses = entries.length;
  empty.topTags = Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  empty.recentComments = entries
    .filter((e) => e.comment.trim())
    .map((e) => ({ comment: e.comment, createdAt: e.createdAt }))
    .slice(-5)
    .reverse();

  return empty;
}
