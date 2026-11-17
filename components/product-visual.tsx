import Image from "next/image";
import type { CategoryIcon } from "@/lib/catalog";
import { CategoryIconView } from "./icons";

/**
 * Foto do produto. Enquanto não houver foto real, mostra uma arte
 * com o ícone da categoria nas cores da marca.
 */
export function ProductVisual({
  name,
  image,
  icon,
  size = "card",
}: {
  name: string;
  image?: string;
  icon: CategoryIcon;
  size?: "card" | "large";
}) {
  if (image) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-card">
        <Image
          src={image}
          alt={name}
          fill
          sizes={size === "large" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-line bg-card glow-tile"
      role="img"
      aria-label={name}
    >
      <CategoryIconView
        icon={icon}
        strokeWidth={1.25}
        className={size === "large" ? "size-32 text-text/80" : "size-16 text-text/80"}
      />
      <span className="absolute bottom-3 left-3 rounded-full bg-surface/85 px-2.5 py-1 text-[10px] font-medium tracking-wide text-muted uppercase">
        Foto em breve
      </span>
    </div>
  );
}
