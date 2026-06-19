import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

// ─── Sample data (replace with real API data) ───
const PROJECTS = [
  { id: 1, name: 'Client Billing Portal', issues: 18, done: 11, color: 'bg-blue-500' },
  { id: 2, name: 'Mobile App Revamp', issues: 9, done: 2, color: 'bg-orange-500' },
  { id: 3, name: 'Internal HR Tool', issues: 14, done: 14, color: 'bg-emerald-500' },
]

const ISSUES = [
  { id: 'KT-142', title: 'Fix Cloudinary upload timeout on large files', project: 'Client Billing Portal', status: 'In Progress', priority: 'Urgent', assignee: 'AR' },
  { id: 'KT-141', title: 'Add refresh token rotation to auth middleware', project: 'Client Billing Portal', status: 'In Review', priority: 'High', assignee: 'SH' },
  { id: 'KT-139', title: 'Design empty states for issue board', project: 'Mobile App Revamp', status: 'Todo', priority: 'Medium', assignee: 'NQ' },
  { id: 'KT-137', title: 'Migrate password reset emails to new template', project: 'Internal HR Tool', status: 'Done', priority: 'Low', assignee: 'AR' },
  { id: 'KT-135', title: 'Investigate Mongoose pre-save hook duplicate calls', project: 'Client Billing Portal', status: 'In Progress', priority: 'High', assignee: 'SH' },
  { id: 'KT-131', title: 'Set up role-based protected routes for clients', project: 'Mobile App Revamp', status: 'Todo', priority: 'Medium', assignee: 'NQ' },
]

const STATUS_DOT = {
  'Todo': 'bg-slate-400',
  'In Progress': 'bg-blue-500',
  'In Review': 'bg-orange-500',
  'Done': 'bg-emerald-500',
}

const PRIORITY_RAIL = {
  Urgent: 'bg-red-500',
  High: 'bg-orange-500',
  Medium: 'bg-blue-400',
  Low: 'bg-slate-300 dark:bg-slate-600',
}

const NAV_ITEMS = [
  { label: 'My Issues', icon: 'inbox' },
  { label: 'Projects', icon: 'grid' },
  { label: 'Board', icon: 'board' },
  { label: 'Roadmap', icon: 'road' },
  { label: 'Settings', icon: 'gear' },
]

// ─── Tiny inline icon set (no external dep) ───
const Icon = ({ name, className = 'w-[18px] h-[18px]' }) => {
  const paths = {
    inbox: 'M3 8.5h4.5l1.2 2.5h6.6l1.2-2.5H21M3 8.5 5 4h14l2 4.5M3 8.5V18a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8.5',
    grid: 'M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z',
    board: 'M4 4h16v16H4V4Zm4 0v16M14 4v8',
    road: 'M9 4 4 20m11-16 5 16M11 10h2m-3 6h4',
    gear: 'M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm8 3a8 8 0 0 0-.2-1.7l2-1.4-2-3.4-2.3.7a8 8 0 0 0-2.9-1.7L14.2 2H9.8l-.4 2.5a8 8 0 0 0-2.9 1.7l-2.3-.7-2 3.4 2 1.4A8 8 0 0 0 4 12a8 8 0 0 0 .2 1.7l-2 1.4 2 3.4 2.3-.7a8 8 0 0 0 2.9 1.7l.4 2.5h4.4l.4-2.5a8 8 0 0 0 2.9-1.7l2.3.7 2-3.4-2-1.4A8 8 0 0 0 20 12Z',
    search: 'M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm11 4-5.6-5.6',
    plus: 'M12 5v14M5 12h14',
    bell: 'M6 8a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 6.5H4.5C4.5 13.5 6 12 6 8Zm4.5 10.5a1.5 1.5 0 0 0 3 0',
    chevDown: 'm6 9 6 6 6-6',
    dots: 'M5 12h.01M12 12h.01M19 12h.01',
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d={paths[name]} />
    </svg>
  )
}

const Avatar = ({ initials }) => (
  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-[10px] font-semibold flex items-center justify-center shrink-0">
    {initials}
  </div>
)

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState('My Issues')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All' ? ISSUES : ISSUES.filter((i) => i.status === filter)
  const filters = ['All', 'Todo', 'In Progress', 'In Review', 'Done']
  const totalDone = PROJECTS.reduce((a, p) => a + p.done, 0)
  const totalIssues = PROJECTS.reduce((a, p) => a + p.issues, 0)

  return (
    <div className="min-h-screen bg-white dark:bg-[#090E1A] text-slate-900 dark:text-white flex transition-colors duration-300">

      {/* ─── SIDEBAR (desktop) ─── */}
      <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-slate-200 dark:border-blue-900/20 h-screen sticky top-0">
        <div className="h-16 flex items-center gap-2.5 px-5 border-b border-slate-200 dark:border-blue-900/20">
          <svg width="28" height="28" viewBox="0 0 42 78" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
            <path d="M4 20 L22 39 L4 58" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.25"/>
            <path d="M14 20 L32 39 L14 58" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.55"/>
            <path d="M24 20 L42 39 L24 58" stroke="#F97316" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <span className="font-bold text-sm tracking-tight">Kabul<span className="text-orange-500">Track</span></span>
        </div>

        <div className="px-3 pt-4">
          <button className="w-full flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg px-3 py-2 transition-colors">
            <Icon name="plus" className="w-4 h-4" />
            New issue
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveNav(item.label)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeNav === item.label
                  ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon name={item.icon} />
              {item.label}
            </button>
          ))}

          <p className="px-3 pt-5 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-600">
            Projects
          </p>
          {PROJECTS.map((p) => (
            <button
              key={p.id}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span className={`w-2 h-2 rounded-full ${p.color} shrink-0`} />
              <span className="truncate">{p.name}</span>
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-slate-200 dark:border-blue-900/20 flex items-center gap-2.5">
          <Avatar initials="YA" />
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">Yasir Ahmadi</p>
            <p className="text-xs text-slate-500 dark:text-slate-500 truncate">Project Manager</p>
          </div>
        </div>
      </aside>

      {/* ─── Mobile sidebar drawer ─── */}
      {mobileNavOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-64 bg-white dark:bg-[#0D1526] h-full p-4 flex flex-col gap-1 border-r border-slate-200 dark:border-blue-900/20">
            <div className="flex items-center justify-between mb-4">
              <span className="font-bold text-sm">Kabul<span className="text-orange-500">Track</span></span>
              <button onClick={() => setMobileNavOpen(false)} aria-label="Close menu">
                <Icon name="plus" className="w-5 h-5 rotate-45" />
              </button>
            </div>
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => { setActiveNav(item.label); setMobileNavOpen(false) }}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  activeNav === item.label
                    ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-400'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                <Icon name={item.icon} />
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileNavOpen(false)} />
        </div>
      )}

      {/* ─── MAIN ─── */}
      <div className="flex-1 min-w-0 flex flex-col">

        {/* Topbar */}
        <header className="h-16 shrink-0 flex items-center gap-3 px-4 md:px-6 border-b border-slate-200 dark:border-blue-900/20 bg-white/85 dark:bg-[#090E1A]/85 backdrop-blur-md sticky top-0 z-30">
          <button className="md:hidden text-slate-600 dark:text-slate-300" onClick={() => setMobileNavOpen(true)} aria-label="Open menu">
            <Icon name="board" />
          </button>

          <div className="flex-1 max-w-md flex items-center gap-2 bg-slate-100 dark:bg-white/5 rounded-lg px-3 py-2 text-slate-400 dark:text-slate-500">
            <Icon name="search" className="w-4 h-4" />
            <input
              type="text"
              placeholder="Search issues..."
              className="bg-transparent outline-none text-sm text-slate-700 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 w-full"
            />
            <kbd className="hidden sm:inline text-[10px] font-semibold text-slate-400 dark:text-slate-500 border border-slate-300 dark:border-slate-700 rounded px-1.5 py-0.5">
              ⌘K
            </kbd>
          </div>

          <div className="flex-1" />

          <button className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="Notifications">
            <Icon name="bell" className="w-5 h-5" />
          </button>
          <ThemeToggle />
          <Link to="/" className="hidden sm:inline text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white whitespace-nowrap">
            Log out
          </Link>
        </header>

        {/* Content */}
        <main className="flex-1 px-4 md:px-6 py-6 max-w-6xl w-full mx-auto">

          {/* Page heading */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold">My Issues</h1>
              <p className="text-sm text-slate-500 dark:text-slate-500 mt-0.5">
                {totalDone} of {totalIssues} issues resolved across {PROJECTS.length} projects
              </p>
            </div>
            <button className="hidden sm:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-lg px-3.5 py-2 transition-colors">
              <Icon name="plus" className="w-4 h-4" />
              New issue
            </button>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Open issues', value: totalIssues - totalDone, accent: 'text-blue-600 dark:text-blue-400' },
              { label: 'In progress', value: ISSUES.filter(i => i.status === 'In Progress').length, accent: 'text-orange-500' },
              { label: 'In review', value: ISSUES.filter(i => i.status === 'In Review').length, accent: 'text-orange-500' },
              { label: 'Completed', value: totalDone, accent: 'text-emerald-600 dark:text-emerald-400' },
            ].map((s) => (
              <div key={s.label} className="bg-slate-50 dark:bg-white/[0.04] rounded-xl px-4 py-3.5">
                <p className="text-xs text-slate-500 dark:text-slate-500 mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.accent}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2 mb-3 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 text-sm font-medium px-3 py-1.5 rounded-full transition-colors whitespace-nowrap ${
                  filter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Issues list */}
          <div className="border border-slate-200 dark:border-blue-900/20 rounded-xl overflow-hidden">
            {filtered.map((issue, idx) => (
              <div
                key={issue.id}
                className={`flex items-center gap-3 pl-0 pr-4 py-3 bg-white dark:bg-transparent hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors ${
                  idx !== filtered.length - 1 ? 'border-b border-slate-100 dark:border-blue-900/10' : ''
                }`}
              >
                <span className={`w-1 self-stretch shrink-0 ${PRIORITY_RAIL[issue.priority]}`} />
                <span className={`w-2 h-2 rounded-full shrink-0 ${STATUS_DOT[issue.status]}`} />
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 shrink-0 w-14">{issue.id}</span>
                <span className="text-sm font-medium truncate flex-1 min-w-0">{issue.title}</span>
                <span className="hidden lg:inline text-xs text-slate-400 dark:text-slate-500 shrink-0 max-w-[160px] truncate">
                  {issue.project}
                </span>
                <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-500 shrink-0">{issue.priority}</span>
                <Avatar initials={issue.assignee} />
              </div>
            ))}
            {filtered.length === 0 && (
              <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-10">
                No issues here. Nice and clear.
              </p>
            )}
          </div>

          {/* Projects overview */}
          <h2 className="text-base font-bold mt-10 mb-3">Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {PROJECTS.map((p) => {
              const pct = Math.round((p.done / p.issues) * 100)
              return (
                <div key={p.id} className="border border-slate-200 dark:border-blue-900/20 rounded-xl p-4 hover:border-slate-300 dark:hover:border-blue-900/40 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`w-2.5 h-2.5 rounded-full ${p.color}`} />
                    <p className="text-sm font-semibold truncate">{p.name}</p>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                    <div className={`h-full ${p.color}`} style={{ width: `${pct}%` }} />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-500">{p.done} of {p.issues} issues done · {pct}%</p>
                </div>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
