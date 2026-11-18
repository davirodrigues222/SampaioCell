"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, MessageCircle, ShoppingBag, Store, Wrench, type LucideIcon } from "lucide-react";
import { CartBadge } from "./cart/cart-button";
import { cartCount, useCart } from "./cart/cart-store";
import { isActive } from "./nav-links";

const items: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Início", icon: House },
  { href: "/loja", label: "Loja", icon: Store },
  { href: "/assistencia", label: "Assistência", icon: Wrench },
  { href: "/sacola", label: "Sacola", icon: ShoppingBag },
  { href: "/contato", label: "Contato", icon: MessageCircle },
];

/** Barra de navegação inferior — só no celular (some a partir do tablet). */
export function BottomNav() {
  const pathname = usePathname();
  const count = cartCount(useCart());

  return (
    <nav
      aria-label="Navegação rápida"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur supports-[backdrop-filter]:bg-ink/85 md:hidden"
    >
      <ul className="mx-auto grid h-16 max-w-lg grid-cols-5 px-[max(0.25rem,env(safe-area-inset-left))]">
        {items.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          const isCart = href === "/sacola";
          return (
            <li key={href} className="flex">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                aria-label={isCart && count > 0 ? `Sacola, ${count} ${count === 1 ? "item" : "itens"}` : undefined}
                className={`pressable relative flex flex-1 flex-col items-center justify-center gap-1 rounded-xl text-xs font-medium ${
                  active ? "text-accent" : "text-muted active:text-text"
                }`}
              >
                {/* indicador da página atual */}
                <span
                  aria-hidden
                  className={`absolute top-0 h-0.5 w-8 rounded-full bg-brand-orange transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                />
                <span className="relative">
                  <Icon className="size-6" strokeWidth={active ? 2.25 : 1.75} aria-hidden />
                  {isCart && count > 0 && <CartBadge count={count} className="absolute -top-1.5 -right-2.5" />}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
