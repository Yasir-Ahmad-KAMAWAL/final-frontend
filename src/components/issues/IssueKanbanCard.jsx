import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import IssueFavoriteButton from './IssueFavoriteButton'

export default function IssueKanbanCard({ issue }) {
  return (
    <Link
      to={`/issues/${issue._id}`}
      className="block rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-3 hover:border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[11px] font-mono text-[var(--text-muted)]">{issue.key}</span>
        <div className="flex items-center gap-1.5 ml-auto">
          <IssueFavoriteButton issue={issue} />
          <Badge type="priority">{issue.priority}</Badge>
        </div>
      </div>
      <p className="text-[13px] font-medium text-[var(--text-primary)] line-clamp-2 mb-3">{issue.title}</p>
      <div className="flex items-center justify-between">
        {issue.projectName && (
          <span className="text-[10px] text-[var(--text-muted)] truncate max-w-[120px]">{issue.projectName}</span>
        )}
        {issue.assignees[0] ? (
          <Avatar name={issue.assignees[0].name} src={issue.assignees[0].avatar} size="sm" />
        ) : (
          <span />
        )}
      </div>
    </Link>
  )
}
