import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useProjects } from '../../hooks/useProjects'
import { useSetPageHeader } from '../../hooks/useSetPageHeader'
import ProjectForm from '../../components/projects/ProjectForm'
import TeamMemberList from '../../components/projects/TeamMemberList'
import { ConfirmModal } from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import Icon from '../../components/ui/Icon'

export default function ProjectSettingsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getProjectById, updateProject, deleteProject, addTeamMember, removeTeamMember } = useProjects()
  const project = getProjectById(id)
  const [saving, setSaving] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useSetPageHeader({
    title: project ? `${project.name} · Settings` : 'Settings',
    breadcrumb: 'Projects',
  })

  if (!project) {
    return (
      <div className="px-4 md:px-6 py-16 text-center">
        <p className="text-sm text-[var(--text-muted)] mb-4">Project not found</p>
        <Button size="sm" onClick={() => navigate('/projects')}>Back to projects</Button>
      </div>
    )
  }

  const handleSave = async (data) => {
    try {
      setSaving(true)
      await updateProject(id, data)
      toast.success('Project updated')
    } catch {
      toast.error('Failed to update project')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    try {
      setDeleting(true)
      await deleteProject(id)
      toast.success('Project deleted')
      navigate('/projects')
    } catch {
      toast.error('Failed to delete project')
    } finally {
      setDeleting(false)
      setShowDeleteModal(false)
    }
  }

  const handleRemoveMember = async (userId) => {
    await removeTeamMember(id, userId)
    toast.success('Team member removed')
  }

  return (
    <div className="px-4 md:px-6 py-4 max-w-2xl">
      <Link
        to={`/projects/${id}`}
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors"
      >
        <Icon name="chevRight" className="w-3.5 h-3.5 rotate-180" />
        Back to project
      </Link>

      <section className="mb-10">
        <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">General</h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">Update project name, description, and status.</p>
        <ProjectForm
          key={project.updatedAt}
          initial={project}
          onSubmit={handleSave}
          loading={saving}
          submitLabel="Save changes"
        />
      </section>

      <section className="mb-10 pb-10 border-b border-[var(--border-subtle)]">
        <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">Team</h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Add members by email. Available: sara.hassan@kabultrack.io, nadia.qureshi@kabultrack.io
        </p>
        <TeamMemberList
          project={project}
          onAdd={(email) => addTeamMember(id, email)}
          onRemove={handleRemoveMember}
        />
      </section>

      <section>
        <h2 className="text-base font-semibold text-red-500 mb-1">Danger zone</h2>
        <p className="text-sm text-[var(--text-muted)] mb-4">
          Permanently delete this project and all associated data. This cannot be undone.
        </p>
        <Button variant="danger" size="sm" onClick={() => setShowDeleteModal(true)}>
          Delete project
        </Button>
      </section>

      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete project"
        message={`Are you sure you want to delete "${project.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        danger
      />
    </div>
  )
}
