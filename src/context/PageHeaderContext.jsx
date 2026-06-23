import { createContext, useContext, useState, useCallback } from 'react'

const PageHeaderContext = createContext(null)

const defaultHeader = { title: 'Dashboard', breadcrumb: 'KabulTrack' }

export function PageHeaderProvider({ children }) {
  const [header, setHeaderState] = useState(defaultHeader)

  const setHeader = useCallback((next) => {
    setHeaderState((prev) => ({ ...prev, ...next }))
  }, [])

  const resetHeader = useCallback(() => {
    setHeaderState(defaultHeader)
  }, [])

  return (
    <PageHeaderContext.Provider value={{ ...header, setHeader, resetHeader }}>
      {children}
    </PageHeaderContext.Provider>
  )
}

export function usePageHeader() {
  const ctx = useContext(PageHeaderContext)
  if (!ctx) throw new Error('usePageHeader must be used within PageHeaderProvider')
  return ctx
}
