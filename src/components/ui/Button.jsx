const variants = {
  primary: 'bg-[var(--accent)] text-white hover:opacity-90',
  secondary: 'bg-[var(--bg-hover)] text-[var(--text-primary)] hover:bg-[var(--border)]',
  ghost: 'bg-transparent text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-primary)]',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizes = {
  sm: 'text-xs px-2.5 py-1.5 rounded-md gap-1.5',
  md: 'text-sm px-3 py-2 rounded-lg gap-2',
  lg: 'text-sm px-4 py-2.5 rounded-lg gap-2',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled,
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}
