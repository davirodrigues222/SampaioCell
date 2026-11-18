"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cartCount, useCart } from "./cart-store";

export function CartButton() {
  const count = cartCount(useCart());
  return (
    <Link
      href="/sacola"
      className="pressable relative inline-flex size-11 items-center justify-center rounded-full text-text hover:bg-text/10 active:bg-text/15"
      aria-label={count > 0 ? `Sacola com ${count} ${count === 1 ? "item" : "itens"}` : "Sacola vazia"}
    >
      <ShoppingBag className="size-5" />
      {count > 0 && <CartBadge count={count} className="absolute top-0 right-0" />}
    </Link>
  );
}

/** Bolinha laranja com a quantidade de itens. */
export function CartBadge({ count, className = "" }: { count: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex min-w-5 items-center justify-center rounded-full bg-brand-orange px-1 text-[11px] leading-5 font-bold text-black ${className}`}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}
