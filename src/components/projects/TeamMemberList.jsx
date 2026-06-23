import { useState } from 'react'
import toast from 'react-hot-toast'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import Input from '../ui/Input'
import Icon from '../ui/Icon'

export default function TeamMemberList({ project, onAdd, onRemove }) {
  const [email, setEmail] = useState('')
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState('')

  const handleAdd = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    setAdding(true)
    setError('')
    const result = await onAdd(email.trim())
    if (result?.error) {
      setError(result.error)
      toast.error(result.error)
    } else {
      toast.success('Team member added')
      setEmail('')
    }
    setAdding(false)
  }

  return (
    <div>
      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <div className="flex-1">
          <Input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError('') }}
            placeholder="colleague@company.com"
            error={error}
          />
        </div>
        <Button type="submit" size="md" loading={adding} className="self-start mt-0 shrink-0">
          Add
        </Button>
      </form>

      {project.team.length === 0 ? (
        <p className="text-sm text-[var(--text-muted)] py-4 text-center border border-dashed border-[var(--border)] rounded-lg">
          No team members yet. Add someone by email.
        </p>
      ) : (
        <ul className="divide-y divide-[var(--border-subtle)] border border-[var(--border-subtle)] rounded-lg overflow-hidden">
          {project.team.map((member) => (
            <li key={member._id} className="flex items-center gap-3 px-3 py-2.5 hover:bg-[var(--bg-hover)]">
              <Avatar name={member.name} src={member.avatar} size="md" />
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[var(--text-primary)] truncate">{member.name}</p>
                <p className="text-[11px] text-[var(--text-muted)] truncate">{member.email}</p>
              </div>
              <button
                type="button"
                onClick={() => onRemove(member._id)}
                className="p-1.5 rounded-md text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-500 transition-colors"
                aria-label={`Remove ${member.name}`}
              >
                <Icon name="close" className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
