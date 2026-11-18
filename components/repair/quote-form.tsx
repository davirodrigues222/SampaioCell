"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { FieldError } from "./field-error";
import { useFieldErrors } from "./use-field-errors";

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

const messages = {
  nome: "Informe seu nome.",
  marca: "Escolha a marca do aparelho.",
  modelo: "Informe o modelo do aparelho.",
  problema: "Escolha o problema.",
};

/**
 * Formulário de orçamento.
 * Fase 1: envia a solicitação pelo WhatsApp.
 * Fase 4: passa a ser salvo no sistema e aparece no painel.
 */
export function QuoteForm() {
  const [sent, setSent] = useState(false);
  const { errors, validate, fieldProps } = useFieldErrors(messages);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate(e.currentTarget)) return;
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

  const field = (name: string) =>
    `mt-2 h-12 w-full rounded-xl border bg-surface px-4 text-text focus:border-brand-orange focus:outline-none ${
      errors[name] ? "border-red-500" : "border-line"
    }`;
  const label = "text-sm font-semibold";

  return (
    <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-2">
      <label className="block">
        <span className={label}>Seu nome</span>
        <input
          {...fieldProps("nome")}
          required
          autoComplete="name"
          autoCapitalize="words"
          enterKeyHint="next"
          className={field("nome")}
        />
        <FieldError name="nome" message={errors.nome} />
      </label>
      <label className="block">
        <span className={label}>Tipo de aparelho</span>
        <select name="tipo" className={field("tipo")} defaultValue="Celular">
          {deviceTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block">
        <span className={label}>Marca</span>
        <select {...fieldProps("marca")} required className={field("marca")} defaultValue="">
          <option value="" disabled>
            Selecione…
          </option>
          {brands.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
        <FieldError name="marca" message={errors.marca} />
      </label>
      <label className="block">
        <span className={label}>Modelo</span>
        <input
          {...fieldProps("modelo")}
          required
          placeholder="Ex.: iPhone 11, Galaxy A32…"
          autoComplete="off"
          enterKeyHint="next"
          className={field("modelo")}
        />
        <FieldError name="modelo" message={errors.modelo} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>Qual o problema?</span>
        <select
          {...fieldProps("problema")}
          required
          className={field("problema")}
          defaultValue=""
        >
          <option value="" disabled>
            Selecione…
          </option>
          {problems.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
        <FieldError name="problema" message={errors.problema} />
      </label>
      <label className="block sm:col-span-2">
        <span className={label}>
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
          className="pressable inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-6 py-2 font-semibold text-black hover:bg-brand-orange-strong active:bg-brand-orange-strong sm:w-auto sm:px-8"
        >
          <Send className="size-4 shrink-0" aria-hidden />
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
