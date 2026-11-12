import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'

export function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="grid h-16 w-16 place-items-center rounded-full bg-tide/12 text-tide">
        <Compass className="h-7 w-7" />
      </span>
      <p className="eyebrow mt-6">Erro 404</p>
      <h1 className="display mt-2 text-4xl font-bold">Essa maré não existe</h1>
      <p className="mt-3 max-w-md text-sm text-[var(--muted)]">
        A página que você procura pode ter sido movida ou nunca existiu. Volte para a capa e
        continue navegando.
      </p>
      <Link to="/" className="btn btn-primary mt-6">
        Voltar para a capa
      </Link>
    </div>
  )
}
