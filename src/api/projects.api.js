import apiClient from './client'
import { unwrap } from './helpers'

export const listProjects = async () => {
  const response = await apiClient.get('/api/projects')
  return unwrap(response)
}

export const getProject = async (id) => {
  const response = await apiClient.get(`/api/projects/${id}`)
  return unwrap(response)
}

export const createProject = async (data) => {
  const response = await apiClient.post('/api/projects', {
    name: data.name,
    description: data.description,
    status: data.status,
  })
  return unwrap(response)
}

export const updateProject = async (id, data) => {
  const response = await apiClient.patch(`/api/projects/${id}`, {
    name: data.name,
    description: data.description,
    status: data.status,
  })
  return unwrap(response)
}

export const deleteProject = async (id) => {
  await apiClient.delete(`/api/projects/${id}`)
  return true
}

export const addTeamMember = async (projectId, email) => {
  try {
    const response = await apiClient.post(`/api/projects/${projectId}/team`, { email })
    return unwrap(response)
  } catch (err) {
    return { error: err?.response?.data?.message || 'Failed to add team member' }
  }
}

export const removeTeamMember = async (projectId, userId) => {
  const response = await apiClient.delete(`/api/projects/${projectId}/team/${userId}`)
  return unwrap(response)
}
