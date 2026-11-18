export const THEME_STORAGE_KEY = "sampaiocell:tema";

/** Cor da barra do navegador no celular, igual ao fundo do cabeçalho em cada tema. */
export const THEME_BAR_COLORS = { light: "#ffffff", dark: "#000000" } as const;

/** Atualiza a <meta name="theme-color"> para acompanhar o tema escolhido. */
export function applyThemeBarColor(theme: "light" | "dark") {
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_BAR_COLORS[theme]);
}

/**
 * Script executado no <head> antes da página aparecer: aplica o tema salvo
 * para não "piscar" o tema claro em quem escolheu o escuro.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);if(t==="dark")document.addEventListener("DOMContentLoaded",function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content","${THEME_BAR_COLORS.dark}")})}}catch(e){}})()`;
