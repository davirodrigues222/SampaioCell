import { Star } from "lucide-react";
import { store } from "@/lib/store-info";

export function GoogleRating({ className = "" }: { className?: string }) {
  const { rating, reviewCount, mapsUrl } = store.google;
  return (
    <a
      href={mapsUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-sm hover:underline ${className}`}
    >
      <span className="flex" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star
            key={i}
            className={`size-4 ${i < Math.round(rating) ? "fill-brand-orange text-accent" : "text-line"}`}
          />
        ))}
      </span>
      <span>
        <strong>{rating.toLocaleString("pt-BR")}</strong>
        <span className="text-muted"> · {reviewCount} avaliações no Google</span>
      </span>
    </a>
  );
}
