export const THEME_STORAGE_KEY = "sampaiocell:tema";

/**
 * Script executado no <head> antes da página aparecer: aplica o tema salvo
 * para não "piscar" o tema claro em quem escolheu o escuro.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="dark"||t==="light")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;
