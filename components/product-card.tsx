import Link from "next/link";
import { getCategory, type Product } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "./cart/add-to-cart-button";
import { ProductVisual } from "./product-visual";

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.category);
  const discount = product.compareAtPrice
    ? Math.round((1 - product.price / product.compareAtPrice) * 100)
    : 0;

  return (
    <article className="group flex w-full min-w-0 flex-col rounded-3xl border border-line bg-card p-3 shadow-soft transition hover:border-text/20 hover:bg-card-hover">
      <Link href={`/produto/${product.slug}`} className="relative block">
        <ProductVisual name={product.name} image={product.image} icon={category?.icon ?? "phone"} />
        {discount > 0 && (
          <span className="absolute top-3 left-3 rounded-full bg-brand-orange px-2.5 py-1 text-xs font-bold text-black">
            -{discount}%
          </span>
        )}
      </Link>
      <div className="flex flex-1 flex-col gap-3 px-1 pt-4 pb-1">
        <div className="flex-1">
          {category && <p className="text-xs font-medium text-accent-2">{category.name}</p>}
          <h3 className="mt-1 line-clamp-2 text-sm font-semibold sm:text-base">
            <Link href={`/produto/${product.slug}`} className="hover:text-accent">
              {product.name}
            </Link>
          </h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
