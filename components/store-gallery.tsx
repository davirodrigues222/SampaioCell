import Image from "next/image";
import { ChevronsRight } from "lucide-react";

type Photo = { src: string; alt: string; caption: string };

/**
 * Fotos da loja. Para adicionar uma nova: coloque o arquivo (.webp, ~1000px de largura)
 * em /public/images e inclua aqui com uma descrição (alt) do que aparece na foto.
 */
export const storePhotos = {
  proprietarios: {
    src: "/images/proprietarios-fachada.webp",
    alt: "Casal em pé na entrada da Sampaio Cell, com as prateleiras de capinhas ao fundo",
    caption: "A família na porta da loja",
  },
  entrada: {
    src: "/images/entrada-loja.webp",
    alt: "Entrada da Sampaio Cell com o letreiro laranja e azul e o corredor de prateleiras ao fundo",
    caption: "Pode entrar, a loja é sua",
  },
  capinhas: {
    src: "/images/interior-capinhas.webp",
    alt: "Parede com dezenas de capinhas coloridas para iPhone, Samsung, Motorola e Xiaomi",
    caption: "Capinhas para todos os modelos",
  },
  audio: {
    src: "/images/interior-audio.webp",
    alt: "Estante com fones de ouvido, caixas de som e kits gamer, ao lado da parede de carregadores",
    caption: "Fones, caixas de som e acessórios",
  },
  diagnostico: {
    src: "/images/tecnico-reparo-1.webp",
    alt: "Técnico medindo a placa de um celular com multímetro",
    caption: "Diagnóstico na bancada",
  },
  reparo: {
    src: "/images/tecnico-reparo-2.webp",
    alt: "Técnico trocando peça de um iPhone",
    caption: "Reparo feito na própria loja",
  },
} satisfies Record<string, Photo>;

/**
 * Galeria de fotos: carrossel com encaixe no celular (deslizar para o lado) e grade de 3 colunas
 * a partir do tablet. `captions` mostra a legenda embaixo de cada foto.
 */
export function StoreGallery({
  photos,
  label,
  captions = true,
}: {
  photos: Photo[];
  label: string;
  captions?: boolean;
}) {
  return (
    <div>
      <ul
        aria-label={label}
        // rolável pelo teclado (setas) quando estiver em carrossel
        tabIndex={0}
        className="scroller-mobile gap-3 rounded-3xl pb-1 md:grid-cols-3"
      >
        {photos.map((photo) => (
          <li key={photo.src} className="w-[80%] sm:w-[55%] md:w-auto">
            <figure className="h-full overflow-hidden rounded-3xl border border-line bg-card">
              <div className="relative aspect-[4/5]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, (min-width: 640px) 55vw, 80vw"
                  className="object-cover"
                />
              </div>
              {captions && <figcaption className="px-4 py-3 text-sm text-muted">{photo.caption}</figcaption>}
            </figure>
          </li>
        ))}
      </ul>
      {photos.length > 1 && (
        <p className="mt-2 flex items-center gap-1 text-xs text-muted md:hidden" aria-hidden>
          Deslize para ver mais fotos
          <ChevronsRight className="size-4" />
        </p>
      )}
    </div>
  );
}
