import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, ShieldCheck, Store } from "lucide-react";
import { CategoryIconView, ServiceIconView, WhatsAppIcon } from "@/components/icons";
import { GoogleRating } from "@/components/google-rating";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { StoreGallery, storePhotos } from "@/components/store-gallery";
import { StoreLocation } from "@/components/store-location";
import { categories, getFeaturedProducts } from "@/lib/catalog";
import { repairBrands, services } from "@/lib/services";
import { store } from "@/lib/store-info";
import { whatsappUrl } from "@/lib/whatsapp";

const highlights = [
  { icon: Store, title: `${store.foundedYearsLabel}`, text: "de loja no Passaré" },
  { icon: ShieldCheck, title: "3 meses", text: "de garantia nos consertos" },
  { icon: Clock, title: "Reparo rápido", text: "maioria em até 1 dia" },
  { icon: BadgeCheck, title: `${store.google.rating.toLocaleString("pt-BR")} no Google`, text: `${store.google.reviewCount} avaliações` },
];

const interiorPhotos = [storePhotos.entrada, storePhotos.capinhas, storePhotos.audio];

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line bg-ink">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 glow-band"
        />
        <div className="container-page relative grid items-center gap-8 pt-6 pb-12 md:gap-12 md:py-20 lg:grid-cols-2">
          <div>
            <GoogleRating />
            <h1 className="mt-3 font-display text-display font-black tracking-tight italic md:mt-5">
              Tudo para o seu celular, <span className="text-brand-blue">do acessório</span>{" "}
              <span className="text-[#e27600] dark:text-brand-orange">ao conserto.</span>
            </h1>
            <p className="mt-3 max-w-xl text-muted md:mt-5 md:text-lg">
              Capinhas, películas, carregadores, fones e muito mais — e assistência técnica para celulares e
              tablets de todas as marcas, com garantia de 3 meses.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
              <Link
                href="/loja"
                className="pressable inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-brand-orange px-7 font-semibold text-black hover:bg-brand-orange-strong active:bg-brand-orange-strong"
              >
                Ver produtos
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href={whatsappUrl("Olá! Gostaria de um orçamento de conserto.")}
                target="_blank"
                rel="noopener noreferrer"
                className="pressable inline-flex min-h-13 items-center justify-center gap-2 rounded-full border border-brand-blue px-7 font-semibold text-text hover:bg-brand-blue/15 active:bg-brand-blue/20"
              >
                <WhatsAppIcon className="size-5 text-[#1fa855] dark:text-[#25D366]" />
                Orçamento no WhatsApp
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line sm:aspect-[4/3] lg:aspect-[4/5] lg:rounded-[2rem]">
              <Image
                src="/images/tecnico-reparo-1.webp"
                alt="Técnico da Sampaio Cell reparando um celular na bancada"
                fill
                preload
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 576px, 100vw"
                className="object-cover object-[50%_45%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-line bg-ink/95 px-4 py-3 shadow-xl lg:-left-6">
              <span className="flex size-10 items-center justify-center rounded-xl bg-brand-orange/15">
                <ShieldCheck className="size-5 text-accent" aria-hidden />
              </span>
              <div>
                <p className="text-sm font-bold">Garantia de 3 meses</p>
                <p className="text-xs text-muted">em todos os serviços</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTAQUES DE CONFIANÇA */}
      <section aria-label="Por que escolher a Sampaio Cell" className="border-b border-line">
        <ul className="container-page grid grid-cols-2 gap-px py-2 lg:grid-cols-4">
          {highlights.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex items-center gap-3 px-1 py-4 sm:px-4 md:py-5">
              <Icon className="size-6 shrink-0 text-accent" aria-hidden />
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* CATEGORIAS */}
      {/* CATEGORIAS — carrossel no celular, grade a partir do tablet */}
      <section className="container-page pt-12 md:pt-20">
        <SectionHeading
          eyebrow="Navegue pela loja"
          title="Categorias"
          action={{ href: "/loja", label: "Ver todos os produtos" }}
        />
        <ul aria-label="Categorias" className="scroller-mobile mt-5 gap-3 pb-1 md:mt-8 md:grid-cols-5">
          {categories.map((c) => (
            <li key={c.slug} className="w-36 md:w-auto">
              <Link
                href={`/loja/${c.slug}`}
                className="pressable group flex h-full flex-col gap-3 rounded-2xl border border-line bg-card p-4 hover:border-brand-orange/60 active:border-brand-orange/60 md:gap-4 md:p-5 md:hover:-translate-y-0.5"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue/25 to-brand-orange/20 md:size-12">
                  <CategoryIconView icon={c.icon} className="size-6 text-text" />
                </span>
                <span>
                  <span className="block leading-snug font-semibold group-hover:text-accent">{c.name}</span>
                  <span className="mt-1 line-clamp-2 text-xs text-muted md:line-clamp-none">{c.description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* PRODUTOS EM DESTAQUE — carrossel no celular */}
      <section className="container-page pt-12 md:pt-20">
        <SectionHeading
          eyebrow="Mais procurados"
          title="Destaques da loja"
          action={{ href: "/loja", label: "Ver loja completa" }}
        />
        <ul aria-label="Produtos em destaque" className="scroller-mobile mt-5 gap-3 pb-1 md:mt-8 md:grid-cols-4 md:gap-4">
          {featured.map((p) => (
            <li key={p.id} className="flex w-[44%] min-w-40 md:w-auto md:min-w-0">
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </section>

      {/* ASSISTÊNCIA */}
      <section className="container-page pt-14 md:pt-24">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-card lg:rounded-[2rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 glow-corner"
          />
          <div className="relative grid gap-8 p-5 sm:p-10 lg:grid-cols-2 lg:gap-10 lg:p-14">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-accent-2 uppercase">Assistência técnica</p>
              <h2 className="mt-2 font-display text-heading font-extrabold tracking-tight italic">
                Celular quebrado? A gente resolve.
              </h2>
              <p className="mt-4 text-muted">
                Consertamos celulares e tablets de qualquer marca: {repairBrands.slice(0, 5).join(", ")} e outras.
                A maioria dos reparos fica pronta no mesmo dia ou no dia seguinte.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-3.5 md:mt-8">
                {services.slice(0, 6).map((s) => (
                  <li key={s.name} className="flex items-center gap-2.5 text-sm">
                    <ServiceIconView icon={s.icon} className="size-5 shrink-0 text-accent" />
                    {s.name}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-8">
                <Link
                  href="/assistencia#orcamento"
                  className="pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-blue px-6 font-semibold text-white hover:bg-brand-blue-strong active:bg-brand-blue-strong"
                >
                  Solicitar orçamento
                </Link>
                <Link
                  href="/assistencia#consultar-os"
                  className="pressable inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-line px-6 font-semibold hover:bg-text/5 active:bg-text/10"
                >
                  Consultar meu conserto
                </Link>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line sm:rounded-3xl lg:aspect-auto">
              <Image
                src="/images/tecnico-reparo-2.webp"
                alt="Técnico da Sampaio Cell abrindo um iPhone para troca de peça"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LOCALIZAÇÃO */}
      <section className="container-page pt-14 md:pt-24">
        <SectionHeading
          eyebrow="Venha nos visitar"
          title="Loja física no Passaré"
          action={{ href: "/sobre#fotos", label: "Ver mais fotos" }}
          description="Passe na loja para ver de perto os produtos, deixar seu aparelho para conserto ou retirar seu pedido."
        />
        <div className="mt-5 md:mt-8">
          <StoreGallery photos={interiorPhotos} label="Fotos da loja por dentro" />
        </div>
        <div className="mt-4">
          <StoreLocation />
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-page pt-14 md:pt-20">
        <div className="flex flex-col items-stretch justify-between gap-5 rounded-3xl bg-gradient-to-r from-brand-blue to-brand-orange p-6 text-black sm:flex-row sm:items-center sm:p-10">
          <div>
            <h2 className="font-display text-2xl font-black italic sm:text-3xl">Ficou com alguma dúvida?</h2>
            <p className="mt-1 font-medium text-black/75">É só chamar a gente no WhatsApp.</p>
          </div>
          <a
            href={whatsappUrl("Olá! Vim pelo site da Sampaio Cell e tenho uma dúvida.")}
            target="_blank"
            rel="noopener noreferrer"
            className="pressable inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-black px-6 font-semibold text-white hover:bg-black/80 active:bg-black/80"
          >
            <WhatsAppIcon className="size-5 text-[#25D366]" />
            {store.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}
