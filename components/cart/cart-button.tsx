"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { cartCount, useCart } from "./cart-store";

export function CartButton() {
  const count = cartCount(useCart());
  return (
    <Link
      href="/sacola"
      className="relative inline-flex size-10 items-center justify-center rounded-full text-text transition hover:bg-text/10"
      aria-label={count > 0 ? `Sacola com ${count} ${count === 1 ? "item" : "itens"}` : "Sacola vazia"}
    >
      <ShoppingBag className="size-5" />
      {count > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex min-w-5 items-center justify-center rounded-full bg-brand-orange px-1 text-[11px] leading-5 font-bold text-black">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
