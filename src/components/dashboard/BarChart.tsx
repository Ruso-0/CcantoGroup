'use client'

import { motion } from 'framer-motion'
import GlassCard from './GlassCard'

interface BarData {
  label: string
  value: number
}

interface BarChartProps {
  title: string
  data: BarData[]
  color?: 'cyan' | 'lime' | 'violet'
}

const COLOR_MAP = {
  cyan: 'bg-ds-cyan',
  lime: 'bg-ds-lime',
  violet: 'bg-ds-violet',
}

const GLOW_MAP = {
  cyan: 'shadow-ds-cyan/30',
  lime: 'shadow-ds-lime/30',
  violet: 'shadow-ds-violet/30',
}

export default function BarChart({ title, data, color = 'cyan' }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value))

  return (
    <GlassCard glow={color} className="p-6">
      <h3 className="mb-5 text-xs font-bold uppercase tracking-wider text-ds-text">
        {title}
      </h3>

      <div className="flex items-end gap-2" style={{ height: '140px' }}>
        {data.map((d, i) => {
          const pct = (d.value / max) * 100
          return (
            <div key={d.label} className="flex flex-1 flex-col items-center gap-2">
              <span className="font-mono text-[10px] text-ds-text-muted">{d.value}</span>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${pct}%` }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: 'easeOut' }}
                className={`w-full max-w-[32px] rounded-t-md ${COLOR_MAP[color]} shadow-md ${GLOW_MAP[color]}`}
              />
              <span className="text-[9px] font-medium text-ds-text-muted">{d.label}</span>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
