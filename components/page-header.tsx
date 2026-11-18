import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Crumb = { href?: string; label: string };

export function PageHeader({
  title,
  description,
  crumbs,
  children,
}: {
  title: string;
  description?: string;
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-line bg-ink">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 glow-band"
      />
      <div className="container-page relative py-7 md:py-14">
        {crumbs && (
          <nav aria-label="Você está em" className="mb-3 md:mb-4">
            <ol className="flex flex-wrap items-center gap-x-1 text-xs text-muted">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1">
                  {i > 0 && <ChevronRight className="size-3.5" aria-hidden />}
                  {c.href ? (
                    <Link href={c.href} className="-my-3 inline-flex min-h-11 items-center hover:text-text active:text-text">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="line-clamp-1 text-text">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="font-display text-title font-black tracking-tight italic">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-muted md:mt-3 md:text-lg">{description}</p>}
        {children}
      </div>
    </div>
  );
}
