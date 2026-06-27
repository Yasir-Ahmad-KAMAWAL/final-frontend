import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/ui/Input'
import Button from '../../components/ui/Button'
import Avatar from '../../components/ui/Avatar'

export default function ProfileSettingsPage() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setName(user.name || '')
      setAvatar(user.avatar || '')
    }
  }, [user])

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = 'Name is required'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    const payload = { name: name.trim(), avatar: avatar.trim() }
    if (!payload.avatar) delete payload.avatar

    try {
      setLoading(true)
      const { message } = await updateProfile(payload)
      toast.success(message || 'Profile updated')
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div>
      <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Profile</h2>
      <p className="text-sm text-[var(--text-muted)] mb-6">
        Update your name and avatar visible to your team.
      </p>

      <div className="flex items-center gap-4 border border-orange-800 mb-8 p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-card)]">
        <Avatar name={name || user.name} src={avatar || user.avatar} size="xl" />
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--text-primary)] truncate">{name || user.name}</p>
          <p className="text-xs text-[var(--text-muted)] truncate">@{user.username}</p>
          <p className="text-xs text-[var(--text-muted)] truncate">{user.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <Input
          className="border border-orange-800"
          label="Full name"
          value={name}
          onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })) }}
          placeholder="Your name"
          error={errors.name}
        />

        <Input
          className="border border-orange-800"
          label="Avatar URL"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://example.com/avatar.jpg"
        />

        <Input
          className="border border-orange-800"
          label="Email"
          value={user.email}
          disabled
          className="opacity-60 cursor-not-allowed"
        />

        <Input
          className="border border-orange-800"
          label="Username"
          value={user.username}
          disabled
          className="opacity-60 cursor-not-allowed"
        />

        <div className="pt-2">
          <Button type="submit" loading={loading}>
            Save changes
          </Button>
        </div>
      </form>
    </div>
  )
}
