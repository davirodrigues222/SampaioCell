"use client";

import { useSyncExternalStore } from "react";

/**
 * Sacola de compras guardada no navegador (localStorage).
 * Guardamos um "retrato" do produto (nome, preço...) para não precisar
 * carregar o catálogo inteiro no cliente.
 */
export type CartItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  maxQuantity: number;
};

const STORAGE_KEY = "sampaiocell:sacola:v1";
const EMPTY: CartItem[] = [];

let items: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartItem[]) : [];
    items = Array.isArray(parsed) ? parsed : [];
  } catch {
    items = [];
  }
}

function commit(next: CartItem[]) {
  items = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // navegação privada / armazenamento bloqueado: a sacola funciona só nesta aba
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  // sincroniza entre abas
  const onStorage = (e: StorageEvent) => {
    if (e.key !== STORAGE_KEY) return;
    loaded = false;
    load();
    listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return items;
}

function getServerSnapshot() {
  return EMPTY;
}

export function useCart() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export const cart = {
  add(item: Omit<CartItem, "quantity">, quantity = 1) {
    load();
    const existing = items.find((i) => i.id === item.id);
    if (existing) {
      commit(
        items.map((i) =>
          i.id === item.id ? { ...i, quantity: Math.min(i.quantity + quantity, i.maxQuantity) } : i,
        ),
      );
    } else {
      commit([...items, { ...item, quantity: Math.min(quantity, item.maxQuantity) }]);
    }
  },
  setQuantity(id: string, quantity: number) {
    load();
    if (quantity <= 0) return cart.remove(id);
    commit(items.map((i) => (i.id === id ? { ...i, quantity: Math.min(quantity, i.maxQuantity) } : i)));
  },
  remove(id: string) {
    load();
    commit(items.filter((i) => i.id !== id));
  },
  clear() {
    commit([]);
  },
};

export function cartCount(list: CartItem[]) {
  return list.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartTotal(list: CartItem[]) {
  return list.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
