import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useProjects } from '../../hooks/useProjects'
import Logo from '../ui/Logo'
import Icon from '../ui/Icon'
import Avatar from '../ui/Avatar'

const mainNav = [
  { label: 'Inbox', to: '/issues', icon: 'inbox' },
  { label: 'My Issues', to: '/dashboard', icon: 'issues' },
]

const workspaceNav = [
  { label: 'Projects', to: '/projects', icon: 'projects' },
  { label: 'Views', to: '/dashboard', icon: 'views' },
  { label: 'Settings', to: '/settings/profile', icon: 'settings' },
]

export default function Sidebar({ mobileOpen, onClose }) {
  const { user } = useAuth()
  const { projects } = useProjects()

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-all ${
      isActive
        ? 'bg-blue-500/10 ring-1 ring-blue-400/40 text-blue-400'
        : 'text-[var(--text-secondary)] hover:bg-orange-500/10 hover:ring-1 hover:ring-orange-400/50 hover:text-orange-700'
    }`

  const content = (
    <>
      <div className="h-12 flex items-center gap-2 px-3 border-b border-[var(--border-subtle)] shrink-0">
        <Logo compact />
        <div className="flex-1 min-w-0">
          <button className="flex items-center gap-1.5 w-full text-left text-sm font-semibold text-[var(--text-primary)] truncate">
            <span className="truncate">KabulTrack</span>
            <Icon name="chevDown" className="w-3.5 h-3.5 shrink-0 text-[var(--text-muted)]" />
          </button>
        </div>
        <button className="p-1 rounded text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]" aria-label="Search">
          <Icon name="search" className="w-4 h-4" />
        </button>
        <NavLink
          to="/issues/new"
          className="p-1 rounded text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]"
          aria-label="New project"
          onClick={onClose}
        >
          <Icon name="plus" className="w-4 h-4" />
        </NavLink>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-3">
        <nav className="space-y-0.5">
          {mainNav.map((item) => (
            <NavLink key={item.label} to={item.to} end={item.to === '/dashboard'} className={linkClass} onClick={onClose}>
              <Icon name={item.icon} className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <p className="px-2.5 pt-5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Workspace
        </p>
        <nav className="space-y-0.5">
          {workspaceNav.map((item) => (
            <NavLink key={item.label} to={item.to} className={linkClass} onClick={onClose}>
              <Icon name={item.icon} className="w-4 h-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <p className="px-2.5 pt-5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Your teams
        </p>
        <div className="space-y-0.5">
          <button className="flex items-center gap-2 w-full px-2.5 py-1.5 rounded-md text-[13px] font-medium text-blue-400 bg-blue-500/10 ring-1 ring-blue-400/40 hover:bg-orange-500/10 hover:ring-orange-400/50 hover:text-orange-700 transition-all">
            <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-500 flex items-center justify-center text-[10px]">●</span>
            KabulTrack
          </button>
          <NavLink to="/issues" className={linkClass} onClick={onClose}>
            <Icon name="issues" className="w-4 h-4" />
            Issues
          </NavLink>
          <NavLink to="/projects" className={linkClass} onClick={onClose}>
            <Icon name="projects" className="w-4 h-4" />
            Projects
          </NavLink>
        </div>

        <p className="px-2.5 pt-5 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
          Projects
        </p>
        <nav className="space-y-0.5">
          {projects.map((p) => (
            <NavLink
              key={p._id}
              to={`/projects/${p._id}`}
              className={linkClass}
              onClick={onClose}
            >
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
              <span className="truncate">{p.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="shrink-0 px-3 py-3 border-t border-[var(--border-subtle)]">
        <NavLink
          to="/settings/profile"
          onClick={onClose}
          className="flex items-center gap-2.5 rounded-md px-1 py-1 hover:bg-orange-500/10 hover:ring-1 hover:ring-orange-400/50 transition-all"
        >
          <Avatar name={user?.name} src={user?.avatar} size="md" />
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-medium text-[var(--text-primary)] truncate">{user?.name}</p>
            <p className="text-[11px] text-[var(--text-muted)] truncate">{user?.email}</p>
          </div>
        </NavLink>
      </div>
    </>
  )

  return (
    <>
      <aside className="hidden md:flex w-[240px] shrink-0 flex-col bg-[var(--bg-sidebar)] border-r border-[var(--border-subtle)] h-screen sticky top-0">
        {content}
      </aside>

      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <aside className="w-[260px] flex flex-col bg-[var(--bg-sidebar)] h-full border-r border-[var(--border-subtle)]">
            <div className="flex items-center justify-end px-3 pt-3">
              <button onClick={onClose} className="p-1.5 rounded-md hover:bg-[var(--bg-hover)]" aria-label="Close menu">
                <Icon name="close" className="w-5 h-5" />
              </button>
            </div>
            {content}
          </aside>
          <div className="flex-1 bg-black/50" onClick={onClose} />
        </div>
      )}
    </>
  )
}