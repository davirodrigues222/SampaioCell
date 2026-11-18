import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { fullAddress, store } from "@/lib/store-info";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";
import { OpenStatus } from "./open-status";

const action =
  "pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold";

/** Bloco com mapa, endereço, horários e atalhos (ligar, WhatsApp, como chegar). */
export function StoreLocation() {
  return (
    <div className="grid overflow-hidden rounded-3xl border border-line bg-card lg:grid-cols-5">
      <div className="space-y-5 p-5 sm:p-8 md:space-y-6 lg:col-span-2">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-accent">
            <MapPin className="size-4" aria-hidden /> Endereço
          </p>
          <p className="mt-2 text-lg font-semibold">{fullAddress}</p>
          <p className="text-sm text-muted">CEP {store.address.zip}</p>
        </div>
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Clock className="size-4" aria-hidden /> Horário de funcionamento
          </p>
          <dl className="mt-2 space-y-1 text-sm">
            {store.hoursDisplay.map((h) => (
              <div key={h.days} className="flex justify-between gap-4 border-b border-line/60 py-1.5 last:border-0">
                <dt className="text-muted">{h.days}</dt>
                <dd className="text-right font-medium">{h.time}</dd>
              </div>
            ))}
          </dl>
          <OpenStatus className="mt-3" />
        </div>
        {/* celular: botões em largura total, empilhados */}
        <div className="grid gap-2 sm:flex sm:flex-wrap">
          <a
            href={store.google.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`${action} bg-brand-blue text-white hover:bg-brand-blue-strong active:bg-brand-blue-strong`}
          >
            <Navigation className="size-4" aria-hidden />
            Como chegar
          </a>
          <div className="grid grid-cols-2 gap-2 sm:contents">
            <a
              href={whatsappUrl("Olá! Vim pelo site da Sampaio Cell.")}
              target="_blank"
              rel="noopener noreferrer"
              className={`${action} bg-[#25D366] text-black hover:brightness-110 active:brightness-95`}
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </a>
            <a
              href={`tel:+${store.whatsappNumber}`}
              className={`${action} border border-line text-text hover:bg-text/5 active:bg-text/10`}
            >
              <Phone className="size-4" aria-hidden />
              Ligar
            </a>
          </div>
        </div>
      </div>
      <div className="h-64 sm:h-80 lg:col-span-3 lg:h-auto lg:min-h-72">
        <iframe
          title="Mapa da Sampaio Cell"
          src={store.google.embedUrl}
          className="map-frame size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
