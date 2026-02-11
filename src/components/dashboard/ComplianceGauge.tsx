'use client'

import { motion } from 'framer-motion'
import GlassCard from './GlassCard'

interface ComplianceGaugeProps {
  value: number
  label: string
}

export default function ComplianceGauge({ value, label }: ComplianceGaugeProps) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  const color =
    value >= 90
      ? { stroke: '#06b6d4', glow: 'drop-shadow(0 0 8px rgba(6,182,212,0.4))' }
      : value >= 70
        ? { stroke: '#f59e0b', glow: 'drop-shadow(0 0 8px rgba(245,158,11,0.4))' }
        : { stroke: '#f43f5e', glow: 'drop-shadow(0 0 8px rgba(244,63,94,0.4))' }

  return (
    <GlassCard glow="cyan" className="flex flex-col items-center p-6">
      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-ds-text-muted">
        {label}
      </h3>

      <div className="relative">
        <svg width="128" height="128" viewBox="0 0 128 128">
          {/* Track */}
          <circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke="#334155"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Value arc */}
          <motion.circle
            cx="64" cy="64" r={radius}
            fill="none"
            stroke={color.stroke}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            transform="rotate(-90 64 64)"
            style={{ filter: color.glow }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-3xl font-bold text-ds-text">{value}</span>
          <span className="text-xs text-ds-text-muted">%</span>
        </div>
      </div>
    </GlassCard>
  )
}
