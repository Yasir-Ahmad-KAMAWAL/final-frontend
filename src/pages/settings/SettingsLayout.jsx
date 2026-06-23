import { NavLink, Outlet } from 'react-router-dom'
import { useSetPageHeader } from '../../hooks/useSetPageHeader'
import Icon from '../../components/ui/Icon'

const settingsNav = [
  { label: 'Profile', to: '/settings/profile', icon: 'user' },
  { label: 'Security', to: '/settings/security', icon: 'lock' },
]

export default function SettingsLayout() {
  useSetPageHeader({ title: 'Settings', breadcrumb: 'Account' })

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors ${
      isActive
        ? 'bg-[var(--bg-active)] text-[var(--text-primary)]'
        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
    }`

  return (
    <div className="px-4 md:px-6 py-4 max-w-4xl">
      <div className="flex flex-col md:flex-row gap-6 md:gap-10">
        <nav className="md:w-48 shrink-0">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Account
          </p>
          <div className="space-y-0.5">
            {settingsNav.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                <Icon name={item.icon} className="w-4 h-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
