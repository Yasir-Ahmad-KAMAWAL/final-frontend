import Avatar from '../ui/Avatar'

export default function AssigneePicker({ users, value = [], onChange, disabled }) {
  const toggle = (id) => {
    if (disabled) return
    onChange(value.includes(id) ? value.filter((x) => x !== id) : [...value, id])
  }

  return (
    <div className="flex flex-wrap gap-2">
      {users.map((user) => {
        const selected = value.includes(user._id)
        return (
          <button
            key={user._id}
            type="button"
            onClick={() => toggle(user._id)}
            disabled={disabled}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
              selected
                ? 'border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--text-primary)]'
                : 'border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
            }`}
          >
            <Avatar name={user.name} src={user.avatar} size="sm" />
            {user.name}
          </button>
        )
      })}
    </div>
  )
}
