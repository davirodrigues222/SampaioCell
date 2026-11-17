/** Serviços de assistência técnica exibidos no site (Fase 1: estático). */

export type ServiceIcon = "screen" | "battery" | "plug" | "board" | "camera" | "water" | "software" | "audio";

export type Service = {
  name: string;
  description: string;
  icon: ServiceIcon;
};

export const services: Service[] = [
  { name: "Troca de tela", description: "Tela quebrada, manchada ou sem toque.", icon: "screen" },
  { name: "Troca de bateria", description: "Bateria viciada, estufada ou descarregando rápido.", icon: "battery" },
  { name: "Conector de carga", description: "Não carrega, carrega com mau contato ou só em uma posição.", icon: "plug" },
  { name: "Reparo em placa", description: "Diagnóstico e reparo avançado em placa.", icon: "board" },
  { name: "Câmera e vidro traseiro", description: "Câmera embaçada, lente trincada ou tampa quebrada.", icon: "camera" },
  { name: "Aparelho molhado", description: "Limpeza e tratamento após contato com líquidos.", icon: "water" },
  { name: "Software", description: "Travamentos, atualização e configuração.", icon: "software" },
  { name: "Áudio e microfone", description: "Alto-falante, auricular e microfone sem som.", icon: "audio" },
];

export const repairBrands = ["Apple (iPhone e iPad)", "Samsung", "Motorola", "Xiaomi / Redmi", "Realme", "LG", "e outras marcas"];

export const repairSteps = [
  { title: "Peça seu orçamento", text: "Pelo site, WhatsApp, Instagram ou direto na loja." },
  { title: "Aprove o valor", text: "Você recebe o valor antes de qualquer reparo. O preço depende da peça e do modelo." },
  { title: "Reparo rápido", text: "A maioria dos consertos fica pronta no mesmo dia ou no dia seguinte." },
  { title: "Retire com garantia", text: "Todos os serviços têm 3 meses de garantia." },
];
