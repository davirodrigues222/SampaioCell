import { Clock, MapPin, Navigation } from "lucide-react";
import { fullAddress, store } from "@/lib/store-info";
import { OpenStatus } from "./open-status";

/** Bloco com mapa, endereço e horários. */
export function StoreLocation() {
  return (
    <div className="grid overflow-hidden rounded-3xl border border-line bg-card lg:grid-cols-5">
      <div className="space-y-6 p-6 sm:p-8 lg:col-span-2">
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
                <dd className="font-medium">{h.time}</dd>
              </div>
            ))}
          </dl>
          <OpenStatus className="mt-3" />
        </div>
        <a
          href={store.google.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white hover:bg-brand-blue-strong"
        >
          <Navigation className="size-4" aria-hidden />
          Como chegar
        </a>
      </div>
      <div className="min-h-72 lg:col-span-3">
        <iframe
          title="Mapa da Sampaio Cell"
          src={store.google.embedUrl}
          className="size-full min-h-72 map-frame border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
