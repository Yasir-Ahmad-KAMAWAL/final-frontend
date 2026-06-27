import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { PageHeaderProvider, usePageHeader } from '../../context/PageHeaderContext'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

function LayoutShell() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { title, breadcrumb, isFavorited, onFavoriteToggle } = usePageHeader()

  return (
    <div className="min-h-screen flex bg-[var(--bg-app)] text-[var(--text-primary)]">
      <Sidebar mobileOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col">
        <TopBar
          title={title}
          breadcrumb={breadcrumb}
          isFavorited={isFavorited}
          onFavoriteToggle={onFavoriteToggle}
          onMenuOpen={() => setMobileNavOpen(true)}
        />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default function AppLayout() {
  return (
    <PageHeaderProvider>
      <LayoutShell />
    </PageHeaderProvider>
  )
}
