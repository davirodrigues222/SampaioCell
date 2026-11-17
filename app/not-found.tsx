import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex flex-col items-center py-28 text-center">
      <p className="font-display text-7xl font-black italic text-gradient-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
      <p className="mt-2 text-muted">O link pode estar errado ou o produto não está mais disponível.</p>
      <div className="mt-8 flex gap-3">
        <Link href="/" className="rounded-full bg-brand-orange px-6 py-3 font-semibold text-black hover:bg-brand-orange-strong">
          Página inicial
        </Link>
        <Link href="/loja" className="rounded-full border border-line px-6 py-3 font-semibold hover:bg-text/5">
          Ver a loja
        </Link>
      </div>
    </div>
  );
}
