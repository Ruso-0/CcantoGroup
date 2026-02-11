'use client'

import { motion } from 'framer-motion'
import { GraduationCap, FileCheck, ClipboardCheck } from 'lucide-react'

const SERVICES = [
  {
    icon: GraduationCap,
    title: 'Capacitacion',
    description:
      'Programas de formacion en seguridad con certificacion oficial para todos los sectores productivos.',
    items: [
      'Cursos Ley 29783',
      'Charlas de induccion',
      'Trabajos de alto riesgo',
      'Bioseguridad ocupacional',
      'Trabajos en caliente',
      'Espacios confinados',
    ],
    href: '#cursos',
    accentColor: 'bg-neon-cyan',
    iconGlow: 'text-neon-cyan',
    bulletColor: 'bg-neon-cyan',
  },
  {
    icon: FileCheck,
    title: 'Certificacion',
    description:
      'Certificados digitales verificables por QR con validez para mineria, construccion e industria.',
    items: [
      'Manejo defensivo',
      'Brigadista de emergencia',
      'Rigger / Aparejador',
      'Operador de grua',
      'Operador de montacargas',
      'Supervisor HSE',
    ],
    href: '#certificaciones',
    accentColor: 'bg-neon-orange',
    iconGlow: 'text-neon-orange',
    bulletColor: 'bg-neon-orange',
  },
  {
    icon: ClipboardCheck,
    title: 'Inspeccion',
    description:
      'Evaluacion tecnica de equipos y sistemas de seguridad con informes certificados.',
    items: [
      'Gruas articuladas',
      'Gruas telescopicas',
      'Puentes grua',
      'Elementos de izaje',
      'Equipos de proteccion',
      'Sistemas contra caidas',
    ],
    href: '#contacto',
    accentColor: 'bg-neon-lime',
    iconGlow: 'text-neon-lime',
    bulletColor: 'bg-neon-lime',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: 'easeOut' as const },
  }),
}

export default function Services() {
  return (
    <section id="servicios" className="relative bg-background-darker py-24">
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dots" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">
            Que hacemos
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Nuestros Servicios</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
            Soluciones integrales en seguridad y salud ocupacional para mineria,
            construccion e industria
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <motion.a
              key={service.title}
              href={service.href}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="group glass flex flex-col overflow-hidden transition-all"
            >
              {/* Neon accent bar on top */}
              <div className={`h-1 ${service.accentColor}`} />

              <div className="flex flex-1 flex-col p-8">
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg bg-white/5 ${service.iconGlow} transition-colors group-hover:bg-white/10`}>
                  <service.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>

                {/* Sub-items */}
                <ul className="mt-5 flex-1 space-y-2.5">
                  {service.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-foreground/80"
                    >
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${service.bulletColor}`}
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <span className="mt-6 inline-flex items-center text-sm font-semibold text-neon-blue transition-colors group-hover:text-neon-cyan">
                  Ver detalle &rarr;
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
