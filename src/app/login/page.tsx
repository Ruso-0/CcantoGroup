'use client'

import { useState, useEffect, Suspense, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ShieldCheck, Volume2, VolumeX, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

/* ─── Google logo SVG ─── */
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

const CHIPS = [
  'Trabajos en altura',
  'IPERC basico',
  'Primeros auxilios',
  'Espacios confinados',
  'Materiales peligrosos',
  'Gestion SSOMA',
]

/* ─── Main form ─── */
function LoginForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [step, setStep] = useState<'email' | 'password'>('email')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const prefill = searchParams.get('email')
    if (prefill) {
      setEmail(prefill)
      setStep('password')
    }
  }, [searchParams])

  async function handleGoogle() {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }

  async function handleEmailContinue(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setError(null)
    setStep('password')
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    window.location.href = '/dashboard'
  }

  return (
    <div className="relative min-h-screen bg-background">
      {/* ── Mini navbar ── */}
      <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-neon-blue" />
            <div className="flex flex-col">
              <span className="text-[15px] font-extrabold leading-tight tracking-wide text-white">
                Ccanto Group
              </span>
              <span className="text-[10px] leading-tight tracking-widest text-text-secondary/40">
                Peru · Arequipa
              </span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/cursos"
              className="rounded-lg border border-white/[0.12] bg-white/[0.03] px-4 py-[7px] text-[13px] font-medium text-white transition-all hover:bg-white/[0.06]"
            >
              Ver catalogo
            </Link>
            <a
              href="/#contacto"
              className="hidden text-[13px] text-text-secondary transition-colors hover:text-white sm:block"
            >
              Contactar
            </a>
          </div>
        </div>
      </nav>

      {/* ── Split layout ── */}
      <div className="mx-auto grid min-h-screen max-w-[1400px] px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        {/* LEFT: headline + login card */}
        <div className="flex flex-col items-center justify-center pb-12 pt-24 text-center lg:items-start lg:text-left">
          <div className="w-full max-w-md">
            {/* Headline */}
            <h1 className="text-[2.5rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.2rem]">
              Seguridad laboral
              <br />
              para quienes
              <br />
              protegen vidas
            </h1>
            <p className="mt-4 text-[15px] leading-relaxed text-text-secondary">
              Accede a cursos asincronos de SST con evaluacion real y certificados
              verificables. Desde Arequipa, para la industria del Peru.
            </p>

            {/* ── Login card ── */}
            <div className="mt-10 w-full rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6">
              {step === 'email' ? (
                <>
                  {/* Google */}
                  <button
                    onClick={handleGoogle}
                    className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 text-[13.5px] font-medium text-white transition-all hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-white/20"
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
                  <form onSubmit={handleEmailContinue} className="space-y-3">
                    <label htmlFor="login-email" className="sr-only">
                      Correo electronico
                    </label>
                    <input
                      id="login-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Ingresa tu correo electronico"
                      required
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[13.5px] text-white placeholder:text-text-secondary/35 outline-none transition-all focus:border-white/[0.15] focus:ring-2 focus:ring-white/10"
                    />
                    <button
                      type="submit"
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 text-[13.5px] font-medium text-white transition-all hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-white/20"
                    >
                      Continuar con correo electronico
                    </button>
                  </form>

                  {/* Terms */}
                  <p className="mt-5 text-[11px] leading-relaxed text-text-secondary/40">
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
                </>
              ) : (
                <>
                  <h2 className="text-[18px] font-semibold text-white">
                    Ingresa tu contrasena
                  </h2>
                  <p className="mt-1 text-[13px] text-text-secondary/60">{email}</p>

                  <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-3">
                    <label htmlFor="login-password" className="sr-only">
                      Contrasena
                    </label>
                    <input
                      id="login-password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contrasena"
                      required
                      autoFocus
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-[13.5px] text-white placeholder:text-text-secondary/35 outline-none transition-all focus:border-white/[0.15] focus:ring-2 focus:ring-white/10"
                    />

                    {error && (
                      <div role="alert" className="flex items-start gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-[13px] text-red-400">
                        <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
                        <p>{error}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-xl border border-white/[0.08] bg-white/[0.04] py-3 text-[13.5px] font-medium text-white transition-all hover:bg-white/[0.07] focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50"
                    >
                      {loading ? (
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                      ) : (
                        'Iniciar sesion'
                      )}
                    </button>
                  </form>

                  <button
                    onClick={() => { setStep('email'); setPassword(''); setError(null) }}
                    className="mt-4 w-full text-center text-[13px] text-text-secondary/50 transition-colors hover:text-white"
                  >
                    Usar otra cuenta
                  </button>
                </>
              )}
            </div>

            {/* Microcopy */}
            <p className="mt-5 text-center text-[12px] text-text-secondary/40 lg:text-left">
              A tu ritmo · Evaluacion incluida · Certificado verificable
            </p>

            {/* Chips */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start">
              {CHIPS.map((chip) => (
                <Link
                  key={chip}
                  href={`/cursos?q=${encodeURIComponent(chip)}`}
                  className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-[12px] text-text-secondary/60 transition-all hover:border-white/[0.12] hover:text-white"
                >
                  {chip}
                </Link>
              ))}
            </div>

            {/* Sign up + back */}
            <div className="mt-8 space-y-2 text-center lg:text-left">
              <p className="text-[13px] text-text-secondary/50">
                No tienes cuenta?{' '}
                <Link
                  href="/registro"
                  className="text-white underline underline-offset-2 hover:text-white/80"
                >
                  Registrate
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: video panel */}
        <div className="relative hidden items-start pt-16 lg:flex">
          <div className="relative h-[calc(100vh-6rem)] w-full overflow-hidden rounded-2xl shadow-2xl shadow-black/30">
            {/* Video */}
            <video
              ref={videoRef}
              src="/video/ccanto-loop.mp4"
              autoPlay
              loop
              muted={muted}
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
              className={`h-full w-full object-cover transition-opacity duration-700 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />

            {/* Fallback when video hasn't loaded */}
            {!videoLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-[#0d1117] to-[#0a1628]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.06)_0%,_transparent_70%)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <ShieldCheck className="h-20 w-20 text-white/[0.04]" />
                </div>
              </div>
            )}

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-background/20" />

            {/* Mute toggle */}
            {videoLoaded && (
              <button
                onClick={() => {
                  setMuted(!muted)
                  if (videoRef.current) videoRef.current.muted = !muted
                }}
                aria-label={muted ? 'Activar sonido' : 'Silenciar'}
                className="absolute bottom-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/60 backdrop-blur-sm transition-all hover:text-white focus:outline-none focus:ring-2 focus:ring-white/20"
              >
                {muted ? (
                  <VolumeX className="h-3.5 w-3.5" />
                ) : (
                  <Volume2 className="h-3.5 w-3.5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Page wrapper with Suspense ─── */
export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
