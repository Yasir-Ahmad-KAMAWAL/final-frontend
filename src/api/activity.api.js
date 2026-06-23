import apiClient from './client'
import { unwrap } from './helpers'

export const listActivity = async (issueId) => {
  const response = await apiClient.get(`/api/issues/${issueId}/activity`)
  return unwrap(response)
}

export const addComment = async (issueId, content) => {
  const response = await apiClient.post(`/api/issues/${issueId}/activity/comments`, { content })
  return unwrap(response)
}

export const addReply = async (issueId, activityId, content) => {
  const response = await apiClient.post(
    `/api/issues/${issueId}/activity/${activityId}/replies`,
    { content }
  )
  return unwrap(response)
}
