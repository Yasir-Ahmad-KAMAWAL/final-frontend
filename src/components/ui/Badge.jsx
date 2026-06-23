const statusStyles = {
  Open: 'bg-slate-500/15 text-slate-600 dark:text-slate-300',
  'In Progress': 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
  Resolved: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
  Pending: 'bg-slate-500/15 text-slate-600 dark:text-slate-300',
  Completed: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400',
}

const priorityStyles = {
  Low: 'bg-slate-500/15 text-slate-600 dark:text-slate-400',
  Medium: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
  High: 'bg-red-500/15 text-red-700 dark:text-red-400',
}

export default function Badge({ children, type = 'status', className = '' }) {
  const styles = type === 'priority' ? priorityStyles : statusStyles
  const colorClass = styles[children] || 'bg-[var(--bg-hover)] text-[var(--text-secondary)]'

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${colorClass} ${className}`}>
      {children}
    </span>
  )
}
