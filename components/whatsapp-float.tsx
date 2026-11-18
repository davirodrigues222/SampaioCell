"use client";

import { usePathname } from "next/navigation";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

/** Páginas com barra de ação fixa no rodapé do celular: lá o botão some para não cobri-la. */
const HIDDEN_ON_MOBILE = ["/produto/", "/sacola"];

/**
 * Botão flutuante do WhatsApp.
 * Celular: fica logo acima da barra de navegação inferior (`--bottom-nav` já inclui a área segura).
 * Tablet/desktop: canto inferior direito, respeitando a área segura.
 */
export function WhatsAppFloat() {
  const pathname = usePathname();
  const hideOnMobile = HIDDEN_ON_MOBILE.some((p) => pathname.startsWith(p));

  return (
    <a
      href={whatsappUrl("Olá! Vim pelo site da Sampaio Cell.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a Sampaio Cell no WhatsApp"
      className={`pressable fixed right-[max(1rem,env(safe-area-inset-right))] bottom-[calc(var(--bottom-nav)+0.75rem)] z-30 size-12 items-center justify-center rounded-full bg-[#25D366] text-black shadow-lg shadow-black/30 hover:scale-105 md:right-[max(1.5rem,env(safe-area-inset-right))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] md:size-14 ${
        hideOnMobile ? "hidden md:inline-flex" : "inline-flex"
      }`}
    >
      <WhatsAppIcon className="size-6 md:size-7" />
    </a>
  );
}
