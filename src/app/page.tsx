import { CATEGORIES, Category, Article } from "@/lib/types";
import { getAllLatestArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import Link from "next/link";

export const revalidate = 3600; // ISR: revalidate every hour

export default async function HomePage() {
  const allNews: Record<Category, Article[]> = await getAllLatestArticles();

  // Get the top story from each category for the hero section
  const topStories = CATEGORIES.map((cat) => allNews[cat.slug]?.[0]).filter(Boolean);
  const heroStory = topStories[0];
  const restTopStories = topStories.filter((a) => a?.id !== heroStory?.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      {heroStory && (
        <section className="border-b border-neutral-300 pb-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <ArticleCard article={heroStory} featured />
            </div>
            <div className="border-l-0 md:border-l border-neutral-200 md:pl-8 space-y-6">
              {restTopStories.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Sections */}
      {CATEGORIES.map((cat) => {
        const articles = allNews[cat.slug] || [];
        if (articles.length === 0) return null;

        return (
          <section key={cat.slug} className="mb-12">
            <div className="flex items-center justify-between border-b-2 border-signal-black pb-2 mb-6">
              <h2 className="font-headline text-2xl font-bold">{cat.label}</h2>
              <Link
                href={`/category/${cat.slug}`}
                className="text-xs uppercase tracking-widest text-signal-red hover:underline font-sans"
              >
                View All
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
              {articles.slice(0, 3).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
