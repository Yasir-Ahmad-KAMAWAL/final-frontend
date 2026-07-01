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

// Summary card config
// Summary card config — colored left border + matching value text, like the reference dashboard
const STAT_STYLES = [
  {
    label: 'Open issues',
    accent: 'border-l-blue-500',
    value: 'text-blue-700',
  },
  {
    label: 'In progress',
    accent: 'border-l-orange-500',
    value: 'text-orange-600',
  },
  {
    label: 'Projects',
    accent: 'border-l-purple-500',
    value: 'text-purple-700',
  },
  {
    label: 'Completed',
    accent: 'border-l-green-500',
    value: 'text-green-700',
  },
]

export default function DashboardPage() {
  useSetPageHeader({ title: 'My Issues', breadcrumb: 'KabulTrack' })

  const navigate = useNavigate()
  const { projects } = useProjects()
  const { issues } = useIssues()
  const [viewTab, setViewTab] = useState('All Issues')
  const viewTabs = ['All Issues', 'Todo', 'In Progress']

  const totalIssues = projects.reduce((a, p) => a + p.issueCount, 0)
  const totalResolved = projects.reduce((a, p) => a + p.resolvedCount, 0)

  const filteredIssues =
    viewTab === 'Todo'
      ? issues.filter((i) => i.status === 'Open')
      : viewTab === 'In Progress'
        ? issues.filter((i) => i.status === 'In Progress')
        : issues

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
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {STAT_STYLES.map((s, i) => (
          <div
            key={s.label}
            className={`bg-transparent rounded-lg border border-[var(--border-subtle,#e5e7eb)] border-l-4 ${s.accent} px-4 py-3 transition-shadow duration-150 cursor-default hover:shadow-sm`}
          >
            <p className="text-[11px] uppercase tracking-wide font-medium text-[var(--text-muted)] mb-1">
              {s.label}
            </p>
            <p className={`text-3xl font-semibold ${s.value}`}>{stats[i]}</p>
          </div>
        ))}
      </div>

      {/* Issue list */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-orange-200 rounded-xl bg-orange-50/40">
            <p className="text-sm text-[var(--text-muted)] mb-3">No issues in this view</p>
            <Button size="sm" onClick={() => navigate('/issues/new')}>
              <Icon name="plus" className="w-4 h-4" />
              Create issue
            </Button>
          </div>
        ) : (
          <div className="rounded-xl border border-[var(--border-subtle)] overflow-hidden divide-y divide-[var(--border-subtle)]">
            {filteredIssues.map((issue) => (
              <IssueRow key={issue._id} issue={issue} />
            ))}
          </div>
        )}
      </div>

      {/* Projects strip */}
      <div className="flex items-center justify-between mt-10 mb-3">
        <h2 className="text-sm font-semibold text-blue-700 px-1.5 py-0.5 rounded shadow-[0_0_0_1px_#3b82f6,0_0_8px_-2px_#3b82f6]">Projects</h2>
        <Link
          to="/projects"
          className="text-xs shadow-[0_0_0_1px_#f97316,0_0_8px_-2px_#f97316] p-1 rounded-sm text-blue-600 hover:text-orange-500 font-medium transition-colors duration-150"
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
