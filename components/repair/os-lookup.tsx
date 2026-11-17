"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Consulta de Ordem de Serviço.
 * Fase 1: apenas a interface — a consulta real chega na Fase 4 (com o banco de dados).
 * Identificação: número da OS + 4 últimos dígitos do telefone (evita pedir CPF).
 */
export function OsLookup() {
  const [submitted, setSubmitted] = useState<{ os: string } | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setSubmitted({ os: String(data.get("os") ?? "").trim() });
  }

  const field =
    "mt-2 h-11 w-full rounded-xl border border-line bg-surface px-4 text-text focus:border-brand-blue focus:outline-none";

  return (
    <div>
      <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="block">
          <span className="text-sm font-semibold">Número da OS</span>
          <input name="os" required inputMode="numeric" placeholder="Ex.: 1024" className={field} />
        </label>
        <label className="block">
          <span className="text-sm font-semibold">4 últimos dígitos do telefone</span>
          <input
            name="telefone"
            required
            inputMode="numeric"
            pattern="[0-9]{4}"
            maxLength={4}
            placeholder="Ex.: 1234"
            className={field}
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-brand-blue px-6 font-semibold text-white hover:bg-brand-blue-strong"
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
              className="mt-3 inline-block font-semibold text-accent-2 hover:underline"
            >
              Consultar pelo WhatsApp →
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
