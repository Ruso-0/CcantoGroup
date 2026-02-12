'use client'

import { useChat } from '@ai-sdk/react'
import { useRef, useEffect, useState, useCallback } from 'react'
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
  Paperclip,
  X,
  FileText,
  Image as ImageIcon,
  Film,
  MessageSquare,
} from 'lucide-react'

const MAX_FILE_SIZE = 4 * 1024 * 1024
const MAX_FILES = 5
const ACCEPTED_TYPES = 'image/jpeg,image/png,image/webp,image/gif,application/pdf,video/mp4,video/webm,text/plain,text/csv'

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

function createFileList(files: File[]): FileList {
  const dt = new DataTransfer()
  files.forEach(f => dt.items.add(f))
  return dt.files
}

function FilePreviewIcon({ mediaType }: { mediaType: string }) {
  if (mediaType.startsWith('image/')) return <ImageIcon className="h-4 w-4 flex-shrink-0 text-sky-500" />
  if (mediaType.startsWith('video/')) return <Film className="h-4 w-4 flex-shrink-0 text-purple-500" />
  if (mediaType === 'application/pdf') return <FileText className="h-4 w-4 flex-shrink-0 text-red-500" />
  return <FileText className="h-4 w-4 flex-shrink-0 text-gray-500" />
}

/* ─── Voice Orb overlay ─── */
type OrbState = 'idle' | 'listening' | 'processing' | 'speaking'

function VoiceOrb({
  onClose,
  onSend,
  orbState,
  transcript,
  onTapOrb,
  lastResponse,
}: {
  onClose: () => void
  onSend: (text: string) => void
  orbState: OrbState
  transcript: string
  onTapOrb: () => void
  lastResponse: string
}) {
  const stateLabel = {
    idle: 'Toca para hablar',
    listening: 'Escuchando...',
    processing: 'Pensando...',
    speaking: 'Respondiendo...',
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 via-gray-950 to-black">
      {/* Close + switch to text */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-[13px] text-white/70 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
        >
          <MessageSquare className="h-4 w-4" />
          Chat de texto
        </button>
      </div>

      {/* Brand */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-sky-400" />
        <span className="text-[13px] font-bold text-white/60">Ccanto Group</span>
      </div>

      {/* Orb */}
      <div className="relative flex items-center justify-center">
        {/* Outer rings */}
        <div
          className={`absolute h-56 w-56 rounded-full transition-all duration-1000 ${
            orbState === 'listening'
              ? 'animate-ping-slow bg-sky-500/10'
              : orbState === 'speaking'
              ? 'animate-pulse bg-sky-400/10'
              : orbState === 'processing'
              ? 'animate-spin-slow bg-sky-500/5'
              : 'animate-breathe bg-sky-500/5'
          }`}
        />
        <div
          className={`absolute h-44 w-44 rounded-full transition-all duration-700 ${
            orbState === 'listening'
              ? 'animate-ping-slow bg-sky-500/15 animation-delay-200'
              : orbState === 'speaking'
              ? 'animate-pulse bg-sky-400/15'
              : orbState === 'processing'
              ? 'animate-reverse-spin bg-sky-500/10'
              : 'animate-breathe bg-sky-500/8 animation-delay-500'
          }`}
        />

        {/* Main orb button */}
        <button
          onClick={onTapOrb}
          disabled={orbState === 'processing'}
          className={`relative z-10 flex h-32 w-32 items-center justify-center rounded-full transition-all duration-500 ${
            orbState === 'listening'
              ? 'bg-gradient-to-br from-sky-400 to-sky-600 shadow-[0_0_60px_rgba(14,165,233,0.5)] scale-110'
              : orbState === 'speaking'
              ? 'bg-gradient-to-br from-sky-400 to-cyan-500 shadow-[0_0_40px_rgba(14,165,233,0.3)] scale-105'
              : orbState === 'processing'
              ? 'bg-gradient-to-br from-sky-500 to-sky-700 shadow-[0_0_30px_rgba(14,165,233,0.2)] scale-95 cursor-wait'
              : 'bg-gradient-to-br from-sky-400 to-sky-600 shadow-[0_0_20px_rgba(14,165,233,0.15)] hover:shadow-[0_0_40px_rgba(14,165,233,0.3)] hover:scale-105'
          }`}
        >
          {orbState === 'listening' ? (
            <div className="flex flex-col items-center gap-1">
              <Mic className="h-10 w-10 text-white animate-pulse" />
              <div className="flex items-center gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-white" style={{ animationDelay: '0ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white" style={{ animationDelay: '150ms' }} />
                <span className="h-2 w-2 animate-bounce rounded-full bg-white" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          ) : orbState === 'processing' ? (
            <Loader2 className="h-10 w-10 text-white animate-spin" />
          ) : orbState === 'speaking' ? (
            <Volume2 className="h-10 w-10 text-white animate-pulse" />
          ) : (
            <Mic className="h-10 w-10 text-white" />
          )}
        </button>
      </div>

      {/* State label */}
      <p className="mt-8 text-[15px] font-medium text-white/80">
        {stateLabel[orbState]}
      </p>

      {/* Transcript / response */}
      <div className="mt-4 max-w-md px-6 text-center">
        {orbState === 'listening' && transcript && (
          <p className="text-[14px] leading-relaxed text-white/60 animate-in fade-in">
            &ldquo;{transcript}&rdquo;
          </p>
        )}
        {orbState === 'speaking' && lastResponse && (
          <p className="max-h-32 overflow-y-auto text-[13px] leading-relaxed text-white/50">
            {lastResponse.slice(0, 200)}{lastResponse.length > 200 ? '...' : ''}
          </p>
        )}
        {orbState === 'idle' && !transcript && (
          <p className="text-[13px] text-white/40">
            Pregunta sobre seguridad, normativa SST o genera documentos con tu voz
          </p>
        )}
      </div>

      {/* Bottom hint */}
      <p className="absolute bottom-6 text-[11px] text-white/30">
        Asistente de Seguridad · Ccanto Group
      </p>
    </div>
  )
}

export default function AsistenteIAPage() {
  const { messages, sendMessage, status, setMessages } = useChat()

  const [input, setInput] = useState('')
  const [attachedFiles, setAttachedFiles] = useState<File[]>([])
  const [isListening, setIsListening] = useState(false)
  const [speakingId, setSpeakingId] = useState<string | null>(null)
  const [isLoadingAudio, setIsLoadingAudio] = useState(false)
  const [voiceMode, setVoiceMode] = useState(false)
  const [orbState, setOrbState] = useState<OrbState>('idle')
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [lastResponse, setLastResponse] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioCacheRef = useRef<Map<string, string>>(new Map())
  const voiceModeRef = useRef(false)
  const prevMessagesLenRef = useRef(0)

  const isLoading = status === 'submitted' || status === 'streaming'

  // Keep voiceModeRef in sync
  useEffect(() => {
    voiceModeRef.current = voiceMode
  }, [voiceMode])

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  // Voice mode: auto-play TTS when new assistant message arrives
  useEffect(() => {
    if (!voiceModeRef.current) return
    if (status !== 'ready') return

    const assistantMessages = messages.filter(m => m.role === 'assistant')
    if (assistantMessages.length === 0) return
    if (messages.length <= prevMessagesLenRef.current) return

    prevMessagesLenRef.current = messages.length

    const lastMsg = assistantMessages[assistantMessages.length - 1]
    const text = lastMsg.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map(p => p.text)
      .join('') ?? ''

    if (!text) return
    setLastResponse(text)
    setOrbState('speaking')

    // Auto-play TTS using browser speechSynthesis (instant, no API call)
    const synth = window.speechSynthesis
    synth.cancel()

    const cleanText = text
      // Remove code blocks first
      .replace(/```[\s\S]*?```/g, '')
      // Remove all markdown formatting
      .replace(/^#{1,6}\s+/gm, '')
      .replace(/\*\*\*(.+?)\*\*\*/g, '$1')
      .replace(/\*\*(.+?)\*\*/g, '$1')
      .replace(/\*(.+?)\*/g, '$1')
      .replace(/_(.+?)_/g, '$1')
      .replace(/~~(.+?)~~/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      // Remove tables entirely (hard to read aloud)
      .replace(/\|[^\n]*\|/g, '')
      .replace(/^[-|:\s]+$/gm, '')
      // Remove list markers
      .replace(/^[\s]*[-•*+]\s+/gm, '')
      .replace(/^[\s]*\d+\.\s+/gm, '')
      // Remove any remaining asterisks, hashes, pipes
      .replace(/[*#|_~`]/g, '')
      // Clean up whitespace
      .replace(/\n{2,}/g, '. ')
      .replace(/\n/g, '. ')
      .replace(/\.\s*\.\s*/g, '. ')
      .replace(/\s{2,}/g, ' ')
      // Expand abbreviations for natural speech
      .replace(/\bCcanto\s+Group\b/gi, 'Canto Grup')
      .replace(/\bSSOMA\b/g, 'Seguridad, Salud Ocupacional y Medio Ambiente')
      .replace(/\bSST\b/g, 'Seguridad y Salud en el Trabajo')
      .replace(/\bSSO\b/g, 'Seguridad y Salud Ocupacional')
      .replace(/\bIPERC\b/g, 'Aiperk')
      .replace(/\bATS\b/g, 'Análisis de Trabajo Seguro')
      .replace(/\bPETAR\b/g, 'Petar')
      .replace(/\bEPP\b/g, 'Equipo de Protección Personal')
      .replace(/\bSUNAFIL\b/g, 'Sunafil')
      .replace(/\bDS\s+(\d+)/g, 'Decreto Supremo $1')
      .replace(/\bNº\b/g, 'número')
      .replace(/\bArt\.\s*/g, 'Artículo ')
      .replace(/\bRLS\b/g, 'Row Level Security')
      .replace(/\betc\./g, 'etcétera')
      .trim()
      .slice(0, 2000)

    if (!cleanText) {
      setOrbState('idle')
      return
    }

    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.lang = 'es-PE'
    utterance.rate = 1.05
    utterance.pitch = 1.0

    // Try to find a Spanish voice
    const voices = synth.getVoices()
    const esVoice = voices.find(v => v.lang.startsWith('es-PE'))
      || voices.find(v => v.lang.startsWith('es-MX'))
      || voices.find(v => v.lang.startsWith('es'))
    if (esVoice) utterance.voice = esVoice

    utterance.onend = () => {
      if (voiceModeRef.current) setOrbState('idle')
    }
    utterance.onerror = () => {
      if (voiceModeRef.current) setOrbState('idle')
    }

    synth.speak(utterance)
  }, [messages, status])

  // Voice mode: track when AI is processing
  useEffect(() => {
    if (!voiceModeRef.current) return
    if (status === 'submitted' || status === 'streaming') {
      setOrbState('processing')
    }
  }, [status])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.abort()
      audioRef.current?.pause()
      audioCacheRef.current.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [])

  // Voice orb tap handler
  const handleOrbTap = useCallback(() => {
    if (orbState === 'speaking') {
      // Stop current audio
      audioRef.current?.pause()
      audioRef.current = null
      window.speechSynthesis?.cancel()
      setOrbState('idle')
      return
    }

    if (orbState === 'listening') {
      // Stop listening and send
      recognitionRef.current?.stop()
      setOrbState('idle')
      return
    }

    // Start listening
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      alert('Tu navegador no soporta reconocimiento de voz. Usa Chrome o Edge.')
      return
    }

    setVoiceTranscript('')
    setOrbState('listening')

    const recognition = new SpeechRecognition()
    recognition.lang = 'es-PE'
    recognition.continuous = false
    recognition.interimResults = true

    let finalTranscript = ''

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = ''
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript
        } else {
          interim += event.results[i][0].transcript
        }
      }
      setVoiceTranscript(finalTranscript + interim)
    }

    recognition.onend = () => {
      const text = finalTranscript.trim()
      if (text && voiceModeRef.current) {
        prevMessagesLenRef.current = messages.length + 1 // after user+assistant, length will exceed this
        sendMessage({ text })
        setOrbState('processing')
      } else {
        setOrbState('idle')
      }
      setVoiceTranscript('')
    }

    recognition.onerror = () => {
      setOrbState('idle')
      setVoiceTranscript('')
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [orbState, messages.length, sendMessage])

  function handleVoiceSend(text: string) {
    if (!text.trim()) return
    sendMessage({ text })
  }

  function openVoiceMode() {
    prevMessagesLenRef.current = messages.length
    setVoiceMode(true)
    setOrbState('idle')
    setVoiceTranscript('')
    setLastResponse('')
  }

  function closeVoiceMode() {
    recognitionRef.current?.stop()
    audioRef.current?.pause()
    audioRef.current = null
    window.speechSynthesis?.cancel()
    setVoiceMode(false)
    setOrbState('idle')
    setVoiceTranscript('')
  }

  // File handling
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files
    if (!files) return

    const newFiles: File[] = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.size > MAX_FILE_SIZE) {
        alert(`"${file.name}" supera el limite de 4MB. Elige un archivo mas pequeno.`)
        continue
      }
      if (attachedFiles.length + newFiles.length >= MAX_FILES) {
        alert(`Maximo ${MAX_FILES} archivos por mensaje.`)
        break
      }
      newFiles.push(file)
    }

    if (newFiles.length > 0) {
      setAttachedFiles(prev => [...prev, ...newFiles])
    }
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function removeFile(index: number) {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index))
  }

  // Speech-to-Text: toggle microphone (text mode)
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

    recognition.onerror = () => setIsListening(false)
    recognition.onend = () => setIsListening(false)

    recognitionRef.current = recognition
    recognition.start()
    setIsListening(true)
  }

  // Text-to-Speech
  async function toggleSpeak(messageId: string, text: string) {
    if (speakingId === messageId) {
      audioRef.current?.pause()
      audioRef.current = null
      setSpeakingId(null)
      return
    }

    audioRef.current?.pause()
    audioRef.current = null

    const cached = audioCacheRef.current.get(messageId)
    if (cached) {
      const audio = new Audio(cached)
      audioRef.current = audio
      setSpeakingId(messageId)
      audio.onended = () => { audioRef.current = null; setSpeakingId(null) }
      audio.play()
      return
    }

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

  function handleTextareaChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInput(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`
  }

  function handleSuggestion(prompt: string) {
    sendMessage({ text: prompt })
  }

  function handleSend() {
    const hasText = input.trim().length > 0
    const hasFiles = attachedFiles.length > 0
    if ((!hasText && !hasFiles) || isLoading) return

    const text = hasText ? input.trim() : 'Analiza este archivo'
    const files = hasFiles ? createFileList(attachedFiles) : undefined

    setInput('')
    setAttachedFiles([])
    if (inputRef.current) inputRef.current.style.height = 'auto'
    sendMessage({ text, files })
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
    setAttachedFiles([])
  }

  const hasMessages = messages.length > 0

  return (
    <div className="flex h-dvh flex-col bg-white">
      {/* Voice Orb overlay */}
      {voiceMode && (
        <VoiceOrb
          onClose={closeVoiceMode}
          onSend={handleVoiceSend}
          orbState={orbState}
          transcript={voiceTranscript}
          onTapOrb={handleOrbTap}
          lastResponse={lastResponse}
        />
      )}

      {/* Header */}
      <header className="flex-shrink-0 border-b border-gray-200 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[13px] text-gray-500 transition-colors hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver</span>
            </Link>
            <div className="h-4 w-px bg-gray-200" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50">
                <Bot className="h-4 w-4 text-sky-500" />
              </div>
              <div>
                <span className="text-[13px] font-medium text-gray-900">Asistente SST</span>
                <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-green-600">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-500" />
                  En linea
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice mode button */}
            <button
              onClick={openVoiceMode}
              className="flex items-center gap-1.5 rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-[12px] text-sky-600 transition-all hover:bg-sky-100"
              title="Modo voz"
            >
              <Mic className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Modo voz</span>
            </button>
            {hasMessages && (
              <button
                onClick={handleNewChat}
                className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-[12px] text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
              >
                <RotateCcw className="h-3 w-3" />
                Nueva
              </button>
            )}
            <Link href="/" className="flex items-center gap-1.5">
              <ShieldCheck className="h-5 w-5 text-sky-500" />
              <span className="hidden text-[13px] font-bold text-gray-900 sm:inline">Ccanto Group</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-gray-50/50">
        {!hasMessages ? (
          <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center px-4 py-12">
            <div className="relative mb-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50">
                <Sparkles className="h-8 w-8 text-sky-500" />
              </div>
            </div>

            <h1 className="text-center text-2xl font-semibold text-gray-900 sm:text-3xl">
              Asistente de Seguridad
              <br />
              y Salud en el Trabajo
            </h1>
            <p className="mt-3 max-w-md text-center text-[14px] leading-relaxed text-gray-500">
              Genera IPERC, ATS, checklists y mas. Sube fotos, PDFs o videos
              para analisis de seguridad con IA.
            </p>

            {/* Voice CTA */}
            <button
              onClick={openVoiceMode}
              className="mt-6 flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 px-6 py-3 text-[14px] font-medium text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-xl hover:shadow-sky-500/30 hover:scale-105"
            >
              <Mic className="h-5 w-5" />
              Hablar con el asistente
            </button>

            {/* Suggestion chips */}
            <div className="mt-8 grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSuggestion(s.prompt)}
                  className="group flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-sky-200 hover:shadow-sm"
                >
                  <s.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-sky-400 transition-colors group-hover:text-sky-500" />
                  <span className="text-[13px] leading-snug text-gray-600 transition-colors group-hover:text-gray-900">
                    {s.label}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-6 text-center text-[11px] text-gray-400">
              Los documentos generados son referenciales y deben ser revisados por personal calificado.
            </p>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="mr-3 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-sky-50">
                    <Bot className="h-4 w-4 text-sky-500" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-sky-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-700'
                  }`}
                >
                  {message.role === 'assistant' ? (
                    <>
                      <div className="prose-sm max-w-none text-[13.5px] leading-relaxed [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-[12px] [&_h1]:text-lg [&_h1]:font-bold [&_h1]:text-gray-900 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-gray-900 [&_li]:text-gray-600 [&_ol]:list-decimal [&_ol]:pl-4 [&_p]:text-gray-600 [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-gray-200 [&_pre]:bg-gray-50 [&_pre]:p-4 [&_strong]:text-gray-900 [&_table]:w-full [&_table]:text-[12px] [&_td]:border [&_td]:border-gray-200 [&_td]:px-3 [&_td]:py-2 [&_th]:border [&_th]:border-gray-200 [&_th]:bg-gray-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-semibold [&_th]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-4">
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
                        className="mt-2 flex items-center gap-1.5 text-[11px] text-gray-400 transition-colors hover:text-sky-500 disabled:opacity-30"
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
                    <>
                      {message.parts
                        ?.filter((p): p is { type: 'file'; mediaType: string; url: string; filename?: string } => p.type === 'file')
                        .map((p, i) => (
                          <div key={i} className="mb-2">
                            {p.mediaType.startsWith('image/') ? (
                              <img src={p.url} alt={p.filename ?? 'Imagen adjunta'} className="max-h-48 rounded-lg" />
                            ) : (
                              <div className="flex items-center gap-2 rounded-lg bg-white/20 px-3 py-2 text-[12px]">
                                <FilePreviewIcon mediaType={p.mediaType} />
                                <span className="truncate">{p.filename ?? 'Archivo adjunto'}</span>
                              </div>
                            )}
                          </div>
                        ))}
                      <p className="text-[13.5px] leading-relaxed whitespace-pre-wrap">
                        {message.parts
                          ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                          .map((p) => p.text)
                          .join('') ?? ''}
                      </p>
                    </>
                  )}
                </div>
              </div>
            ))}

            {status === 'submitted' && (
              <div className="mb-6 flex justify-start">
                <div className="mr-3 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-sky-50">
                  <Bot className="h-4 w-4 text-sky-500" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-white border border-gray-200 px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-sky-500" />
                  <span className="text-[13px] text-gray-500">Generando respuesta...</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={ACCEPTED_TYPES}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Input area */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6">
          {attachedFiles.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <div
                  key={`${file.name}-${index}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-[12px] text-gray-600 shadow-sm"
                >
                  <FilePreviewIcon mediaType={file.type} />
                  <span className="max-w-[120px] truncate">{file.name}</span>
                  <span className="text-gray-400">{(file.size / 1024 / 1024).toFixed(1)}MB</span>
                  <button
                    onClick={() => removeFile(index)}
                    className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-100 hover:text-red-500"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder={attachedFiles.length > 0 ? 'Agrega un mensaje o envia los archivos...' : 'Describe lo que necesitas... (Ej: Genera un IPERC para soldadura)'}
              rows={1}
              className={`w-full resize-none rounded-xl border bg-gray-50 py-3.5 pl-4 pr-32 text-[13.5px] leading-relaxed text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:shadow-sm ${
                isListening ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-200'
              }`}
            />
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading || attachedFiles.length >= MAX_FILES}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-400 transition-all hover:bg-gray-200 hover:text-gray-600 disabled:opacity-30"
                title="Adjuntar archivo"
              >
                <Paperclip className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={toggleListening}
                disabled={isLoading}
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all ${
                  isListening
                    ? 'bg-red-50 text-red-500 animate-pulse hover:bg-red-100'
                    : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                } disabled:opacity-30`}
                title={isListening ? 'Detener microfono' : 'Hablar'}
              >
                {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              </button>
              <button
                type="button"
                onClick={handleSend}
                disabled={(!input.trim() && attachedFiles.length === 0) || isLoading}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-500 text-white transition-all hover:bg-sky-600 disabled:opacity-30 disabled:hover:bg-sky-500"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <p className="mt-2 text-center text-[10px] text-gray-400">
            Sube imagenes, PDFs o videos (max 4MB) · Shift+Enter para nueva linea
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
