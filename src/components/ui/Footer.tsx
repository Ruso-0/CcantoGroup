import Link from 'next/link'
import {
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
} from 'lucide-react'

const SOCIAL_LINKS = [
  { icon: Facebook, label: 'Facebook', href: 'https://facebook.com/ccantogroup' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/ccantogroup' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/company/ccantogroup' },
  { icon: Youtube, label: 'YouTube', href: 'https://youtube.com/@ccantogroup' },
]

const SERVICES = [
  { label: 'Cursos Asincronos', href: '/cursos' },
  { label: 'Implementacion SST', href: '/#como-funciona' },
  { label: 'Certificaciones', href: '/#certificados' },
  { label: 'Asistente IA', href: '/#asistente-ia' },
  { label: 'Capacitacion para empresas', href: '/#contacto' },
]

const LEGAL = [
  { label: 'Politica de Privacidad', href: '/privacidad' },
  { label: 'Terminos y Condiciones', href: '/terminos' },
  { label: 'Libro de Reclamaciones', href: '/reclamaciones' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#04060a] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-7 w-7 text-neon-blue" />
              <div className="flex flex-col">
                <span className="text-lg font-bold">Ccanto Group</span>
                <span className="text-[10px] tracking-widest text-text-secondary/40">
                  Peru · Arequipa
                </span>
              </div>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-text-secondary/70">
              Capacitacion asincrona en seguridad y salud en el trabajo para
              mineria, construccion e industria. Certificados verificables.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-text-secondary transition-all hover:bg-white/10 hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neon-blue">
              Plataforma
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-text-secondary/70 transition-colors hover:text-white"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neon-blue">
              Contacto
            </h4>
            <ul className="space-y-3 text-sm text-text-secondary/70">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-neon-blue/50" />
                <span>Arequipa, Peru</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-neon-blue/50" />
                <a
                  href="tel:+51988227200"
                  className="transition-colors hover:text-white"
                >
                  +51 988 227 200
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-neon-blue/50" />
                <a
                  href="mailto:info@ccantogroup.com"
                  className="transition-colors hover:text-white"
                >
                  info@ccantogroup.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="h-4 w-4 shrink-0 text-neon-blue/50" />
                <span>Lun–Vie: 8:00 – 17:30</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-neon-blue">
              Legal
            </h4>
            <ul className="space-y-2.5 text-sm">
              {LEGAL.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-text-secondary/70 transition-colors hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-6 text-center text-xs text-text-secondary/40">
          &copy; 2009-{new Date().getFullYear()} Ccanto Group. Todos los
          derechos reservados.
        </div>
      </div>
    </footer>
  )
}
