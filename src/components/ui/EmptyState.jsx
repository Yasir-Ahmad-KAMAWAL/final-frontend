import Button from './Button'
import Icon from './Icon'

export default function EmptyState({ title, description, actionLabel, onAction, icon = 'projects' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center border border-dashed border-[var(--border)] rounded-xl">
      <div className="w-12 h-12 rounded-xl bg-[var(--bg-hover)] flex items-center justify-center text-[var(--text-muted)] mb-4">
        <Icon name={icon} className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-[var(--text-muted)] max-w-sm mb-4">{description}</p>
      )}
      {actionLabel && onAction && (
        <Button size="sm" onClick={onAction}>
          <Icon name="plus" className="w-4 h-4" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}
