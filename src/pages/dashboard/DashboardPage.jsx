import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useIssues } from '../../hooks/useIssues'
import { useProjects } from '../../hooks/useProjects'
import { useSetPageHeader } from '../../hooks/useSetPageHeader'
import ProjectCard from '../../components/projects/ProjectCard'
import IssueRow from '../../components/issues/IssueRow'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import Icon from '../../components/ui/Icon'

const GROUP_ORDER = ['Open', 'In Progress', 'Resolved']
const GROUP_LABELS = { Open: 'Todo', 'In Progress': 'In Progress', Resolved: 'Done' }

// Color config per group
const GROUP_COLORS = {
  Open: {
    badge: 'bg-orange-100 text-orange-800 border border-orange-200',
    addBtn: 'hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50',
    section: 'border-orange-100',
  },
  'In Progress': {
    badge: 'bg-blue-100 text-blue-800 border border-blue-200',
    addBtn: 'hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50',
    section: 'border-blue-100',
  },
  Resolved: {
    badge: 'bg-green-100 text-green-800 border border-green-200',
    addBtn: 'hover:border-green-400 hover:text-green-500 hover:bg-green-50',
    section: 'border-green-100',
  },
}

// Summary card config
const STAT_STYLES = [
  {
    label: 'Open issues',
    border: 'border-blue-200',
    hover: 'hover:border-blue-400 hover:shadow-[0_0_0_3px_#dbeafe]',
    value: 'text-blue-700',
  },
  {
    label: 'In progress',
    border: 'border-orange-200',
    hover: 'hover:border-orange-400 hover:shadow-[0_0_0_3px_#ffedd5]',
    value: 'text-orange-600',
  },
  {
    label: 'Projects',
    border: 'border-blue-200',
    hover: 'hover:border-blue-400 hover:shadow-[0_0_0_3px_#dbeafe]',
    value: 'text-blue-700',
  },
  {
    label: 'Completed',
    border: 'border-green-200',
    hover: 'hover:border-green-400 hover:shadow-[0_0_0_3px_#dcfce7]',
    value: 'text-green-700',
  },
]

export default function DashboardPage() {
  useSetPageHeader({ title: 'My Issues', breadcrumb: 'KabulTrack' })

  const navigate = useNavigate()
  const { projects } = useProjects()
  const { issues } = useIssues()
  const [viewTab, setViewTab] = useState('Active')
  const viewTabs = ['All issues', 'Active', 'Backlog']

  const totalIssues = projects.reduce((a, p) => a + p.issueCount, 0)
  const totalResolved = projects.reduce((a, p) => a + p.resolvedCount, 0)

  const filteredIssues =
    viewTab === 'Backlog'
      ? issues.filter((i) => i.status === 'Open')
      : viewTab === 'Active'
        ? issues.filter((i) => i.status !== 'Resolved')
        : issues

  const grouped = GROUP_ORDER.map((status) => ({
    status,
    label: GROUP_LABELS[status],
    issues: filteredIssues.filter((i) => i.status === status),
  })).filter((g) => g.issues.length > 0 || viewTab === 'All issues')

  const stats = [
    totalIssues - totalResolved,
    issues.filter((i) => i.status === 'In Progress').length,
    projects.length,
    totalResolved,
  ]

  return (
    <div className="px-4 md:px-6 py-4 max-w-5xl">

      {/* View tabs + filter */}
      <div className="flex items-center justify-between mb-4">
        <Tabs tabs={viewTabs} active={viewTab} onChange={setViewTab} />
        <button
          className="p-1.5 rounded-md text-[var(--text-muted)] border border-transparent hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50 transition-all duration-150"
          aria-label="Display options"
        >
          <Icon name="filter" className="w-4 h-4" />
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {STAT_STYLES.map((s, i) => (
          <div
            key={s.label}
            className={`rounded-xl border-[1.5px] px-4 py-3 transition-all duration-200 cursor-default ${s.bg} ${s.border} ${s.hover}`}
          >
            <p className="text-[11px] uppercase tracking-wide font-medium text-[var(--text-muted)] mb-1">
              {s.label}
            </p>
            <p className={`text-3xl font-semibold ${s.value}`}>{stats[i]}</p>
          </div>
        ))}
      </div>

      {/* Issue groups */}
      <div className="space-y-4">
        {grouped.map((group) => {
          const colors = GROUP_COLORS[group.status]
          return (
            <section key={group.status}>
              <div className="flex items-center gap-2 mb-1.5 px-1">
                <button className="p-0.5 text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                  <Icon name="chevDown" className="w-3.5 h-3.5" />
                </button>
                <span className="text-[13px] font-medium text-[var(--text-secondary)]">
                  {group.label}
                </span>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${colors.badge}`}
                >
                  {group.issues.length}
                </span>
                <button
                  className={`ml-auto p-0.5 rounded border border-transparent text-[var(--text-muted)] transition-all duration-150 ${colors.addBtn}`}
                >
                  <Icon name="plus" className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden divide-y divide-[var(--border-subtle)]">
                {group.issues.map((issue) => (
                  <IssueRow key={issue._id} issue={issue} />
                ))}
              </div>
            </section>
          )
        })}

        {filteredIssues.length === 0 && (
          <div className="text-center py-16 border border-dashed border-orange-200 rounded-xl bg-orange-50/40">
            <p className="text-sm text-[var(--text-muted)] mb-3">No issues in this view</p>
            <Button size="sm" onClick={() => navigate('/issues/new')}>
              <Icon name="plus" className="w-4 h-4" />
              Create issue
            </Button>
          </div>
        )}
      </div>

      {/* Projects strip */}
      <div className="flex items-center justify-between mt-10 mb-3">
        <h2 className="text-sm font-semibold text-[var(--text-secondary)]">Projects</h2>
        <Link
          to="/projects"
          className="text-xs text-blue-600 hover:text-orange-500 font-medium transition-colors duration-150"
        >
          View all
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {projects.slice(0, 3).map((p) => (
          <ProjectCard key={p._id} project={p} />
        ))}
      </div>
    </div>
  )
}
