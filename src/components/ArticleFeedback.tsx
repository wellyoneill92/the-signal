"use client";

import { useState, useEffect, useCallback } from "react";

interface FeedbackSummary {
  totalResponses: number;
  accurate: { yes: number; no: number };
  balanced: { yes: number; no: number };
  important: { yes: number; no: number };
  topTags: { tag: string; count: number }[];
  recentComments: { comment: string; createdAt: string }[];
}

const ISSUE_TAGS = [
  "Missing perspective",
  "Outdated information",
  "Misleading headline",
  "Factual error",
  "Lacks context",
  "One-sided framing",
];

type RatingKey = "accurate" | "balanced" | "important";

export default function ArticleFeedback({ articleId }: { articleId: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [ratings, setRatings] = useState<Record<RatingKey, boolean | null>>({
    accurate: null,
    balanced: null,
    important: null,
  });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [comment, setComment] = useState("");
  const [summary, setSummary] = useState<FeedbackSummary | null>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);

  useEffect(() => {
    fetch(`/api/feedback?articleId=${encodeURIComponent(articleId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.totalResponses > 0) setSummary(data);
      })
      .catch(() => {});
  }, [articleId]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const setRating = (key: RatingKey, value: boolean) => {
    setRatings((prev) => ({
      ...prev,
      [key]: prev[key] === value ? null : value,
    }));
  };

  const hasInput =
    ratings.accurate !== null ||
    ratings.balanced !== null ||
    ratings.important !== null ||
    selectedTags.length > 0 ||
    comment.trim().length > 0;

  const handleSubmit = useCallback(async () => {
    if (!hasInput || submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId,
          ratings,
          tags: selectedTags,
          comment: comment.trim(),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setSummary(data.summary);
        setSubmitted(true);
      }
    } catch {
      // Silently fail — feedback is non-critical
    } finally {
      setSubmitting(false);
    }
  }, [articleId, ratings, selectedTags, comment, hasInput, submitting]);

  // Submitted state — show thank you + summary
  if (submitted && summary) {
    return (
      <div className="border border-neutral-200 rounded-lg overflow-hidden mb-12">
        <div className="bg-signal-black px-5 py-3">
          <h4 className="text-cream text-sm font-sans font-semibold tracking-wider uppercase">
            Reader Feedback
          </h4>
        </div>
        <div className="px-5 py-5">
          <p className="text-sm text-neutral-600 mb-4">
            Thanks for your feedback. It helps us improve article quality and balance.
          </p>
          <SummaryDisplay summary={summary} />
        </div>
      </div>
    );
  }

  return (
    <div className="border border-neutral-200 rounded-lg overflow-hidden mb-12">
      {/* Header */}
      <div className="bg-signal-black px-5 py-3">
        <h4 className="text-cream text-sm font-sans font-semibold tracking-wider uppercase">
          Rate This Article
        </h4>
        <p className="text-neutral-400 text-xs font-sans mt-0.5">
          Your feedback trains our AI to find better, more balanced content
        </p>
      </div>

      <div className="px-5 py-5 space-y-5">
        {/* Rating questions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <RatingQuestion
            label="Accurate"
            description="Factually correct?"
            value={ratings.accurate}
            onChange={(v) => setRating("accurate", v)}
          />
          <RatingQuestion
            label="Balanced"
            description="Fair to all sides?"
            value={ratings.balanced}
            onChange={(v) => setRating("balanced", v)}
          />
          <RatingQuestion
            label="Important"
            description="Worth covering?"
            value={ratings.important}
            onChange={(v) => setRating("important", v)}
          />
        </div>

        {/* Issue tags */}
        <div>
          <p className="text-xs text-neutral-500 font-sans uppercase tracking-wider mb-2">
            Flag any issues
          </p>
          <div className="flex flex-wrap gap-2">
            {ISSUE_TAGS.map((tag) => {
              const active = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-sans ${
                    active
                      ? "bg-signal-red text-white border-signal-red"
                      : "bg-white text-neutral-600 border-neutral-300 hover:border-neutral-400"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Comment toggle + field */}
        {!showCommentBox ? (
          <button
            onClick={() => setShowCommentBox(true)}
            className="text-xs text-signal-red hover:underline font-sans"
          >
            + Add a comment or suggest a missing perspective
          </button>
        ) : (
          <div>
            <label className="text-xs text-neutral-500 font-sans uppercase tracking-wider block mb-2">
              Your feedback
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What perspective is missing? What could be improved?"
              maxLength={1000}
              rows={3}
              className="w-full border border-neutral-300 rounded-lg px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-signal-red focus:ring-1 focus:ring-signal-red resize-none bg-white font-sans"
            />
            <p className="text-xs text-neutral-400 mt-1 text-right font-sans">
              {comment.length}/1000
            </p>
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center justify-between pt-2 border-t border-neutral-100">
          {summary && summary.totalResponses > 0 && (
            <p className="text-xs text-neutral-400 font-sans">
              {summary.totalResponses} reader{summary.totalResponses !== 1 ? "s" : ""} rated
              this article
            </p>
          )}
          <button
            onClick={handleSubmit}
            disabled={!hasInput || submitting}
            className={`ml-auto text-sm font-sans font-medium px-5 py-2 rounded-lg transition-colors ${
              hasInput && !submitting
                ? "bg-signal-black text-cream hover:bg-neutral-800"
                : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
            }`}
          >
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </div>
    </div>
  );
}

function RatingQuestion({
  label,
  description,
  value,
  onChange,
}: {
  label: string;
  description: string;
  value: boolean | null;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="text-center p-3 rounded-lg bg-neutral-50">
      <p className="text-sm font-sans font-medium text-neutral-800 mb-0.5">{label}</p>
      <p className="text-xs text-neutral-400 font-sans mb-2">{description}</p>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => onChange(true)}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all ${
            value === true
              ? "bg-emerald-500 text-white scale-110"
              : "bg-white border border-neutral-300 text-neutral-400 hover:border-emerald-400 hover:text-emerald-500"
          }`}
          aria-label={`${label}: Yes`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M13.5 4.5L6 12L2.5 8.5" />
          </svg>
        </button>
        <button
          onClick={() => onChange(false)}
          className={`w-9 h-9 rounded-full flex items-center justify-center text-lg transition-all ${
            value === false
              ? "bg-signal-red text-white scale-110"
              : "bg-white border border-neutral-300 text-neutral-400 hover:border-red-400 hover:text-red-500"
          }`}
          aria-label={`${label}: No`}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 3L3 11M3 3l8 8" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function SummaryDisplay({ summary }: { summary: FeedbackSummary }) {
  const pct = (yes: number, no: number) => {
    const total = yes + no;
    return total === 0 ? 0 : Math.round((yes / total) * 100);
  };

  const metrics = [
    { label: "Accurate", ...summary.accurate },
    { label: "Balanced", ...summary.balanced },
    { label: "Important", ...summary.important },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {metrics.map((m) => {
          const score = pct(m.yes, m.no);
          const total = m.yes + m.no;
          return (
            <div key={m.label} className="text-center">
              <p className="text-2xl font-headline font-bold text-signal-black">
                {total > 0 ? `${score}%` : "—"}
              </p>
              <p className="text-xs text-neutral-500 font-sans">{m.label}</p>
              <p className="text-xs text-neutral-400 font-sans">
                {total} vote{total !== 1 ? "s" : ""}
              </p>
            </div>
          );
        })}
      </div>

      {summary.topTags.length > 0 && (
        <div className="pt-3 border-t border-neutral-100">
          <p className="text-xs text-neutral-500 font-sans uppercase tracking-wider mb-2">
            Flagged issues
          </p>
          <div className="flex flex-wrap gap-2">
            {summary.topTags.map((t) => (
              <span
                key={t.tag}
                className="text-xs bg-neutral-100 text-neutral-600 px-2 py-1 rounded-full font-sans"
              >
                {t.tag} ({t.count})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
