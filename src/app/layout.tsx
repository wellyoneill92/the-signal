import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Ticker from "@/components/Ticker";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Signal — Impartial AI-Powered News",
  description:
    "AI-powered impartial news aggregation. Every story researched from multiple sources for balanced, unbiased reporting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-body text-signal-black bg-cream antialiased">
        <Ticker />
        {/* Masthead */}
        <header className="border-b border-neutral-300">
          <div className="max-w-7xl mx-auto px-4 py-6 text-center">
            <a href="/" className="inline-block">
              <h1 className="font-headline text-5xl md:text-6xl font-black tracking-tight">
                The Signal
              </h1>
            </a>
            <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mt-2 font-sans">
              Impartial &middot; Factual &middot; AI-Powered
            </p>
            <p className="text-xs text-neutral-400 mt-1 font-sans">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </header>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
