import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as issuesApi from '../api/issues.api'
import { useProjects } from './ProjectContext'

const IssueContext = createContext(null)

export function IssueProvider({ children }) {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(true)
  const { refresh: refreshProjects } = useProjects()

  const refresh = useCallback(async (filters) => {
    const data = await issuesApi.listIssues(filters)
    setIssues(data)
    return data
  }, [])

  const syncAll = useCallback(async (filters) => {
    const data = await refresh(filters)
    await refreshProjects()
    return data
  }, [refresh, refreshProjects])

  useEffect(() => {
    refresh().finally(() => setLoading(false))
  }, [refresh])

  const createIssue = async (data) => {
    const issue = await issuesApi.createIssue(data)
    await syncAll()
    return issue
  }

  const updateIssue = async (id, data) => {
    const issue = await issuesApi.updateIssue(id, data)
    await syncAll()
    return issue
  }

  const deleteIssue = async (id) => {
    const ok = await issuesApi.deleteIssue(id)
    await syncAll()
    return ok
  }

  const toggleFavorite = async (id) => {
    const issue = await issuesApi.toggleFavorite(id)
    await refresh()
    return issue
  }

  const toggleSubIssue = async (issueId, subId) => {
    const issue = await issuesApi.toggleSubIssue(issueId, subId)
    await refresh()
    return issue
  }

  const addSubIssue = async (issueId, title) => {
    const issue = await issuesApi.addSubIssue(issueId, title)
    await refresh()
    return issue
  }

  const getIssueById = useCallback((id) => issues.find((i) => i._id === id) ?? null, [issues])

  const getIssuesByProject = useCallback(
    (projectId) => issues.filter((i) => i.projectId === projectId),
    [issues]
  )

  return (
    <IssueContext.Provider
      value={{
        issues,
        loading,
        refresh,
        createIssue,
        updateIssue,
        deleteIssue,
        toggleFavorite,
        toggleSubIssue,
        addSubIssue,
        getIssueById,
        getIssuesByProject,
      }}
    >
      {children}
    </IssueContext.Provider>
  )
}

export function useIssues() {
  const ctx = useContext(IssueContext)
  if (!ctx) throw new Error('useIssues must be used within IssueProvider')
  return ctx
}
