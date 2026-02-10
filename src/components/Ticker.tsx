"use client";

export default function Ticker() {
  return (
    <div className="bg-signal-black text-cream overflow-hidden whitespace-nowrap">
      <div className="animate-ticker inline-block py-1.5 text-xs tracking-widest uppercase">
        <span className="mx-8">
          Impartial. Factual. AI-powered news aggregation — presenting all sides, taking none.
        </span>
        <span className="mx-8 text-signal-red font-semibold">The Signal</span>
        <span className="mx-8">
          Every story researched from multiple sources for balanced, unbiased reporting.
        </span>
        <span className="mx-8 text-signal-red font-semibold">The Signal</span>
        <span className="mx-8">
          Impartial. Factual. AI-powered news aggregation — presenting all sides, taking none.
        </span>
        <span className="mx-8 text-signal-red font-semibold">The Signal</span>
        <span className="mx-8">
          Every story researched from multiple sources for balanced, unbiased reporting.
        </span>
      </div>
    </div>
  );
}
