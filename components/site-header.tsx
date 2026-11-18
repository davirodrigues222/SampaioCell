import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin } from "lucide-react";
import { store } from "@/lib/store-info";
import { CartButton } from "./cart/cart-button";
import { MobileMenu } from "./mobile-menu";
import { OpenStatus } from "./open-status";
import { ThemeToggle } from "./theme-toggle";
import { NavLinks } from "./nav-links";

export const navItems = [
  { href: "/", label: "Início" },
  { href: "/loja", label: "Loja" },
  { href: "/assistencia", label: "Assistência Técnica" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

/**
 * Cabeçalho fixo no topo.
 * Celular: compacto (56px) com logo, sacola e menu — a navegação principal fica na barra inferior.
 * Tablet: + faixa com endereço/horário e botão de tema. Desktop: + links de navegação.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-ink/95 pt-[env(safe-area-inset-top)] backdrop-blur supports-[backdrop-filter]:bg-ink/80">
      {/* Faixa superior com endereço e horário */}
      <div className="hidden border-b border-line/60 text-xs text-muted md:block">
        <div className="container-page flex h-9 items-center justify-between gap-4">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-accent" aria-hidden />
            {store.address.street} — {store.address.district}, {store.address.city}
          </span>
          <span className="inline-flex items-center gap-3">
            <OpenStatus />
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-accent" aria-hidden />
              Seg–Sex 8h–12h · 15h–19h | Sáb 8h–12h
            </span>
          </span>
        </div>
      </div>

      <div className="border-b border-line">
        <div className="container-page flex h-14 items-center justify-between gap-3 md:h-16">
          <Link
            href="/"
            className="pressable -ml-1 flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-1"
            aria-label="Sampaio Cell — página inicial"
          >
            <Image src="/images/sc-icone.png" alt="" width={355} height={459} className="h-8 w-auto md:h-9" loading="eager" />
            <Image
              src="/images/sc-nome.png"
              alt="Sampaio Cell"
              width={1035}
              height={112}
              className="h-4 w-auto md:h-5"
              loading="eager"
            />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <NavLinks items={navItems} />
          </nav>

          <div className="-mr-1.5 flex items-center gap-1">
            <ThemeToggle className="hidden md:inline-flex" />
            <CartButton />
            <MobileMenu items={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
}
