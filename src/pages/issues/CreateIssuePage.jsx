import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useIssues } from '../../hooks/useIssues'
import { useProjects } from '../../hooks/useProjects'
import { useSetPageHeader } from '../../hooks/useSetPageHeader'
import IssueForm from '../../components/issues/IssueForm'
import Icon from '../../components/ui/Icon'

export default function CreateIssuePage() {
  useSetPageHeader({ title: 'New issue', breadcrumb: 'Issues' })

  const navigate = useNavigate()
  const { createIssue } = useIssues()
  const { projects } = useProjects()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (data) => {
    try {
      setLoading(true)
      const issue = await createIssue(data)
      toast.success('Issue created')
      navigate(`/issues/${issue._id}`)
    } catch {
      toast.error('Failed to create issue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-4 md:px-6 py-4 max-w-2xl">
      <Link
        to="/issues"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] mb-6 transition-colors"
      >
        <Icon name="chevRight" className="w-3.5 h-3.5 rotate-180" />
        Back to issues
      </Link>

      <h2 className="p-2 text-lg rounded-sm font-semibold text-blue-600 mb-1 bg-blue-500/10 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]">
      Create issue
      </h2>
      <p className="p-2 text-sm text-[var(--text-muted)] mb-6">
        Add a new issue to track work across your projects.
      </p>

      <IssueForm projects={projects} onSubmit={handleSubmit} loading={loading} />
    </div>
  )
}
