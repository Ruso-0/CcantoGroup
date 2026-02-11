'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Clock,
  MapPin,
  ShieldCheck,
  BookOpen,
  ListChecks,
  Share2,
  Heart,
  CheckCircle2,
  MessageCircle,
  Search,
  ChevronRight,
} from 'lucide-react'
import { getCourseBySlug, getPopularCourses, type Course } from '@/data/courses'
import { getCourseIcon } from '@/lib/course-icons'
import Navbar from '@/components/ui/Navbar'

function CourseNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
          <BookOpen className="h-8 w-8 text-text-secondary" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-white">Curso no encontrado</h1>
        <p className="mt-2 text-text-secondary">El curso que buscas no existe.</p>
        <Link
          href="/cursos"
          className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-neon-blue px-6 py-3 text-sm font-semibold text-neon-blue transition-all hover:bg-neon-blue hover:text-[#0a0f1a] hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Ver todos los cursos
        </Link>
      </div>
    </div>
  )
}

function PopularCourseCard({ course }: { course: Course }) {
  const Icon = getCourseIcon(course.iconName)

  return (
    <Link
      href={`/cursos/${course.slug}`}
      className="group flex gap-4 rounded-xl p-3 transition-all hover:bg-white/[0.03]"
    >
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
      >
        <Icon className="h-6 w-6" style={{ color: course.color }} />
      </div>
      <div className="min-w-0">
        <h4 className="text-sm font-semibold leading-snug text-white line-clamp-2 group-hover:text-neon-cyan">
          {course.title}
        </h4>
        <p
          className={`mt-1 text-sm font-bold ${
            course.price === 'Gratis' ? 'text-neon-lime' : 'text-text-secondary'
          }`}
        >
          {course.price}
        </p>
      </div>
    </Link>
  )
}

export default function CourseDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const course = getCourseBySlug(slug)
  const [activeTab, setActiveTab] = useState<'descripcion' | 'curriculum'>('descripcion')
  const [searchQuery, setSearchQuery] = useState('')

  if (!course) return <CourseNotFound />

  const Icon = getCourseIcon(course.iconName)
  const popularCourses = getPopularCourses().filter((c) => c.slug !== slug).slice(0, 4)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Spacer for fixed navbar */}
      <div className="pt-20" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-text-secondary">
          <Link href="/" className="transition-colors hover:text-neon-cyan">Inicio</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/cursos" className="transition-colors hover:text-neon-cyan">Cursos</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-white">{course.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content — 2 cols */}
          <div className="lg:col-span-2">
            {/* Category pill */}
            <span
              className="inline-block rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider"
              style={{
                borderColor: `${course.color}40`,
                backgroundColor: `${course.color}10`,
                color: course.color,
              }}
            >
              {course.category}
            </span>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-4 text-3xl font-bold text-white sm:text-4xl"
            >
              {course.title}
            </motion.h1>

            {/* Instructor */}
            <div className="mt-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-neon-blue/20 bg-neon-blue/10">
                <ShieldCheck className="h-5 w-5 text-neon-blue" />
              </div>
              <div>
                <p className="text-xs text-text-secondary">Instructor</p>
                <p className="text-sm font-semibold text-white">Ccanto Group</p>
              </div>
            </div>

            {/* Course hero image area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative mt-8 flex h-64 items-center justify-center overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] sm:h-80"
            >
              {/* Radial glow */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at 50% 50%, ${course.color}30 0%, transparent 60%)`,
                }}
              />
              {/* Dot grid */}
              <div className="absolute inset-0 bg-dots opacity-30" />
              <Icon
                className="relative h-24 w-24 sm:h-32 sm:w-32"
                style={{
                  color: course.color,
                  filter: `drop-shadow(0 0 20px ${course.color}60)`,
                }}
              />
            </motion.div>

            {/* Meta info bar */}
            <div className="mt-5 flex flex-wrap gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-neon-blue" />
                <span className="text-text-secondary">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-neon-blue" />
                <span className="text-text-secondary">{course.modality}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <BookOpen className="h-4 w-4 text-neon-blue" />
                <span className="text-text-secondary">{course.curriculum.length} modulos</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-8 border-b border-white/10">
              <div className="flex gap-6">
                <button
                  onClick={() => setActiveTab('descripcion')}
                  role="tab"
                  aria-selected={activeTab === 'descripcion'}
                  className={`pb-3 text-sm font-semibold transition-all ${
                    activeTab === 'descripcion'
                      ? 'border-b-2 border-neon-blue text-neon-blue'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  Descripcion
                </button>
                <button
                  onClick={() => setActiveTab('curriculum')}
                  role="tab"
                  aria-selected={activeTab === 'curriculum'}
                  className={`pb-3 text-sm font-semibold transition-all ${
                    activeTab === 'curriculum'
                      ? 'border-b-2 border-neon-blue text-neon-blue'
                      : 'text-text-secondary hover:text-white'
                  }`}
                >
                  Curriculum
                </button>
              </div>
            </div>

            {/* Tab content */}
            <div className="mt-6">
              {activeTab === 'descripcion' ? (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-base leading-relaxed text-text-secondary">
                    {course.description}
                  </p>
                  <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-6">
                    <h3 className="text-base font-semibold text-white">Lo que aprenderas</h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {course.curriculum.slice(0, 6).map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-neon-lime"
                          />
                          <span className="text-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="curriculum"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  {course.curriculum.map((item, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                    >
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                        style={{
                          backgroundColor: `${course.color}15`,
                          color: course.color,
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-white">{item}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <div className="flex items-center justify-between">
              <button className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-neon-rose">
                <Heart className="h-4 w-4" />
                Agregar a la lista
              </button>
              <button className="flex items-center gap-1.5 text-sm text-text-secondary transition-colors hover:text-neon-blue">
                <Share2 className="h-4 w-4" />
                Compartir
              </button>
            </div>

            {/* Price + CTA */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <div className="text-center">
                <p
                  className={`text-3xl font-bold ${
                    course.price === 'Gratis' ? 'text-neon-lime' : 'text-white'
                  }`}
                >
                  {course.price}
                </p>
              </div>

              <a
                href={`https://wa.me/51988227200?text=${encodeURIComponent(`Hola, quiero inscribirme en el curso: ${course.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-neon-blue py-3.5 text-sm font-bold text-[#0a0f1a] transition-all hover:shadow-[0_0_25px_rgba(0,212,255,0.4)]"
              >
                <MessageCircle className="h-4 w-4" />
                INSCRIBIRSE EN EL CURSO
              </a>

              <div className="mt-5 space-y-3 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-neon-blue" />
                  <span>Duracion: {course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-neon-blue" />
                  <span>Modalidad: {course.modality}</span>
                </div>
                <div className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-neon-blue" />
                  <span>{course.curriculum.length} modulos de estudio</span>
                </div>
              </div>
            </div>

            {/* Popular courses */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-base font-bold text-white">Cursos populares</h3>
              <div className="divide-y divide-white/5">
                {popularCourses.map((c) => (
                  <div key={c.slug} className="py-2 first:pt-0 last:pb-0">
                    <PopularCourseCard course={c} />
                  </div>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-sm">
              <h3 className="mb-3 text-base font-bold text-white">Buscar</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar cursos..."
                  className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2.5 text-sm text-white placeholder-text-secondary/50 outline-none transition-all focus:border-neon-blue/50 focus:shadow-[0_0_12px_rgba(0,212,255,0.1)]"
                />
                <Link
                  href={`/cursos${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`}
                  className="shrink-0 rounded-lg bg-neon-blue px-4 py-2.5 text-sm font-semibold text-[#0a0f1a] transition-all hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
                >
                  <Search className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
