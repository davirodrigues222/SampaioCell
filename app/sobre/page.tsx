import type { Metadata } from "next";
import Image from "next/image";
import { Handshake, ShieldCheck, Store, Wrench } from "lucide-react";
import { GoogleRating } from "@/components/google-rating";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { StoreGallery, storePhotos } from "@/components/store-gallery";
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

const p = storePhotos;
const gallery = [p.proprietarios, p.entrada, p.capinhas, p.audio, p.diagnostico, p.reparo];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="Sobre a Sampaio Cell"
        description="Uma loja de família no Passaré, que cresceu junto com a tecnologia."
        crumbs={[{ href: "/", label: "Início" }, { label: "Sobre" }]}
      />

      <section className="container-page grid gap-8 pt-8 md:gap-12 md:pt-14 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4 leading-relaxed text-muted md:space-y-5 md:text-lg">
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
            preload
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="object-cover"
          />
        </div>
      </section>

      <section id="fotos" className="container-page scroll-mt-20 pt-14 md:scroll-mt-32 md:pt-20">
        <SectionHeading
          eyebrow="Por dentro"
          title="Conheça a loja"
          description="A loja por dentro e quem faz a Sampaio Cell acontecer todos os dias."
        />
        <div className="mt-5 md:mt-8">
          <StoreGallery photos={gallery} label="Fotos da Sampaio Cell" />
        </div>
      </section>

      <section className="container-page pt-14 md:pt-20">
        <SectionHeading eyebrow="Nosso jeito" title="O que nos diferencia" />
        <ul className="mt-5 grid grid-cols-2 gap-2.5 md:mt-8 md:gap-3 lg:grid-cols-4">
          {values.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border border-line bg-card p-4 md:p-6">
              <Icon className="size-7 text-accent" aria-hidden />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-page pt-14 md:pt-20">
        <SectionHeading eyebrow="Visite" title="Onde estamos" />
        <div className="mt-8">
          <StoreLocation />
        </div>
      </section>
    </>
  );
}
