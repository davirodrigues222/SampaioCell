import { Suspense } from "react";
import { CategorySkeleton } from "@/components/skeletons";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { ProductBrowser } from "@/components/product-browser";
import { categories, getCategory, getProductsByCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ categoria: c.slug }));
}

export async function generateMetadata(props: PageProps<"/loja/[categoria]">): Promise<Metadata> {
  const { categoria } = await props.params;
  const category = getCategory(categoria);
  if (!category) return {};
  return { title: category.name, description: `${category.name}: ${category.description}. Sampaio Cell, Fortaleza.` };
}

async function CategoryContent({ params }: { params: PageProps<"/loja/[categoria]">["params"] }) {
  const { categoria } = await params;
  const category = getCategory(categoria);
  if (!category) notFound();

  return (
    <>
      <PageHeader
        title={category.name}
        description={category.description}
        crumbs={[{ href: "/", label: "Início" }, { href: "/loja", label: "Loja" }, { label: category.name }]}
      />
      <div className="container-page pt-5 pb-10 md:py-10">
        <ProductBrowser
          products={getProductsByCategory(category.slug)}
          categories={categories}
          activeCategory={category.slug}
        />
      </div>
    </>
  );
}

export default function CategoryPage(props: PageProps<"/loja/[categoria]">) {
  return (
    <Suspense fallback={<CategorySkeleton />}>
      <CategoryContent params={props.params} />
    </Suspense>
  );
}
