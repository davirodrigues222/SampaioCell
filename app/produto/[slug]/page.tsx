import { Suspense } from "react";
import { ProductSkeleton } from "@/components/skeletons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, CreditCard, MapPin, Store, Truck } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { StickyBuyBar } from "@/components/cart/sticky-buy-bar";
import { WhatsAppIcon } from "@/components/icons";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { getCategory, getProduct, getRelatedProducts, products } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { whatsappUrl } from "@/lib/whatsapp";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/produto/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProduct(slug);
  if (!product) return {};
  return { title: product.name, description: product.description };
}

async function ProductContent({ params }: { params: PageProps<"/produto/[slug]">["params"] }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);
  const lowStock = product.stock > 0 && product.stock <= 3;

  return (
    <>
      <nav aria-label="Você está em" className="container-page pt-3 md:pt-6">
        <ol className="flex items-center gap-x-1 overflow-hidden text-xs whitespace-nowrap text-muted">
          {[
            { href: "/", label: "Início" },
            { href: "/loja", label: "Loja" },
            ...(category ? [{ href: `/loja/${category.slug}`, label: category.name }] : []),
          ].map((c) => (
            <li key={c.href} className="flex shrink-0 items-center gap-1">
              <Link href={c.href} className="inline-flex min-h-11 items-center px-0.5 hover:text-text active:text-text">
                {c.label}
              </Link>
              <ChevronRight className="size-3.5" aria-hidden />
            </li>
          ))}
          <li aria-current="page" className="min-w-0 truncate text-text">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="container-page grid gap-5 pb-10 md:gap-10 md:pt-4 lg:grid-cols-2 lg:gap-16">
        {/* no celular a foto ocupa a largura toda da tela */}
        <div className="-mx-4 md:mx-0">
          <ProductVisual
            name={product.name}
            image={product.image}
            icon={category?.icon ?? "phone"}
            size="large"
            className="rounded-none border-x-0 md:rounded-2xl md:border-x"
          />
        </div>

        <div className="flex flex-col gap-5 md:gap-6">
          <div>
            {category && (
              <Link
                href={`/loja/${category.slug}`}
                className="-my-2 inline-flex min-h-11 items-center text-sm font-medium text-accent-2 hover:underline"
              >
                {category.name}
              </Link>
            )}
            <h1 className="font-display text-2xl leading-tight font-extrabold tracking-tight italic md:text-4xl">
              {product.name}
            </h1>
            <div className="mt-3 flex flex-wrap items-baseline gap-x-3">
              <p className="font-display text-4xl font-black tabular-nums">{formatPrice(product.price)}</p>
              {product.compareAtPrice && (
                <p className="text-lg text-muted tabular-nums line-through">{formatPrice(product.compareAtPrice)}</p>
              )}
            </div>
            <p className="mt-2 text-sm">
              {product.stock <= 0 ? (
                <span className="text-red-600 dark:text-red-300">Esgotado no momento</span>
              ) : lowStock ? (
                <span className="text-accent">Últimas {product.stock} unidades</span>
              ) : (
                <span className="text-emerald-700 dark:text-emerald-300">Em estoque</span>
              )}
            </p>
          </div>

          <p className="leading-relaxed text-muted">{product.description}</p>

          <div id="comprar">
            <AddToCartButton product={product} variant="full" />
          </div>

          <a
            href={whatsappUrl(`Olá! Tenho interesse no produto: ${product.name} (${formatPrice(product.price)}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#1fa855]/60 px-6 font-semibold text-[#15803d] hover:bg-[#25D366]/10 active:bg-[#25D366]/15 dark:border-[#25D366]/60 dark:text-[#25D366]"
          >
            <WhatsAppIcon className="size-5" />
            Tirar dúvida no WhatsApp
          </a>

          <ul className="grid gap-3 rounded-2xl border border-line bg-card p-4 text-sm md:p-5">
            <li className="flex gap-3">
              <Store className="size-5 shrink-0 text-accent" aria-hidden />
              <span>
                <strong>Retire na loja</strong> ou mande um Uber Flash buscar —{" "}
                <span className="text-muted">Fortaleza e Região Metropolitana.</span>
              </span>
            </li>
            <li className="flex gap-3">
              <Truck className="size-5 shrink-0 text-accent" aria-hidden />
              <span>
                <strong>Envio para todo o Brasil</strong> <span className="text-muted">— em breve pelo site.</span>
              </span>
            </li>
            <li className="flex gap-3">
              <MapPin className="size-5 shrink-0 text-accent" aria-hidden />
              <span className="text-muted">Rua Itarema, 604A — Passaré, Fortaleza/CE</span>
            </li>
            <li className="flex gap-3">
              <CreditCard className="size-5 shrink-0 text-accent" aria-hidden />
              <span className="text-muted">Pagamento na loja: Pix, cartão de crédito/débito ou dinheiro.</span>
            </li>
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container-page pt-4 md:pt-10">
          <h2 className="font-display text-2xl font-extrabold italic">Você também pode gostar</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2.5 sm:gap-4 md:mt-6 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id} className="flex">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <StickyBuyBar product={product} targetId="comprar" />
    </>
  );
}

export default function ProductPage(props: PageProps<"/produto/[slug]">) {
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <ProductContent params={props.params} />
    </Suspense>
  );
}
