/** Esqueletos de carregamento exibidos enquanto o conteúdo de uma rota dinâmica chega. */

function Bar({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-full bg-text/10 ${className}`} />;
}

function Block({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-2xl bg-text/[0.06] sm:rounded-3xl ${className}`} />;
}

function HeaderSkeleton() {
  return (
    <div className="border-b border-line bg-ink">
      <div className="container-page space-y-3 py-7 md:space-y-4 md:py-14">
        <Bar className="h-3 w-32 md:w-40" />
        <Bar className="h-8 w-2/3 max-w-md md:h-10" />
      </div>
    </div>
  );
}

export function CategorySkeleton() {
  return (
    <div aria-busy="true" aria-label="Carregando produtos">
      <HeaderSkeleton />
      <div className="container-page pt-5 pb-10 md:py-10">
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 5 }, (_, i) => (
            <Bar key={i} className="h-11 w-24 shrink-0 md:h-10" />
          ))}
        </div>
        <div className="mt-4 flex gap-2 md:mt-6">
          <Bar className="h-12 flex-1" />
          <Bar className="h-12 w-32" />
        </div>
        <div className="mt-8 grid grid-cols-2 gap-2.5 sm:gap-4 md:mt-10 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, i) => (
            <Block key={i} className="aspect-[3/5] sm:aspect-[3/4]" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div aria-busy="true" aria-label="Carregando produto">
      <div className="container-page pt-3 md:pt-6">
        <Bar className="my-4 h-3 w-48" />
      </div>
      <div className="container-page grid gap-5 pb-10 md:gap-10 md:pt-4 lg:grid-cols-2 lg:gap-16">
        <div className="-mx-4 aspect-square animate-pulse bg-text/[0.06] md:mx-0 md:rounded-2xl" />
        <div className="space-y-4 md:space-y-5">
          <Bar className="h-4 w-24" />
          <Bar className="h-8 w-4/5" />
          <Bar className="h-10 w-40" />
          <Bar className="h-4 w-full" />
          <Bar className="h-4 w-5/6" />
          <Bar className="mt-6 h-12 w-full" />
          <Bar className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div aria-busy="true" aria-label="Carregando sacola" className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_380px]">
      <div className="divide-y divide-line rounded-3xl border border-line bg-card">
        {Array.from({ length: 2 }, (_, i) => (
          <div key={i} className="space-y-3 p-4 sm:p-5">
            <Bar className="h-4 w-3/5" />
            <Bar className="h-3 w-24" />
            <div className="flex justify-between pt-1">
              <Bar className="h-11 w-32" />
              <Bar className="h-6 w-20" />
            </div>
          </div>
        ))}
      </div>
      <div className="space-y-4 rounded-3xl border border-line bg-card p-5 md:p-6">
        <Bar className="ml-auto h-8 w-36" />
        <Block className="h-20" />
        <Block className="h-20" />
        <Bar className="h-12 w-full" />
      </div>
    </div>
  );
}
