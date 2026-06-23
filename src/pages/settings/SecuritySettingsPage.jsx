import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import * as authApi from '../../api/auth.api'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Icon from '../../components/ui/Icon'

const Eye = ({ open }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
)

function PasswordField({ label, value, onChange, error, show, onToggle }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 tracking-wide uppercase">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          className={`w-full px-3.5 py-2.5 pr-11 rounded-lg text-sm outline-none border transition-colors bg-[var(--bg-input)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] ${
            error ? 'border-red-500' : 'border-[var(--border)] focus:border-[var(--accent)]'
          }`}
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <Eye open={show} />
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  )
}

export default function SecuritySettingsPage() {
  const { user } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const isGoogleOnly = user?.authProvider === 'google'

  const validate = () => {
    const e = {}
    if (!currentPassword) e.currentPassword = 'Current password is required'
    if (!newPassword) e.newPassword = 'New password is required'
    else if (newPassword.length < 6) e.newPassword = 'Minimum 6 characters'
    if (newPassword !== confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    try {
      setLoading(true)
      const { data } = await authApi.changePassword(currentPassword, newPassword)
      toast.success(data.message || 'Password changed')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  if (isGoogleOnly) {
    return (
      <div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Security</h2>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Password settings for your account.
        </p>

        <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)] p-6 max-w-md">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--bg-hover)] flex items-center justify-center shrink-0">
              <Icon name="lock" className="w-5 h-5 text-[var(--text-muted)]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Google sign-in</p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Your account uses Google sign-in. Password changes are managed through your Google account.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Security</h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        Update your password. Use at least 6 characters.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <PasswordField
          label="Current password"
          value={currentPassword}
          onChange={(e) => { setCurrentPassword(e.target.value); setErrors((p) => ({ ...p, currentPassword: '' })) }}
          error={errors.currentPassword}
          show={showCurrent}
          onToggle={() => setShowCurrent(!showCurrent)}
        />

        <PasswordField
          label="New password"
          value={newPassword}
          onChange={(e) => { setNewPassword(e.target.value); setErrors((p) => ({ ...p, newPassword: '' })) }}
          error={errors.newPassword}
          show={showNew}
          onToggle={() => setShowNew(!showNew)}
        />

        <Input
          label="Confirm new password"
          type="password"
          value={confirmPassword}
          onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: '' })) }}
          error={errors.confirmPassword}
        />

        <div className="pt-2 flex items-center gap-4">
          <Button type="submit" loading={loading}>
            Change password
          </Button>
          <Link to="/forgot-password" className="text-sm text-[var(--accent)] hover:opacity-80">
            Forgot password?
          </Link>
        </div>
      </form>
    </div>
  )
}
