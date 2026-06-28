import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import AppLayout from '../components/layout/AppLayout'
import IntroductionPage from '../components/IntroductionPage'
import LoginPage from '../pages/auth/LoginPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '../pages/auth/ResetPasswordPage'
import RegisterPage from '../pages/auth/RegisterPage'
import VerifyOtpPage from '../pages/auth/VerifyOtpPage'
import DashboardPage from '../pages/dashboard/DashboardPage'
import ProjectListPage from '../pages/projects/ProjectListPage'
import CreateProjectPage from '../pages/projects/CreateProjectPage'
import ProjectDetailPage from '../pages/projects/ProjectDetailPage'
import ProjectSettingsPage from '../pages/projects/ProjectSettingsPage'
import IssueListPage from '../pages/issues/IssueListPage'
import CreateIssuePage from '../pages/issues/CreateIssuePage'
import IssueDetailPage from '../pages/issues/IssueDetailPage'
import SettingsLayout from '../pages/settings/SettingsLayout'
import ProfileSettingsPage from '../pages/settings/ProfileSettingsPage'
import SecuritySettingsPage from '../pages/settings/SecuritySettingsPage'

function HomeRedirect() {
  const { isAuthenticated, loading } = useAuth()
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-app)]">
        <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  return <IntroductionPage />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />

      {/* Public auth routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Route>

      {/* Protected app routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectListPage />} />
          <Route path="/projects/new" element={<CreateProjectPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
          <Route path="/projects/:id/settings" element={<ProjectSettingsPage />} />
          <Route path="/issues" element={<IssueListPage />} />
          <Route path="/issues/my" element={<IssueListPage isMine />} />
          <Route path="/issues/new" element={<CreateIssuePage />} />
          <Route path="/issues/:id" element={<IssueDetailPage />} />
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<ProfileSettingsPage />} />
            <Route path="security" element={<SecuritySettingsPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<HomeRedirect />} />
    </Routes>
  )
}
