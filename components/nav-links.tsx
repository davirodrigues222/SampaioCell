"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string };

export function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  if (href === "/loja") return pathname.startsWith("/loja") || pathname.startsWith("/produto");
  return pathname.startsWith(href);
}

export function NavLinks({ items }: { items: Item[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1">
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                active ? "bg-text/10 text-text" : "text-muted hover:text-text"
              }`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
