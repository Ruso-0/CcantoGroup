'use client'

import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

const BOT_MESSAGES = [
  'Hola! Soy el asistente de Ccanto Group. Estoy aqui para ayudarte con informacion sobre nuestros servicios de seguridad y salud en el trabajo.',
  'Puedo ayudarte con informacion sobre cursos, certificaciones, inspecciones y cotizaciones. Escribenos o contactanos directamente por WhatsApp al 988 227 200.',
]

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat window */}
      {isOpen && (
        <div className="mb-4 w-80 overflow-hidden rounded-2xl border border-white/10 bg-background shadow-2xl shadow-neon-blue/10">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 bg-background-darker px-4 py-3">
            <div className="flex items-center gap-2">
              <div className="relative">
                <MessageCircle className="h-5 w-5 text-neon-blue" />
                <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-neon-lime" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Asistente Ccanto
                </p>
                <p className="text-[10px] text-neon-lime">En linea</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-lg p-1 text-text-secondary transition-colors hover:bg-white/5 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages body */}
          <div className="flex flex-col gap-3 p-4">
            {BOT_MESSAGES.map((msg, i) => (
              <div
                key={i}
                className="max-w-[90%] rounded-xl rounded-tl-sm border border-white/5 bg-white/[0.03] px-3 py-2.5"
              >
                <p className="text-xs leading-relaxed text-text-secondary">
                  {msg}
                </p>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-white/5 p-3">
            <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-transparent text-xs text-foreground placeholder:text-text-secondary/40 focus:outline-none"
              />
              <button className="shrink-0 rounded-md bg-neon-blue/20 p-1.5 text-neon-blue transition-colors hover:bg-neon-blue/30">
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-neon-blue text-background shadow-lg shadow-neon-blue/30 transition-all hover:shadow-neon-blue/50 hover:brightness-110"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-neon-blue/40 animate-pulse-ring" />
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>
    </div>
  )
}
