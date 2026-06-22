import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { resetPassword } from '../../api/auth.api'
import Logo from '../../components/ui/Logo'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import ThemeToggle from '../../components/ui/ThemeToggle'

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

function PasswordField({ label, value, onChange, error, show, onToggle, placeholder }) {
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
          placeholder={placeholder}
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

export default function ResetPasswordPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const email = searchParams.get('email') || ''

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const linkInvalid = !token || !email

  const validate = () => {
    const e = {}
    if (!newPassword) e.newPassword = 'Password is required'
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
      const { data } = await resetPassword(token, email, newPassword)
      toast.success(data.message || 'Password reset successfully')
      setSuccess(true)
      setTimeout(() => navigate('/login'), 2500)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to reset password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-app)] px-4 py-4">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] p-8 shadow-xl">
        <div className="mb-6">
          <Logo />
        </div>

        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Set new password</h1>

        {linkInvalid ? (
          <>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              This reset link is invalid or incomplete. Request a new link from the forgot password page.
            </p>
            <Link to="/forgot-password">
              <Button className="w-full">Request new link</Button>
            </Link>
          </>
        ) : success ? (
          <p className="text-sm text-[var(--text-muted)] mb-6">
            Your password has been updated. Redirecting you to login…
          </p>
        ) : (
          <>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Choose a new password for <span className="text-[var(--text-secondary)]">{email}</span>.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <PasswordField
                label="New password"
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value)
                  setErrors((p) => ({ ...p, newPassword: '' }))
                }}
                error={errors.newPassword}
                show={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
                placeholder="At least 6 characters"
              />

              <Input
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setErrors((p) => ({ ...p, confirmPassword: '' }))
                }}
                placeholder="Re-enter your password"
                error={errors.confirmPassword}
              />

              <Button type="submit" className="w-full" loading={loading}>
                Reset password
              </Button>
            </form>
          </>
        )}

        <p className="text-center text-sm text-[var(--text-muted)] mt-6">
          <Link to="/login" className="text-[var(--accent)] hover:opacity-80 font-medium">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
