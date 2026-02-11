'use client'

import { motion } from 'framer-motion'
import { Mountain, HardHat, ShieldCheck, MapPin } from 'lucide-react'

const REASONS = [
  {
    icon: Mountain,
    title: 'Hub Minero del Sur',
    description:
      'Arequipa concentra operaciones mineras de clase mundial como Cerro Verde, Southern Peru y mas proyectos estrategicos.',
    accent: 'text-neon-cyan',
  },
  {
    icon: HardHat,
    title: 'Crecimiento en Construccion',
    description:
      'Proyectos de infraestructura, energia y vivienda demandan personal certificado en SST de forma permanente.',
    accent: 'text-neon-orange',
  },
  {
    icon: ShieldCheck,
    title: 'Regulacion Exigente',
    description:
      'Ley 29783, DS 024-2016-EM y normas sectoriales exigen capacitaciones especificas. Nuestros programas cumplen al 100%.',
    accent: 'text-neon-blue',
  },
  {
    icon: MapPin,
    title: 'Presencia Local',
    description:
      'Equipo basado en Arequipa con cobertura en toda la region sur. Respuesta inmediata para tus operaciones.',
    accent: 'text-neon-lime',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' as const },
  }),
}

export default function WhyArequipa() {
  return (
    <section id="nosotros" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">
              Por que elegirnos
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              <span className="gradient-text">Por que Arequipa?</span>
            </h2>
            <p className="mt-4 leading-relaxed text-text-secondary">
              Mas cerca de tus operaciones mineras, proyectos de construccion y
              plantas industriales en el sur del Peru. Somos el aliado
              estrategico que conoce la industria, la regulacion y las
              necesidades reales de cada sector.
            </p>
          </div>

          {/* Right -- feature grid */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-0">
            {REASONS.map((reason, i) => (
              <motion.div
                key={reason.title}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="glass p-6 transition-all"
              >
                <reason.icon className={`h-8 w-8 ${reason.accent}`} />
                <h3 className="mt-3 text-sm font-bold text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
