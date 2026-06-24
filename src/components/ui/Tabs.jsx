export default function Tabs({ tabs, active, onChange, className = '' }) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`text-sm font-medium px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
            active === tab
              ? 'bg-transparent text-blue-600 shadow-[0_0_8px_2px_rgba(59,130,246,0.5)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}