"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { cart } from "./cart-store";

type Props = {
  product: { id: string; slug: string; name: string; price: number; stock: number };
  variant?: "compact" | "full";
};

export function AddToCartButton({ product, variant = "compact" }: Props) {
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const soldOut = product.stock <= 0;

  function add() {
    cart.add(
      { id: product.id, slug: product.slug, name: product.name, price: product.price, maxQuantity: product.stock },
      variant === "full" ? qty : 1,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  const label = soldOut ? "Esgotado" : added ? "Adicionado!" : "Adicionar à sacola";
  const Icon = added ? Check : ShoppingBag;

  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={add}
        disabled={soldOut}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-brand-orange-strong disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
      >
        <Icon className="size-4" aria-hidden />
        {label}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="inline-flex items-center justify-between rounded-full border border-line sm:w-36">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="flex size-12 items-center justify-center rounded-full hover:bg-text/5 disabled:opacity-40"
          disabled={qty <= 1 || soldOut}
          aria-label="Diminuir quantidade"
        >
          <Minus className="size-4" />
        </button>
        <span className="min-w-6 text-center font-semibold tabular-nums" aria-live="polite">
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
          className="flex size-12 items-center justify-center rounded-full hover:bg-text/5 disabled:opacity-40"
          disabled={qty >= product.stock || soldOut}
          aria-label="Aumentar quantidade"
        >
          <Plus className="size-4" />
        </button>
      </div>
      <button
        type="button"
        onClick={add}
        disabled={soldOut}
        className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand-orange px-6 font-semibold text-black transition hover:bg-brand-orange-strong disabled:cursor-not-allowed disabled:bg-line disabled:text-muted"
      >
        <Icon className="size-5" aria-hidden />
        {label}
      </button>
    </div>
  );
}
