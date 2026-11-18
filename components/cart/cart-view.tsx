"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { MapPin, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { store } from "@/lib/store-info";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "../icons";
import { CartSkeleton } from "../skeletons";
import { cart, cartCount, cartTotal, useCart, type CartItem } from "./cart-store";
import { StickyBar, useOffscreen } from "./sticky-buy-bar";

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

const noopSubscribe = () => () => {};

const stepButton =
  "pressable flex size-11 items-center justify-center rounded-full hover:bg-text/5 active:bg-text/10 disabled:opacity-40";

export function CartView() {
  const items = useCart();
  const [name, setName] = useState("");
  const [delivery, setDelivery] = useState<Delivery>("local");
  // a sacola fica no navegador: até a página "acordar" no cliente, mostra o esqueleto em vez de "vazia"
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const finalizeOffscreen = useOffscreen("finalizar", hydrated && items.length > 0);

  if (!hydrated) return <CartSkeleton />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md rounded-3xl border border-dashed border-line p-8 text-center md:p-10">
        <ShoppingBag className="mx-auto size-10 text-muted" aria-hidden />
        <p className="mt-4 text-lg font-semibold">Sua sacola está vazia</p>
        <p className="mt-1 text-sm text-muted">Explore a loja e adicione os produtos que quiser.</p>
        <Link
          href="/loja"
          className="pressable mt-6 inline-flex min-h-12 items-center rounded-full bg-brand-orange px-6 font-semibold text-black hover:bg-brand-orange-strong active:bg-brand-orange-strong"
        >
          Ir para a loja
        </Link>
      </div>
    );
  }

  const total = cartTotal(items);
  const count = cartCount(items);
  const orderUrl = whatsappUrl(buildOrderMessage(items, name, delivery));

  return (
    <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_380px]">
      {/* Itens */}
      <section aria-label="Itens da sacola">
        <ul className="divide-y divide-line rounded-3xl border border-line bg-card">
          {items.map((item) => (
            <li key={item.id} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 p-4 sm:flex sm:gap-4 sm:p-5">
              <div className="min-w-0 sm:flex-1">
                <Link href={`/produto/${item.slug}`} className="font-semibold hover:text-accent active:text-accent">
                  {item.name}
                </Link>
                <p className="text-sm text-muted">{formatPrice(item.price)} cada</p>
              </div>
              {/* no celular a lixeira fica no canto, ao lado do nome */}
              <button
                type="button"
                onClick={() => cart.remove(item.id)}
                className="pressable -mr-2 flex size-11 items-center justify-center self-start rounded-full text-muted hover:bg-red-500/10 hover:text-red-600 active:bg-red-500/10 active:text-red-600 sm:order-last sm:mr-0 sm:self-auto dark:hover:text-red-300"
                aria-label={`Remover ${item.name}`}
              >
                <Trash2 className="size-5" />
              </button>
              <div className="col-span-2 flex items-center justify-between gap-4 sm:justify-end">
                <div className="inline-flex items-center rounded-full border border-line">
                  <button
                    type="button"
                    onClick={() => cart.setQuantity(item.id, item.quantity - 1)}
                    className={stepButton}
                    aria-label={`Diminuir quantidade de ${item.name}`}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-8 text-center font-semibold tabular-nums" aria-live="polite">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => cart.setQuantity(item.id, item.quantity + 1)}
                    disabled={item.quantity >= item.maxQuantity}
                    className={stepButton}
                    aria-label={`Aumentar quantidade de ${item.name}`}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <p className="text-right text-lg font-bold tabular-nums sm:w-24 sm:text-base">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => cart.clear()}
          className="mt-2 inline-flex min-h-11 items-center text-sm text-muted hover:text-red-600 active:text-red-600 dark:hover:text-red-300"
        >
          Esvaziar sacola
        </button>
      </section>

      {/* Resumo */}
      <aside className="h-fit space-y-5 rounded-3xl border border-line bg-card p-5 md:space-y-6 md:p-6 lg:sticky lg:top-32">
        <div className="flex items-baseline justify-between">
          <span className="text-muted">
            {count} {count === 1 ? "item" : "itens"}
          </span>
          <span className="font-display text-3xl font-black tabular-nums">{formatPrice(total)}</span>
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
            autoCapitalize="words"
            enterKeyHint="done"
            className="mt-2 h-12 w-full rounded-xl border border-line bg-surface px-4 focus:border-brand-orange focus:outline-none"
          />
        </label>

        <a
          id="finalizar"
          href={orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pressable flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] font-semibold text-black hover:brightness-110 active:brightness-95"
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

      {/* Celular: total e finalizar sempre à mão enquanto o resumo não está na tela */}
      <StickyBar visible={finalizeOffscreen}>
        <div className="min-w-0">
          <p className="text-xs text-muted">
            Total · {count} {count === 1 ? "item" : "itens"}
          </p>
          <p className="text-lg leading-tight font-bold tabular-nums">{formatPrice(total)}</p>
        </div>
        <a
          href={orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={finalizeOffscreen ? undefined : -1}
          className="pressable flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 font-semibold text-black active:brightness-95"
        >
          <WhatsAppIcon className="size-5 shrink-0" />
          Finalizar
        </a>
      </StickyBar>
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
      className={`pressable flex cursor-pointer gap-3 rounded-2xl border p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-orange ${
        checked ? "border-brand-orange bg-brand-orange/5" : "border-line hover:border-text/25 active:border-text/25"
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
