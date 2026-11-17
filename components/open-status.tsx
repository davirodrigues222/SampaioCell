"use client";

import { useSyncExternalStore } from "react";
import { store } from "@/lib/store-info";

/** Minutos desde 00:00 e dia da semana no fuso de Fortaleza (UTC-3, sem horário de verão). */
function fortalezaNow() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Fortaleza",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function computeStatus(): "open" | "closed" {
  const { day, minutes } = fortalezaNow();
  return store.hours[day]?.some(([o, c]) => minutes >= o && minutes < c) ? "open" : "closed";
}

function subscribe(cb: () => void) {
  const id = setInterval(cb, 60_000);
  return () => clearInterval(id);
}

/** Selo "Aberto agora / Fechado agora". Só aparece no navegador (o horário depende do momento da visita). */
export function OpenStatus({ className = "" }: { className?: string }) {
  const status = useSyncExternalStore(subscribe, computeStatus, () => null);
  if (!status) return null;
  const open = status === "open";
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${className}`}>
      <span className={`size-2 rounded-full ${open ? "bg-emerald-400" : "bg-red-400"}`} aria-hidden />
      <span className={open ? "text-emerald-700 dark:text-emerald-300" : "text-red-600 dark:text-red-300"}>{open ? "Aberto agora" : "Fechado agora"}</span>
    </span>
  );
}
