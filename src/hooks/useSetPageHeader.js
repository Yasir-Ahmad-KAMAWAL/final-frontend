import { useEffect } from 'react'
import { usePageHeader } from '../context/PageHeaderContext'

export function useSetPageHeader({ title, breadcrumb }) {
  const { setHeader } = usePageHeader()

  useEffect(() => {
    setHeader({ title, breadcrumb })
  }, [title, breadcrumb, setHeader])
}
