import { notFound } from "next/navigation";
import Link from "next/link";
import { getArticleBySlug, getArticleById, getRelatedArticles } from "@/lib/articles";
import { CATEGORIES, ArticleSource } from "@/lib/types";
import ArticleCard from "@/components/ArticleCard";
import ArticleFeedback from "@/components/ArticleFeedback";

function SourcePills({ sources }: { sources: ArticleSource[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {sources.map((source) =>
        source.url ? (
          <a
            key={source.name}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-signal-red bg-neutral-100 px-3 py-1 rounded-full hover:bg-neutral-200 transition-colors font-sans"
          >
            {source.name} ↗
          </a>
        ) : (
          <span
            key={source.name}
            className="text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full font-sans"
          >
            {source.name}
          </span>
        )
      )}
    </div>
  );
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const article = await getArticleBySlug(params.id) || await getArticleById(params.id);
  if (!article) return { title: "Not Found — The Signal" };
  return {
    title: `${article.headline} — The Signal`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: { params: { id: string } }) {
  // Try slug first, then id (for backwards compat with mock data)
  const article = await getArticleBySlug(params.id) || await getArticleById(params.id);
  if (!article) notFound();

  const categoryInfo = CATEGORIES.find((c) => c.slug === article.category);
  const related = await getRelatedArticles(article);

  const formattedTime = new Date(article.timestamp).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Australia/Sydney",
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-neutral-400 font-sans mb-6">
        <Link href="/" className="hover:text-signal-red">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/category/${article.category}`}
          className="hover:text-signal-red"
        >
          {categoryInfo?.label}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-neutral-600">Article</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight mb-4">
          {article.headline}
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed mb-4">
          {article.summary}
        </p>
        <div className="flex items-center gap-4 text-xs text-neutral-400 font-sans border-t border-b border-neutral-200 py-3">
          <time>{formattedTime}</time>
          <span className="w-1 h-1 bg-neutral-300 rounded-full" />
          <Link
            href={`/category/${article.category}`}
            className="uppercase tracking-widest hover:text-signal-red"
          >
            {categoryInfo?.label}
          </Link>
          <span className="w-1 h-1 bg-neutral-300 rounded-full" />
          <span>The Signal Staff</span>
        </div>
      </header>

      {/* The Facts */}
      <div className="mb-10">
        <div className="flex items-center justify-between border-b-2 border-signal-black pb-2 mb-6">
          <h2 className="font-headline text-2xl font-bold">The Facts</h2>
        </div>
        {article.body.split("\n\n").map((paragraph, i) => (
          <p
            key={i}
            className={`text-neutral-800 leading-[1.85] mb-5 text-[17px] ${
              i === 0 ? "drop-cap" : ""
            }`}
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* The Left's View */}
      {article.perspectiveLeft && (
        <div className="mb-10">
          <div className="flex items-center justify-between border-b-2 border-signal-black pb-2 mb-6">
            <h2 className="font-headline text-2xl font-bold">The Left&apos;s View</h2>
          </div>
          <p className="text-neutral-800 leading-[1.85] text-[17px] mb-6">{article.perspectiveLeft}</p>
          {(article.sourcesLeft ?? []).length > 0 && (
            <SourcePills sources={article.sourcesLeft!} />
          )}
        </div>
      )}

      {/* The Right's View */}
      {article.perspectiveRight && (
        <div className="mb-10">
          <div className="flex items-center justify-between border-b-2 border-signal-black pb-2 mb-6">
            <h2 className="font-headline text-2xl font-bold">The Right&apos;s View</h2>
          </div>
          <p className="text-neutral-800 leading-[1.85] text-[17px] mb-6">{article.perspectiveRight}</p>
          {(article.sourcesRight ?? []).length > 0 && (
            <SourcePills sources={article.sourcesRight!} />
          )}
        </div>
      )}

      {/* Reader Feedback */}
      <ArticleFeedback articleId={article.id} />

      {/* Impartiality Notice */}
      <div className="bg-neutral-50 border border-neutral-200 rounded px-5 py-4 mb-12">
        <p className="text-xs text-neutral-500 font-sans leading-relaxed">
          <span className="font-semibold uppercase tracking-wider">Editorial Note:</span>{" "}
          This article was generated by AI from multiple news sources. The Signal aims to
          present factual, balanced reporting by synthesizing information from diverse
          outlets. Readers are encouraged to consult original sources for additional context.
        </p>
      </div>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="border-t border-neutral-300 pt-8">
          <h3 className="font-headline text-2xl font-bold mb-6">
            More in {categoryInfo?.label}
          </h3>
          <div className="grid md:grid-cols-3 gap-x-8 gap-y-6">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
