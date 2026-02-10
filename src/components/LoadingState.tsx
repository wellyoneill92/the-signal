export default function LoadingState() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="animate-pulse space-y-8">
        {/* Featured article skeleton */}
        <div className="border-b border-neutral-200 pb-8">
          <div className="h-4 w-20 bg-neutral-200 rounded mb-4" />
          <div className="h-10 w-3/4 bg-neutral-200 rounded mb-3" />
          <div className="h-4 w-full bg-neutral-200 rounded mb-2" />
          <div className="h-4 w-2/3 bg-neutral-200 rounded" />
        </div>
        {/* Article list skeletons */}
        <div className="grid md:grid-cols-2 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-7 w-5/6 bg-neutral-200 rounded" />
              <div className="h-4 w-full bg-neutral-200 rounded" />
              <div className="h-4 w-1/2 bg-neutral-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
