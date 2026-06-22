import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import { useIssues } from '../../hooks/useIssues'
import { useProjects } from '../../hooks/useProjects'
import { useSetPageHeader } from '../../hooks/useSetPageHeader'
import IssueStatusSelect from '../../components/issues/IssueStatusSelect'
import ActivityFeed from '../../components/issues/ActivityFeed'
import AssigneePicker from '../../components/issues/AssigneePicker'
import SubIssueList from '../../components/issues/SubIssueList'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import Icon from '../../components/ui/Icon'
import { ConfirmModal } from '../../components/ui/Modal'

export default function IssueDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { getProjectById } = useProjects()
  const { getIssueById, updateIssue, deleteIssue, toggleFavorite, toggleSubIssue, addSubIssue } = useIssues()
  const issue = getIssueById(id)
  const [showDelete, setShowDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [assigneeIds, setAssigneeIds] = useState([])
  const [savingAssignees, setSavingAssignees] = useState(false)

  useEffect(() => {
    if (issue) setAssigneeIds(issue.assignees.map((a) => a._id))
  }, [issue?._id, issue?.assignees])

  useSetPageHeader({
    title: issue ? `${issue.key}` : 'Issue',
    breadcrumb: issue?.projectName || 'Issues',
  })

  if (!issue) {
    return (
      <div className="px-4 md:px-6 py-16 text-center">
        <p className="text-sm text-[var(--text-muted)] mb-4">Issue not found</p>
        <Button size="sm" onClick={() => navigate('/issues')}>Back to issues</Button>
      </div>
    )
  }

  const project = issue ? getProjectById(issue.projectId) : null
  const teamUsers = project?.team || []

  const isFavorited = user && issue.favorite.some((f) => String(f) === String(user._id))

  const handleStatusChange = async (status) => {
    await updateIssue(id, { status, actor: user })
    toast.success('Status updated')
  }

  const handleFavorite = async () => {
    if (!user) return
    await toggleFavorite(id)
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites')
  }

  const handleAssigneesChange = async (ids) => {
    const previous = assigneeIds
    setAssigneeIds(ids)
    setSavingAssignees(true)
    try {
      await updateIssue(id, { assigneeIds: ids, actor: user })
      toast.success('Assignees updated')
    } catch {
      setAssigneeIds(previous)
      toast.error('Failed to update assignees')
    } finally {
      setSavingAssignees(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    await deleteIssue(id)
    toast.success('Issue deleted')
    navigate('/issues')
  }

  return (
    <div className="px-4 md:px-6 py-4 max-w-3xl">
      {/* Header */}
      <div className="flex items-start gap-3 mb-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[12px] font-mono text-[var(--text-muted)]">{issue.key}</span>
            <Badge type="priority">{issue.priority}</Badge>
            {issue.projectName && (
              <Link to={`/projects/${issue.projectId}`} className="text-[11px] text-[var(--accent)] hover:opacity-80">
                {issue.projectName}
              </Link>
            )}
          </div>
          <h2 className="text-xl font-semibold text-[var(--text-primary)]">{issue.title}</h2>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleFavorite}
            className={`p-1.5 rounded-md transition-colors ${
              isFavorited ? 'text-amber-400' : 'text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'
            }`}
            aria-label="Toggle favorite"
          >
            <Icon name="star" className="w-4 h-4" />
          </button>
          <IssueStatusSelect value={issue.status} onChange={handleStatusChange} />
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-[var(--border-subtle)]">
        <div className="w-full sm:w-auto">
          <p className="text-[11px] text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">
            Assignees{savingAssignees ? ' · Saving…' : ''}
          </p>
          <AssigneePicker
            users={teamUsers}
            value={assigneeIds}
            onChange={handleAssigneesChange}
            disabled={savingAssignees}
          />
        </div>
        <div>
          <p className="text-[11px] text-[var(--text-muted)] mb-1.5 uppercase tracking-wide">Updated</p>
          <p className="text-[13px] text-[var(--text-secondary)]">
            {new Date(issue.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      {/* Description */}
      <section className="mb-8">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Description</h3>
        <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
          {issue.description || 'No description provided.'}
        </p>
      </section>

      {/* Sub-issues */}
      <section className="mb-8 pb-8 border-b border-[var(--border-subtle)]">
        <SubIssueList
          subIssues={issue.subIssues}
          onToggle={(subId) => toggleSubIssue(id, subId)}
          onAdd={(title) => addSubIssue(id, title)}
        />
      </section>

      {/* Attachment placeholder */}
      <section className="mb-8 pb-8 border-b border-[var(--border-subtle)]">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-2">Attachment</h3>
        {issue.file ? (
          <a href={issue.file} className="text-sm text-[var(--accent)] hover:opacity-80">{issue.file}</a>
        ) : (
          <div className="border border-dashed border-[var(--border)] rounded-lg p-6 text-center">
            <p className="text-sm text-[var(--text-muted)] mb-2">No file attached</p>
            <Button variant="secondary" size="sm" disabled>
              Upload file (coming soon)
            </Button>
          </div>
        )}
      </section>

      <section className="mb-8">
        <ActivityFeed issueId={id} refreshDep={issue.updatedAt} />
      </section>

      <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>
        Delete issue
      </Button>

      <ConfirmModal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={handleDelete}
        title="Delete issue"
        message={`Delete "${issue.title}"? This cannot be undone.`}
        confirmLabel="Delete"
        loading={deleting}
        danger
      />
    </div>
  )
}
