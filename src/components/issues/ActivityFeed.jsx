import { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../hooks/useAuth'
import { useActivity } from '../../hooks/useActivity'
import ActivityItem from './ActivityItem'
import Avatar from '../ui/Avatar'
import Button from '../ui/Button'
import Textarea from '../ui/Textarea'

export default function ActivityFeed({ issueId, refreshDep }) {
  const { user } = useAuth()
  const { items, loading, addComment, addReply } = useActivity(issueId, refreshDep)
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleComment = async (e) => {
    e.preventDefault()
    if (!content.trim() || !user) return
    setSubmitting(true)
    try {
      await addComment(content.trim())
      setContent('')
      toast.success('Comment added')
    } catch {
      toast.error('Failed to add comment')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReply = async (activityId, replyContent) => {
    if (!user) return
    try {
      await addReply(activityId, replyContent)
      toast.success('Reply added')
    } catch {
      toast.error('Failed to add reply')
    }
  }

  return (
    <section className="rounded-lg p-[1.5px] border border-orange-800">
      <div className="rounded-lg bg-transparent p-5">
        <h3 className="text-[15px] font-semibold text-[var(--text-secondary)] mb-4">Activity</h3>

        {user && (
          <form onSubmit={handleComment} className="flex gap-3 mb-6">
            <Avatar name={user.name} src={user.avatar} size="md" className="mt-1" />
            <div className="flex-1">
              <Textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Leave a comment..."
                className="text-[15px]"
              />
              <div className="flex justify-end mt-2">
                <Button
                  type="submit"
                  size="sm"
                  loading={submitting}
                  disabled={!content.trim()}
                  className="text-[14.5px] hover:!bg-orange-500 hover:text-black hover:!border-orange-500 cursor-pointer"
                >
                  Comment
                </Button>
              </div>
            </div>
          </form>
        )}

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                <div className="w-6 h-6 rounded-full bg-[var(--bg-hover)] shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-32 rounded bg-[var(--bg-hover)]" />
                  <div className="h-12 rounded-lg bg-[var(--bg-hover)]" />
                </div>
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[var(--border)] p-6 text-center">
            <p className="text-[15px] text-[var(--text-muted)]">No activity yet. Be the first to comment.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {items.map((entry) => (
              <ActivityItem
                
                key={entry._id}
                entry={entry}
                currentUser={user}
                onReply={handleReply}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}