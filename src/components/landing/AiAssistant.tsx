'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Bot,
  Sparkles,
  Zap,
  Clock,
  BookOpen,
  Headphones,
  Users,
  Send,
  CheckCheck,
  MessageCircle,
} from 'lucide-react'

/* ── Chat conversation data ── */
const CHAT_MESSAGES: {
  role: 'bot' | 'user'
  text: string
  delay: number
}[] = [
  {
    role: 'bot',
    text: '\u{1F44B} \u{00A1}Hola! Soy el asistente virtual de Ccanto Group. \u{00BF}En qu\u{00E9} puedo ayudarte?',
    delay: 0,
  },
  {
    role: 'user',
    text: '\u{00BF}Qu\u{00E9} certificaciones ofrecen?',
    delay: 1200,
  },
  {
    role: 'bot',
    text: 'Ofrecemos certificaciones en Manejo Defensivo, Brigadista, Rigger, Operador de Gr\u{00FA}a, Supervisor HSE y m\u{00E1}s. \u{00BF}Te interesa alguna?',
    delay: 2800,
  },
  {
    role: 'user',
    text: '\u{00BF}Cu\u{00E1}nto cuesta el curso de Trabajos en Altura?',
    delay: 4800,
  },
  {
    role: 'bot',
    text: 'El curso de Trabajos en Altura tiene un costo de S/50, dura 8 horas y es 100% presencial con certificado incluido. \u{00BF}Deseas inscribirte?',
    delay: 6400,
  },
]

const FEATURES = [
  {
    icon: Zap,
    label: 'Respuestas inmediatas 24/7',
    desc: 'Disponible a cualquier hora del dia',
  },
  {
    icon: BookOpen,
    label: 'Informacion de cursos y precios',
    desc: 'Detalles actualizados al instante',
  },
  {
    icon: Headphones,
    label: 'Asesoria personalizada',
    desc: 'Recomendaciones segun tu perfil',
  },
  {
    icon: Users,
    label: 'Conexion directa con asesores',
    desc: 'Transferencia a un agente humano',
  },
]

/* ── Typing dots animation ── */
function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-3 py-2">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block h-2 w-2 rounded-full bg-neon-cyan/70"
          style={{
            animation: `typing-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* ── Single chat bubble ── */
function ChatBubble({
  role,
  text,
  visible,
}: {
  role: 'bot' | 'user'
  text: string
  visible: boolean
}) {
  if (!visible) return null

  const isBot = role === 'bot'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' as const }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
          isBot
            ? 'rounded-tl-sm border border-white/[0.06] bg-white/[0.04] text-white/90'
            : 'rounded-tr-sm bg-neon-blue/15 text-white/90 border border-neon-blue/20'
        }`}
      >
        {text}
        {!isBot && (
          <CheckCheck className="mt-1 ml-auto h-3 w-3 text-neon-cyan/60" />
        )}
      </div>
    </motion.div>
  )
}

/* ── Main Section ── */
export default function AiAssistant() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [showTyping, setShowTyping] = useState(false)

  /* Animate messages appearing one by one */
  useEffect(() => {
    if (!isInView) return

    const timers: ReturnType<typeof setTimeout>[] = []

    CHAT_MESSAGES.forEach((msg, i) => {
      // Show typing before bot messages (except first)
      if (msg.role === 'bot' && i > 0) {
        timers.push(
          setTimeout(() => setShowTyping(true), msg.delay - 800)
        )
      }
      timers.push(
        setTimeout(() => {
          setShowTyping(false)
          setVisibleMessages(i + 1)
        }, msg.delay)
      )
    })

    // Show typing after last message
    timers.push(
      setTimeout(() => setShowTyping(true), 8000)
    )

    return () => timers.forEach(clearTimeout)
  }, [isInView])

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-24"
    >
      {/* ── Background effects ── */}
      <div className="absolute inset-0 bg-dots opacity-30" />

      {/* Animated gradient orbs */}
      <div
        className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full opacity-[0.07] blur-3xl"
        style={{ background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)' }}
      />
      <div
        className="absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full opacity-[0.05] blur-3xl"
        style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left: copy ── */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neon-cyan">
                <Sparkles className="h-3.5 w-3.5" />
                Inteligencia Artificial
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl"
            >
              <span className="text-white">Consulta con Nuestro</span>
              <br />
              <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-violet bg-clip-text text-transparent">
                Asistente Virtual IA
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary"
            >
              Resuelve tus dudas al instante sobre cursos, certificaciones,
              horarios y servicios disponibles. Nuestro asistente esta
              listo para atenderte.
            </motion.p>

            {/* Feature grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.label}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="group flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5 transition-all hover:border-neon-cyan/20 hover:bg-neon-cyan/[0.03]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-neon-cyan/20 bg-neon-cyan/10">
                    <feat.icon className="h-4 w-4 text-neon-cyan" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {feat.label}
                    </p>
                    <p className="mt-0.5 text-xs text-text-secondary">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="https://wa.me/51988227200?text=Hola%2C%20quiero%20informacion%20sobre%20sus%20cursos"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-neon-cyan to-neon-blue px-7 py-3.5 text-sm font-bold text-[#0a0f1a] transition-all hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100 group-hover:animate-shimmer" />
                <MessageCircle className="relative h-4 w-4" />
                <span className="relative">Iniciar Conversacion</span>
              </a>
              <span className="flex items-center gap-1.5 text-xs text-text-secondary">
                <Clock className="h-3.5 w-3.5 text-neon-lime" />
                Respuesta en menos de 30 seg
              </span>
            </motion.div>
          </div>

          {/* ── Right: Chat mockup ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: -4 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Glow behind card */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-neon-cyan/10 via-transparent to-neon-violet/10 blur-2xl" />

            {/* Chat card */}
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-background-darker/80 shadow-2xl shadow-neon-blue/5 backdrop-blur-xl">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-white/[0.06] bg-white/[0.02] px-5 py-4">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue">
                    <Bot className="h-5 w-5 text-[#0a0f1a]" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background-darker bg-neon-lime" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">
                    Asistente Ccanto Group
                  </p>
                  <p className="flex items-center gap-1 text-[11px] text-neon-lime">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon-lime animate-pulse-glow" />
                    En linea
                  </p>
                </div>
                <div className="ml-auto flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />
                  ))}
                </div>
              </div>

              {/* Messages area */}
              <div className="flex h-[360px] flex-col gap-3 overflow-hidden p-5">
                {CHAT_MESSAGES.map((msg, i) => (
                  <ChatBubble
                    key={i}
                    role={msg.role}
                    text={msg.text}
                    visible={i < visibleMessages}
                  />
                ))}

                {showTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="max-w-[70%] rounded-2xl rounded-tl-sm border border-white/[0.06] bg-white/[0.04]"
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </div>

              {/* Input bar */}
              <div className="border-t border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <input
                    type="text"
                    placeholder="Escribe tu consulta..."
                    disabled
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-text-secondary/40 outline-none"
                  />
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-neon-cyan to-neon-blue text-[#0a0f1a] transition-all hover:shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating badges around the card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' as const }}
              className="absolute -left-6 top-12 hidden rounded-xl border border-white/10 bg-background-darker/90 px-3 py-2 shadow-lg backdrop-blur-sm lg:block"
            >
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-neon-cyan" />
                <span className="text-xs font-semibold text-white">IA Avanzada</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const, delay: 0.5 }}
              className="absolute -right-4 bottom-24 hidden rounded-xl border border-white/10 bg-background-darker/90 px-3 py-2 shadow-lg backdrop-blur-sm lg:block"
            >
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-neon-lime" />
                <span className="text-xs font-semibold text-white">24/7 Activo</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const, delay: 1 }}
              className="absolute -right-2 top-8 hidden rounded-xl border border-neon-violet/20 bg-background-darker/90 px-3 py-2 shadow-lg backdrop-blur-sm lg:block"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-neon-violet" />
                <span className="text-xs font-semibold text-white">+500 consultas/dia</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* CSS for typing animation */}
      <style jsx>{`
        @keyframes typing-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </section>
  )
}
