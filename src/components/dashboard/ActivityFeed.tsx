'use client'

import { motion } from 'framer-motion'
import { FileCheck, UserPlus, AlertTriangle, GraduationCap, ShieldAlert } from 'lucide-react'
import GlassCard from './GlassCard'

const ACTIVITIES = [
  {
    icon: FileCheck,
    color: 'text-ds-cyan',
    bg: 'bg-ds-cyan/10',
    title: 'Certificado emitido',
    detail: 'Trabajos en Altura — Carlos Mamani',
    time: 'Hace 12 min',
  },
  {
    icon: UserPlus,
    color: 'text-ds-lime',
    bg: 'bg-ds-lime/10',
    title: 'Nuevo trabajador registrado',
    detail: 'Juan Quispe — SPCC',
    time: 'Hace 28 min',
  },
  {
    icon: GraduationCap,
    color: 'text-ds-violet',
    bg: 'bg-ds-violet/10',
    title: 'Curso completado',
    detail: 'Espacios Confinados — 24 participantes',
    time: 'Hace 1h',
  },
  {
    icon: AlertTriangle,
    color: 'text-ds-amber',
    bg: 'bg-ds-amber/10',
    title: 'Certificado por vencer',
    detail: 'Bloqueo y Etiquetado — Maria Lopez (5 dias)',
    time: 'Hace 2h',
  },
  {
    icon: FileCheck,
    color: 'text-ds-cyan',
    bg: 'bg-ds-cyan/10',
    title: 'Certificado emitido',
    detail: 'Riesgos Electricos — Pedro Ccama',
    time: 'Hace 3h',
  },
  {
    icon: ShieldAlert,
    color: 'text-ds-rose',
    bg: 'bg-ds-rose/10',
    title: 'Incidente reportado',
    detail: 'Casi-accidente en Planta 3 — Cerro Verde',
    time: 'Hace 4h',
  },
  {
    icon: GraduationCap,
    color: 'text-ds-violet',
    bg: 'bg-ds-violet/10',
    title: 'Curso programado',
    detail: 'IPERC / ATS / PETAR — 15 Feb',
    time: 'Hace 5h',
  },
]

export default function ActivityFeed() {
  return (
    <GlassCard glow="cyan" className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-ds-text">
          Actividad Reciente
        </h3>
        <span className="animate-pulse-glow h-2 w-2 rounded-full bg-ds-cyan" />
      </div>

      <div className="space-y-4">
        {ACTIVITIES.map((activity, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="group flex items-start gap-3"
          >
            <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activity.bg}`}>
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-ds-text">{activity.title}</p>
              <p className="truncate text-xs text-ds-text-muted">{activity.detail}</p>
            </div>
            <span className="shrink-0 text-[10px] text-ds-text-muted">{activity.time}</span>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}
