import Link from "next/link";
import { getCategory, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "./cart/add-to-cart-button";
import { ProductVisual } from "./product-visual";

/**
 * Card de produto. O card inteiro é clicável (o link do nome cobre o card),
 * exceto o botão de adicionar, que fica por cima.
 */
export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <article className="pressable group relative flex w-full min-w-0 flex-col rounded-2xl border border-line bg-card p-2 shadow-soft hover:border-text/20 hover:bg-card-hover active:border-text/25 sm:rounded-3xl sm:p-3">
      <div className="relative">
        <ProductVisual name={product.name} image={product.image} icon={category?.icon ?? "phone"} />
        {discount > 0 && (
          <span className="absolute top-2 left-2 rounded-full bg-brand-orange px-2 py-0.5 text-xs font-bold text-black sm:top-3 sm:left-3 sm:px-2.5 sm:py-1">
            -{discount}%
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 px-1 pt-3 pb-0.5 sm:gap-3 sm:pt-4 sm:pb-1">
        <div className="flex-1">
          {category && <p className="truncate text-xs font-medium text-accent-2">{category.name}</p>}
          <h3 className="mt-0.5 line-clamp-2 min-h-[2lh] text-sm leading-snug font-semibold sm:mt-1 sm:text-base">
            <Link
              href={`/produto/${product.slug}`}
              className="rounded-sm group-hover:text-accent before:absolute before:inset-0 before:rounded-2xl before:content-[''] sm:before:rounded-3xl"
            >
              {product.name}
            </Link>
          </h3>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2">
          <span className="text-lg font-bold tabular-nums">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-xs text-muted tabular-nums line-through sm:text-sm">
              {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <div className="relative z-10">
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
