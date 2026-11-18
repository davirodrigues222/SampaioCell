import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-16 text-center md:py-28">
      <p className="font-display text-7xl font-black italic text-gradient-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-muted">O link pode estar errado ou o produto não está mais disponível.</p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link href="/" className="pressable inline-flex min-h-12 items-center justify-center rounded-full bg-brand-orange px-6 font-semibold text-black hover:bg-brand-orange-strong active:bg-brand-orange-strong">
          Página inicial
        </Link>
        <Link href="/loja" className="pressable inline-flex min-h-12 items-center justify-center rounded-full border border-line px-6 font-semibold hover:bg-text/5 active:bg-text/10">
          Ver a loja
        </Link>
      </div>
    </div>
  );
}
