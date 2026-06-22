import { PROJECT_STATUS } from '../../utils/constants'
import Dropdown from '../ui/Dropdown'
import Icon from '../ui/Icon'

const dotColors = {
  Pending: 'bg-slate-400',
  'In Progress': 'bg-blue-500',
  Completed: 'bg-emerald-500',
}

const statuses = Object.values(PROJECT_STATUS).map((s) => ({ value: s, label: s }))

export default function ProjectStatusSelect({ value, onChange, size = 'md' }) {
  const isSm = size === 'sm'

  const triggerClass = `inline-flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg-input)] font-medium text-[var(--text-primary)] hover:border-[var(--border)] hover:bg-[var(--bg-hover)] transition-colors ${
    isSm ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'
  }`

  const renderOption = (opt, isSelected) => (
    <>
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotColors[opt.value] || 'bg-slate-400'}`} />
      <span className="flex-1">{opt.label}</span>
      {isSelected && <Icon name="check" className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />}
    </>
  )

  const renderTrigger = (selected, open) => (
    <>
      <span className={`w-2 h-2 rounded-full shrink-0 ${dotColors[value] || 'bg-slate-400'}`} />
      <span className="flex-1 text-left">{selected?.label}</span>
      <Icon
        name="chevDown"
        className={`w-3.5 h-3.5 shrink-0 text-[var(--text-muted)] transition-transform ${open ? 'rotate-180' : ''}`}
      />
    </>
  )

  return (
    <Dropdown
      value={value}
      onChange={onChange}
      options={statuses}
      renderTrigger={renderTrigger}
      renderOption={renderOption}
      triggerClassName={triggerClass}
      menuClassName="min-w-[160px]"
    />
  )
}
