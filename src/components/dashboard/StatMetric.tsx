'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from 'lucide-react'
import GlassCard from './GlassCard'

interface StatMetricProps {
  label: string
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
  trend?: number
  trendLabel?: string
  icon: LucideIcon
  color: 'cyan' | 'lime' | 'amber' | 'rose' | 'violet'
  sparkData?: number[]
}

const COLOR_MAP = {
  cyan: { text: 'text-ds-cyan', bg: 'bg-ds-cyan/10', border: 'border-ds-cyan/20', glow: 'shadow-ds-cyan/20' },
  lime: { text: 'text-ds-lime', bg: 'bg-ds-lime/10', border: 'border-ds-lime/20', glow: 'shadow-ds-lime/20' },
  amber: { text: 'text-ds-amber', bg: 'bg-ds-amber/10', border: 'border-ds-amber/20', glow: 'shadow-ds-amber/20' },
  rose: { text: 'text-ds-rose', bg: 'bg-ds-rose/10', border: 'border-ds-rose/20', glow: 'shadow-ds-rose/20' },
  violet: { text: 'text-ds-violet', bg: 'bg-ds-violet/10', border: 'border-ds-violet/20', glow: 'shadow-ds-violet/20' },
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 80
  const h = 28
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((v - min) / range) * h
    return `${x},${y}`
  })

  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={color}
      />
    </svg>
  )
}

function useCountUp(target: number, decimals: number, duration = 1500) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLParagraphElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const step = (now: number) => {
            const elapsed = now - startTime
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(eased * target)
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, duration])

  const display = decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString()
  return { ref, display }
}

export default function StatMetric({
  label,
  value,
  suffix = '',
  prefix = '',
  decimals = 0,
  trend,
  trendLabel,
  icon: Icon,
  color,
  sparkData,
}: StatMetricProps) {
  const colors = COLOR_MAP[color]
  const { ref, display } = useCountUp(value, decimals)

  const TrendIcon = trend === undefined || trend === 0 ? Minus : trend > 0 ? TrendingUp : TrendingDown
  const trendColor = trend === undefined ? 'text-ds-text-muted' : trend > 0 ? 'text-ds-lime' : trend < 0 ? 'text-ds-rose' : 'text-ds-text-muted'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <GlassCard glow={color} className="p-5">
        <div className="flex items-start justify-between">
          <div className={`flex h-10 w-10 items-center justify-center rounded-xl border ${colors.bg} ${colors.border} shadow-inner ${colors.glow}`}>
            <Icon className={`h-5 w-5 ${colors.text}`} />
          </div>
          {sparkData && <MiniSparkline data={sparkData} color={colors.text} />}
        </div>

        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wider text-ds-text-muted">
            {label}
          </p>
          <p className="mt-1 font-mono text-2xl font-bold text-ds-text" ref={ref}>
            {prefix}{display}{suffix}
          </p>
        </div>

        {trend !== undefined && (
          <div className="mt-3 flex items-center gap-1.5">
            <TrendIcon className={`h-3.5 w-3.5 ${trendColor}`} />
            <span className={`text-xs font-semibold ${trendColor}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
            {trendLabel && (
              <span className="text-xs text-ds-text-muted">{trendLabel}</span>
            )}
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}
