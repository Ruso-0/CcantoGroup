'use client'

import {
  Users,
  FileCheck,
  Building2,
  GraduationCap,
  ShieldCheck,
  Gauge,
  Timer,
  AlertTriangle,
} from 'lucide-react'
import Sidebar from '@/components/dashboard/Sidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import StatMetric from '@/components/dashboard/StatMetric'
import ActivityFeed from '@/components/dashboard/ActivityFeed'
import RecentCerts from '@/components/dashboard/RecentCerts'
import ComplianceGauge from '@/components/dashboard/ComplianceGauge'
import BarChart from '@/components/dashboard/BarChart'
import GlassCard from '@/components/dashboard/GlassCard'

const MONTHLY_DATA = [
  { label: 'Ago', value: 312 },
  { label: 'Sep', value: 428 },
  { label: 'Oct', value: 387 },
  { label: 'Nov', value: 502 },
  { label: 'Dic', value: 445 },
  { label: 'Ene', value: 621 },
  { label: 'Feb', value: 847 },
]

const COURSE_DATA = [
  { label: 'Altura', value: 186 },
  { label: 'MATPEL', value: 142 },
  { label: 'Electr.', value: 128 },
  { label: 'Confin.', value: 97 },
  { label: 'LOTO', value: 89 },
  { label: 'IPERC', value: 205 },
]

export default function DashboardShell({ userName }: { userName: string }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardHeader userName={userName} userRole="Administrador" />

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Top greeting */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-ds-text">
              Centro de Comando
            </h1>
            <p className="text-sm text-ds-text-muted">
              Vista general del sistema SST — {new Date().toLocaleDateString('es-PE', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Stat metrics row */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatMetric
              label="Trabajadores Capacitados"
              value={847}
              icon={Users}
              color="cyan"
              trend={12.3}
              trendLabel="vs. mes anterior"
              sparkData={[420, 480, 510, 530, 590, 680, 720, 790, 847]}
            />
            <StatMetric
              label="Certificados Activos"
              value={12453}
              icon={FileCheck}
              color="lime"
              trend={8.7}
              trendLabel="vs. mes anterior"
              sparkData={[9800, 10200, 10800, 11100, 11600, 12000, 12453]}
            />
            <StatMetric
              label="Empresas Activas"
              value={156}
              icon={Building2}
              color="violet"
              trend={4.2}
              trendLabel="nuevas este mes"
              sparkData={[120, 128, 135, 140, 145, 150, 156]}
            />
            <StatMetric
              label="Incidentes (Trimestre)"
              value={3}
              icon={AlertTriangle}
              color="amber"
              trend={-40}
              trendLabel="vs. trimestre anterior"
              sparkData={[8, 6, 5, 4, 5, 3, 3]}
            />
          </div>

          {/* Second row - charts + gauge */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Monthly bar chart — 5 cols */}
            <div className="lg:col-span-5">
              <BarChart
                title="Trabajadores Capacitados por Mes"
                data={MONTHLY_DATA}
                color="cyan"
              />
            </div>

            {/* Course popularity — 4 cols */}
            <div className="lg:col-span-4">
              <BarChart
                title="Cursos Mas Solicitados"
                data={COURSE_DATA}
                color="violet"
              />
            </div>

            {/* Compliance gauge — 3 cols */}
            <div className="lg:col-span-3">
              <ComplianceGauge value={98.7} label="Tasa de Cumplimiento" />
            </div>
          </div>

          {/* Third row - secondary metrics */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatMetric
              label="Cursos Activos"
              value={24}
              icon={GraduationCap}
              color="violet"
              sparkData={[18, 19, 20, 22, 23, 24]}
            />
            <StatMetric
              label="Latencia Verificacion"
              value={14}
              suffix="ms"
              icon={Timer}
              color="cyan"
              sparkData={[18, 16, 15, 14, 13, 14]}
            />
            <StatMetric
              label="Ingresos del Mes"
              value={245800}
              prefix="S/"
              icon={Gauge}
              color="lime"
              trend={15.8}
              trendLabel="vs. mes anterior"
              sparkData={[180000, 195000, 210000, 220000, 235000, 245800]}
            />
          </div>

          {/* Fourth row - table + activity */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <RecentCerts />
            </div>
            <div className="lg:col-span-4">
              <ActivityFeed />
            </div>
          </div>

          {/* System status bar */}
          <div className="mt-6">
            <GlassCard glow="none" className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-2 w-2 rounded-full bg-ds-lime shadow-sm shadow-ds-lime/50" />
                <span className="text-xs text-ds-text-muted">Todos los sistemas operativos</span>
              </div>
              <div className="flex items-center gap-6 font-mono text-[11px] text-ds-text-muted">
                <span>Uptime: <strong className="text-ds-text">99.97%</strong></span>
                <span>API: <strong className="text-ds-lime">14ms</strong></span>
                <span>DB: <strong className="text-ds-cyan">8ms</strong></span>
                <span>Workers: <strong className="text-ds-text">7/7</strong></span>
              </div>
            </GlassCard>
          </div>
        </main>
      </div>
    </div>
  )
}
