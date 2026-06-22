import { useState } from 'react'
import Icon from '../ui/Icon'
import Button from '../ui/Button'

export default function SubIssueList({ subIssues, onToggle, onAdd }) {
  const [title, setTitle] = useState('')
  const [adding, setAdding] = useState(false)

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    setAdding(true)
    await onAdd(title.trim())
    setTitle('')
    setAdding(false)
  }

  const done = subIssues.filter((s) => s.done).length

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-[var(--text-secondary)]">Sub-issues</h3>
        {subIssues.length > 0 && (
          <span className="text-[11px] text-[var(--text-muted)]">{done}/{subIssues.length} done</span>
        )}
      </div>

      {subIssues.length > 0 && (
        <ul className="space-y-1 mb-3">
          {subIssues.map((sub) => (
            <li key={sub._id}>
              <button
                type="button"
                onClick={() => onToggle(sub._id)}
                className="flex items-center gap-2.5 w-full px-2 py-1.5 rounded-md hover:bg-[var(--bg-hover)] text-left transition-colors"
              >
                <span className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 ${
                  sub.done ? 'bg-emerald-500 border-emerald-500' : 'border-[var(--text-muted)]'
                }`}>
                  {sub.done && <Icon name="check" className="w-2.5 h-2.5 text-white" />}
                </span>
                <span className={`text-[13px] ${sub.done ? 'line-through text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                  {sub.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add sub-issue..."
          className="flex-1 px-3 py-2 rounded-lg text-sm border border-[var(--border)] bg-[var(--bg-input)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)]"
        />
        <Button type="submit" size="sm" loading={adding} disabled={!title.trim()}>
          Add
        </Button>
      </form>
    </div>
  )
}
