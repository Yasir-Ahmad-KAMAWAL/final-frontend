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

  return (
    <div className="px-4 md:px-6 py-4 max-w-5xl">
      {/* View tabs */}
      <div className="flex items-center justify-between mb-4">
        <Tabs tabs={viewTabs} active={viewTab} onChange={setViewTab} />
        <button className="p-1.5 rounded-md text-[var(--text-muted)] hover:bg-[var(--bg-hover)]" aria-label="Display options">
          <Icon name="filter" className="w-4 h-4" />
        </button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Open issues', value: totalIssues - totalResolved },
          { label: 'In progress', value: issues.filter((i) => i.status === 'In Progress').length },
          { label: 'Projects', value: projects.length },
          { label: 'Completed', value: totalResolved },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2.5">
            <p className="text-[11px] text-[var(--text-muted)] mb-0.5">{s.label}</p>
            <p className="text-xl font-semibold text-[var(--text-primary)]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Issue groups — Linear-style */}
      <div className="space-y-4">
        {grouped.map((group) => (
          <section key={group.status}>
            <div className="flex items-center gap-2 mb-1 px-1">
              <button className="p-0.5 text-[var(--text-muted)] hover:text-[var(--text-secondary)]">
                <Icon name="chevDown" className="w-3.5 h-3.5" />
              </button>
              <span className="text-[13px] font-medium text-[var(--text-secondary)]">{group.label}</span>
              <span className="text-[12px] text-[var(--text-muted)]">{group.issues.length}</span>
              <button className="ml-auto p-0.5 rounded text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-secondary)]">
                <Icon name="plus" className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="rounded-lg border border-[var(--border-subtle)] overflow-hidden divide-y divide-[var(--border-subtle)]">
              {group.issues.map((issue) => (
                <IssueRow key={issue._id} issue={issue} />
              ))}
            </div>
          </section>
        ))}

        {filteredIssues.length === 0 && (
          <div className="text-center py-16 border border-dashed border-[var(--border)] rounded-lg">
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
        <Link to="/projects" className="text-xs text-[var(--accent)] hover:opacity-80 font-medium">
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
