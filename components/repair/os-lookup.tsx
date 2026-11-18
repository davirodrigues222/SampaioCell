"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { FieldError } from "./field-error";
import { useFieldErrors } from "./use-field-errors";

const messages = {
  os: "Informe o número da OS (só números).",
  telefone: "Digite os 4 últimos dígitos do telefone.",
};

/**
 * Consulta de Ordem de Serviço.
 * Fase 1: apenas a interface — a consulta real chega na Fase 4 (com o banco de dados).
 * Identificação: número da OS + 4 últimos dígitos do telefone (evita pedir CPF).
 */
export function OsLookup() {
  const [submitted, setSubmitted] = useState<{ os: string } | null>(null);
  const { errors, validate, fieldProps } = useFieldErrors(messages);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate(e.currentTarget)) return;
    const data = new FormData(e.currentTarget);
    setSubmitted({ os: String(data.get("os") ?? "").trim() });
  }

  const field = (name: string) =>
    `mt-2 h-12 w-full rounded-xl border bg-surface px-4 text-text tabular-nums focus:border-brand-blue focus:outline-none ${
      errors[name] ? "border-red-500" : "border-line"
    }`;

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-start">
        <label className="block">
          <span className="text-sm font-semibold">Número da OS</span>
          <input
            {...fieldProps("os")}
            type="text"
            required
            inputMode="numeric"
            pattern="[0-9]+"
            autoComplete="off"
            enterKeyHint="next"
            placeholder="Ex.: 1024"
            className={field("os")}
          />
          <FieldError name="os" message={errors.os} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">4 últimos dígitos do telefone</span>
          <input
            {...fieldProps("telefone")}
            type="tel"
            required
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            autoComplete="off"
            enterKeyHint="search"
            placeholder="Ex.: 1234"
            className={field("telefone")}
          />
          <FieldError name="telefone" message={errors.telefone} />
        </label>
        <button
          type="submit"
          className="pressable inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand-blue px-6 font-semibold text-white hover:bg-brand-blue-strong active:bg-brand-blue-strong sm:mt-7"
        >
          <Search className="size-4" aria-hidden />
          Consultar
        </button>
      </form>

      <div aria-live="polite">
        {submitted && (
          <div className="mt-6 rounded-2xl border border-brand-blue/40 bg-brand-blue/10 p-5 text-sm">
            <p className="font-semibold">A consulta online está quase pronta!</p>
            <p className="mt-1 text-muted">
              Enquanto isso, fale com a gente no WhatsApp que informamos o status da sua OS na hora.
            </p>
            <a
              href={whatsappUrl(`Olá! Gostaria de saber o status da minha OS nº ${submitted.os}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex min-h-11 items-center font-semibold text-accent-2 hover:underline active:opacity-70"
            >
              Consultar pelo WhatsApp →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
