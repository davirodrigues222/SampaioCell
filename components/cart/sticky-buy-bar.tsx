"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { AddToCartButton } from "./add-to-cart-button";

/**
 * `true` quando o elemento com esse id NÃO está visível na tela (usado pelas barras fixas).
 * `ready`: passe `false` enquanto o elemento ainda não foi renderizado (o observador é ligado quando virar `true`).
 */
export function useOffscreen(targetId: string, ready = true) {
  const [offscreen, setOffscreen] = useState(false);
  useEffect(() => {
    const target = ready ? document.getElementById(targetId) : null;
    if (!target) return;
    const observer = new IntersectionObserver(([entry]) => setOffscreen(!entry.isIntersecting), {
      rootMargin: "0px 0px -80px 0px",
    });
    observer.observe(target);
    return () => observer.disconnect();
  }, [targetId, ready]);
  return ready && offscreen;
}

/**
 * Barra fixa do celular, logo acima da barra de navegação inferior.
 * Some a partir do tablet. `data-sticky-bar` faz o <body> reservar espaço para ela no fim da página.
 */
export function StickyBar({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <div
      data-sticky-bar
      inert={!visible}
      className={`fixed inset-x-0 bottom-[var(--bottom-nav)] z-30 border-t border-line bg-ink/95 backdrop-blur transition-transform duration-200 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-[calc(100%+var(--bottom-nav))]"
      }`}
    >
      <div className="container-page flex items-center gap-3 py-2.5">{children}</div>
    </div>
  );
}

type Props = {
  product: { id: string; slug: string; name: string; price: number; stock: number };
  /** id do bloco de compra da página: a barra aparece quando ele sai da tela */
  targetId: string;
};

/** Barra de compra da página de produto: aparece quando o botão principal não está visível. */
export function StickyBuyBar({ product, targetId }: Props) {
  const visible = useOffscreen(targetId);
  return (
    <StickyBar visible={visible}>
      <div className="min-w-0">
        <p className="truncate text-xs text-muted">{product.name}</p>
        <p className="text-lg leading-tight font-bold tabular-nums">{formatPrice(product.price)}</p>
      </div>
      <AddToCartButton product={product} variant="bar" />
    </StickyBar>
  );
}
