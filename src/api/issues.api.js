import apiClient from './client'
import { unwrap, toIssuePayload } from './helpers'

export const listIssues = async (filters = {}) => {
  const response = await apiClient.get('/api/issues', { params: filters })
  return unwrap(response)
}

export const getIssue = async (id) => {
  const response = await apiClient.get(`/api/issues/${id}`)
  return unwrap(response)
}

export const createIssue = async (data) => {
  const response = await apiClient.post('/api/issues', toIssuePayload(data))
  return unwrap(response)
}

export const updateIssue = async (id, data) => {
  const { actor: _actor, ...raw } = data
  const response = await apiClient.patch(`/api/issues/${id}`, toIssuePayload(raw))
  return unwrap(response)
}

export const deleteIssue = async (id) => {
  await apiClient.delete(`/api/issues/${id}`)
  return true
}

export const toggleFavorite = async (id) => {
  const response = await apiClient.post(`/api/issues/${id}/favorite`)
  return unwrap(response)
}

export const toggleSubIssue = async (issueId, subId) => {
  const response = await apiClient.patch(`/api/issues/${issueId}/sub-issues/${subId}`)
  return unwrap(response)
}

export const addSubIssue = async (issueId, title) => {
  const response = await apiClient.post(`/api/issues/${issueId}/sub-issues`, { title })
  return unwrap(response)
}
