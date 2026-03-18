'use client';

import { useState, useEffect } from 'react';

const READ_KEY = 'signal_articles_read';
const ACCESS_KEY = 'signal_access_granted';
const FREE_LIMIT = 1;
const SCROLL_THRESHOLD = 350; // px scrolled before modal appears

export default function ArticleGate({
  children,
  articleId,
}: {
  children: React.ReactNode;
  articleId: string;
}) {
  const [paywalled, setPaywalled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem(ACCESS_KEY) === 'true') return;

    const read: string[] = JSON.parse(localStorage.getItem(READ_KEY) || '[]');

    if (read.includes(articleId)) return;

    if (read.length >= FREE_LIMIT) {
      setPaywalled(true);
    } else {
      localStorage.setItem(READ_KEY, JSON.stringify([...read, articleId]));
    }
  }, [articleId]);

  // Trigger modal on scroll once paywalled
  useEffect(() => {
    if (!paywalled) return;

    const onScroll = () => {
      if (window.scrollY >= SCROLL_THRESHOLD) {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [paywalled]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, email }),
      });

      if (!res.ok) throw new Error();

      localStorage.setItem(ACCESS_KEY, 'true');
      setPaywalled(false);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {children}

      {paywalled && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[3px] transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className={`bg-[#FAF8F5] border border-neutral-200 shadow-2xl max-w-md w-full mx-4 p-8 rounded-2xl transition-transform duration-500 ${visible ? 'translate-y-0' : 'translate-y-4'}`}>

            {/* Header */}
            <div className="border-b-2 border-signal-red pb-3 mb-5">
              <p className="text-xs font-sans uppercase tracking-widest text-signal-red mb-1">The Signal</p>
              <h2 className="font-headline text-2xl font-bold leading-tight">
                You&apos;ve read your free article
              </h2>
            </div>

            {/* Value prop */}
            <p className="text-neutral-600 text-sm leading-relaxed mb-6">
              Sign up free to keep reading. Get AI-powered news that cuts through the noise, sticks to the facts, and shows you the full range of takes.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full border border-neutral-300 px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-signal-red transition-colors"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-neutral-300 px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-signal-red transition-colors"
              />
              {error && (
                <p className="text-signal-red text-xs">{error}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-signal-red text-white py-3 text-xs font-sans uppercase tracking-widest hover:bg-red-800 transition-colors disabled:opacity-60"
              >
                {submitting ? 'Signing up...' : 'Get free access'}
              </button>
            </form>

            <p className="text-neutral-400 text-xs text-center mt-4 font-sans">
              No spam. Unsubscribe any time.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
