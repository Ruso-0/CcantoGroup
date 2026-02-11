import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Ccanto Group',
  description: 'Panel de control — Seguridad y Salud en el Trabajo',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-ds-bg text-ds-text">
      {children}
    </div>
  )
}
