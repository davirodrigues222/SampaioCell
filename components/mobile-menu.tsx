"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, X } from "lucide-react";
import { store } from "@/lib/store-info";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";
import { isActive } from "./nav-links";
import { OpenStatus } from "./open-status";
import { ThemeToggle } from "./theme-toggle";

type Item = { href: string; label: string };

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Menu lateral (drawer) do celular e tablet.
 * Fecha ao tocar num link, ao tocar fora, com ESC ou ao mudar de página; trava a rolagem do fundo
 * e mantém o foco do teclado dentro do painel enquanto aberto.
 *
 * O painel é renderizado direto no <body> (portal): o cabeçalho usa backdrop-filter, e um elemento
 * `position: fixed` dentro dele seria posicionado em relação ao cabeçalho, não à tela.
 */
export function MobileMenu({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // fecha ao navegar
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const els = [...panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)];
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="pressable inline-flex size-11 items-center justify-center rounded-full text-text hover:bg-text/10 active:bg-text/15"
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label="Abrir menu"
      >
        <Menu className="size-6" />
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[60] lg:hidden">
            {/* fundo escuro: tocar fora fecha */}
            <button
              type="button"
              tabIndex={-1}
              aria-hidden
              onClick={close}
              className="absolute inset-0 size-full animate-fade-in cursor-default bg-black/55"
            />

            <div
              ref={panelRef}
              id="menu-mobile"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute inset-y-0 right-0 flex w-[min(88vw,24rem)] animate-drawer-in flex-col overflow-y-auto overscroll-contain border-l border-line bg-ink pt-[env(safe-area-inset-top)] pr-[env(safe-area-inset-right)] pb-[max(1rem,env(safe-area-inset-bottom))] text-text shadow-2xl"
            >
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-line pr-2 pl-5">
                <p className="font-display text-lg font-black italic">Menu</p>
                <button
                  type="button"
                  onClick={close}
                  data-autofocus
                  className="pressable inline-flex size-11 items-center justify-center rounded-full hover:bg-text/10 active:bg-text/15"
                  aria-label="Fechar menu"
                >
                  <X className="size-6" />
                </button>
              </div>

              <nav aria-label="Menu" className="px-3 pt-3">
                <ul className="flex flex-col gap-1">
                  {items.map((item) => {
                    const active = isActive(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={close}
                          aria-current={active ? "page" : undefined}
                          className={`pressable flex min-h-13 items-center justify-between rounded-xl px-4 text-lg font-semibold ${
                            active ? "bg-text/10 text-accent" : "text-text hover:bg-text/5 active:bg-text/10"
                          }`}
                        >
                          {item.label}
                          <ChevronRight className="size-5 text-muted" aria-hidden />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              <div className="mx-3 mt-3 border-t border-line pt-3">
                <ThemeToggle variant="row" />
              </div>

              <div className="mx-5 mt-auto space-y-2 border-t border-line pt-5 text-sm text-muted">
                <OpenStatus />
                <p>
                  {store.address.street} — {store.address.district}
                </p>
                {store.hoursDisplay.map((h) => (
                  <p key={h.days}>
                    <span className="text-text">{h.days}:</span> {h.time}
                  </p>
                ))}
                <a
                  href={whatsappUrl("Olá! Vim pelo site da Sampaio Cell.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  className="pressable mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 font-semibold text-black active:brightness-95"
                >
                  <WhatsAppIcon className="size-5" />
                  Falar no WhatsApp
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
