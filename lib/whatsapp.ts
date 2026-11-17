import { store } from "./store-info";

/** Monta o link do WhatsApp da loja com uma mensagem já preenchida. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${store.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
