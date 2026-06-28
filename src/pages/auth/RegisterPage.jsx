import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { register } from '../../api/auth.api'
import Logo from '../../components/ui/Logo'
const LogoLink = ({ children }) => (
  <Link to="/" className="inline-block hover:opacity-80 transition-opacity">
    {children}
  </Link>
)
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import ThemeToggle from '../../components/ui/ThemeToggle'

const slides = [
  {
    title: 'Track Every Project',
    desc: 'Monitor all projects in real time — from kickoff to delivery, nothing slips through.',
  },
  {
    title: 'Manage Your Team',
    desc: 'Assign tasks, set deadlines, and keep everyone aligned in one workspace.',
  },
  {
    title: 'Insights & Reports',
    desc: 'Visual dashboards give leadership a clear view of progress and team velocity.',
  },
]

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

function PasswordField({ label, value, onChange, error, show, onToggle, name, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 tracking-wide uppercase">
        {label}
      </label>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          name={name}
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

export default function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [slide, setSlide] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    const t = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => {
        setSlide((s) => (s + 1) % slides.length)
        setFadeIn(true)
      }, 300)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((p) => ({ ...p, [name]: value }))
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }))
    setServerError('')
  }

  const validate = () => {
    const e = {}
    if (!formData.name.trim()) e.name = 'Name is required'
    if (!formData.email.trim()) e.email = 'Email is required'
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) e.email = 'Enter a valid email'
    if (!formData.password) e.password = 'Password is required'
    else if (formData.password.length < 6) e.password = 'Minimum 6 characters'
    if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const name = formData.name.trim()
    const email = formData.email.trim()

    try {
      setLoading(true)
      const { data } = await register(name, email, formData.password)
      toast.success(data.message || 'OTP sent to your email')
      navigate(`/verify-otp?email=${encodeURIComponent(email)}`, {
        state: { name, password: formData.password },
      })
    } catch (err) {
      const message = err?.response?.data?.message || 'Registration failed'
      setServerError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-app)] px-4 py-4 font-sans">
      <div className="absolute top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-4xl flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-2xl border border-[var(--border-subtle)]">
        {/* Form panel */}
        <div className="flex-1 bg-[var(--bg-card)] px-8 sm:px-12 py-8 flex flex-col justify-center">
          <div className="mb-7">
            <LogoLink>
              <Logo />
            </LogoLink>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-1">Create account</h1>
          <p className="text-sm text-[var(--text-muted)] mb-7">Sign up to start tracking projects with your team</p>

          {serverError && (
            <div className="mb-5 flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              error={errors.name}
            />

            <Input
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              error={errors.email}
            />

            <PasswordField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
              placeholder="At least 6 characters"
            />

            <Input
              label="Confirm password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              error={errors.confirmPassword}
            />

            <Button type="submit" className="w-full" loading={loading}>
              Sign up
            </Button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--accent)] hover:opacity-80 font-medium">
              Log in
            </Link>
          </p>
        </div>

        {/* Slideshow panel */}
        <div className="hidden lg:flex flex-col items-center justify-center flex-1 relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 px-8 py-8">
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-orange-500/10 pointer-events-none" />

          <div className="mb-10 opacity-90">
            <Logo white />
          </div>

          <div
            className="flex flex-col items-center text-center transition-all duration-300"
            style={{ opacity: fadeIn ? 1 : 0, transform: fadeIn ? 'translateY(0)' : 'translateY(10px)' }}
          >
            <h2 className="text-xl font-bold text-white mb-3 tracking-tight">{slides[slide].title}</h2>
            <p className="text-sm text-blue-200/80 leading-relaxed max-w-[280px]">{slides[slide].desc}</p>
          </div>

          <div className="flex items-center gap-2.5 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className={`h-2 rounded-full transition-all duration-300 border-none cursor-pointer ${
                  i === slide ? 'w-6 bg-orange-400' : 'w-2 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
