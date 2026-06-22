import { useEffect } from 'react'
import Button from '../ui/Button'

export default function Modal({ open, onClose, title, children, footer }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] shadow-2xl">
        <div className="px-5 py-4 border-b border-[var(--border-subtle)]">
          <h2 className="text-base font-semibold text-[var(--text-primary)]">{title}</h2>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && (
          <div className="px-5 py-4 border-t border-[var(--border-subtle)] flex justify-end gap-2">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', loading = false, danger = false }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant={danger ? 'danger' : 'primary'} size="sm" onClick={onConfirm} loading={loading}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-[var(--text-secondary)]">{message}</p>
    </Modal>
  )
}
