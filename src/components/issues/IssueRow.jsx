import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import IssueFavoriteButton from './IssueFavoriteButton'

export default function IssueRow({ issue, showProject = true }) {
  const statusDot = {
    Open: 'border-[var(--text-muted)]',
    'In Progress': 'border-amber-500',
    Resolved: 'border-emerald-500 bg-emerald-500/20',
  }

  return (
    <Link
      to={`/issues/${issue._id}`}
      className="group flex items-center gap-2.5 px-3 py-2.5 hover:bg-[var(--bg-hover)] transition-colors"
    >
      <span className="text-[12px] font-mono text-[var(--text-muted)] w-12 shrink-0">{issue.key}</span>
      <IssueFavoriteButton issue={issue} />
      <span className={`w-3 h-3 rounded-full border-2 shrink-0 ${statusDot[issue.status]}`} />
      <span className="text-[13px] text-[var(--text-primary)] truncate flex-1 min-w-0 group-hover:text-[var(--accent)] transition-colors">
        {issue.title}
      </span>
      {showProject && issue.projectName && (
        <span className="hidden lg:inline text-[11px] text-[var(--text-muted)] truncate max-w-[140px] shrink-0">
          {issue.projectName}
        </span>
      )}
      <Badge type="priority">{issue.priority}</Badge>
      {issue.assignees[0] && <Avatar name={issue.assignees[0].name} src={issue.assignees[0].avatar} size="sm" />}
      <span className="text-[11px] text-[var(--text-muted)] shrink-0 hidden sm:inline">
        {new Date(issue.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </span>
    </Link>
  )
}
