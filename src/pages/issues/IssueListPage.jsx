import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useIssues } from '../../hooks/useIssues'
import { useSetPageHeader } from '../../hooks/useSetPageHeader'
import { ISSUE_STATUS, ISSUE_PRIORITY } from '../../utils/constants'
import IssueKanbanBoard from '../../components/issues/IssueKanbanBoard'
import IssueRow from '../../components/issues/IssueRow'
import Tabs from '../../components/ui/Tabs'
import Button from '../../components/ui/Button'
import Icon from '../../components/ui/Icon'
import EmptyState from '../../components/ui/EmptyState'
import Dropdown from '../../components/ui/Dropdown'

const viewModes = ['Board', 'List']
const statusFilters = ['All', ...Object.values(ISSUE_STATUS)]
const priorityFilters = ['All', ...Object.values(ISSUE_PRIORITY)]

export default function IssueListPage() {
  useSetPageHeader({ title: 'Issues', breadcrumb: 'KabulTrack' })

  const navigate = useNavigate()
  const { issues, loading } = useIssues()
  const [viewMode, setViewMode] = useState('Board')
  const [statusFilter, setStatusFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('All')

  const filtered = useMemo(() => {
    let result = issues
    if (statusFilter !== 'All') result = result.filter((i) => i.status === statusFilter)
    if (priorityFilter !== 'All') result = result.filter((i) => i.priority === priorityFilter)
    return result
  }, [issues, statusFilter, priorityFilter])

  if (loading) {
    return (
      <div className="px-4 md:px-6 py-8">
        <div className="h-64 rounded-xl bg-[var(--bg-hover)] animate-pulse" />
      </div>
    )
  }

  return (
    <div className="px-4 md:px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <Tabs tabs={statusFilters} active={statusFilter} onChange={setStatusFilter} />
        </div>
        <div className="flex items-center gap-2 sm:ml-auto">
          <Dropdown
            value={priorityFilter}
            onChange={setPriorityFilter}
            options={priorityFilters.map((p) => ({ value: p, label: p === 'All' ? 'All priorities' : p }))}
            triggerClassName="font-bold inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs bg-transparent text-blue-700 shadow-[0_0_0_1px_#3b82f6,0_0_8px_-2px_#3b82f6] transition-shadow duration-200 hover:shadow-[0_0_0_1px_#3b82f6,0_0_16px_-2px_#3b82f6]"
            menuClassName="min-w-[140px]"
          />
          <div className="flex rounded-lg border border-[var(--border)] overflow-hidden">
            {viewModes.map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`font-bold flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-md transition-shadow duration-200 ${
                  viewMode === mode
                    ? 'bg-transparent text-blue-700 shadow-[0_0_0_1px_#3b82f6,0_0_8px_-2px_#3b82f6]'
                    : 'text-[var(--text-muted)] hover:text-orange-600 hover:shadow-[0_0_0_1px_#f97316,0_0_8px_-2px_#f97316]'
                }`}
                >
                  <Icon name={mode === 'Board' ? 'board' : 'list'} className="w-3.5 h-3.5" />
                  {mode}
              </button>
            ))}
          </div>
          <Button
            size="sm"
            onClick={() => navigate('/issues/new')}
            className="bg-transparent shadow-[0_0_0_1px_#f97316,0_0_8px_-2px_#f97316] hover:shadow-[0_0_0_1px_#f97316,0_0_16px_-2px_#f97316] transition-shadow duration-200"
          >
            <Icon name="plus" className="w-4 h-4 text-orange-600" />
            <span className="text-orange-600 font-semibold text-[13px]">New issue</span>
          </Button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No issues found"
          description="Try adjusting filters or create a new issue."
          actionLabel="Create issue"
          onAction={() => navigate('/issues/new')}
          icon="issues"
        />
      ) : viewMode === 'Board' ? (
        <IssueKanbanBoard issues={filtered} />
      ) : (
        <div className="rounded-lg border border-[var(--border-subtle)] overflow-hidden divide-y divide-[var(--border-subtle)]">
          {filtered.map((issue) => (
            <IssueRow key={issue._id} issue={issue} />
          ))}
        </div>
      )}
    </div>
  )
}
