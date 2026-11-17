"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

const deviceTypes = ["Celular", "Tablet"];
const brands = ["Apple (iPhone/iPad)", "Samsung", "Motorola", "Xiaomi / Redmi / Poco", "Realme", "LG", "Outra"];
const problems = [
  "Tela quebrada / sem imagem",
  "Bateria",
  "Não carrega",
  "Câmera",
  "Aparelho molhado",
  "Sem som / microfone",
  "Travando / software",
  "Não liga",
  "Outro",
];

/**
 * Formulário de orçamento.
 * Fase 1: envia a solicitação pelo WhatsApp.
 * Fase 4: passa a ser salvo no sistema e aparece no painel.
 */
export function QuoteForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const message = [
      "Olá! Gostaria de um orçamento de conserto:",
      "",
      `Aparelho: ${get("tipo")} — ${get("marca")} ${get("modelo")}`,
      `Problema: ${get("problema")}`,
      get("detalhes") ? `Detalhes: ${get("detalhes")}` : null,
      "",
      `Nome: ${get("nome")}`,
    ]
      .filter((l) => l !== null)
      .join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    setSent(true);
  }

  const field =
    "mt-2 h-11 w-full rounded-xl border border-line bg-surface px-4 text-text focus:border-brand-orange focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className="text-sm font-semibold">Seu nome</span>
        <input name="nome" required autoComplete="name" className={field} />
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Tipo de aparelho</span>
        <select name="tipo" className={field} defaultValue="Celular">
          {deviceTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Marca</span>
        <select name="marca" required className={field} defaultValue="">
          <option value="" disabled>
            Selecione…
          </option>
          {brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-semibold">Modelo</span>
        <input name="modelo" required placeholder="Ex.: iPhone 11, Galaxy A32…" className={field} />
      </label>
      <label className="block sm:col-span-2">
        <span className="text-sm font-semibold">Qual o problema?</span>
        <select name="problema" required className={field} defaultValue="">
          <option value="" disabled>
            Selecione…
          </option>
          {problems.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </label>
      <label className="block sm:col-span-2">
        <span className="text-sm font-semibold">
          Detalhes <span className="font-normal text-muted">(opcional)</span>
        </span>
        <textarea
          name="detalhes"
          rows={3}
          placeholder="Conte o que aconteceu: caiu, molhou, parou do nada…"
          className="mt-2 w-full rounded-xl border border-line bg-surface px-4 py-3 text-text focus:border-brand-orange focus:outline-none"
        />
      </label>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-8 font-semibold text-black hover:bg-brand-orange-strong sm:w-auto"
        >
          <Send className="size-4" aria-hidden />
          Enviar pedido de orçamento
        </button>
        <p className="mt-3 text-xs text-muted" aria-live="polite">
          {sent
            ? "Abrimos o WhatsApp com seu pedido. É só tocar em enviar!"
            : "Seu pedido será enviado para o WhatsApp da loja."}
        </p>
      </div>
    </form>
  );
}
