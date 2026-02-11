'use client'

import { useCountUp } from '@/hooks/useCountUp'
import { Users, Award, Building2, Calendar } from 'lucide-react'

const STATS = [
  { icon: Users, value: 5000, suffix: '+', label: 'Trabajadores Capacitados' },
  { icon: Award, value: 12000, suffix: '+', label: 'Certificados Emitidos' },
  { icon: Building2, value: 150, suffix: '+', label: 'Empresas Atendidas' },
  { icon: Calendar, value: 8, suffix: '', label: 'Anos de Experiencia' },
]

function StatCard({
  icon: Icon,
  value,
  suffix,
  label,
}: {
  icon: typeof Users
  value: number
  suffix: string
  label: string
}) {
  const { count, ref } = useCountUp(value)

  return (
    <div ref={ref} className="text-center">
      <Icon className="mx-auto h-8 w-8 text-neon-blue/60" />
      <p className="mt-3 font-mono text-5xl font-extrabold text-neon-blue sm:text-6xl">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-2 text-sm text-text-secondary">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="relative bg-background-darker py-20">
      {/* Dot pattern */}
      <div className="absolute inset-0 bg-dots" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  )
}
