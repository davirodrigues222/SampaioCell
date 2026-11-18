import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">{eyebrow}</p>
        )}
        <h2 className="mt-2 font-display text-heading font-extrabold tracking-tight italic">{title}</h2>
        {description && <p className="mt-3 text-muted">{description}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="-my-2 inline-flex min-h-11 shrink-0 items-center gap-1.5 self-start text-sm font-semibold text-accent hover:underline active:opacity-70 sm:self-auto"
        >
          {action.label}
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}
