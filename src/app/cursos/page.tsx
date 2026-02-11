'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Search, Clock, MapPin, ShieldCheck, ArrowLeft, Sparkles, X } from 'lucide-react'
import { COURSES, type Course } from '@/data/courses'
import { getCourseIcon } from '@/lib/course-icons'
import Navbar from '@/components/ui/Navbar'

function CourseCard({ course, index }: { course: Course; index: number }) {
  const Icon = getCourseIcon(course.iconName)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' as const }}
    >
      <Link
        href={`/cursos/${course.slug}`}
        className="group relative block overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/15 hover:-translate-y-1"
        style={{
          boxShadow: 'inset 0 1px 0 0 rgba(255,255,255,0.03)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `inset 0 1px 0 0 rgba(255,255,255,0.03), 0 8px 32px -8px ${course.color}30`
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'inset 0 1px 0 0 rgba(255,255,255,0.03)'
        }}
      >
        {/* Icon area */}
        <div className="relative flex h-44 items-center justify-center overflow-hidden">
          {/* Radial glow behind icon */}
          <div
            className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-25"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${course.color}40 0%, transparent 70%)`,
            }}
          />
          <Icon
            className="relative h-16 w-16 transition-all duration-300 group-hover:scale-110"
            style={{ color: course.color }}
          />

          {/* Category badge */}
          <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-secondary backdrop-blur-sm">
            {course.category}
          </span>

          {/* Price badge */}
          <span
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
              course.price === 'Gratis'
                ? 'border border-neon-lime/30 bg-neon-lime/10 text-neon-lime'
                : 'border border-white/10 bg-white/5 text-white backdrop-blur-sm'
            }`}
          >
            {course.price}
          </span>
        </div>

        {/* Content */}
        <div className="border-t border-white/5 p-5">
          <h3 className="text-base font-bold text-white transition-colors group-hover:text-neon-cyan">
            {course.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-text-secondary">
            {course.description}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-text-secondary">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-neon-blue" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-neon-blue" />
              {course.modality}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function CursosPage() {
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = [...new Set(COURSES.map((c) => c.category))]

  const filtered = COURSES.filter((course) => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean)
    const text = `${course.title} ${course.category} ${course.description}`.toLowerCase()
    const matchesQuery = words.length === 0 || words.every((w) => text.includes(w))
    const matchesCategory = !selectedCategory || course.category === selectedCategory
    return matchesQuery && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero header */}
      <div className="relative overflow-hidden pt-20">
        {/* Background effects */}
        <div className="absolute inset-0 bg-dots opacity-40" />
        <div
          className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 opacity-20"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.15) 0%, transparent 70%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-neon-cyan"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-neon-blue/20 bg-neon-blue/10">
              <ShieldCheck className="h-8 w-8 text-neon-blue" />
            </div>
            <div>
              <h1 className="text-3xl font-bold sm:text-4xl">
                <span className="gradient-text">Cursos de Capacitacion</span>
              </h1>
              <p className="mt-1 text-text-secondary">
                Programas de seguridad y salud en el trabajo para mineria, construccion e industria
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-10 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar cursos..."
              aria-label="Buscar cursos"
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-12 pr-10 text-white placeholder-text-secondary/50 backdrop-blur-sm outline-none transition-all duration-300 focus:border-neon-blue/50 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Limpiar busqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-text-secondary/50 transition-colors hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filters + Grid */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              !selectedCategory
                ? 'border border-neon-blue/50 bg-neon-blue/15 text-neon-blue shadow-[0_0_12px_rgba(0,212,255,0.15)]'
                : 'border border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
            }`}
          >
            Todos ({COURSES.length})
          </button>
          {categories.map((cat) => {
            const count = COURSES.filter((c) => c.category === cat).length
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'border border-neon-blue/50 bg-neon-blue/15 text-neon-blue shadow-[0_0_12px_rgba(0,212,255,0.15)]'
                    : 'border border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
                }`}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>

        {/* Results counter */}
        <div className="mt-6 flex items-center gap-2 text-sm text-text-secondary">
          <Sparkles className="h-4 w-4 text-neon-blue" />
          <span>{filtered.length} cursos encontrados</span>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/[0.03]">
              <Search className="h-8 w-8 text-text-secondary" />
            </div>
            <p className="mt-4 text-lg font-medium text-white">No se encontraron cursos</p>
            <p className="mt-1 text-text-secondary">Intenta con otro termino de busqueda</p>
            <button
              onClick={() => { setQuery(''); setSelectedCategory(null) }}
              className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-white transition-all hover:bg-white/[0.07]"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((course, i) => (
              <CourseCard key={course.slug} course={course} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
