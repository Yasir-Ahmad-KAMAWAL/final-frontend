import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useProjects } from '../../hooks/useProjects'
import { useIssues } from '../../hooks/useIssues'
import { useSetPageHeader } from '../../hooks/useSetPageHeader'
import ProjectStatusSelect from '../../components/projects/ProjectStatusSelect'
import IssueRow from '../../components/issues/IssueRow'
import Avatar from '../../components/ui/Avatar'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import Icon from '../../components/ui/Icon'

const detailTabs = ['Issues', 'Overview']

export default function ProjectDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProjectById, updateProject } = useProjects()
  const { getIssuesByProject } = useIssues()
  const project = getProjectById(id)
  const [activeTab, setActiveTab] = useState('Issues')
  const projectIssues = getIssuesByProject(id)

  useSetPageHeader({
    title: project?.name || 'Project',
    breadcrumb: 'Projects',
  })

  if (!project) {
    return (
      <div className="px-4 md:px-6 py-16 text-center">
        <p className="text-sm text-[var(--text-muted)] mb-4">Project not found</p>
        <Button size="sm" onClick={() => navigate('/projects')}>
          Back to projects
        </Button>
      </div>
    )
  }

  const handleStatusChange = async (status) => {
    try {
      await updateProject(id, { status })
      toast.success('Status updated')
    } catch {
      toast.error('Failed to update status')
    }
  }

  const pct = project.issueCount
    ? Math.round((project.resolvedCount / project.issueCount) * 100)
    : 0

  return (
    <div className="px-4 md:px-6 py-4 max-w-5xl">
      {/* Project header */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span
            className="w-4 h-4 rounded mt-1 shrink-0"
            style={{ backgroundColor: project.color }}
          />
          <div className="min-w-0">
            <h2 className="text-lg font-semibold text-[var(--text-primary)] truncate">{project.name}</h2>
            {project.description && (
              <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">{project.description}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <ProjectStatusSelect
            value={project.status}
            onChange={handleStatusChange}
            size="sm"
          />
          <Link to={`/projects/${id}/settings`}>
            <Button variant="secondary" size="sm">
              <Icon name="settings" className="w-4 h-4" />
              Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Total issues', value: project.issueCount },
          { label: 'Resolved', value: project.resolvedCount },
          { label: 'Progress', value: `${pct}%` },
          { label: 'Team', value: project.team.length },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3 py-2.5">
            <p className="text-[11px] text-[var(--text-muted)]">{s.label}</p>
            <p className="text-lg font-semibold text-[var(--text-primary)]">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-4 border-b border-[var(--border-subtle)] pb-2">
        <Tabs tabs={detailTabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === 'Issues' && (
        <div className="rounded-lg border border-[var(--border-subtle)] overflow-hidden divide-y divide-[var(--border-subtle)]">
          {projectIssues.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)] text-center py-10">
              No issues in this project yet.
            </p>
          ) : (
            projectIssues.map((issue) => (
              <IssueRow key={issue._id} issue={issue} showProject={false} />
            ))
          )}
        </div>
      )}

      {activeTab === 'Overview' && (
        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Description</h3>
            <p className="text-sm text-[var(--text-primary)] leading-relaxed">
              {project.description || 'No description provided.'}
            </p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Team members</h3>
            {project.team.length === 0 ? (
              <p className="text-sm text-[var(--text-muted)]">No team members assigned.</p>
            ) : (
              <ul className="space-y-2">
                {project.team.map((member) => (
                  <li key={member._id} className="flex items-center gap-2.5">
                    <Avatar name={member.name} src={member.avatar} size="md" />
                    <div>
                      <p className="text-[13px] font-medium">{member.name}</p>
                      <p className="text-[11px] text-[var(--text-muted)]">{member.email}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="text-[11px] text-[var(--text-muted)]">
            Created {new Date(project.createdAt).toLocaleDateString()} · Updated {new Date(project.updatedAt).toLocaleDateString()}
          </section>
        </div>
      )}
    </div>
  )
}
