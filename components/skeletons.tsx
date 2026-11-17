/** Esqueletos de carregamento exibidos enquanto o conteúdo de uma rota dinâmica chega. */

function Bar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-full bg-text/10 ${className}`} />;
}

function HeaderSkeleton() {
  return (
    <div className="border-b border-line bg-ink">
      <div className="container-page space-y-4 py-10 sm:py-14">
        <Bar className="h-3 w-40" />
        <Bar className="h-10 w-2/3 max-w-md" />
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div aria-busy="true" aria-label="Carregando produtos">
      <HeaderSkeleton />
      <div className="container-page py-10">
        <div className="flex gap-2">
          {Array.from({ length: 5 }, (_, i) => (
            <Bar key={i} className="h-10 w-24" />
          ))}
        </div>
        <Bar className="mt-6 h-12 w-full" />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-3xl bg-card" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div aria-busy="true" aria-label="Carregando produto">
      <HeaderSkeleton />
      <div className="container-page grid gap-10 py-10 lg:grid-cols-2 lg:gap-16">
        <div className="aspect-square animate-pulse rounded-2xl bg-card" />
        <div className="space-y-5">
          <Bar className="h-4 w-24" />
          <Bar className="h-10 w-40" />
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-5/6" />
          <Bar className="mt-6 h-12 w-full" />
        </div>
      </div>
    </div>
  );
}
