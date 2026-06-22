export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function Avatar({ name, src, size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5 text-[9px]',
    md: 'w-6 h-6 text-[10px]',
    lg: 'w-8 h-8 text-xs',
    xl: 'w-12 h-12 text-sm',
  }

  if (src) {
    return (
      <img
        src={src}
        alt={name || 'User'}
        className={`rounded-full object-cover shrink-0 ${sizes[size]} ${className}`}
      />
    )
  }

  return (
    <div
      className={`rounded-full bg-[var(--accent-muted)] text-[var(--accent)] font-semibold flex items-center justify-center shrink-0 ${sizes[size]} ${className}`}
    >
      {getInitials(name)}
    </div>
  )
}
