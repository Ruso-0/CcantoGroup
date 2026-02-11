'use client'

import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function CtaBanner() {
  return (
    <section id="contacto" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden glass px-6 py-16 text-center sm:px-12"
        >
          {/* Dot overlay */}
          <div className="absolute inset-0 bg-dots" />

          {/* Radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.06)_0%,transparent_60%)]" />

          <div className="relative">
            <h2 className="text-3xl font-extrabold sm:text-4xl">
              <span className="gradient-text">
                Listo para elevar la seguridad?
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-text-secondary">
              Contactanos hoy y recibe una cotizacion personalizada para tus
              necesidades de capacitacion, certificacion e inspeccion SST en
              mineria, construccion o industria.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://wa.me/51988227200?text=Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20certificaciones%20SST"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-neon-orange px-7 py-4 text-sm font-bold text-white shadow-lg shadow-neon-orange/25 transition-all hover:shadow-neon-orange/40 hover:brightness-110 sm:w-auto"
              >
                <MessageCircle className="h-5 w-5" />
                Escribenos por WhatsApp
              </a>
              <Link
                href="/registro"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-neon-blue/30 px-7 py-4 text-sm font-semibold text-neon-blue transition-all hover:border-neon-blue/60 hover:bg-neon-blue/5 animate-glow-pulse sm:w-auto"
              >
                Crear Cuenta
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
