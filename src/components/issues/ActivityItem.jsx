import { useState } from 'react'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import Textarea from '../ui/Textarea'

function formatTimestamp(iso) {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now - date
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

function ReplyForm({ onSubmit, onCancel }) {
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    setSubmitting(true)
    await onSubmit(content.trim())
    setContent('')
    setSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="mt-2 pl-3 border-l-2 border-[var(--border-subtle)]">
      <Textarea
        rows={2}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a reply..."
        className="text-[13px]"
      />
      <div className="flex items-center gap-2 mt-2">
        <Button type="submit" size="sm" loading={submitting} disabled={!content.trim()}>
          Reply
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

function CommentActivity({ entry, currentUser, onReply }) {
  const { comment } = entry
  const [showReply, setShowReply] = useState(false)

  const handleReply = async (content) => {
    await onReply(entry._id, content)
    setShowReply(false)
  }

  return (
    <div className="flex gap-3">
      <Avatar name={comment.createdBy.name} src={comment.createdBy.avatar} size="md" />
      <div className="flex-1 min-w-0">
        <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] px-3.5 py-2.5">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-[13px] font-medium text-[var(--text-primary)]">
              {comment.createdBy.name}
            </span>
            <span className="text-[11px] text-[var(--text-muted)]">
              {formatTimestamp(comment.createdAt)}
            </span>
          </div>
          <p className="text-[13px] text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>

        {comment.replies.length > 0 && (
          <ul className="mt-2 space-y-2 pl-3 border-l-2 border-[var(--border-subtle)]">
            {comment.replies.map((reply) => (
              <li key={reply._id} className="flex gap-2.5">
                <Avatar name={reply.createdBy.name} src={reply.createdBy.avatar} size="sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-0.5">
                    <span className="text-[12px] font-medium text-[var(--text-primary)]">
                      {reply.createdBy.name}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">
                      {formatTimestamp(reply.createdAt)}
                    </span>
                  </div>
                  <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                    {reply.content}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {currentUser && !showReply && (
          <button
            type="button"
            onClick={() => setShowReply(true)}
            className="mt-1.5 text-[12px] text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors"
          >
            Reply
          </button>
        )}

        {showReply && (
          <ReplyForm onSubmit={handleReply} onCancel={() => setShowReply(false)} />
        )}
      </div>
    </div>
  )
}

function ActionActivity({ entry }) {
  const { action } = entry

  return (
    <div className="flex items-center gap-2.5 py-0.5">
      <Avatar name={action.createdBy.name} src={action.createdBy.avatar} size="sm" />
      <p className="text-[13px] text-[var(--text-muted)]">
        <span className="font-medium text-[var(--text-secondary)]">{action.createdBy.name}</span>
        {' '}{action.content}
        <span className="mx-1.5 text-[var(--border)]">·</span>
        <span className="text-[11px]">{formatTimestamp(action.createdAt)}</span>
      </p>
    </div>
  )
}

export default function ActivityItem({ entry, currentUser, onReply }) {
  if (entry.type === 'comment') {
    return <CommentActivity entry={entry} currentUser={currentUser} onReply={onReply} />
  }
  return <ActionActivity entry={entry} />
}
