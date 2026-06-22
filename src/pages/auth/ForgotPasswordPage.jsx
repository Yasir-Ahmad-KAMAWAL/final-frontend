import { useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { forgotPassword } from '../../api/auth.api'
import Logo from '../../components/ui/Logo'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import ThemeToggle from '../../components/ui/ThemeToggle'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.trim()) {
      setError('Email is required')
      return
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setError('Enter a valid email')
      return
    }

    try {
      setLoading(true)
      const { data } = await forgotPassword(email.trim())
      toast.success(data.message)
      setSent(true)
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Something went wrong')
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

        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">Reset password</h1>
        <p className="text-sm text-[var(--text-muted)] mb-6">
          {sent
            ? 'If an account exists for that email, you will receive reset instructions shortly.'
            : 'Enter your email and we will send you a reset link.'}
        </p>

        {!sent && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError('') }}
              placeholder="you@example.com"
              error={error}
            />
            <Button type="submit" className="w-full" loading={loading}>
              Send reset link
            </Button>
          </form>
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
