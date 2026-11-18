import type { Metadata } from "next";
import Image from "next/image";
import { ClipboardCheck, ShieldCheck } from "lucide-react";
import { ServiceIconView } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { OsLookup } from "@/components/repair/os-lookup";
import { QuoteForm } from "@/components/repair/quote-form";
import { SectionHeading } from "@/components/section-heading";
import { repairBrands, repairSteps, services } from "@/lib/services";
import { store } from "@/lib/store-info";

export const metadata: Metadata = {
  title: "Assistência Técnica",
  description:
    "Conserto de celulares e tablets de todas as marcas no Passaré, Fortaleza: troca de tela, bateria, conector, reparo em placa e mais. Garantia de 3 meses.",
};

export default function RepairPage() {
  return (
    <>
      <PageHeader
        title="Assistência Técnica"
        description="Consertamos celulares e tablets de todas as marcas, com garantia de 3 meses em todos os serviços."
        crumbs={[{ href: "/", label: "Início" }, { label: "Assistência Técnica" }]}
      >
        <div className="mt-4 flex flex-wrap gap-1.5 md:mt-6 md:gap-2">
          {repairBrands.map((b) => (
            <span key={b} className="rounded-full border border-line bg-card px-3 py-1 text-xs text-muted">
              {b}
            </span>
          ))}
        </div>
      </PageHeader>

      {/* Serviços */}
      <section className="container-page pt-10 md:pt-14">
        <SectionHeading eyebrow="O que fazemos" title="Serviços" description="Não achou o seu problema na lista? Pergunte — fazemos praticamente todos os tipos de reparo." />
        <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 md:mt-8 md:gap-3 lg:grid-cols-4">
          {services.map((s) => (
            <li key={s.name} className="flex gap-4 rounded-2xl border border-line bg-card p-4 md:block md:p-5">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-blue/15">
                <ServiceIconView icon={s.icon} className="size-5 text-accent-2" />
              </span>
              <div>
                <h3 className="font-semibold md:mt-4">{s.name}</h3>
                <p className="mt-0.5 text-sm text-muted md:mt-1">{s.description}</p>
                <p className="mt-2 text-xs font-semibold text-accent md:mt-3">Sob orçamento</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Como funciona */}
      <section className="container-page pt-14 md:pt-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeading eyebrow="Passo a passo" title="Como funciona" />
            <ol className="mt-5 space-y-4 md:mt-8 md:space-y-5">
              {repairSteps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-orange font-display font-black text-black">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-brand-orange/40 bg-brand-orange/10 p-5">
              <ShieldCheck className="size-6 shrink-0 text-accent" aria-hidden />
              <p className="text-sm">
                <strong>Garantia de {store.repairWarrantyMonths} meses</strong> em todos os serviços. Guarde sua
                Ordem de Serviço — ela é o seu comprovante.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-line">
              <Image
                src="/images/tecnico-reparo-1.webp"
                alt="Técnico medindo a placa de um celular com multímetro"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden rounded-3xl border border-line">
              <Image
                src="/images/tecnico-reparo-2.webp"
                alt="Técnico trocando peça de um iPhone na bancada"
                fill
                sizes="(min-width: 1024px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Orçamento */}
      <section id="orcamento" className="container-page scroll-mt-20 pt-14 md:scroll-mt-32 md:pt-20">
        <div className="rounded-3xl border border-line bg-card p-5 sm:p-10 lg:rounded-[2rem]">
          <SectionHeading
            eyebrow="Orçamento"
            title="Peça seu orçamento"
            description="Preencha os dados do aparelho e enviamos o valor pelo WhatsApp. O preço depende do modelo e da peça."
          />
          <div className="mt-6 md:mt-8">
            <QuoteForm />
          </div>
        </div>
      </section>

      {/* Consulta de OS */}
      <section id="consultar-os" className="container-page scroll-mt-20 pt-10 md:scroll-mt-32 md:pt-14">
        <div className="rounded-3xl border border-line bg-card p-5 sm:p-10 lg:rounded-[2rem]">
          <div className="flex items-start gap-4">
            <span className="hidden size-12 shrink-0 items-center justify-center rounded-xl bg-brand-blue/15 sm:flex">
              <ClipboardCheck className="size-6 text-accent-2" aria-hidden />
            </span>
            <div>
              <h2 className="font-display text-heading font-extrabold italic">Consultar meu conserto</h2>
              <p className="mt-2 text-muted">
                Já deixou seu aparelho com a gente? Digite o número da Ordem de Serviço e os 4 últimos dígitos do
                telefone cadastrado para ver o andamento.
              </p>
            </div>
          </div>
          <div className="mt-6 md:mt-8">
            <OsLookup />
          </div>
        </div>
      </section>
    </>
  );
}
