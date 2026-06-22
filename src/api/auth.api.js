import apiClient from './client'

export const login = (email, password) =>
  apiClient.post('/api/user/login', { email, password })

export const logout = () => apiClient.post('/api/user/logout')

export const getMe = () => apiClient.get('/api/user/me')

export const refreshToken = () => apiClient.post('/api/user/refresh-token')

export const forgotPassword = (email) =>
  apiClient.post('/api/user/forgot-password', { email })

export const resetPassword = (token, email, newPassword) =>
  apiClient.post('/api/user/reset-password', { token, email, newPassword })

export const register = (name, email, password) =>
  apiClient.post('/api/user/register', { name, email, password })

export const verifyOtp = (email, otp) =>
  apiClient.post('/api/user/verify-otp', { email, otp })

export const updateProfile = (data) =>
  apiClient.patch('/api/user/profile', data)

export const changePassword = (currentPassword, newPassword) =>
  apiClient.patch('/api/user/change-password', { currentPassword, newPassword })
