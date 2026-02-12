'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Search,
  Play,
  Award,
  QrCode,
  BarChart3,
  BookOpen,
  Clock,
  Headphones,
  ClipboardCheck,
  HardHat,
  Eye,
  Shield,
  FileCheck,
  Plus,
  Minus,
  Sparkles,
  MapPin,
  Users,
  Building2,
  CheckCircle2,
  ChevronRight,
  Zap,
  Bot,
  Send,
} from 'lucide-react'
import Navbar from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'

/* ─── Animation ─── */
const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const fadeChild = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

/* ─── Data ─── */

const CHIPS = [
  'Trabajos en altura',
  'IPERC basico',
  'Primeros auxilios',
  'Espacios confinados',
  'Materiales peligrosos',
  'Gestion SSOMA',
]

const STATS = [
  { value: '2,500+', label: 'Certificados emitidos', icon: Award },
  { value: '150+', label: 'Empresas capacitadas', icon: Building2 },
  { value: '98%', label: 'Tasa de aprobacion', icon: CheckCircle2 },
  { value: '24/7', label: 'Acceso a plataforma', icon: Clock },
]

const STEPS = [
  {
    num: '01',
    icon: Search,
    title: 'Elige tu curso',
    desc: 'Explora el catalogo por categoria, nivel de riesgo o rol. Encuentra exactamente lo que necesitas.',
    color: 'var(--neon-blue)',
  },
  {
    num: '02',
    icon: Play,
    title: 'Aprende a tu ritmo',
    desc: 'Accede al contenido 24/7 desde cualquier dispositivo. Sin horarios, sin esperas, sin aulas.',
    color: 'var(--neon-lime)',
  },
  {
    num: '03',
    icon: Award,
    title: 'Evalua y certifica',
    desc: 'Completa la evaluacion, obtiene tu nota y descarga un certificado verificable con codigo QR unico.',
    color: 'var(--neon-orange)',
  },
]

const DIFFS = [
  {
    icon: ClipboardCheck,
    title: 'Evaluacion real, no decorativa',
    desc: 'Cada curso termina con una evaluacion que mide comprension, no asistencia. Tu certificado tiene respaldo.',
    color: 'var(--neon-blue)',
  },
  {
    icon: QrCode,
    title: 'Certificados con verificacion digital',
    desc: 'Codigo QR unico por certificado. Cualquier fiscalizador o cliente puede validarlo en segundos.',
    color: 'var(--neon-cyan)',
  },
  {
    icon: BarChart3,
    title: 'Reportes para la empresa',
    desc: 'Panel con avance, notas y evidencia por equipo. Lo que SSOMA necesita para auditorias.',
    color: 'var(--neon-lime)',
  },
  {
    icon: BookOpen,
    title: 'Contenido alineado a normativa',
    desc: 'DS 024, Ley 29783, normativa sectorial. Actualizado, no reciclado.',
    color: 'var(--neon-orange)',
  },
  {
    icon: Clock,
    title: 'Hecho para turnos rotativos',
    desc: 'Asincrono de verdad: sin horarios fijos, sin clases en vivo obligatorias.',
    color: 'var(--neon-violet)',
  },
  {
    icon: Headphones,
    title: 'Soporte tecnico humano',
    desc: 'Respuestas reales de un equipo que entiende SST y conoce la operacion.',
    color: 'var(--neon-rose)',
  },
]

const PATHS: {
  icon: typeof HardHat
  title: string
  desc: string
  courses: string
  color: string
}[] = [
  {
    icon: HardHat,
    title: 'Operarios',
    desc: 'Fundamentos de SST, trabajos de alto riesgo y protocolos de emergencia para quienes estan en campo.',
    courses: '4 cursos',
    color: 'var(--neon-orange)',
  },
  {
    icon: Eye,
    title: 'Supervisores',
    desc: 'Liderazgo en seguridad, gestion de permisos de trabajo y supervision de actividades criticas.',
    courses: '5 cursos',
    color: 'var(--neon-blue)',
  },
  {
    icon: Shield,
    title: 'SSOMA',
    desc: 'Gestion del sistema SST, IPERC, investigacion de incidentes y preparacion para auditorias.',
    courses: '5 cursos',
    color: 'var(--neon-lime)',
  },
  {
    icon: FileCheck,
    title: 'Contratistas',
    desc: 'Induccion general, requisitos normativos y cumplimiento minimo para ingreso a operaciones.',
    courses: '3 cursos',
    color: 'var(--neon-cyan)',
  },
]

const AI_CHAT = [
  { role: 'user' as const, text: 'Necesito un IPERC para trabajos en altura en una planta minera.' },
  { role: 'ai' as const, text: 'Generando IPERC para trabajos en altura...\n\n✓ 12 peligros identificados\n✓ Medidas de control DS 024\n✓ EPP especifico incluido\n✓ Listo para descargar en PDF' },
]

const AI_FEATURES = [
  { icon: ClipboardCheck, title: 'Generar IPERC / ATS', desc: 'Documentos normativos en minutos' },
  { icon: FileCheck, title: 'Checklist de inspeccion', desc: 'Listas personalizadas por actividad' },
  { icon: BookOpen, title: 'Plan anual de capacitaciones', desc: 'Cronograma optimizado con IA' },
  { icon: Shield, title: 'Preparacion para auditoria', desc: 'Diagnostico previo automatizado' },
]

const FAQS = [
  {
    q: 'Como accedo a los cursos?',
    a: 'Creas una cuenta, eliges tu curso y accedes de inmediato. No hay horarios ni grupos. Empiezas cuando quieras.',
  },
  {
    q: 'Cuanto dura cada curso?',
    a: 'Entre 45 y 90 minutos, dependiendo del tema. Puedes pausar y retomar en cualquier momento.',
  },
  {
    q: 'El certificado tiene validez?',
    a: 'Cada certificado incluye codigo QR verificable y esta vinculado a una evaluacion con nota. Es evidencia documentada de competencia.',
  },
  {
    q: 'Que pasa si no apruebo la evaluacion?',
    a: 'Puedes repetirla. El sistema registra todos los intentos y tu mejor nota queda asociada al certificado.',
  },
  {
    q: 'Como funciona para empresas?',
    a: 'Asignamos accesos por equipo, generamos reportes de avance y entregamos evidencia consolidada para auditorias.',
  },
  {
    q: 'Como se verifica un certificado?',
    a: 'Escaneando el codigo QR del certificado o ingresando el codigo unico en nuestra plataforma. La verificacion es publica e instantanea.',
  },
]

/* ─── Primitives ─── */

function Section({
  id,
  children,
  className = '',
  dark = false,
}: {
  id?: string
  children: React.ReactNode
  className?: string
  dark?: boolean
}) {
  return (
    <section
      id={id}
      className={`relative px-4 py-24 sm:px-6 lg:py-32 ${dark ? 'bg-gray-50/70' : ''} ${className}`}
    >
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-[13px] font-medium uppercase tracking-widest text-sky-600">
      {children}
    </p>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-semibold tracking-tight text-gray-900 lg:text-[2.5rem] lg:leading-[1.15]">
      {children}
    </h2>
  )
}

function AccordionItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string
  a: string
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 text-[15px] font-medium text-gray-900">{q}</span>
        {open ? (
          <Minus className="h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
        ) : (
          <Plus className="h-4 w-4 flex-shrink-0 text-gray-400" aria-hidden="true" />
        )}
      </button>
      <div
        role="region"
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-[14px] leading-relaxed text-gray-500">{a}</p>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-14 sm:px-6">
      {/* Gradient mesh background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-[20%] top-[10%] h-[500px] w-[500px] rounded-full opacity-[0.12] blur-[120px]"
          style={{ background: '#0ea5e9' }}
        />
        <div
          className="absolute -right-[10%] top-[30%] h-[400px] w-[400px] rounded-full opacity-[0.08] blur-[120px]"
          style={{ background: '#8b5cf6' }}
        />
        <div
          className="absolute bottom-[10%] left-[30%] h-[300px] w-[300px] rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: '#06b6d4' }}
        />
      </div>

      {/* Dot grid */}
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" />

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div variants={fade} initial="hidden" animate="show">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />
            <span className="text-[12.5px] font-medium text-sky-700">
              Nuevo: Asistente IA para documentos SST
            </span>
            <ChevronRight className="h-3 w-3 text-sky-400" />
          </motion.div>

          <h1 className="text-[2.5rem] font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem]">
            <span className="text-gray-900">Capacitacion SST que no</span>
            <br className="hidden sm:block" />
            <span className="gradient-text">depende de horarios</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-gray-500">
            Cursos asincronos con evaluacion real y certificados verificables.
            Desde Arequipa, para equipos que no pueden parar.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/cursos"
              className="group flex items-center gap-2 rounded-xl bg-sky-500 px-6 py-3.5 text-[14px] font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/30"
            >
              Explorar cursos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#contacto"
              className="rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-[14px] font-medium text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
            >
              Solicitar demo para empresas
            </a>
          </div>

          {/* Microcopy */}
          <p className="mt-5 text-[13px] text-gray-400">
            A tu ritmo · Evaluacion incluida · Certificado con QR verificable
          </p>
        </motion.div>

        {/* Quick action chips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-2"
        >
          {CHIPS.map((chip) => (
            <Link
              key={chip}
              href={`/cursos?q=${encodeURIComponent(chip)}`}
              className="rounded-full border border-gray-200 bg-white px-4 py-2 text-[13px] text-gray-500 transition-all hover:border-sky-300 hover:text-sky-700 hover:shadow-sm"
            >
              {chip}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   SOCIAL PROOF — Stats strip
   ═══════════════════════════════════════════════════ */

function StatsStrip() {
  return (
    <section className="border-y border-gray-200 bg-gray-50/50">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 divide-gray-200 md:grid-cols-4 md:divide-x"
        >
          {STATS.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeChild}
              className="flex flex-col items-center py-8 md:py-10"
            >
              <stat.icon className="mb-2 h-5 w-5 text-sky-500" />
              <span className="text-2xl font-bold text-gray-900 md:text-3xl">{stat.value}</span>
              <span className="mt-1 text-[12px] text-gray-400">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   QUIENES SOMOS (tabs)
   ═══════════════════════════════════════════════════ */

function About() {
  const [tab, setTab] = useState<'historia' | 'empresas'>('historia')

  return (
    <Section id="nosotros">
      <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <Label>Sobre nosotros</Label>

        {/* Tab switcher */}
        <div className="mb-8 flex w-fit gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
          {(['historia', 'empresas'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-md px-4 py-2 text-[13px] font-medium transition-all ${
                tab === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {t === 'historia' ? 'Nuestra historia' : 'Para empresas'}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === 'historia' ? (
          <div className="grid gap-8 lg:grid-cols-[1fr,auto]">
            <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-gray-500">
              <p>
                Ccanto Group nacio en Arequipa con una conviccion simple: la seguridad
                laboral no deberia depender de un horario ni de una sala de clases.
              </p>
              <p>
                Creamos una plataforma de cursos asincronos de SST pensada para la
                realidad del sur del Peru — turnos rotativos, faenas remotas, equipos
                dispersos. Cada curso incluye evaluacion real y un certificado
                verificable que respalda al trabajador y a la empresa.
              </p>
              <p>
                No somos una academia generica. Somos un equipo tecnico que entiende la
                operacion, conoce la norma y construye herramientas para que capacitarse
                sea tan natural como fichar entrada.
              </p>
              <p className="font-medium text-gray-700">
                Arequipa es nuestro centro. La industria del Peru, nuestro alcance.
              </p>
            </div>
            {/* Visual element */}
            <div className="hidden lg:block">
              <div className="flex h-full w-48 flex-col items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <MapPin className="mb-3 h-8 w-8 text-sky-400" />
                <span className="text-center text-[13px] font-medium text-gray-600">Arequipa, Peru</span>
                <span className="mt-1 text-center text-[11px] text-gray-400">Centro industrial del sur</span>
                <div className="mt-4 h-px w-full bg-gray-200" />
                <div className="mt-4 flex items-center gap-2">
                  <Users className="h-4 w-4 text-sky-400" />
                  <span className="text-[12px] text-gray-400">Desde 2009</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr,auto]">
            <div className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-gray-500">
              <p>
                Ccanto Group es una empresa arequipena especializada en capacitacion
                asincrona de seguridad y salud en el trabajo.
              </p>
              <p>
                Nuestra plataforma permite a empresas de mineria, construccion e
                industria capacitar a sus equipos sin interrumpir operaciones. Los cursos
                se completan a ritmo propio, incluyen evaluacion con nota y generan
                certificados con verificacion digital.
              </p>
              <p>
                Ofrecemos reportes consolidados: avance por trabajador, notas de
                evaluacion, cursos pendientes y evidencia descargable lista para
                auditorias.
              </p>
              <p>
                Contenido alineado a DS 024, Ley 29783 y normativa sectorial vigente.
                Operamos desde Arequipa con cobertura nacional.
              </p>
            </div>
            {/* Quick stats for enterprises */}
            <div className="hidden lg:block">
              <div className="flex h-full w-48 flex-col justify-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                {[
                  { num: '150+', label: 'Empresas' },
                  { num: '2,500+', label: 'Certificados' },
                  { num: '98%', label: 'Aprobacion' },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <span className="block text-xl font-bold text-gray-900">{s.num}</span>
                    <span className="text-[11px] text-gray-400">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════
   POR QUE AREQUIPA
   ═══════════════════════════════════════════════════ */

function WhyArequipa() {
  return (
    <Section id="arequipa" dark>
      <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <div className="mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4 text-sky-500" />
          <Label>Arequipa</Label>
        </div>
        <Title>Desde el centro industrial del sur</Title>

        <div className="mt-8 max-w-3xl space-y-4 text-[15px] leading-relaxed text-gray-500">
          <p>
            Arequipa concentra la mayor actividad minera, de construccion e
            industrial del sur del Peru. Aqui se necesita capacitacion que funcione
            entre turnos, no entre semanas.
          </p>
          <p>
            Ccanto Group nacio donde la demanda es real — entre operaciones activas,
            contratistas en movimiento y empresas que necesitan cumplimiento sin
            burocracia.
          </p>
          <p className="font-medium text-gray-700">
            No elegimos Arequipa por conveniencia. La elegimos porque aqui se trabaja
            en serio.
          </p>
        </div>
      </motion.div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════
   COMO FUNCIONA (3 pasos — timeline)
   ═══════════════════════════════════════════════════ */

function HowItWorks() {
  return (
    <Section id="como-funciona">
      <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <Label>Como funciona</Label>
        <Title>Tres pasos. Sin complicaciones.</Title>

        <div className="mt-12 grid gap-0 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeChild}
              className="group relative flex flex-col items-center text-center"
            >
              {/* Connector line (not on last) */}
              {i < STEPS.length - 1 && (
                <div className="absolute left-[calc(50%+28px)] top-7 hidden h-px w-[calc(100%-56px)] bg-gray-200 md:block" />
              )}

              {/* Step number circle */}
              <div
                className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border bg-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                style={{
                  borderColor: `color-mix(in srgb, ${step.color} 30%, transparent)`,
                }}
              >
                <step.icon className="h-6 w-6" style={{ color: step.color }} />
              </div>

              <span
                className="mb-2 text-[11px] font-bold uppercase tracking-widest"
                style={{ color: step.color }}
              >
                Paso {step.num}
              </span>
              <h3 className="text-[16px] font-semibold text-gray-900">{step.title}</h3>
              <p className="mt-2 max-w-[260px] text-[14px] leading-relaxed text-gray-500">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <p className="mt-10 text-center text-[13px] text-gray-400">
          Tiempo promedio por curso: 45–90 min · Acceso inmediato tras inscripcion
        </p>
      </motion.div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════
   LO QUE NOS DIFERENCIA (6 bullets — colored accents)
   ═══════════════════════════════════════════════════ */

function Differentiators() {
  return (
    <Section id="diferenciadores" dark>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeChild}>
          <Label>Lo que nos diferencia</Label>
          <Title>No es otro curso grabado.</Title>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {DIFFS.map((d) => (
            <motion.div
              key={d.title}
              variants={fadeChild}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md"
            >
              {/* Colored top accent */}
              <div
                className="mb-4 h-0.5 w-8 rounded-full transition-all duration-300 group-hover:w-12"
                style={{ background: d.color }}
              />
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 transition-colors group-hover:bg-gray-100">
                <d.icon className="h-5 w-5 transition-colors" style={{ color: d.color }} />
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900">{d.title}</h3>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-gray-500">
                {d.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════
   CERTIFICADOS Y EVIDENCIA
   ═══════════════════════════════════════════════════ */

function Certificates() {
  return (
    <Section id="certificados">
      <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <Label>Certificados y evidencia</Label>
        <Title>
          Certificados que se verifican,
          <br className="hidden sm:block" />
          no solo se imprimen.
        </Title>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr,360px]">
          <div className="space-y-4 text-[15px] leading-relaxed text-gray-500">
            <p>
              Cada certificado emitido por Ccanto Group incluye un codigo QR unico
              vinculado a los datos del participante, el curso completado, la fecha de
              emision y la nota obtenida.
            </p>
            <p>
              Cualquier persona — fiscalizador, cliente, area de RRHH — puede verificar
              la autenticidad escaneando el codigo o ingresando el hash en nuestra
              plataforma.
            </p>
            <p>
              Para empresas, generamos reportes consolidados: avance por trabajador,
              notas de evaluacion, cursos pendientes y evidencia descargable lista para
              auditorias.
            </p>
            <p className="font-medium text-gray-700">
              Trazabilidad completa. Sin papeles. Sin ambiguedades.
            </p>
          </div>

          {/* Premium Certificate mockup — keeps dark for contrast */}
          <div className="flex items-start justify-center">
            <motion.div
              initial={{ rotateY: -8, rotateX: 4 }}
              whileInView={{ rotateY: 0, rotateX: 0 }}
              whileHover={{ rotateY: 4, rotateX: -2, scale: 1.02 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="group relative w-full max-w-[320px]"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Glow behind card */}
              <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-sky-500/5 blur-2xl transition-opacity duration-500 group-hover:bg-sky-500/10" />

              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-xl shadow-gray-200/50">
                {/* Header with sky accent line */}
                <div className="border-b border-gray-100 pb-4">
                  <div className="absolute left-0 right-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 ring-1 ring-sky-200">
                        <Award className="h-5 w-5 text-sky-600" />
                      </div>
                      <div>
                        <span className="block text-[14px] font-bold tracking-wide text-gray-900">
                          Certificado Digital
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-widest text-sky-500/70">
                          Ccanto Group
                        </span>
                      </div>
                    </div>
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-emerald-200">
                      <Shield className="h-3.5 w-3.5 text-emerald-500" />
                    </div>
                  </div>
                </div>

                {/* Body */}
                <div className="mt-5 space-y-4">
                  {/* Course name */}
                  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                      Programa completado
                    </span>
                    <p className="mt-0.5 text-[15px] font-bold text-gray-900">
                      Trabajos en Altura
                    </p>
                    <span className="text-[10px] text-gray-400">Seguridad en operaciones mineras</span>
                  </div>

                  {/* Participant */}
                  <div>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-400">
                      Otorgado a
                    </span>
                    <p className="mt-0.5 text-[16px] font-semibold text-gray-800">
                      Carlos M. Rivera
                    </p>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-center">
                      <span className="block text-[9px] font-semibold uppercase tracking-wider text-gray-400">Nota</span>
                      <span className="mt-0.5 block text-[17px] font-bold text-emerald-600">18/20</span>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-center">
                      <span className="block text-[9px] font-semibold uppercase tracking-wider text-gray-400">Fecha</span>
                      <span className="mt-0.5 block text-[13px] font-semibold text-gray-700">15 Ene 2026</span>
                    </div>
                    <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5 text-center">
                      <span className="block text-[9px] font-semibold uppercase tracking-wider text-gray-400">Vigencia</span>
                      <span className="mt-0.5 block text-[13px] font-semibold text-gray-700">1 ano</span>
                    </div>
                  </div>

                  {/* QR verification bar */}
                  <div className="flex items-center justify-between rounded-xl border border-sky-100 bg-sky-50 px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100">
                        <QrCode className="h-4 w-4 text-sky-600" />
                      </div>
                      <div>
                        <span className="block text-[11px] font-semibold text-gray-700">Verificacion QR</span>
                        <span className="text-[9px] font-medium tracking-wide text-sky-500">
                          ccantogroup.com/v/a7x9k2
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                        Valido
                      </span>
                    </div>
                  </div>

                  {/* Bottom serial number */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-mono text-[9px] tracking-[0.15em] text-gray-300">
                      N.o CCG-2026-00847
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.15em] text-gray-300">
                      HASH: a7x9k2m3
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════
   RUTAS RECOMENDADAS (4 cards — colored borders)
   ═══════════════════════════════════════════════════ */

function LearningPaths() {
  return (
    <Section id="rutas" dark>
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeChild}>
          <Label>Rutas de aprendizaje</Label>
          <Title>Formacion por rol</Title>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {PATHS.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeChild}
              className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gray-300 hover:shadow-md"
            >
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border bg-white transition-all duration-300"
                  style={{
                    borderColor: `color-mix(in srgb, ${p.color} 25%, transparent)`,
                  }}
                >
                  <p.icon className="h-5 w-5" style={{ color: p.color }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-[15px] font-semibold text-gray-900">
                      {p.title}
                    </h3>
                    <span
                      className="rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{
                        background: `color-mix(in srgb, ${p.color} 10%, transparent)`,
                        color: p.color,
                      }}
                    >
                      {p.courses}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-gray-500">
                    {p.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="mt-6 text-[13px] text-gray-400">
          Cada ruta combina 3–5 cursos con evaluacion independiente y certificado
          por modulo.
        </p>
      </motion.div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════
   ASISTENTE IA — with chat mockup
   ═══════════════════════════════════════════════════ */

function AiSection() {
  return (
    <Section id="asistente-ia">
      <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-sky-500" />
          <Label>Asistente IA</Label>
        </div>
        <Title>Documentos normativos en minutos, no en dias.</Title>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-gray-500">
          Genera IPERC, ATS, checklists de inspeccion y planes de capacitacion con
          inteligencia artificial entrenada en normativa peruana de SST.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr,1fr]">
          {/* Feature cards */}
          <div className="grid gap-3 sm:grid-cols-2">
            {AI_FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:border-sky-200 hover:shadow-md"
              >
                <f.icon className="mb-2.5 h-5 w-5 text-sky-500" />
                <h3 className="text-[13.5px] font-semibold text-gray-900">{f.title}</h3>
                <p className="mt-1 text-[12px] text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Chat mockup — links to real chat */}
          <Link href="/asistente-ia" className="group block rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:border-sky-200 hover:shadow-md">
            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-gray-100 px-5 py-3.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50">
                <Bot className="h-4 w-4 text-sky-600" />
              </div>
              <div>
                <span className="text-[13px] font-medium text-gray-900">Asistente SST</span>
                <span className="ml-2 inline-flex items-center gap-1 text-[10px] text-emerald-500">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  En linea
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4 px-5 py-5">
              {AI_CHAT.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-[12.5px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-sky-500 text-white'
                        : 'border border-gray-100 bg-gray-50 text-gray-600'
                    }`}
                  >
                    <span className="whitespace-pre-line">{msg.text}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA to open real chat */}
            <div className="border-t border-gray-100 px-5 py-3.5">
              <div className="flex items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 py-2.5 transition-all group-hover:bg-sky-100">
                <Sparkles className="h-4 w-4 text-sky-600" />
                <span className="text-[13px] font-medium text-sky-700">Probar asistente IA</span>
                <ArrowRight className="h-3.5 w-3.5 text-sky-400 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════
   FAQ (accordion)
   ═══════════════════════════════════════════════════ */

function Faq() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <Section id="faq" dark>
      <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
        <Label>Preguntas frecuentes</Label>
        <Title>Todo lo que necesitas saber</Title>

        <div className="mt-12 max-w-3xl">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              open={openIdx === i}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          ))}
        </div>
      </motion.div>
    </Section>
  )
}

/* ═══════════════════════════════════════════════════
   CIERRE / MANIFIESTO — dramatic CTA
   ═══════════════════════════════════════════════════ */

function Manifesto() {
  return (
    <section id="contacto" className="relative overflow-hidden px-4 py-28 sm:px-6 lg:py-36">
      {/* Gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-1/2 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.1] blur-[120px]"
          style={{ background: '#0ea5e9' }}
        />
        <div
          className="absolute bottom-0 left-0 h-[300px] w-[400px] rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: '#8b5cf6' }}
        />
        <div
          className="absolute right-0 top-0 h-[300px] w-[400px] rounded-full opacity-[0.06] blur-[100px]"
          style={{ background: '#06b6d4' }}
        />
      </div>

      {/* Border accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/40 to-transparent" />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <h2 className="text-3xl font-semibold leading-[1.2] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            La seguridad no se improvisa.
            <br />
            <span className="gradient-text">Se entrena.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-gray-500">
            Ccanto Group existe para que cada trabajador en Arequipa — y en todo el
            Peru — tenga acceso a capacitacion seria, verificable y sin barreras de
            horario.
          </p>
          <p className="mt-2 text-[15px] font-medium text-gray-700">
            Esto recien empieza.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/cursos"
              className="group inline-flex items-center gap-2 rounded-xl bg-sky-500 px-8 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-sky-500/25 transition-all hover:bg-sky-600 hover:shadow-xl hover:shadow-sky-500/30"
            >
              Explorar cursos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`https://wa.me/51988227200?text=${encodeURIComponent('Hola, quiero informacion sobre capacitaciones SST para mi empresa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-sky-300 bg-sky-50 px-8 py-3.5 text-[15px] font-semibold text-sky-700 transition-all hover:bg-sky-100"
            >
              <Zap className="h-4 w-4" />
              Cotizar ahora
            </a>
          </div>
          <p className="mt-4 text-[13px] text-gray-400">
            Acceso inmediato · Sin compromiso · Certificacion incluida
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-white">
        <Hero />
        <StatsStrip />
        <About />
        <WhyArequipa />
        <HowItWorks />
        <Differentiators />
        <Certificates />
        <LearningPaths />
        <AiSection />
        <Faq />
        <Manifesto />
      </main>
      <Footer />
    </>
  )
}
