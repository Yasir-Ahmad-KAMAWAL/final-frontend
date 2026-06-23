import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useProjects } from '../../hooks/useProjects'
import { useSetPageHeader } from '../../hooks/useSetPageHeader'
import ProjectForm from '../../components/projects/ProjectForm'
import Icon from '../../components/ui/Icon'

export default function CreateProjectPage() {
  useSetPageHeader({ title: 'New project', breadcrumb: 'Projects' })

  const navigate = useNavigate()
  const { createProject } = useProjects()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      const project = await createProject(data)
      toast.success('Project created')
      navigate(`/projects/${project._id}`)
    } catch {
      toast.error('Failed to create project')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 md:px-6 py-4 max-w-2xl">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors"
      >
        <Icon name="chevRight" className="w-3.5 h-3.5 rotate-180" />
        Back to projects
      </Link>

      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Create a new project</h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        Projects help you organize issues, track progress, and manage your team.
      </p>

      <ProjectForm onSubmit={handleSubmit} loading={loading} submitLabel="Create project" />
    </div>
  )
}
