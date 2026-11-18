import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone } from "lucide-react";
import { categories } from "@/lib/catalog";
import { fullAddress, store } from "@/lib/store-info";
import { whatsappUrl } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const footerLink = "flex min-h-11 items-center hover:text-accent active:text-accent md:min-h-9";

export function SiteFooter() {
  return (
    <footer data-theme="dark" className="mt-16 border-t border-line bg-ink text-text md:mt-24">
      <div className="container-page grid grid-cols-2 gap-x-4 gap-y-8 py-10 md:gap-10 md:py-14 lg:grid-cols-4">
        <div className="col-span-2 space-y-4 lg:col-span-1">
          <Image src="/images/sc-logo.png" alt="Sampaio Cell" width={1038} height={659} className="h-auto w-32 md:w-40" />
          <p className="text-sm text-muted">
            Acessórios para celular, eletrônicos e assistência técnica no Passaré, em Fortaleza.
          </p>
          <div className="flex gap-2">
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="pressable inline-flex size-11 items-center justify-center rounded-full border border-line hover:border-[#25D366] hover:text-[#25D366] active:text-[#25D366]"
            >
              <WhatsAppIcon className="size-5" />
            </a>
            <a
              href={store.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="pressable inline-flex size-11 items-center justify-center rounded-full border border-line hover:border-brand-orange hover:text-accent active:text-accent"
            >
              <InstagramIcon className="size-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold tracking-wide text-text uppercase">Loja</h2>
          <ul className="mt-2 text-sm text-muted md:mt-3">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/loja/${c.slug}`} className={footerLink}>
                  {c.name}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/loja" className={`${footerLink} font-medium text-accent`}>
                Ver tudo
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-bold tracking-wide text-text uppercase">Institucional</h2>
          <ul className="mt-2 text-sm text-muted md:mt-3">
            <li><Link href="/assistencia" className={footerLink}>Assistência Técnica</Link></li>
            <li><Link href="/assistencia#consultar-os" className={footerLink}>Consultar conserto</Link></li>
            <li><Link href="/sobre" className={footerLink}>Sobre a loja</Link></li>
            <li><Link href="/contato" className={footerLink}>Contato e localização</Link></li>
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1 lg:col-span-1">
          <h2 className="font-display text-sm font-bold tracking-wide text-text uppercase">Visite a loja</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <a href={store.google.mapsUrl} target="_blank" rel="noopener noreferrer" className="-my-1 inline-block py-1 hover:text-text active:text-text">
                {fullAddress}
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="-my-3 inline-flex min-h-11 items-center hover:text-text active:text-text">
                {store.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
              <span>
                {store.hoursDisplay.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-1 py-5 text-xs text-muted sm:flex-row sm:justify-between md:py-6">
          <p>© {store.name}. Todos os direitos reservados.</p>
          <p>Fortaleza — Ceará</p>
        </div>
      </div>
    </footer>
  );
}
