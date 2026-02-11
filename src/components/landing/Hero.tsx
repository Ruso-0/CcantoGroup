'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShieldCheck, Volume2, VolumeX } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

/* ── Google logo SVG ── */
function GoogleLogo() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

/* ── Animated video fallback ── */
function VideoFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d1117]">
      <div className="absolute inset-0 bg-dots opacity-30" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[380px] w-[380px] rounded-full border border-white/[0.04]" style={{ animation: 'hero-spin 25s linear infinite' }} />
        <div className="absolute inset-8 rounded-full border border-white/[0.03]" style={{ animation: 'hero-spin 18s linear infinite reverse' }} />
        <div className="absolute inset-16 rounded-full border border-white/[0.02]" style={{ animation: 'hero-spin 30s linear infinite' }} />
      </div>
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)' }} />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}>
          <ShieldCheck className="h-16 w-16 text-white/[0.08]" />
        </motion.div>
      </div>
      {[
        { label: '12,453', sub: 'Certificados', x: '15%', y: '22%', delay: 0 },
        { label: '98.7%', sub: 'Cumplimiento', x: '72%', y: '25%', delay: 1.5 },
        { label: '847', sub: 'Capacitados', x: '18%', y: '72%', delay: 3 },
        { label: '156', sub: 'Empresas', x: '68%', y: '70%', delay: 2 },
      ].map((p) => (
        <motion.div key={p.label} animate={{ y: [0, -5, 0], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: p.delay, ease: 'easeInOut' as const }} className="absolute rounded-md border border-white/[0.04] bg-white/[0.02] px-2.5 py-1.5 backdrop-blur-sm" style={{ left: p.x, top: p.y }}>
          <p className="text-xs font-semibold text-white/60">{p.label}</p>
          <p className="text-[9px] text-white/30">{p.sub}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default function Hero() {
  const [email, setEmail] = useState('')
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  async function handleGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    window.location.href = `/login?email=${encodeURIComponent(email)}`
  }

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div className="relative mx-auto grid min-h-screen max-w-[1400px] px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* ── LEFT: Title + Auth card ── */}
        <div className="flex flex-col items-center justify-center pb-12 pt-24 text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' as const }}
            className="w-full max-w-md"
          >
            {/* Title */}
            <h1 className="text-[2.5rem] font-semibold leading-[1.15] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]">
              Seguridad laboral
              <br />
              para quienes
              <br />
              protegen vidas
            </h1>

            {/* Auth card */}
            <div className="mt-10 w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              {/* Google button */}
              <button
                onClick={handleGoogle}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 text-[13.5px] font-medium text-white transition-all hover:bg-white/[0.07]"
              >
                <GoogleLogo />
                Continuar con Google
              </button>

              {/* Divider */}
              <div className="my-5 flex items-center gap-3">
                <span className="flex-1 border-t border-white/[0.06]" />
                <span className="text-[12px] text-text-secondary/40">o</span>
                <span className="flex-1 border-t border-white/[0.06]" />
              </div>

              {/* Email */}
              <form onSubmit={handleEmail} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingresa tu correo electronico"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[13.5px] text-white placeholder:text-text-secondary/35 outline-none transition-all focus:border-white/[0.15]"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 text-[13.5px] font-medium text-white transition-all hover:bg-white/[0.07]"
                >
                  Continuar con correo electronico
                </button>
              </form>

              {/* Privacy */}
              <p className="mt-4 text-[11px] leading-relaxed text-text-secondary/40">
                Al continuar, aceptas los{' '}
                <Link href="#" className="underline underline-offset-2 hover:text-text-secondary/60">
                  Terminos de Servicio
                </Link>{' '}
                y la{' '}
                <Link href="#" className="underline underline-offset-2 hover:text-text-secondary/60">
                  Politica de Privacidad
                </Link>{' '}
                de Ccanto Group.
              </p>
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT: Video/Image ── */}
        <div className="relative hidden items-start pt-16 lg:flex">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' as const }}
            className="relative h-[calc(100vh-6rem)] w-full overflow-hidden rounded-2xl"
          >
            {/* Fallback */}
            {!videoLoaded && <VideoFallback />}

            {/* Video */}
            <video
              ref={videoRef}
              src="/videos/hero.mp4"
              autoPlay
              loop
              muted={muted}
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              className={`h-full w-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />

            {/* Mute toggle */}
            {videoLoaded && (
              <button
                onClick={() => {
                  setMuted(!muted)
                  if (videoRef.current) videoRef.current.muted = !muted
                }}
                className="absolute bottom-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/60 backdrop-blur-sm transition-all hover:text-white"
              >
                {muted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
              </button>
            )}
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes hero-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}
