import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: {
    default: "Sampaio Cell | Acessórios e Assistência Técnica em Fortaleza",
    template: "%s | Sampaio Cell",
  },
  description:
    "Acessórios para celular, eletrônicos e assistência técnica para celulares e tablets no Passaré, Fortaleza. Garantia de 3 meses nos consertos.",
  keywords: [
    "Sampaio Cell",
    "assistência técnica celular Fortaleza",
    "conserto de celular Passaré",
    "acessórios para celular Fortaleza",
    "troca de tela",
    "capinha",
    "película",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Sampaio Cell",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // ocupa a tela toda no iPhone (notch / barra inferior); as áreas seguras são tratadas no CSS
  viewportFit: "cover",
  // cor da barra do navegador = cor do cabeçalho; o script de tema troca para preto no modo escuro
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${archivo.variable} h-full antialiased`}
    >
      <head>
        {/* Aplica o tema salvo (claro/escuro) antes da primeira pintura */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-brand-orange focus:px-4 focus:py-2 focus:text-black"
        >
          Pular para o conteúdo
        </a>
        <SiteHeader />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
