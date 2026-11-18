"use client";

import { useState } from "react";

type Messages = Record<string, string>;

/**
 * Validação simples dos formulários: usa as regras nativas do HTML (required, pattern…)
 * e mostra a mensagem em português embaixo de cada campo, em vez do balão do navegador.
 *
 * Uso: <form noValidate onSubmit={...}> e, no envio, `if (!validate(form)) return;`.
 */
export function useFieldErrors(messages: Messages) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement) {
    const next: Record<string, string> = {};
    let first: HTMLElement | null = null;
    for (const el of Array.from(form.elements)) {
      if (!(el instanceof HTMLInputElement || el instanceof HTMLSelectElement || el instanceof HTMLTextAreaElement)) continue;
      if (!el.name || el.validity.valid) continue;
      next[el.name] = messages[el.name] ?? "Confira este campo.";
      first ??= el;
    }
    setErrors(next);
    first?.focus();
    return !first;
  }

  /** Props para o campo: liga a mensagem de erro (acessível) e limpa o erro quando a pessoa corrige. */
  function fieldProps(name: string) {
    const error = errors[name];
    return {
      name,
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${name}-erro` : undefined,
      onInput: () => {
        if (!errors[name]) return;
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      },
    } as const;
  }

  return { errors, validate, fieldProps };
}
