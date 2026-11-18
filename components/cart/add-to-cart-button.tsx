"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { cart } from "./cart-store";

type Props = {
  product: { id: string; slug: string; name: string; price: number; stock: number };
  /** compact: botão dos cards · full: com seletor de quantidade · bar: botão da barra fixa do celular */
  variant?: "compact" | "full" | "bar";
};

const base =
  "pressable inline-flex items-center justify-center gap-2 rounded-full bg-brand-orange font-semibold text-black hover:bg-brand-orange-strong active:bg-brand-orange-strong disabled:cursor-not-allowed disabled:bg-line disabled:text-muted";

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
  const shortLabel = soldOut ? "Esgotado" : added ? "Adicionado!" : "Adicionar";
  const Icon = added ? Check : ShoppingBag;

  if (variant === "compact") {
    // No card estreito do celular, o texto curto ("Adicionar") cabe em uma linha
    return (
      <button
        type="button"
        onClick={add}
        disabled={soldOut}
        aria-label={soldOut ? `${product.name} esgotado` : `Adicionar ${product.name} à sacola`}
        className={`${base} min-h-11 w-full px-3 text-sm`}
      >
        <Icon className="size-4 shrink-0" aria-hidden />
        <span className="lg:hidden">{shortLabel}</span>
        <span className="hidden lg:inline">{label}</span>
      </button>
    );
  }

  if (variant === "bar") {
    return (
      <button
        type="button"
        onClick={add}
        disabled={soldOut}
        aria-label={soldOut ? undefined : `Adicionar ${product.name} à sacola`}
        className={`${base} h-12 flex-1 px-5 whitespace-nowrap`}
      >
        <Icon className="size-5 shrink-0" aria-hidden />
        <span aria-live="polite">{shortLabel}</span>
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="inline-flex items-center justify-between rounded-full border border-line sm:w-36">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          className="pressable flex size-12 items-center justify-center rounded-full hover:bg-text/5 active:bg-text/10 disabled:opacity-40"
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
          className="pressable flex size-12 items-center justify-center rounded-full hover:bg-text/5 active:bg-text/10 disabled:opacity-40"
          disabled={qty >= product.stock || soldOut}
          aria-label="Aumentar quantidade"
        >
          <Plus className="size-4" />
        </button>
      </div>
      {/* sm:flex-1: no celular o botão fica em coluna e precisa manter os 48px de altura */}
      <button type="button" onClick={add} disabled={soldOut} className={`${base} h-12 w-full px-6 sm:w-auto sm:flex-1`}>
        <Icon className="size-5" aria-hidden />
        <span aria-live="polite">{label}</span>
      </button>
    </div>
  );
}
