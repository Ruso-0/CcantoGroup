'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  ClipboardCheck,
  FileCheck,
  BookOpen,
  Shield,
  RotateCcw,
  Loader2,
  Mic,
  MicOff,
  Volume2,
  Square,
} from 'lucide-react'

const SUGGESTIONS = [
  {
    icon: ClipboardCheck,
    label: 'Generar IPERC',
    prompt: 'Necesito generar un IPERC para trabajos en altura en una planta minera. Incluye los peligros principales, evaluacion de riesgos y medidas de control segun DS 024.',
  },
  {
    icon: FileCheck,
    label: 'Checklist de inspeccion',
    prompt: 'Genera un checklist de inspeccion de seguridad para un area de soldadura en taller industrial, considerando la normativa peruana vigente.',
  },
  {
    icon: BookOpen,
    label: 'Plan de capacitaciones',
    prompt: 'Necesito un plan anual de capacitaciones SST para una empresa constructora con 50 trabajadores en Arequipa. Incluye temas obligatorios segun Ley 29783.',
  },
  {
    icon: Shield,
    label: 'Preparar auditoria',
    prompt: 'Mi empresa tendra una auditoria SUNAFIL el proximo mes. Que documentos debo tener listos y como me preparo?',
  },
]

export default function AsistenteIAPage() {
  const { messages, sendMessage, status, setMessages } = useChat()

  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCacheRef = useRef<Map<string, string>>(new Map())

  const isLoading = status === 'submitted' || status === 'streaming'

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort()
      audioRef.current?.pause()
      audioCacheRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  // Speech-to-Text: toggle microphone
  function toggleListening() {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'es-PE'
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = ''
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript
      }
      setInput(transcript)
      if (inputRef.current) {
        inputRef.current.style.height = 'auto'
        inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 160)}px`
      }
    }

    recognition.onerror = () => {
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  // Text-to-Speech: Gemini neural voice
  async function toggleSpeak(messageId: string, text: string) {
    // If already playing this message, stop it
    if (speakingId === messageId) {
      audioRef.current?.pause()
      audioRef.current = null
      setSpeakingId(null)
      return
    }

    // Stop any current audio
    audioRef.current?.pause()
    audioRef.current = null

    // Check cache first
    const cached = audioCacheRef.current.get(messageId)
    if (cached) {
      const audio = new Audio(cached)
      audioRef.current = audio
      setSpeakingId(messageId)
      audio.onended = () => { audioRef.current = null; setSpeakingId(null) }
      audio.play()
      return
    }

    // Generate audio via Gemini TTS
    setIsLoadingAudio(true)
    setSpeakingId(messageId)

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })

      if (!res.ok) throw new Error('TTS failed')

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      audioCacheRef.current.set(messageId, url)

      const audio = new Audio(url)
      audioRef.current = audio
      audio.onended = () => { audioRef.current = null; setSpeakingId(null) }
      audio.play()
    } catch {
      setSpeakingId(null)
    } finally {
      setIsLoadingAudio(false)
    }
  }

  // Auto-resize textarea
  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`
  }

  function handleSuggestion(prompt: string) {
    sendMessage({ text: prompt })
  }

  function handleSend() {
    if (!input.trim() || isLoading) return
    const text = input.trim()
    setInput('')
    if (inputRef.current) inputRef.current.style.height = 'auto'
    sendMessage({ text })
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleNewChat() {
    setMessages([])
    setInput('')
  }

  const hasMessages = messages.length > 0

  return (
    <div className="flex h-dvh flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[13px] text-text-secondary transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver</span>
            </Link>
            <div className="h-4 w-px bg-white/[0.08]" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-neon-blue/10">
                <Bot className="h-4 w-4 text-neon-blue" />
              </div>
              <div>
                <span className="text-[13px] font-medium text-white">Asistente SST</span>
                <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-neon-lime">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-neon-lime" />
                  En linea
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasMessages && (
              <button
                onClick={handleNewChat}
                className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-[12px] text-text-secondary transition-all hover:bg-white/[0.06] hover:text-white"
              >
                <RotateCcw className="h-3 w-3" />
                Nueva conversacion
              </button>
            )}
            <Link href="/" className="flex items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-neon-blue" />
              <span className="hidden text-[13px] font-bold text-white sm:inline">Ccanto Group</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {!hasMessages ? (
          /* Empty state */
          <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-4 py-12">
            <div className="relative mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-neon-blue/20 bg-neon-blue/[0.06]">
                <Sparkles className="h-8 w-8 text-neon-blue" />
              </div>
            </div>

            <h1 className="text-center text-2xl font-semibold text-white sm:text-3xl">
              Asistente de Seguridad
              <br />
              y Salud en el Trabajo
            </h1>
            <p className="mt-3 max-w-md text-center text-[14px] leading-relaxed text-text-secondary">
              Genera IPERC, ATS, checklists y mas. Entrenado en normativa peruana:
              DS 024, Ley 29783 y normas sectoriales.
            </p>

            {/* Suggestion chips */}
            <div className="mt-8 grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSuggestion(s.prompt)}
                  className="group flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 text-left transition-all hover:border-white/[0.12] hover:bg-white/[0.04]"
                >
                  <s.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-neon-blue/60 transition-colors group-hover:text-neon-blue" />
                  <span className="text-[13px] leading-snug text-text-secondary transition-colors group-hover:text-white">
                    {s.label}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-[11px] text-text-secondary/40">
              Los documentos generados son referenciales y deben ser revisados por personal calificado.
            </p>
          </div>
        ) : (
          /* Messages */
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="mr-3 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-neon-blue/10">
                    <Bot className="h-4 w-4 text-neon-blue" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-neon-blue/15 text-white'
                      : 'text-text-secondary'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <>
                      <div className="prose-sm prose-invert max-w-none text-[13.5px] leading-relaxed [&_code]:rounded [&_code]:bg-white/[0.06] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[12px] [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-white [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-white [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-white [&_li]:text-text-secondary [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:text-text-secondary [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-white/[0.06] [&_pre]:bg-white/[0.02] [&_pre]:p-4 [&_strong]:text-white [&_table]:w-full [&_table]:text-[12px] [&_td]:border [&_td]:border-white/[0.08] [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-white/[0.08] [&_th]:bg-white/[0.04] [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-white [&_ul]:list-disc [&_ul]:pl-4">
                        <MessageContent content={
                          message.parts
                            ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                            .map((p) => p.text)
                            .join('') ?? ''
                        } />
                      </div>
                      <button
                        onClick={() => toggleSpeak(
                          message.id,
                          message.parts
                            ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                            .map((p) => p.text)
                            .join('') ?? ''
                        )}
                        disabled={isLoadingAudio && speakingId !== message.id}
                        className="mt-2 flex items-center gap-1.5 text-[11px] text-text-secondary/40 transition-colors hover:text-neon-blue/70 disabled:opacity-30"
                      >
                        {speakingId === message.id && isLoadingAudio ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" />
                            Generando audio...
                          </>
                        ) : speakingId === message.id ? (
                          <>
                            <Square className="h-3 w-3" />
                            Detener audio
                          </>
                        ) : (
                          <>
                            <Volume2 className="h-3 w-3" />
                            Escuchar
                          </>
                        )}
                      </button>
                    </>
                  ) : (
                    <p className="text-[13.5px] leading-relaxed whitespace-pre-wrap">
                      {message.parts
                        ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                        .map((p) => p.text)
                        .join('') ?? ''}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {status === 'submitted' && (
              <div className="mb-6 flex justify-start">
                <div className="mr-3 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-neon-blue/10">
                  <Bot className="h-4 w-4 text-neon-blue" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-neon-blue/60" />
                  <span className="text-[13px] text-text-secondary/60">Generando respuesta...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input area */}
      <div className="flex-shrink-0 border-t border-white/[0.06] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          <div className="relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="Describe lo que necesitas... (Ej: Genera un IPERC para soldadura)"
              rows={1}
              className={`w-full resize-none rounded-xl border bg-white/[0.03] py-3.5 pl-4 pr-24 text-[13.5px] leading-relaxed text-white placeholder:text-text-secondary/40 outline-none transition-all focus:border-neon-blue/30 focus:shadow-[0_0_15px_rgba(0,212,255,0.06)] ${
                isListening ? 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-white/[0.08]'
              }`}
            />
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
              <button
                type="button"
                onClick={toggleListening}
                disabled={isLoading}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                  isListening
                    ? 'bg-red-500/20 text-red-400 animate-pulse hover:bg-red-500/30'
                    : 'bg-white/[0.06] text-text-secondary/60 hover:bg-white/[0.1] hover:text-white'
                } disabled:opacity-30`}
                title={isListening ? 'Detener microfono' : 'Hablar'}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-neon-blue/20 text-neon-blue transition-all hover:bg-neon-blue/30 disabled:opacity-30 disabled:hover:bg-neon-blue/20"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <p className="mt-2 text-center text-[10px] text-text-secondary/30">
            Asistente IA de Ccanto Group · Los documentos generados son referenciales · Shift+Enter para nueva linea
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Markdown-like content renderer ─── */
function MessageContent({ content }: { content: string }) {
  const html = content
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter(Boolean).map(c => c.trim())
      if (cells.every(c => /^[-:]+$/.test(c))) return ''
      const isHeader = content.indexOf(match) < content.indexOf('|---|')
      const tag = isHeader ? 'th' : 'td'
      return `<tr>${cells.map(c => `<${tag}>${c}</${tag}>`).join('')}</tr>`
    })
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^• (.+)$/gm, '<li>$1</li>')
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```\w*\n?/g, '').replace(/```$/g, '')
      return `<pre><code>${code}</code></pre>`
    })
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')

  const withLists = html.replace(
    /(<li>[\s\S]*?<\/li>)/g,
    (match) => `<ul>${match}</ul>`
  )

  const withTables = withLists.replace(
    /(<tr>[\s\S]*?<\/tr>(?:<br\/>)?)+/g,
    (match) => `<table>${match.replace(/<br\/>/g, '')}</table>`
  )

  return <div dangerouslySetInnerHTML={{ __html: `<p>${withTables}</p>` }} />
}
