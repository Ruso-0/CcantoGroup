export default function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-shimmer rounded-2xl border border-ds-border/20 bg-ds-surface/40 ${className}`}
    />
  )
}
