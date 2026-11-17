import {
  BatteryCharging,
  Cable,
  Camera,
  Cpu,
  Droplets,
  Gamepad2,
  Headphones,
  House,
  Mic,
  PlugZap,
  Settings,
  ShieldCheck,
  Smartphone,
  Speaker,
  Watch,
  type LucideProps,
} from "lucide-react";
import type { CategoryIcon } from "@/lib/catalog";
import type { ServiceIcon } from "@/lib/services";

/** Ícone de boné (não existe no lucide). */
function CapIcon(props: LucideProps) {
  const { size = 24, strokeWidth = 2, ...rest } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M3 15a9 9 0 0 1 18 0" />
      <path d="M3 15h11c4 0 7 1 7 2.5S18 19 14 19H5a2 2 0 0 1-2-2z" />
      <path d="M12 6v2" />
    </svg>
  );
}

const categoryIcons: Record<CategoryIcon, React.ComponentType<LucideProps>> = {
  case: Smartphone,
  screen: ShieldCheck,
  charger: Cable,
  headphones: Headphones,
  speaker: Speaker,
  watch: Watch,
  games: Gamepad2,
  home: House,
  cap: CapIcon,
  phone: Smartphone,
};

const serviceIcons: Record<ServiceIcon, React.ComponentType<LucideProps>> = {
  screen: Smartphone,
  battery: BatteryCharging,
  plug: PlugZap,
  board: Cpu,
  camera: Camera,
  water: Droplets,
  software: Settings,
  audio: Mic,
};

export function CategoryIconView({ icon, ...props }: { icon: CategoryIcon } & LucideProps) {
  const Icon = categoryIcons[icon];
  return <Icon aria-hidden {...props} />;
}

export function ServiceIconView({ icon, ...props }: { icon: ServiceIcon } & LucideProps) {
  const Icon = serviceIcons[icon];
  return <Icon aria-hidden {...props} />;
}

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.5h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.22 1.36.19 1.88.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.04 21.8h-.01a9.8 9.8 0 0 1-5-1.37l-.36-.21-3.72.98 1-3.63-.24-.37a9.8 9.8 0 0 1-1.5-5.22c0-5.42 4.42-9.83 9.84-9.83a9.77 9.77 0 0 1 9.83 9.84c0 5.42-4.41 9.83-9.84 9.83zm8.37-18.2A11.75 11.75 0 0 0 12.04.13C5.5.13.2 5.43.2 11.96c0 2.09.55 4.13 1.59 5.93L.1 24l6.26-1.64a11.8 11.8 0 0 0 5.67 1.45h.01c6.53 0 11.84-5.31 11.84-11.84 0-3.16-1.23-6.14-3.47-8.37z" />
    </svg>
  );
}

export function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}
