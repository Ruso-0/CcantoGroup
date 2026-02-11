'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, Award } from 'lucide-react'

const STANDARDS = [
  'ISO 9001:2015',
  'Ley 29783',
  'DS 024-2016-EM',
  'OSHA',
  'NFPA',
]

const ALLIANCES = ['PADI', 'EFR', 'CIP', 'IOGP']

export default function Certifications() {
  return (
    <section className="bg-background-darker py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Standards */}
        <div>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-text-secondary/60">
            Normativas que cumplimos
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {STANDARDS.map((cert, i) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center gap-2 rounded-full border border-neon-blue/20 bg-neon-blue/5 px-5 py-2.5"
              >
                <BadgeCheck className="h-4 w-4 text-neon-blue" />
                <span className="text-sm font-semibold text-foreground">
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/5" />

        {/* Alliances */}
        <div>
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-text-secondary/60">
            Nuestras fortalezas y aliados
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {ALLIANCES.map((ally, i) => (
              <motion.div
                key={ally}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="flex items-center gap-2 rounded-full border border-neon-orange/20 bg-neon-orange/5 px-5 py-2.5"
              >
                <Award className="h-4 w-4 text-neon-orange" />
                <span className="text-sm font-bold text-neon-orange">
                  {ally}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
