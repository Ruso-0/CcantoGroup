'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import GlassCard from './GlassCard'

const CERTS = [
  { worker: 'Carlos Mamani', company: 'SPCC', course: 'Trabajos en Altura', status: 'active', date: '08 Feb 2026', hash: 'a3f2..c8d1' },
  { worker: 'Maria Lopez', company: 'Cerro Verde', course: 'Espacios Confinados', status: 'active', date: '07 Feb 2026', hash: 'b7e1..d4a9' },
  { worker: 'Juan Quispe', company: 'COSAPI', course: 'Riesgos Electricos', status: 'active', date: '07 Feb 2026', hash: 'c1d3..e5f2' },
  { worker: 'Pedro Ccama', company: 'JJC', course: 'Bloqueo y Etiquetado', status: 'expiring', date: '06 Feb 2026', hash: 'd4a2..f7b3' },
  { worker: 'Ana Torres', company: 'Mota-Engil', course: 'MATPEL Nivel I', status: 'active', date: '05 Feb 2026', hash: 'e8c4..a1d6' },
  { worker: 'Roberto Huanca', company: 'ENGIE', course: 'Primeros Auxilios', status: 'active', date: '05 Feb 2026', hash: 'f2b7..c3e8' },
]

const STATUS_STYLE = {
  active: 'bg-ds-lime/10 text-ds-lime border-ds-lime/20',
  expiring: 'bg-ds-amber/10 text-ds-amber border-ds-amber/20',
  expired: 'bg-ds-rose/10 text-ds-rose border-ds-rose/20',
}

const STATUS_LABEL = {
  active: 'Activo',
  expiring: 'Por vencer',
  expired: 'Vencido',
}

export default function RecentCerts() {
  return (
    <GlassCard glow="violet" className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-ds-text">
          Certificados Recientes
        </h3>
        <button className="text-xs font-medium text-ds-cyan transition-colors hover:text-ds-cyan-glow">
          Ver todos
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-ds-border/20">
              <th className="pb-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ds-text-muted">Trabajador</th>
              <th className="pb-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ds-text-muted">Empresa</th>
              <th className="pb-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ds-text-muted">Curso</th>
              <th className="pb-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ds-text-muted">Estado</th>
              <th className="pb-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ds-text-muted">Fecha</th>
              <th className="pb-3 text-left text-[10px] font-semibold uppercase tracking-wider text-ds-text-muted">Hash</th>
            </tr>
          </thead>
          <tbody>
            {CERTS.map((cert, i) => (
              <motion.tr
                key={cert.hash}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="border-b border-ds-border/10 transition-colors hover:bg-ds-panel/30"
              >
                <td className="py-3 text-xs font-medium text-ds-text">{cert.worker}</td>
                <td className="py-3 text-xs text-ds-text-muted">{cert.company}</td>
                <td className="py-3 text-xs text-ds-text-muted">{cert.course}</td>
                <td className="py-3">
                  <span className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE[cert.status as keyof typeof STATUS_STYLE]}`}>
                    {STATUS_LABEL[cert.status as keyof typeof STATUS_LABEL]}
                  </span>
                </td>
                <td className="py-3 font-mono text-[11px] text-ds-text-muted">{cert.date}</td>
                <td className="py-3">
                  <button className="inline-flex items-center gap-1 font-mono text-[10px] text-ds-cyan transition-colors hover:text-ds-cyan-glow">
                    {cert.hash}
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  )
}
