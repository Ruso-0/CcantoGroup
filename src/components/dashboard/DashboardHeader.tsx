'use client'

import { Bell, Search, ChevronDown } from 'lucide-react'

interface DashboardHeaderProps {
  userName: string
  userRole: string
}

export default function DashboardHeader({ userName, userRole }: DashboardHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b border-ds-border/20 bg-ds-surface/30 px-6 backdrop-blur-xl">
      {/* Search */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ds-text-muted" />
        <input
          type="text"
          placeholder="Buscar trabajadores, certificados..."
          className="w-full rounded-xl border border-ds-border/30 bg-ds-panel/40 py-2 pl-10 pr-4 text-sm text-ds-text placeholder-ds-text-muted outline-none transition-colors focus:border-ds-cyan/40 focus:ring-1 focus:ring-ds-cyan/20"
        />
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-ds-border/30 bg-ds-panel/40 text-ds-text-muted transition-colors hover:border-ds-cyan/30 hover:text-ds-cyan">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-ds-rose text-[10px] font-bold text-white">
            3
          </span>
        </button>

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl border border-ds-border/30 bg-ds-panel/40 px-3 py-1.5 transition-colors hover:border-ds-cyan/30">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-ds-cyan to-ds-violet text-xs font-bold text-white">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-ds-text">{userName}</p>
            <p className="text-[10px] text-ds-text-muted">{userRole}</p>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-ds-text-muted" />
        </button>
      </div>
    </header>
  )
}
