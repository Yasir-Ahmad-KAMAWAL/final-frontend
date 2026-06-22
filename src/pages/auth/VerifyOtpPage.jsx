import { useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import { register } from '../../api/auth.api'
import Logo from '../../components/ui/Logo'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import ThemeToggle from '../../components/ui/ThemeToggle'

export default function VerifyOtpPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const { verifyOtp } = useAuth()

  const email = searchParams.get('email') || ''
  const registerState = location.state || {}
  const { name, password } = registerState

  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)

  const canResend = Boolean(name && password && email)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    if (!/^\d{6}$/.test(otp)) {
      setError('Enter the 6-digit code from your email')
      return
    }

    try {
      setLoading(true)
      const result = await verifyOtp(email, otp)
      toast.success(result.message || 'Account verified')
      navigate('/dashboard')
    } catch (err) {
      const message = err?.response?.data?.message || 'Invalid or expired OTP'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (!canResend) {
      toast.error('Go back to sign up to request a new code')
      return
    }

    try {
      setResending(true)
      const { data } = await register(name, email, password)
      toast.success(data.message || 'A new code has been sent')
      setOtp('')
      setError('')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to resend code')
    } finally {
      setResending(false)
    }
  }

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-app)] px-4 py-4">
        <div className="absolute top-4 right-4 z-50">
          <ThemeToggle />
        </div>
        <div className="w-full max-w-md bg-[var(--bg-card)] rounded-2xl border border-[var(--border-subtle)] p-8 shadow-xl text-center">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <p className="text-sm text-[var(--text-muted)] mb-6">No email provided. Start from the sign up page.</p>
          <Link to="/register">
            <Button className="w-full">Go to sign up</Button>
          </Link>
        </div>
      </div>
    )
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

        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Verify your email</h1>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          Enter the 6-digit code sent to{' '}
          <span className="text-[var(--text-secondary)]">{email}</span>. It expires in 10 minutes.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Verification code"
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => {
              setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
              setError('')
            }}
            placeholder="123456"
            error={error}
          />

          <Button type="submit" className="w-full" loading={loading} disabled={otp.length !== 6}>
            Verify & continue
          </Button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={handleResend}
            disabled={resending || !canResend}
            className="text-sm text-[var(--accent)] hover:opacity-80 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resending ? 'Sending…' : "Didn't get a code? Resend"}
          </button>
        </div>

        <p className="text-center text-sm text-[var(--text-muted)] mt-6">
          <Link to="/login" className="text-[var(--accent)] hover:opacity-80 font-medium">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  )
}
