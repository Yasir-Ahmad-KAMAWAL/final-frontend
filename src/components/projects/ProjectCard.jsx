import { Link } from 'react-router-dom'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'

export default function ProjectCard({ project }) {
  const pct = project.issueCount
    ? Math.round((project.resolvedCount / project.issueCount) * 100)
    : 0

  return (
    <Link
      to={`/projects/${project._id}`}
      className="block rounded-xl bg-[var(--bg-card)] p-4 shadow-[0_0_0_1px_#3b82f6] hover:shadow-[0_0_0_1px_#f97316,0_0_8px_-2px_#f97316] transition-shadow group"
    >
      <div className="flex items-start gap-3 mb-3">
        <span
          className="w-3 h-3 rounded mt-1 shrink-0"
          style={{ backgroundColor: project.color }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-[13px] font-semibold text-[var(--text-primary)] truncate group-hover:text-[var(--accent)] transition-colors">
            {project.name}
          </h3>
          {project.description && (
            <p className="text-[12px] text-[var(--text-muted)] line-clamp-2 mt-1">
              {project.description}
            </p>
          )}
        </div>
        <Badge>{project.status}</Badge>
      </div>

      <div className="w-full h-1 bg-[var(--bg-hover)] rounded-full overflow-hidden mb-2">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, backgroundColor: project.color }}
        />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[11px] text-[var(--text-muted)]">
          {project.resolvedCount}/{project.issueCount} issues · {pct}%
        </p>
        <div className="flex -space-x-1.5">
          {project.team.slice(0, 3).map((member) => (
            <Avatar key={member._id} name={member.name} src={member.avatar} size="sm" className="ring-2 ring-[var(--bg-card)]" />
          ))}
          {project.team.length > 3 && (
            <span className="w-5 h-5 rounded-full bg-[var(--bg-hover)] text-[9px] font-medium flex items-center justify-center text-[var(--text-muted)] ring-2 ring-[var(--bg-card)]">
              +{project.team.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
