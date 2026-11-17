"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { store } from "@/lib/store-info";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";
import { isActive } from "./nav-links";
import { OpenStatus } from "./open-status";

type Item = { href: string; label: string };

export function MobileMenu({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // fecha ao navegar
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // trava a rolagem da página com o menu aberto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex size-10 items-center justify-center rounded-full hover:bg-text/10"
        aria-expanded={open}
        aria-controls="menu-mobile"
        aria-label={open ? "Fechar menu" : "Abrir menu"}
      >
        {open ? <X className="size-6" /> : <Menu className="size-6" />}
      </button>

      {open && (
        <div id="menu-mobile" className="fixed inset-x-0 top-[65px] bottom-0 md:top-[102px] z-50 overflow-y-auto bg-ink">
          <nav aria-label="Menu" className="container-page py-6">
            <ul className="flex flex-col gap-1">
              {items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-xl px-4 py-3 text-lg font-semibold ${
                        active ? "bg-text/10 text-accent" : "text-text hover:bg-text/5"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 space-y-3 border-t border-line pt-6 text-sm text-muted">
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
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-semibold text-black"
              >
                <WhatsAppIcon className="size-5" />
                Falar no WhatsApp
              </a>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
