'use client'

const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  size: 2 + (i % 3),
  left: (i * 17 + 7) % 100,
  top: (i * 23 + 13) % 100,
  opacity: 0.1 + (i % 4) * 0.1,
  delay: (i * 0.4) % 5,
  duration: 3 + (i % 4),
}))

export default function ParticlesBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {PARTICLES.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-neon-blue animate-float"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}
