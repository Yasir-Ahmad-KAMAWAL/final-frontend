import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjects } from '../../hooks/useProjects'
import { useSetPageHeader } from '../../hooks/useSetPageHeader'
import ProjectCard from '../../components/projects/ProjectCard'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import Icon from '../../components/ui/Icon'
import EmptyState from '../../components/ui/EmptyState'
import { PROJECT_STATUS } from '../../utils/constants'

const filters = ['All', ...Object.values(PROJECT_STATUS)]

export default function ProjectListPage() {
  useSetPageHeader({ title: 'Projects', breadcrumb: 'Workspace' })

  const navigate = useNavigate()
  const { projects, loading } = useProjects()
  const [statusFilter, setStatusFilter] = useState('All')

  const filtered =
    statusFilter === 'All'
      ? projects
      : projects.filter((p) => p.status === statusFilter)

  if (loading) {
    return (
      <div className="px-4 md:px-6 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-36 rounded-xl bg-[var(--bg-hover)] animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 md:px-6 py-4 max-w-6xl">
      <div className="flex items-center justify-between mb-4">
        <Tabs tabs={filters} active={statusFilter} onChange={setStatusFilter} />
        <Button size="sm" onClick={() => navigate('/projects/new')}>
          <Icon name="plus" className="w-4 h-4" />
          New project
        </Button>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title={statusFilter === 'All' ? 'No projects yet' : `No ${statusFilter.toLowerCase()} projects`}
          description="Create a project to organize issues and collaborate with your team."
          actionLabel="Create project"
          onAction={() => navigate('/projects/new')}
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      )}
    </div>
  )
}
