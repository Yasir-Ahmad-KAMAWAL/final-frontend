import { useCallback, useEffect, useState } from 'react'
import * as activityApi from '../api/activity.api'

export function useActivity(issueId, refreshDep) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    if (!issueId) return []
    const data = await activityApi.listActivity(issueId)
    setItems(data)
    return data
  }, [issueId])

  useEffect(() => {
    setLoading(true)
    refresh().finally(() => setLoading(false))
  }, [refresh, refreshDep])

  const addComment = async (content) => {
    const entry = await activityApi.addComment(issueId, content)
    await refresh()
    return entry
  }

  const addReply = async (activityId, content) => {
    const entry = await activityApi.addReply(issueId, activityId, content)
    await refresh()
    return entry
  }

  return { items, loading, addComment, addReply, refresh }
}
