import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Icon from '../ui/Icon'
import ThemeToggle from '../ui/ThemeToggle'
import Button from '../ui/Button'
import toast from 'react-hot-toast'

export default function TopBar({ title, breadcrumb, onMenuOpen }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <header className="h-11 shrink-0 flex items-center gap-3 px-4 border-b border-[var(--border-subtle)] bg-[var(--bg-main)] sticky top-0 z-30">
      <button
        className="md:hidden p-1 rounded text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]"
        onClick={onMenuOpen}
        aria-label="Open menu"
      >
        <Icon name="menu" className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1.5 min-w-0 text-sm">
        {breadcrumb && (
          <span className="text-[var(--text-muted)] truncate">{breadcrumb}</span>
        )}
        {breadcrumb && <Icon name="chevRight" className="w-3.5 h-3.5 text-[var(--text-muted)] shrink-0" />}
        <h1 className="font-medium text-[var(--text-primary)] truncate">{title}</h1>
        <button className="p-0.5 rounded text-[var(--text-muted)] hover:text-[var(--text-secondary)]" aria-label="Favorite view">
          <Icon name="star" className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex-1" />

      <button className="p-1.5 rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]" aria-label="Notifications">
        <Icon name="bell" className="w-4 h-4" />
      </button>
      <button className="p-1.5 rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]" aria-label="Filter">
        <Icon name="filter" className="w-4 h-4" />
      </button>
      <ThemeToggle />
      <Button variant="ghost" size="sm" onClick={handleLogout} className="!px-2">
        <Icon name="logout" className="w-4 h-4" />
        <span className="hidden sm:inline">Log out</span>
      </Button>
    </header>
  )
}
