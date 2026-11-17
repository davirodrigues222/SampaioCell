import { Suspense } from "react";
import { ProductSkeleton } from "@/components/skeletons";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CreditCard, MapPin, Store, Truck } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { WhatsAppIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
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
      <PageHeader
        title={product.name}
        crumbs={[
          { href: "/", label: "Início" },
          { href: "/loja", label: "Loja" },
          ...(category ? [{ href: `/loja/${category.slug}`, label: category.name }] : []),
          { label: product.name },
        ]}
      />

      <div className="container-page grid gap-10 py-10 lg:grid-cols-2 lg:gap-16">
        <ProductVisual name={product.name} image={product.image} icon={category?.icon ?? "phone"} size="large" />

        <div className="flex flex-col gap-6">
          <div>
            {category && (
              <Link href={`/loja/${category.slug}`} className="text-sm font-medium text-accent-2 hover:underline">
                {category.name}
              </Link>
            )}
            <div className="mt-3 flex flex-wrap items-baseline gap-3">
              <p className="font-display text-4xl font-black">{formatPrice(product.price)}</p>
              {product.compareAtPrice && (
                <p className="text-lg text-muted line-through">{formatPrice(product.compareAtPrice)}</p>
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

          <AddToCartButton product={product} variant="full" />

          <a
            href={whatsappUrl(`Olá! Tenho interesse no produto: ${product.name} (${formatPrice(product.price)}).`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#25D366]/60 px-6 font-semibold text-[#25D366] hover:bg-[#25D366]/10"
          >
            <WhatsAppIcon className="size-5" />
            Tirar dúvida no WhatsApp
          </a>

          <ul className="grid gap-3 rounded-2xl border border-line bg-card p-5 text-sm">
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
        <section className="container-page pt-10">
          <h2 className="font-display text-2xl font-extrabold italic">Você também pode gostar</h2>
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.id} className="flex">
                <ProductCard product={p} />
              </li>
            ))}
          </ul>
        </section>
      )}
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
