import { ISSUE_STATUS } from '../../utils/constants'
import Dropdown from '../ui/Dropdown'
import Icon from '../ui/Icon'

const dotColors = {
  Open: 'border-[var(--text-muted)]',
  'In Progress': 'border-amber-500 bg-amber-500/20',
  Resolved: 'border-emerald-500 bg-emerald-500/20',
}

const statuses = Object.values(ISSUE_STATUS).map((s) => ({ value: s, label: s }))

export default function IssueStatusSelect({ value, onChange, size = 'sm' }) {
  const isSm = size === 'sm'

  const triggerClass = `inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-input)] font-medium text-[var(--text-primary)] hover:bg-[var(--bg-hover)] transition-colors ${
    isSm ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'
  }`

  return (
    <Dropdown
      value={value}
      onChange={onChange}
      options={statuses}
      triggerClassName={triggerClass}
      menuClassName="min-w-[160px]"
      renderTrigger={(selected, open) => (
        <>
          <span className={`w-3 h-3 rounded-full border-2 shrink-0 ${dotColors[value]}`} />
          <span className="flex-1 text-left">{selected?.label}</span>
          <Icon name="chevDown" className={`w-3.5 h-3.5 shrink-0 text-[var(--text-muted)] transition-transform ${open ? 'rotate-180' : ''}`} />
        </>
      )}
      renderOption={(opt, isSelected) => (
        <>
          <span className={`w-3 h-3 rounded-full border-2 shrink-0 ${dotColors[opt.value]}`} />
          <span className="flex-1">{opt.label}</span>
          {isSelected && <Icon name="check" className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />}
        </>
      )}
    />
  )
}
