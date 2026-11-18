import type { Metadata } from "next";
import Image from "next/image";
import { Handshake, ShieldCheck, Store, Wrench } from "lucide-react";
import { GoogleRating } from "@/components/google-rating";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { StoreLocation } from "@/components/store-location";
import { store } from "@/lib/store-info";

export const metadata: Metadata = {
  title: "Sobre a loja",
  description: "Conheça a história da Sampaio Cell, loja de acessórios e assistência técnica no Passaré, em Fortaleza.",
};

const values = [
  { icon: Handshake, title: "Confiança", text: "Clientes que voltam e indicam — é isso que nos mantém há tantos anos no bairro." },
  { icon: Wrench, title: "Técnico na loja", text: "O conserto é feito aqui mesmo, por quem você conhece." },
  { icon: ShieldCheck, title: "Garantia", text: `${store.repairWarrantyMonths} meses de garantia em todos os serviços.` },
  { icon: Store, title: "Variedade", text: "Do acessório para o celular ao presente, de controle de TV a videogame retrô." },
];

/** Fotos da galeria — para adicionar uma nova, basta colocar o arquivo em /public/images e incluir aqui. */
const gallery = [
  {
    src: "/images/proprietarios-fachada.webp",
    alt: "Casal em pé na entrada da Sampaio Cell, com as prateleiras de capinhas ao fundo",
    caption: "A família na porta da loja",
  },
  {
    src: "/images/tecnico-reparo-1.webp",
    alt: "Técnico medindo a placa de um celular com multímetro",
    caption: "Diagnóstico na bancada",
  },
  {
    src: "/images/tecnico-reparo-2.webp",
    alt: "Técnico trocando peça de um iPhone",
    caption: "Reparo feito na própria loja",
  },
  {
    src: "/images/entrada-loja.webp",
    alt: "Entrada da Sampaio Cell com o letreiro laranja e azul e o corredor de prateleiras ao fundo",
    caption: "Pode entrar, a loja é sua",
  },
  {
    src: "/images/interior-capinhas.webp",
    alt: "Parede com dezenas de capinhas coloridas para iPhone, Samsung, Motorola e Xiaomi",
    caption: "Capinhas para todos os modelos",
  },
  {
    src: "/images/interior-audio.webp",
    alt: "Estante com fones de ouvido, caixas de som e kits gamer, ao lado da parede de carregadores",
    caption: "Fones, caixas de som e acessórios",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Sobre a Sampaio Cell"
        description="Uma loja de família no Passaré, que cresceu junto com a tecnologia."
        crumbs={[{ href: "/", label: "Início" }, { label: "Sobre" }]}
      />

      <section className="container-page grid gap-12 pt-14 lg:grid-cols-2 lg:items-center">
        <div className="space-y-5 text-lg leading-relaxed text-muted">
          <p className="font-display text-2xl leading-snug font-extrabold text-text italic sm:text-3xl">
            Começamos como um pequeno armarinho. Hoje cuidamos do seu celular, do acessório ao conserto.
          </p>
          <p>
            Com {store.foundedYearsLabel.toLowerCase()} de portas abertas na Rua Itarema, a Sampaio Cell começou como
            um armazém de bairro e, acompanhando o que os clientes mais procuravam, migrou de vez para o mundo da
            tecnologia.
          </p>
          <p>
            Hoje reunimos em um só lugar acessórios para celular, eletrônicos, variedades e uma assistência técnica
            completa para celulares e tablets de todas as marcas — sempre com o atendimento próximo de uma loja de
            família.
          </p>
          <GoogleRating className="pt-2" />
        </div>
        <div className="relative mx-auto aspect-[543/781] w-full max-w-md overflow-hidden rounded-[2rem] border border-line">
          <Image
            src="/images/fachada-loja.webp"
            alt="Fachada da Sampaio Cell na Rua Itarema, com a loja aberta e duas pessoas sentadas na entrada"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="container-page pt-20">
        <SectionHeading
          eyebrow="Por dentro"
          title="Conheça a loja"
          description="Quem faz a Sampaio Cell acontecer todos os dias."
        />
        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {gallery.map((photo) => (
            <li key={photo.src}>
              <figure className="overflow-hidden rounded-3xl border border-line bg-card">
                <div className="relative aspect-[4/5]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="px-4 py-3 text-sm text-muted">{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pt-20">
        <SectionHeading eyebrow="Nosso jeito" title="O que nos diferencia" />
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-line bg-card p-6">
              <Icon className="size-7 text-accent" aria-hidden />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pt-20">
        <SectionHeading eyebrow="Visite" title="Onde estamos" />
        <div className="mt-8">
          <StoreLocation />
        </div>
      </section>
    </>
  );
}
