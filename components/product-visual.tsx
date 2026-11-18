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
  className = "",
}: {
  name: string;
  image?: string;
  icon: CategoryIcon;
  size?: "card" | "large";
  /** classes extras do contêiner (ex.: tirar as bordas arredondadas na foto em largura total do celular) */
  className?: string;
}) {
  if (image) {
    return (
      <div className={`relative aspect-square overflow-hidden rounded-2xl bg-card ${className}`}>
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
      className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-line bg-card glow-tile ${className}`}
      role="img"
      aria-label={name}
    >
      <CategoryIconView
        icon={icon}
        strokeWidth={1.25}
        className={size === "large" ? "size-28 text-text/80 md:size-32" : "size-14 text-text/80 sm:size-16"}
      />
      <span className="absolute bottom-2 left-2 rounded-full bg-surface/85 px-2 py-0.5 text-[11px] font-medium text-muted sm:bottom-3 sm:left-3 sm:px-2.5 sm:py-1">
        Foto em breve
      </span>
    </div>
  );
}
