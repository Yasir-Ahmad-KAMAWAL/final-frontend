import { useEffect } from 'react'
import { usePageHeader } from '../context/PageHeaderContext'

export function useSetPageHeader({ title, breadcrumb, isFavorited, onFavoriteToggle }) {
  const { setHeader } = usePageHeader()

  useEffect(() => {
    setHeader({ title, breadcrumb, isFavorited, onFavoriteToggle })
    return () => setHeader({ isFavorited: false, onFavoriteToggle: null })
  }, [title, breadcrumb, isFavorited, onFavoriteToggle, setHeader])
}
