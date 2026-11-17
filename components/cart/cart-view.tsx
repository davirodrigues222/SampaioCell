"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { store } from "@/lib/store-info";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../icons";
import { cart, cartCount, cartTotal, useCart, type CartItem } from "./cart-store";

type Delivery = "local" | "nacional";

function buildOrderMessage(items: CartItem[], name: string, delivery: Delivery) {
  const lines = items.map((i) => `• ${i.quantity}x ${i.name} — ${formatPrice(i.price * i.quantity)}`);
  return [
    `Olá, ${store.name}! Gostaria de fazer este pedido pelo site:`,
    "",
    ...lines,
    "",
    `*Total: ${formatPrice(cartTotal(items))}*`,
    "",
    delivery === "local"
      ? "Entrega: retirada na loja / Uber Flash (Fortaleza e RMF)"
      : "Entrega: envio para fora de Fortaleza",
    name.trim() ? `Nome: ${name.trim()}` : null,
    "",
    "Podemos combinar o pagamento?",
  ]
    .filter((l) => l !== null)
    .join("\n");
}

export function CartView() {
  const items = useCart();
  const [name, setName] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("local");

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-dashed border-line p-10 text-center">
        <ShoppingBag className="mx-auto size-10 text-muted" aria-hidden />
        <p className="mt-4 text-lg font-semibold">Sua sacola está vazia</p>
        <p className="mt-1 text-sm text-muted">Explore a loja e adicione os produtos que quiser.</p>
        <Link
          href="/loja"
          className="mt-6 inline-flex rounded-full bg-brand-orange px-6 py-3 font-semibold text-black hover:bg-brand-orange-strong"
        >
          Ir para a loja
        </Link>
      </div>
    );
  }

  const total = cartTotal(items);
  const count = cartCount(items);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      {/* Itens */}
      <section aria-label="Itens da sacola">
        <ul className="divide-y divide-line rounded-3xl border border-line bg-card">
          {items.map((item) => (
            <li key={item.id} className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="flex-1">
                <Link href={`/produto/${item.slug}`} className="font-semibold hover:text-accent">
                  {item.name}
                </Link>
                <p className="text-sm text-muted">{formatPrice(item.price)} cada</p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:justify-end">
                <div className="inline-flex items-center rounded-full border border-line">
                  <button
                    type="button"
                    onClick={() => cart.setQuantity(item.id, item.quantity - 1)}
                    className="flex size-9 items-center justify-center rounded-full hover:bg-text/5"
                    aria-label={`Diminuir quantidade de ${item.name}`}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => cart.setQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.maxQuantity}
                    className="flex size-9 items-center justify-center rounded-full hover:bg-text/5 disabled:opacity-40"
                    aria-label={`Aumentar quantidade de ${item.name}`}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <p className="w-24 text-right font-bold tabular-nums">{formatPrice(item.price * item.quantity)}</p>
                <button
                  type="button"
                  onClick={() => cart.remove(item.id)}
                  className="rounded-full p-2 text-muted hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-300"
                  aria-label={`Remover ${item.name}`}
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button type="button" onClick={() => cart.clear()} className="mt-4 text-sm text-muted hover:text-red-600 dark:hover:text-red-300">
          Esvaziar sacola
        </button>
      </section>

      {/* Resumo */}
      <aside className="h-fit space-y-6 rounded-3xl border border-line bg-card p-6 lg:sticky lg:top-32">
        <div className="flex items-baseline justify-between">
          <span className="text-muted">
            {count} {count === 1 ? "item" : "itens"}
          </span>
          <span className="font-display text-3xl font-black">{formatPrice(total)}</span>
        </div>

        <fieldset className="space-y-2">
          <legend className="mb-2 text-sm font-semibold">Onde você está?</legend>
          <DeliveryOption
            checked={delivery === "local"}
            onChange={() => setDelivery("local")}
            icon={<MapPin className="size-5 text-accent" aria-hidden />}
            title="Fortaleza e Região Metropolitana"
            text="Retire na loja ou peça um Uber Flash para buscar."
          />
          <DeliveryOption
            checked={delivery === "nacional"}
            onChange={() => setDelivery("nacional")}
            icon={<Truck className="size-5 text-accent-2" aria-hidden />}
            title="Outras cidades e estados"
            text="Pagamento online e frete calculado — em breve."
          />
        </fieldset>

        <label className="block">
          <span className="text-sm font-semibold">Seu nome (opcional)</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            className="mt-2 h-11 w-full rounded-xl border border-line bg-surface px-4 focus:border-brand-orange focus:outline-none"
          />
        </label>

        <a
          href={whatsappUrl(buildOrderMessage(items, name, delivery))}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-black hover:brightness-110"
        >
          <WhatsAppIcon className="size-5" />
          Finalizar pedido no WhatsApp
        </a>
        <p className="text-xs leading-relaxed text-muted">
          Você será direcionado ao WhatsApp da loja com o resumo do pedido para combinar pagamento (Pix, cartão
          ou dinheiro) e retirada.
          {delivery === "nacional" && " Para envios, calculamos o frete e combinamos tudo por lá enquanto o pagamento online não fica pronto."}
        </p>
      </aside>
    </div>
  );
}

function DeliveryOption({
  checked,
  onChange,
  icon,
  title,
  text,
}: {
  checked: boolean;
  onChange: () => void;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <label
      className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-orange ${
        checked ? "border-brand-orange bg-brand-orange/5" : "border-line hover:border-text/25"
      }`}
    >
      <input type="radio" name="entrega" checked={checked} onChange={onChange} className="sr-only" />
      <span className="mt-0.5">{icon}</span>
      <span>
        <span className="block text-sm font-semibold">{title}</span>
        <span className="block text-xs text-muted">{text}</span>
      </span>
    </label>
  );
}
