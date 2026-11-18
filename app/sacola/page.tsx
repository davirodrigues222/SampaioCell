import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { CartView } from "@/components/cart/cart-view";

export const metadata: Metadata = {
  title: "Sacola",
  robots: { index: false },
};

export default function CartPage() {
  return (
    <>
      <PageHeader title="Sua sacola" crumbs={[{ href: "/", label: "Início" }, { label: "Sacola" }]} />
      <div className="container-page pt-5 pb-10 md:py-10">
        <CartView />
      </div>
    </>
  );
}
