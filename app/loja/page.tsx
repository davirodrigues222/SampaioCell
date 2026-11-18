import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProductBrowser } from "@/components/product-browser";
import { categories, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Loja",
  description: "Capinhas, películas, carregadores, fones, caixas de som, smartwatches, games e variedades.",
};

export default function StorePage() {
  return (
    <>
      <PageHeader
        title="Loja"
        description="Acessórios para celular, eletrônicos e variedades — os mesmos produtos que você encontra na nossa loja física."
        crumbs={[{ href: "/", label: "Início" }, { label: "Loja" }]}
      />
      <div className="container-page pt-5 pb-10 md:py-10">
        <ProductBrowser products={products} categories={categories} />
      </div>
    </>
  );
}
