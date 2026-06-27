import { useAuth } from '../../hooks/useAuth'
import { useIssues } from '../../hooks/useIssues'
import Icon from '../ui/Icon'

export default function IssueFavoriteButton({ issue, className = '' }) {
  const { user } = useAuth()
  const { toggleFavorite } = useIssues()
  const isFavorited = user && issue.favorite?.some((f) => String(f?._id ?? f) === String(user._id))

  const handleClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) return
    await toggleFavorite(issue._id)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`shrink-0 p-0.5 rounded transition-colors ${
        isFavorited ? 'text-amber-400' : 'text-[var(--text-muted)] hover:text-amber-400'
      } ${className}`}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Icon name="star" className="w-3.5 h-3.5" />
    </button>
  )
}
