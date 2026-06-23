import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as projectsApi from '../api/projects.api'

const ProjectContext = createContext(null)

export function ProjectProvider({ children }) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    const data = await projectsApi.listProjects()
    setProjects(data)
    return data
  }, [])

  useEffect(() => {
    refresh().finally(() => setLoading(false))
  }, [refresh])

  const createProject = async (data) => {
    const project = await projectsApi.createProject(data)
    await refresh()
    return project
  }

  const updateProject = async (id, data) => {
    const project = await projectsApi.updateProject(id, data)
    await refresh()
    return project
  }

  const deleteProject = async (id) => {
    const ok = await projectsApi.deleteProject(id)
    await refresh()
    return ok
  }

  const addTeamMember = async (projectId, email) => {
    const result = await projectsApi.addTeamMember(projectId, email)
    if (!result?.error) await refresh()
    return result
  }

  const removeTeamMember = async (projectId, userId) => {
    const result = await projectsApi.removeTeamMember(projectId, userId)
    await refresh()
    return result
  }

  const getProjectById = useCallback(
    (id) => projects.find((p) => p._id === id) ?? null,
    [projects]
  )

  return (
    <ProjectContext.Provider
      value={{
        projects,
        loading,
        refresh,
        createProject,
        updateProject,
        deleteProject,
        addTeamMember,
        removeTeamMember,
        getProjectById,
      }}
    >
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const ctx = useContext(ProjectContext)
  if (!ctx) throw new Error('useProjects must be used within ProjectProvider')
  return ctx
}
