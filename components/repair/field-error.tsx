import { CircleAlert } from "lucide-react";

/** Mensagem de erro exibida logo abaixo do campo. O id é ligado ao campo via aria-describedby. */
export function FieldError({ name, message }: { name: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={`${name}-erro`} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-300">
      <CircleAlert className="size-4 shrink-0" aria-hidden />
      {message}
    </span>
  );
}
