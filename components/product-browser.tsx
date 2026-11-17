"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
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
      <nav aria-label="Categorias" className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
        <ul className="flex gap-2 sm:flex-wrap">
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

      {/* Busca e ordenação */}
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Buscar produtos</span>
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por produto, modelo de celular…"
            className="h-12 w-full rounded-full border border-line bg-card pr-11 pl-12 text-text placeholder:text-muted focus:border-brand-orange focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1 text-muted hover:text-text"
              aria-label="Limpar busca"
            >
              <X className="size-4" />
            </button>
          )}
        </label>
        <label className="flex items-center gap-2 text-sm text-muted">
          Ordenar:
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="h-12 rounded-full border border-line bg-card px-4 text-text focus:border-brand-orange focus:outline-none"
          >
            <option value="relevancia">Relevância</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
            <option value="nome">Nome (A–Z)</option>
          </select>
        </label>
      </div>

      <p className="mt-6 text-sm text-muted" aria-live="polite">
        {visible.length} {visible.length === 1 ? "produto" : "produtos"}
        {deferredQuery && <> para “{deferredQuery}”</>}
      </p>

      {visible.length > 0 ? (
        <ul className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visible.map((p) => (
            <li key={p.id} className="flex">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-3xl border border-dashed border-line p-10 text-center">
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
      className={`inline-flex h-10 items-center rounded-full border px-4 text-sm font-medium whitespace-nowrap transition ${
        active
          ? "border-brand-orange bg-brand-orange text-black"
          : "border-line bg-card text-muted hover:border-text/30 hover:text-text"
      }`}
    >
      {children}
    </Link>
  );
}
