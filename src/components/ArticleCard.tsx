import Link from "next/link";
import { Article } from "@/lib/types";

export default function ArticleCard({
  article,
  featured = false,
}: {
  article: Article;
  featured?: boolean;
}) {
  const formattedTime = new Date(article.timestamp).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className={`group ${featured ? "" : "border-b border-neutral-200 pb-6"}`}
    >
      <Link href={`/article/${article.id}`} className="block">
        {article.isBreaking && (
          <span className="inline-block bg-signal-red text-white text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 mb-2">
            Breaking
          </span>
        )}

        <h3
          className={`font-headline leading-tight mb-2 group-hover:text-signal-red transition-colors ${
            featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
          }`}
        >
          {article.headline}
        </h3>

        <p className="text-neutral-600 text-sm mb-3 leading-relaxed">{article.summary}</p>

        <div className="flex items-center gap-3 text-xs text-neutral-400">
          <time>{formattedTime}</time>
          <span className="uppercase tracking-wider">{article.category}</span>
          <span className="ml-auto text-signal-red opacity-0 group-hover:opacity-100 transition-opacity text-xs">
            Read full story
          </span>
        </div>
      </Link>
    </article>
  );
}
