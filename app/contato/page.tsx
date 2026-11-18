import type { Metadata } from "next";
import { ChevronRight, ExternalLink, Phone } from "lucide-react";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { StoreLocation } from "@/components/store-location";
import { store } from "@/lib/store-info";
import { whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "WhatsApp, Instagram, endereço e horário de funcionamento da Sampaio Cell no Passaré, Fortaleza.",
};

const channels = [
  {
    href: whatsappUrl("Olá! Vim pelo site da Sampaio Cell."),
    icon: <WhatsAppIcon className="size-6" />,
    color: "text-[#25D366] bg-[#25D366]/10",
    title: "WhatsApp",
    text: store.phoneDisplay,
    hint: "Pedidos, orçamentos e dúvidas",
  },
  {
    href: store.instagramUrl,
    icon: <InstagramIcon className="size-6" />,
    color: "text-pink-600 bg-pink-500/10 dark:text-pink-400",
    title: "Instagram",
    text: `@${store.instagramHandle}`,
    hint: "Novidades e lançamentos",
  },
  {
    href: `tel:+${store.whatsappNumber}`,
    icon: <Phone className="size-6" />,
    color: "text-accent-2 bg-brand-blue/10",
    title: "Telefone",
    text: store.phoneDisplay,
    hint: "Ligue no horário de funcionamento",
  },
  {
    href: store.linktreeUrl,
    icon: <ExternalLink className="size-6" />,
    color: "text-accent bg-brand-orange/10",
    title: "Todos os links",
    text: "linktr.ee/Sampaio_cell",
    hint: "Nossos canais em um só lugar",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contato"
        description="Fale com a gente pelo canal que preferir ou venha até a loja."
        crumbs={[{ href: "/", label: "Início" }, { label: "Contato" }]}
      />
      <section className="container-page pt-6 md:pt-14">
        <ul className="grid gap-2.5 sm:grid-cols-2 md:gap-3 lg:grid-cols-4">
          {channels.map((c) => (
            <li key={c.title}>
              <a
                href={c.href}
                target={c.href.startsWith("tel:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="pressable flex h-full items-center gap-4 rounded-2xl border border-line bg-card p-4 hover:border-text/25 active:border-text/25 md:flex-col md:items-start md:p-6 md:hover:-translate-y-0.5"
              >
                <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${c.color}`}>{c.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-muted">{c.title}</span>
                  <span className="block text-lg font-semibold">{c.text}</span>
                  <span className="mt-0.5 block text-xs text-muted md:mt-1">{c.hint}</span>
                </span>
                <ChevronRight className="size-5 shrink-0 text-muted md:hidden" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </section>
      <section className="container-page pt-8 md:pt-10">
        <StoreLocation />
      </section>
    </>
  );
}
