'use client'

const CLIENTS = [
  'SPCC',
  'Cerro Verde',
  'Southern Peru',
  'COSAPI',
  'JJC',
  'Mota-Engil Peru',
  'ENGIE',
  'ABB',
  'Abengoa',
  'Confipetrol',
  'Ferreyros',
]

export default function TrustBar() {
  return (
    <section className="bg-background-darker py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-text-secondary/50">
          Empresas que confian en nosotros
        </p>
        <div className="relative overflow-hidden">
          {/* Gradient fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background-darker to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background-darker to-transparent" />

          <div className="flex w-max gap-12 animate-scroll-logos">
            {[...CLIENTS, ...CLIENTS].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex h-10 shrink-0 items-center justify-center px-4"
              >
                <span className="whitespace-nowrap text-sm font-semibold text-[#334155] transition-colors hover:text-text-secondary">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
