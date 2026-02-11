interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glow?: 'cyan' | 'lime' | 'amber' | 'rose' | 'violet' | 'none'
}

const GLOW_COLORS = {
  cyan: 'hover:shadow-ds-cyan/10 hover:border-ds-cyan/30',
  lime: 'hover:shadow-ds-lime/10 hover:border-ds-lime/30',
  amber: 'hover:shadow-ds-amber/10 hover:border-ds-amber/30',
  rose: 'hover:shadow-ds-rose/10 hover:border-ds-rose/30',
  violet: 'hover:shadow-ds-violet/10 hover:border-ds-violet/30',
  none: '',
}

export default function GlassCard({
  children,
  className = '',
  glow = 'cyan',
}: GlassCardProps) {
  return (
    <div
      className={`
        rounded-2xl border border-ds-border/50 bg-ds-surface/60
        backdrop-blur-xl transition-all duration-300
        shadow-lg shadow-black/20
        ${GLOW_COLORS[glow]}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
