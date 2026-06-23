import { useState, useRef, useEffect } from 'react'
import Icon from './Icon'

export default function Dropdown({
  value,
  onChange,
  options,
  renderTrigger,
  renderOption,
  align = 'left',
  className = '',
  triggerClassName = '',
  menuClassName = '',
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const onOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', onOutside)
    return () => document.removeEventListener('mousedown', onOutside)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  const selected = options.find((o) => o.value === value)

  const alignClass = align === 'right' ? 'right-0' : 'left-0'

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={triggerClassName}
      >
        {renderTrigger ? renderTrigger(selected, open) : (
          <span className="flex items-center justify-between gap-2 w-full">
            <span>{selected?.label}</span>
            <Icon name="chevDown" className={`w-3.5 h-3.5 shrink-0 text-[var(--text-muted)] transition-transform ${open ? 'rotate-180' : ''}`} />
          </span>
        )}
      </button>

      {open && (
        <div
          role="listbox"
          className={`absolute z-50 top-full mt-1 ${alignClass} min-w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-xl py-1 ${menuClassName}`}
        >
          {options.map((opt) => {
            const isSelected = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-[13px] text-left transition-colors ${
                  isSelected
                    ? 'bg-[var(--accent-muted)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]'
                }`}
              >
                {renderOption ? renderOption(opt, isSelected) : opt.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
