/**
 * Dados institucionais da loja.
 * Na Fase 3 isso passa a vir do painel administrativo; por enquanto fica centralizado aqui.
 */
export const store = {
  name: "Sampaio Cell",
  tagline: "Acessórios & Assistência Técnica",
  foundedYearsLabel: "Mais de 6 anos",

  address: {
    street: "Rua Itarema, 604A",
    district: "Passaré",
    city: "Fortaleza",
    state: "CE",
    zip: "60743-690",
  },

  phoneDisplay: "(85) 99665-6442",
  whatsappNumber: "5585996656442", // formato internacional, sem símbolos
  instagramHandle: "sampaio__cell",
  instagramUrl: "https://www.instagram.com/sampaio__cell/",
  linktreeUrl: "https://linktr.ee/Sampaio_cell",
  email: null as string | null, // a definir

  google: {
    rating: 4.3,
    reviewCount: 27,
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sampaio+Cell+Rua+Itarema+604A+Passar%C3%A9+Fortaleza",
    embedUrl:
      "https://www.google.com/maps?q=Sampaio+Cell,+Rua+Itarema,+604A+-+Passar%C3%A9,+Fortaleza+-+CE&output=embed",
  },

  /** Horários: dia da semana (0 = domingo) → intervalos [abre, fecha] em minutos desde 00:00 */
  hours: {
    0: [],
    1: [[8 * 60, 12 * 60], [15 * 60, 19 * 60]],
    2: [[8 * 60, 12 * 60], [15 * 60, 19 * 60]],
    3: [[8 * 60, 12 * 60], [15 * 60, 19 * 60]],
    4: [[8 * 60, 12 * 60], [15 * 60, 19 * 60]],
    5: [[8 * 60, 12 * 60], [15 * 60, 19 * 60]],
    6: [[8 * 60, 12 * 60]],
  } as Record<number, [number, number][]>,

  hoursDisplay: [
    { days: "Segunda a Sexta", time: "08h às 12h · 15h às 19h" },
    { days: "Sábado", time: "08h às 12h" },
    { days: "Domingo", time: "Fechado" },
  ],

  repairWarrantyMonths: 3,
} as const;

export const fullAddress = `${store.address.street} — ${store.address.district}, ${store.address.city}/${store.address.state}`;
