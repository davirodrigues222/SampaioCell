"use client";

import { useDeferredValue, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpDown, Search, X } from "lucide-react";
import type { Category, Product } from "@/lib/catalog";
import { ProductCard } from "./product-card";

type Sort = "relevancia" | "menor-preco" | "maior-preco" | "nome";

function normalize(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function ProductBrowser({
  products,
  categories,
  activeCategory,
}: {
  products: Product[];
  categories: Category[];
  activeCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<Sort>("relevancia");
  const deferredQuery = useDeferredValue(query);
  const chipsRef = useRef<HTMLUListElement>(null);

  // no celular, centraliza o chip da categoria atual na faixa rolável (sem mexer na rolagem da página)
  useEffect(() => {
    const list = chipsRef.current;
    const active = list?.querySelector<HTMLElement>("[aria-current=page]");
    if (!list || !active || list.scrollWidth <= list.clientWidth) return;
    list.scrollLeft = active.offsetLeft - (list.clientWidth - active.offsetWidth) / 2;
  }, [activeCategory]);

  const visible = useMemo(() => {
    const q = normalize(deferredQuery.trim());
    const filtered = q
      ? products.filter((p) => normalize(`${p.name} ${p.description}`).includes(q))
      : products;
    const sorted = [...filtered];
    if (sort === "menor-preco") sorted.sort((a, b) => a.price - b.price);
    if (sort === "maior-preco") sorted.sort((a, b) => b.price - a.price);
    if (sort === "nome") sorted.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
    return sorted;
  }, [products, deferredQuery, sort]);

  return (
    <div>
      {/* Categorias */}
      <nav aria-label="Categorias">
        <ul ref={chipsRef} className="scroller bleed-x relative gap-2 pb-1 md:flex-wrap">
          <li>
            <Chip href="/loja" active={!activeCategory}>
              Todos
            </Chip>
          </li>
          {categories.map((c) => (
            <li key={c.slug}>
              <Chip href={`/loja/${c.slug}`} active={activeCategory === c.slug}>
                {c.name}
              </Chip>
            </li>
          ))}
        </ul>
      </nav>

      {/* Busca e ordenação — celular: busca em cima; contagem e ordenação na linha de baixo */}
      <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-2 md:mt-6 md:flex md:flex-wrap md:gap-y-0">
        <label className="relative col-span-2 min-w-0 md:flex-1">
          <span className="sr-only">Buscar produtos</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar produto ou modelo…"
            enterKeyHint="search"
            className="h-12 w-full rounded-full border border-line bg-card pr-11 pl-11 text-text placeholder:text-muted focus:border-brand-orange focus:outline-none md:pl-12"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="pressable absolute top-1/2 right-0.5 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:text-text active:text-text"
              aria-label="Limpar busca"
            >
              <X className="size-4" />
            </button>
          )}
        </label>
        <label className="relative flex shrink-0 items-center gap-2 text-sm text-muted order-last md:order-2">
          <span className="sr-only md:not-sr-only">Ordenar:</span>
          <ArrowUpDown className="pointer-events-none absolute left-3.5 size-4 text-muted md:hidden" aria-hidden />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            aria-label="Ordenar produtos"
            className="h-11 rounded-full border border-line bg-card pr-3 pl-9 md:h-12 text-text focus:border-brand-orange focus:outline-none md:w-auto md:px-4"
          >
            <option value="relevancia">Relevância</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
            <option value="nome">Nome (A–Z)</option>
          </select>
        </label>
        <p className="min-w-0 truncate text-sm text-muted md:order-last md:mt-6 md:w-full" aria-live="polite">
          {visible.length} {visible.length === 1 ? "produto" : "produtos"}
          {deferredQuery && <> para “{deferredQuery}”</>}
        </p>
      </div>

      {visible.length > 0 ? (
        <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:gap-4 md:mt-4 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <li key={p.id} className="flex">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-4 rounded-3xl border border-dashed border-line p-8 text-center md:mt-6 md:p-10">
          <p className="font-semibold">Nenhum produto encontrado.</p>
          <p className="mt-1 text-sm text-muted">
            Não achou o que procura? Chame no WhatsApp — temos muito mais na loja física.
          </p>
        </div>
      )}
    </div>
  );
}

function Chip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`pressable inline-flex h-11 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap md:h-10 ${
        active
          ? "border-brand-orange bg-brand-orange text-black"
          : "border-line bg-card text-muted hover:border-text/30 hover:text-text active:border-text/30 active:text-text"
      }`}
    >
      {children}
    </Link>
  );
}
