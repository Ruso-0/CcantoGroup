'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ShieldCheck, ChevronDown, Sparkles } from 'lucide-react'

interface DropdownItem {
  label: string
  href: string
  desc?: string
}

interface NavLink {
  label: string
  href?: string
  items?: DropdownItem[]
}

const NAV_LINKS: NavLink[] = [
  {
    label: 'Soluciones',
    items: [
      { label: 'Implementacion SST', href: '#como-funciona', desc: 'Sistema de gestion de seguridad integral' },
      { label: 'Auditorias y cumplimiento', href: '#diferenciadores', desc: 'Evaluacion normativa DS 024 / Ley 29783' },
      { label: 'Capacitacion y cultura', href: '#rutas', desc: 'Programas presenciales y virtuales' },
      { label: 'Inspecciones y evidencias', href: '#certificados', desc: 'Registro digital y trazabilidad' },
    ],
  },
  { label: 'Cursos Asincronos', href: '/cursos' },
  { label: 'Empresas', href: '#contacto' },
  {
    label: 'Asistente IA',
    items: [
      { label: 'Generar IPERC / ATS', href: '#asistente-ia', desc: 'Documentos normativos en minutos' },
      { label: 'Checklist de inspeccion', href: '#asistente-ia', desc: 'Listas personalizadas por actividad' },
      { label: 'Plan anual de capacitaciones', href: '#asistente-ia', desc: 'Cronograma optimizado con IA' },
      { label: 'Preparacion para auditoria', href: '#asistente-ia', desc: 'Diagnostico previo automatizado' },
    ],
  },
  { label: 'Recursos', href: '#faq' },
]

function Dropdown({ items, open }: { items: DropdownItem[]; open: boolean }) {
  return (
    <div
      className={`absolute left-1/2 top-full z-50 -translate-x-1/2 pt-2 transition-all duration-200 ${
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
      }`}
    >
      <div className="min-w-[280px] rounded-xl border border-white/[0.06] bg-[#0c1120]/95 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-white/[0.05]"
          >
            <span className="text-[13px] font-medium text-white/90">{item.label}</span>
            {item.desc && (
              <span className="mt-0.5 block text-[11px] text-text-secondary/50">{item.desc}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleEnter(label: string) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(label)
  }

  function handleLeave() {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/[0.06] bg-[#0a0f1a]/90 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo + location */}
        <Link href="/" className="flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-neon-blue" />
          <div className="flex flex-col">
            <span className="text-[15px] font-extrabold leading-tight tracking-wide text-white">
              Ccanto Group
            </span>
            <span className="text-[10px] leading-tight tracking-widest text-text-secondary/40">
              Peru · Arequipa
            </span>
          </div>
        </Link>

        {/* Desktop nav — center */}
        <div className="hidden items-center lg:flex">
          {NAV_LINKS.map((link) =>
            link.items ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => handleEnter(link.label)}
                onMouseLeave={handleLeave}
              >
                <button className="flex items-center gap-1 px-3.5 py-2 text-[13.5px] text-text-secondary transition-colors hover:text-white">
                  {link.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
                <Dropdown items={link.items} open={activeDropdown === link.label} />
              </div>
            ) : (
              <Link
                key={link.label}
                href={link.href!}
                className="px-3.5 py-2 text-[13.5px] text-text-secondary transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* Desktop CTAs — right */}
        <div className="hidden items-center gap-2.5 lg:flex">
          <Link
            href="/asistente-ia"
            className="flex items-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.03] px-4 py-[7px] text-[13px] font-medium text-white transition-all hover:bg-white/[0.06]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Probar IA
          </Link>
          <a
            href="#contacto"
            className="rounded-lg border border-neon-blue/30 bg-neon-blue/[0.08] px-4 py-[7px] text-[13px] font-medium text-white transition-all hover:bg-neon-blue/[0.15]"
          >
            Cotizar en 15 min
          </a>
          <Link
            href="/login"
            className="px-3 py-[7px] text-[13px] text-text-secondary transition-colors hover:text-white"
          >
            Portal
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-white/[0.06] bg-[#0a0f1a]/98 backdrop-blur-xl lg:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) =>
              link.items ? (
                <div key={link.label} className="py-1">
                  <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary/40">
                    {link.label}
                  </p>
                  {link.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href!}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              )
            )}
            <div className="mt-3 flex flex-col gap-2.5 border-t border-white/[0.06] pt-4">
              <div className="flex gap-2.5">
                <Link
                  href="/asistente-ia"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/[0.12] bg-white/[0.03] py-2.5 text-sm font-medium text-white"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Probar IA
                </Link>
                <a
                  href="#contacto"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 rounded-lg border border-neon-blue/30 bg-neon-blue/[0.08] py-2.5 text-center text-sm font-medium text-white"
                >
                  Cotizar en 15 min
                </a>
              </div>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg py-2 text-center text-sm text-text-secondary transition-colors hover:text-white"
              >
                Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
