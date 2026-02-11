'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { COURSES } from '@/data/courses'
import { getCourseIcon } from '@/lib/course-icons'

export default function CoursesGrid() {
  return (
    <section id="cursos" className="bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-neon-cyan">
            Formacion especializada
          </p>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            <span className="gradient-text">Cursos de Capacitacion</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-text-secondary">
            Programas de alto riesgo y seguridad ocupacional con instructores
            certificados
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {COURSES.map((course, i) => {
            const Icon = getCourseIcon(course.iconName)
            return (
              <motion.div
                key={course.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link
                  href={`/cursos/${course.slug}`}
                  className="group block overflow-hidden rounded-xl border border-white/5 bg-background-darker transition-all hover:border-neon-cyan/30 hover:bg-neon-cyan/5 hover:-translate-y-[5px]"
                >
                  {/* Icon area */}
                  <div className="flex h-24 items-center justify-center">
                    <Icon className="h-10 w-10 text-neon-blue transition-colors group-hover:text-neon-cyan" />
                  </div>

                  <div className="p-4 pt-0">
                    <h3 className="text-sm font-bold leading-snug text-foreground group-hover:text-neon-cyan">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-xs text-text-secondary">
                      {course.duration}
                    </p>
                    {/* Price badge */}
                    <span
                      className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        course.price === 'Gratis'
                          ? 'bg-neon-lime/20 text-neon-lime'
                          : 'bg-white/5 text-text-secondary'
                      }`}
                    >
                      {course.price}
                    </span>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* View all link */}
        <div className="mt-12 text-center">
          <Link
            href="/cursos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-neon-blue transition-colors hover:text-neon-cyan"
          >
            Ver todos los cursos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
