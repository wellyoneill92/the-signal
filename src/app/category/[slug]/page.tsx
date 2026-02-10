import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES, Category, Article } from "@/lib/types";
import { getArticlesByCategory } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 3600; // ISR: revalidate every hour

export function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  if (!category) return { title: "Not Found — The Signal" };
  return {
    title: `${category.label} News — The Signal`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = CATEGORIES.find((c) => c.slug === params.slug);
  if (!category) notFound();

  const articles: Article[] = await getArticlesByCategory(category.slug as Category);

  const lead = articles[0];
  const secondary = articles.slice(1, 3);
  const remaining = articles.slice(3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <nav className="text-xs text-neutral-400 font-sans mb-4">
          <Link href="/" className="hover:text-signal-red">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-600">{category.label}</span>
        </nav>
        <div className="border-b-2 border-signal-black pb-3">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">{category.label}</h1>
          <p className="text-neutral-500 mt-2 text-sm font-sans">{category.description}</p>
        </div>
      </div>

      {/* Lead Story — full width, big treatment */}
      {lead && (
        <section className="mb-10 pb-8 border-b border-neutral-300">
          <Link href={`/article/${lead.slug}`} className="group block">
            {lead.isBreaking && (
              <span className="inline-block bg-signal-red text-white text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 mb-3">
                Breaking
              </span>
            )}
            <h2 className="font-headline text-4xl md:text-5xl font-bold leading-tight mb-4 group-hover:text-signal-red transition-colors">
              {lead.headline}
            </h2>
            <p className="text-neutral-600 text-lg leading-relaxed mb-4 max-w-3xl">
              {lead.summary}
            </p>
            <div className="flex items-center gap-3 text-xs text-neutral-400 font-sans">
              <time>
                {new Date(lead.timestamp).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </time>
              <span className="w-1 h-1 bg-neutral-300 rounded-full" />
              <span>The Signal Staff</span>
              <span className="ml-auto text-signal-red opacity-0 group-hover:opacity-100 transition-opacity">
                Read full story
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* Secondary Stories — two columns, larger cards */}
      {secondary.length > 0 && (
        <section className="grid md:grid-cols-2 gap-x-10 gap-y-0 mb-10 pb-8 border-b border-neutral-300">
          {secondary.map((article, i) => (
            <div
              key={article.id}
              className={`py-6 ${
                i === 0 ? "md:border-r md:border-neutral-200 md:pr-10" : "md:pl-0"
              }`}
            >
              <Link href={`/article/${article.slug}`} className="group block">
                {article.isBreaking && (
                  <span className="inline-block bg-signal-red text-white text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 mb-2">
                    Breaking
                  </span>
                )}
                <h3 className="font-headline text-2xl md:text-3xl font-bold leading-tight mb-3 group-hover:text-signal-red transition-colors">
                  {article.headline}
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed mb-3">
                  {article.summary}
                </p>
                {/* First paragraph preview */}
                <p className="text-neutral-500 text-sm leading-relaxed mb-3 line-clamp-3">
                  {article.body.split("\n\n")[0]}
                </p>
                <div className="flex items-center gap-3 text-xs text-neutral-400 font-sans">
                  <time>
                    {new Date(article.timestamp).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span className="ml-auto text-signal-red opacity-0 group-hover:opacity-100 transition-opacity">
                    Read full story
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </section>
      )}

      {/* Remaining Stories — compact list */}
      {remaining.length > 0 && (
        <section>
          <h3 className="font-headline text-xl font-bold mb-6 pb-2 border-b border-neutral-200">
            More in {category.label}
          </h3>
          <div className="space-y-0 divide-y divide-neutral-200">
            {remaining.map((article) => (
              <div key={article.id} className="py-5">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
