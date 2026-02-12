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
        className="group relative block overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-sky-200 hover:shadow-md hover:-translate-y-1"
      >
        {/* Icon area */}
        <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gray-50">
          {/* Radial glow behind icon */}
          <div
            className="absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 60%, ${course.color}30 0%, transparent 70%)`,
            }}
          />
          <Icon
            className="relative h-16 w-16 transition-all duration-300 group-hover:scale-110"
            style={{ color: course.color }}
          />

          {/* Category badge */}
          <span className="absolute left-3 top-3 rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
            {course.category}
          </span>

          {/* Price badge */}
          <span
            className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${
              course.price === 'Gratis'
                ? 'border border-green-200 bg-green-50 text-green-600'
                : 'border border-gray-200 bg-white text-gray-700'
            }`}
          >
            {course.price}
          </span>
        </div>

        {/* Content */}
        <div className="border-t border-gray-100 p-5">
          <h3 className="text-base font-bold text-gray-900 transition-colors group-hover:text-sky-600">
            {course.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-500">
            {course.description}
          </p>
          <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-sky-500" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-sky-500" />
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
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero header */}
      <div className="relative overflow-hidden bg-gray-50/70 pt-20">
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-sky-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-sky-200 bg-sky-50">
              <ShieldCheck className="h-8 w-8 text-sky-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Cursos de Capacitacion
              </h1>
              <p className="mt-1 text-gray-500">
                Programas de seguridad y salud en el trabajo para mineria, construccion e industria
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mt-10 max-w-xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar cursos..."
              aria-label="Buscar cursos"
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-10 text-gray-900 placeholder-gray-400 outline-none transition-all duration-300 focus:border-sky-300 focus:ring-2 focus:ring-sky-100 focus:shadow-sm"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Limpiar busqueda"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 transition-colors hover:text-gray-700"
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
                ? 'border border-sky-300 bg-sky-50 text-sky-600 shadow-sm'
                : 'border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
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
                    ? 'border border-sky-300 bg-sky-50 text-sky-600 shadow-sm'
                    : 'border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }`}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>

        {/* Results counter */}
        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
          <Sparkles className="h-4 w-4 text-sky-500" />
          <span>{filtered.length} cursos encontrados</span>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="mt-16 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
            <p className="mt-4 text-lg font-medium text-gray-900">No se encontraron cursos</p>
            <p className="mt-1 text-gray-500">Intenta con otro termino de busqueda</p>
            <button
              onClick={() => { setQuery(''); setSelectedCategory(null) }}
              className="mt-4 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 transition-all hover:bg-gray-100"
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
