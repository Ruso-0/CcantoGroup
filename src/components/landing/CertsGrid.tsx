'use client'

import { motion } from 'framer-motion'
import {
  Car,
  Siren,
  CableCar,
  HardHat,
  Container,
  ShieldCheck,
  CarFront,
  Anchor,
  UserCheck,
  LifeBuoy,
  Forklift,
} from 'lucide-react'

const CERTIFICATIONS = [
  { icon: HardHat, title: 'Oficial / Operario Andamiero' },
  { icon: Siren, title: 'Brigadista de Emergencia' },
  { icon: CableCar, title: 'Operador de Manlift' },
  { icon: ShieldCheck, title: 'Supervisor Andamiero' },
  { icon: Car, title: 'Manejo Defensivo' },
  { icon: Container, title: 'Operador de Grua' },
  { icon: UserCheck, title: 'Supervisor de Izaje' },
  { icon: CarFront, title: 'Manejo Defensivo 4x4' },
  { icon: Anchor, title: 'Rigger / Aparejador' },
  { icon: ShieldCheck, title: 'Supervisor HSE' },
  { icon: LifeBuoy, title: 'Hombre al Agua' },
  { icon: Forklift, title: 'Operador de Montacargas' },
]

export default function CertsGrid() {
  return (
    <section id="certificaciones" className="bg-background-darker py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">
            Acreditaciones oficiales
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Programas de Certificacion</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
            Certificaciones con validez nacional para mineria, construccion e
            industria
          </p>
        </div>

        {/* Scrollable on mobile, 4-col grid on desktop */}
        <div className="mt-14 flex gap-4 overflow-x-auto pb-4 sm:grid sm:grid-cols-3 sm:overflow-visible sm:pb-0 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group glass flex min-w-[180px] shrink-0 cursor-pointer items-start gap-3 p-5 transition-all hover:border-neon-cyan/30 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] sm:min-w-0"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/5 text-neon-blue transition-colors group-hover:bg-neon-cyan/10 group-hover:text-neon-cyan">
                <cert.icon className="h-5 w-5" />
              </div>
              <h3 className="pt-1.5 text-sm font-bold leading-snug text-foreground">
                {cert.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
