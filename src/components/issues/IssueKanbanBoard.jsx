import { ISSUE_STATUS } from '../../utils/constants'
import IssueKanbanCard from './IssueKanbanCard'

const columns = Object.values(ISSUE_STATUS)

export default function IssueKanbanBoard({ issues }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-4">
      {columns.map((status) => {
        const columnIssues = issues.filter((i) => i.status === status)
        return (
          <div key={status} className="flex-shrink-0 w-[280px] flex flex-col">
            <div className="flex items-center gap-2 mb-2 px-1">
              <span className="text-[14px] text-blue-700 font-medium text-[var(--text-secondary)]">{status}</span>
              <span className="text-[15px] font-semibold text-blue-700 text-[var(--text-muted)]">{columnIssues.length}</span>
            </div>
            <div className="flex-1 rounded-lg bg-[var(--bg-hover)]/50 border border-blue-400/50 p-2 space-y-2 min-h-[200px]">
              {columnIssues.map((issue) => (
                <IssueKanbanCard key={issue._id} issue={issue} />
              ))}
              {columnIssues.length === 0 && (
                <p className="text-[11px] text-[var(--text-muted)] text-center py-8">No issues</p>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
