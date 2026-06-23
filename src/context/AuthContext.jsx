import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as authApi from '../api/auth.api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await authApi.getMe()
      setUser(data.data)
      return data.data
    } catch {
      try {
        await authApi.refreshToken()
        const { data } = await authApi.getMe()
        setUser(data.data)
        return data.data
      } catch {
        setUser(null)
        return null
      }
    }
  }, [])

  useEffect(() => {
    fetchUser().finally(() => setLoading(false))
  }, [fetchUser])

  const login = async (email, password) => {
    const { data } = await authApi.login(email, password)
    const profile = await fetchUser()
    return { message: data.message, user: profile }
  }

  const verifyOtp = async (email, otp) => {
    const { data } = await authApi.verifyOtp(email, otp)
    const profile = await fetchUser()
    return { message: data.message, user: profile }
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch {
      // clear local state even if server call fails
    } finally {
      setUser(null)
    }
  }

  const updateProfile = async (profileData) => {
    const { data } = await authApi.updateProfile(profileData)
    setUser(data.data)
    return data
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, verifyOtp, fetchUser, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
