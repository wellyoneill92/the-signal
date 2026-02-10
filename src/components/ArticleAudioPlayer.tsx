"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// Ranked keywords for picking the most natural-sounding voice.
// Order matters — earlier matches win.
const VOICE_QUALITY_TIERS = [
  // Tier 1: Premium neural / enhanced voices
  (v: SpeechSynthesisVoice) =>
    /premium|enhanced|neural|natural/i.test(v.name) && v.lang.startsWith("en"),
  // Tier 2: macOS Siri voices (very high quality)
  (v: SpeechSynthesisVoice) =>
    /Zoe|Flo|Grandma|Reed|Sandy|Shelley|Aaron/i.test(v.name) && v.lang.startsWith("en"),
  // Tier 3: macOS high-quality voices
  (v: SpeechSynthesisVoice) =>
    /Samantha|Karen|Daniel|Moira|Tessa|Rishi|Martha/i.test(v.name) && v.lang.startsWith("en"),
  // Tier 4: Google voices (Chrome)
  (v: SpeechSynthesisVoice) =>
    /Google UK English|Google US English/i.test(v.name),
  // Tier 5: Microsoft online neural voices (Edge)
  (v: SpeechSynthesisVoice) =>
    /Microsoft.*Online.*Natural/i.test(v.name) && v.lang.startsWith("en"),
  // Tier 6: Any English voice
  (v: SpeechSynthesisVoice) => v.lang.startsWith("en"),
];

function pickBestVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | null {
  for (const test of VOICE_QUALITY_TIERS) {
    const match = voices.find(test);
    if (match) return match;
  }
  return null;
}

// Break the article into paragraph-level segments for natural pauses between them.
function buildSegments(headline: string, body: string): string[] {
  const paragraphs = body
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  // Headline is its own segment so there's a pause before the body starts.
  return [headline, ...paragraphs];
}

export default function ArticleAudioPlayer({
  headline,
  body,
}: {
  headline: string;
  body: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [supported, setSupported] = useState(true);
  const [voiceName, setVoiceName] = useState("");

  const activeRef = useRef(false);
  const segmentsRef = useRef<string[]>([]);
  const totalCharsRef = useRef(0);
  const spokenCharsRef = useRef(0);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  // Load voices (they're async in Chrome)
  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      return;
    }

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const best = pickBestVoice(voices);
        voiceRef.current = best;
        if (best) setVoiceName(best.name);
      }
    };

    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
      window.speechSynthesis.cancel();
      activeRef.current = false;
    };
  }, []);

  const speakSegment = useCallback((index: number, segments: string[]) => {
    if (index >= segments.length || !activeRef.current) {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      activeRef.current = false;
      return;
    }

    const text = segments[index];
    const utterance = new SpeechSynthesisUtterance(text);

    // Voice
    if (voiceRef.current) utterance.voice = voiceRef.current;

    // Natural pacing — slightly slower than default, lower pitch for a news-reader feel
    utterance.rate = 0.95;
    utterance.pitch = 0.95;

    // Track word-level progress
    utterance.onboundary = (e) => {
      if (e.name === "word") {
        const total = spokenCharsRef.current + (e.charIndex || 0);
        setProgress(Math.min((total / totalCharsRef.current) * 100, 99));
      }
    };

    utterance.onend = () => {
      spokenCharsRef.current += text.length;
      setProgress(
        Math.min((spokenCharsRef.current / totalCharsRef.current) * 100, 99)
      );

      // Pause between paragraphs for a natural breath
      const pauseMs = index === 0 ? 700 : 500; // Longer pause after the headline
      setTimeout(() => speakSegment(index + 1, segments), pauseMs);
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
      activeRef.current = false;
    };

    window.speechSynthesis.speak(utterance);
  }, []);

  const handlePlay = useCallback(() => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    window.speechSynthesis.cancel();
    const segments = buildSegments(headline, body);
    segmentsRef.current = segments;
    totalCharsRef.current = segments.join("").length;
    spokenCharsRef.current = 0;
    setProgress(0);
    setIsPlaying(true);
    setIsPaused(false);
    activeRef.current = true;

    // Small delay for voice list readiness
    setTimeout(() => speakSegment(0, segments), 100);
  }, [isPaused, headline, body, speakSegment]);

  const handlePause = useCallback(() => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel();
    activeRef.current = false;
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    spokenCharsRef.current = 0;
  }, []);

  if (!supported) return null;

  const isActive = isPlaying || isPaused;

  return (
    <div className="bg-signal-black text-cream rounded-lg px-5 py-4 mb-8">
      <div className="flex items-center gap-4">
        {/* Play / Pause */}
        <button
          onClick={isPlaying ? handlePause : handlePlay}
          className="w-10 h-10 rounded-full bg-signal-red flex items-center justify-center hover:bg-red-700 transition-colors shrink-0"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 2.5v11l9-5.5z" />
            </svg>
          )}
        </button>

        {/* Stop */}
        {isActive && (
          <button
            onClick={handleStop}
            className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center hover:bg-neutral-600 transition-colors shrink-0"
            aria-label="Stop"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <rect x="1" y="1" width="10" height="10" rx="1" />
            </svg>
          </button>
        )}

        {/* Label + Progress */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-sans tracking-wider uppercase text-neutral-400 mb-1">
            {isPlaying
              ? "Listening..."
              : isPaused
              ? "Paused"
              : "Listen to this article"}
          </p>
          {isActive ? (
            <div className="w-full bg-neutral-700 rounded-full h-1.5">
              <div
                className="bg-signal-red h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          ) : (
            <p className="text-xs text-neutral-500 font-sans truncate">
              {voiceName ? `${voiceName} voice` : headline}
            </p>
          )}
        </div>

        {/* Audio icon */}
        <div className="shrink-0 text-neutral-500">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            {isPlaying && (
              <>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </>
            )}
            {isPaused && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
          </svg>
        </div>
      </div>
    </div>
  );
}
