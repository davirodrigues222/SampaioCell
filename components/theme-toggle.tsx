"use client";

import { Moon, Sun } from "lucide-react";
import { applyThemeBarColor, THEME_STORAGE_KEY } from "@/lib/theme";

function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  applyThemeBarColor(next);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, next);
  } catch {
    // armazenamento bloqueado: o tema vale só até recarregar
  }
}

/**
 * Alterna entre tema claro (padrão) e escuro. Os ícones trocam via CSS, sem estado no React.
 * `variant="row"`: linha larga com texto, usada dentro do menu do celular.
 */
export function ThemeToggle({ variant = "icon", className = "" }: { variant?: "icon" | "row"; className?: string }) {
  if (variant === "row") {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        className={`pressable flex min-h-12 w-full items-center gap-3 rounded-xl px-4 text-left font-semibold text-text hover:bg-text/5 active:bg-text/10 ${className}`}
      >
        <Moon className="size-5 text-accent-2 dark:hidden" aria-hidden />
        <Sun className="hidden size-5 text-accent dark:block" aria-hidden />
        <span className="dark:hidden">Ativar tema escuro</span>
        <span className="hidden dark:inline">Ativar tema claro</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`pressable inline-flex size-11 items-center justify-center rounded-full text-text hover:bg-text/10 active:bg-text/15 ${className}`}
      aria-label="Alternar entre tema claro e escuro"
      title="Alternar tema claro/escuro"
    >
      <Moon className="size-5 dark:hidden" aria-hidden />
      <Sun className="hidden size-5 dark:block" aria-hidden />
    </button>
  );
}
