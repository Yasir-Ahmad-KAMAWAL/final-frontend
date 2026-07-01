import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import IssueFavoriteButton from './IssueFavoriteButton'

export default function IssueRow({ issue, showProject = true }) {
  const statusLine = {
    Open: 'bg-orange-400',
    'In Progress': 'bg-blue-400',
    Resolved: 'bg-emerald-400',
  }

  return (
    <Link
      to={`/issues/${issue._id}`}
      className="group flex items-center gap-3 px-3 py-2.5 hover:bg-[var(--bg-hover)] transition-colors"
    >
      <span className={`w-[3px] h-6 rounded-full shrink-0 self-center ${statusLine[issue.status] || 'bg-slate-400'}`} />
      <span className="text-[12px] font-mono text-[var(--text-muted)] w-[56px] shrink-0">{issue.key}</span>
      <IssueFavoriteButton issue={issue} />
      <span className="text-[13px] text-[var(--text-primary)] truncate flex-1 min-w-0 group-hover:text-[var(--accent)] transition-colors">
        {issue.title}
      </span>

      <div className="ml-auto flex items-center gap-0.5 shrink-0">
        {showProject && issue.projectName && (
          <span className="hidden lg:inline text-[11px] text-[var(--text-muted)] truncate w-[120px] text-right">
            {issue.projectName}
          </span>
        )}
        <div className="flex justify-center w-[58px] shrink-0">
          <Badge type="priority">{issue.priority}</Badge>
        </div>
        <div className="flex justify-center w-[24px] shrink-0">
          {issue.assignees[0] && <Avatar name={issue.assignees[0].name} src={issue.assignees[0].avatar} size="sm" />}
        </div>
        <span className="text-[11px] text-[var(--text-muted)] shrink-0 hidden sm:block w-[56px] text-right">
          {new Date(issue.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </span>
      </div>
    </Link>
  )
}
