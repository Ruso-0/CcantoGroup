'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  FileCheck,
  GraduationCap,
  Building2,
  BarChart3,
  Settings,
  LogOut,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
  { icon: Users, label: 'Trabajadores', href: '/dashboard/workers' },
  { icon: FileCheck, label: 'Certificados', href: '/dashboard/certificates' },
  { icon: GraduationCap, label: 'Cursos', href: '/dashboard/courses' },
  { icon: Building2, label: 'Empresas', href: '/dashboard/companies' },
  { icon: BarChart3, label: 'Reportes', href: '/dashboard/reports' },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`
        sticky top-0 flex h-screen flex-col border-r border-ds-border/30
        bg-ds-surface/40 backdrop-blur-2xl transition-all duration-300
        ${collapsed ? 'w-[72px]' : 'w-64'}
      `}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2.5 border-b border-ds-border/20 px-4">
        <ShieldCheck className="h-8 w-8 shrink-0 text-ds-cyan" />
        {!collapsed && (
          <span className="text-sm font-bold text-ds-text">Ccanto Group</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              group flex items-center gap-3 rounded-xl px-3 py-2.5
              text-sm font-medium transition-all duration-200
              ${item.active
                ? 'bg-ds-cyan/10 text-ds-cyan shadow-inner shadow-ds-cyan/5'
                : 'text-ds-text-muted hover:bg-ds-panel/60 hover:text-ds-text'
              }
            `}
          >
            <item.icon className={`h-5 w-5 shrink-0 ${item.active ? 'text-ds-cyan' : 'text-ds-text-muted group-hover:text-ds-text'}`} />
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>

      {/* Bottom */}
      <div className="space-y-1 border-t border-ds-border/20 px-3 py-4">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ds-text-muted transition-colors hover:bg-ds-panel/60 hover:text-ds-text"
        >
          <Settings className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Configuracion</span>}
        </Link>
        <button
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ds-text-muted transition-colors hover:bg-ds-rose/10 hover:text-ds-rose"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Cerrar Sesion</span>}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-ds-border/50 bg-ds-surface text-ds-text-muted transition-colors hover:border-ds-cyan/40 hover:text-ds-cyan"
      >
        {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
      </button>
    </aside>
  )
}
