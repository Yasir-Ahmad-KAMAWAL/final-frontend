import { useState, useMemo } from 'react'
import Input from '../ui/Input'
import Textarea from '../ui/Textarea'
import Button from '../ui/Button'
import Dropdown from '../ui/Dropdown'
import Icon from '../ui/Icon'
import { ISSUE_STATUS, ISSUE_PRIORITY } from '../../utils/constants'
import AssigneePicker from './AssigneePicker'

const statusOptions = Object.values(ISSUE_STATUS).map((s) => ({ value: s, label: s }))
const priorityOptions = Object.values(ISSUE_PRIORITY).map((p) => ({ value: p, label: p }))

function FormDropdown({ label, value, onChange, options, error }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 tracking-wide uppercase">
          {label}
        </label>
      )}
      <Dropdown
        value={value}
        onChange={onChange}
        options={options}
        className="w-full"
        triggerClassName="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-lg text-sm border border-orange-800 bg-[var(--bg-input)] text-[var(--text-primary)] hover:bg-[var(--bg-hover)]  transition-colors"
        renderTrigger={(selected, open) => (
          <>
            <span>{selected?.label}</span>
            <Icon name="chevDown" className={`w-3.5 h-3.5 text-[var(--text-muted)] transition-transform ${open ? 'rotate-180' : ''}`} />
          </>
        )}
      />
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  )
}

export default function IssueForm({ initial = {}, projects = [], onSubmit, loading, submitLabel = 'Create issue' }) {
  const [title, setTitle] = useState(initial.title || '')
  const [description, setDescription] = useState(initial.description || '')
  const [status, setStatus] = useState(initial.status || 'Open')
  const [priority, setPriority] = useState(initial.priority || 'Medium')
  const [projectId, setProjectId] = useState(initial.projectId || projects[0]?._id || '')
  const [assigneeIds, setAssigneeIds] = useState(
    initial.assignees?.map((a) => a._id) || []
  )
  const [errors, setErrors] = useState({})

  const projectOptions = projects.map((p) => ({ value: p._id, label: p.name }))
  const teamUsers = useMemo(
    () => projects.find((p) => p._id === projectId)?.team || [],
    [projects, projectId]
  )

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = 'Title is required'
    if (!projectId) e.projectId = 'Project is required'
    setErrors(e)
    return !Object.keys(e).length
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validate()) return
    onSubmit({ title, description, status, priority, projectId, assigneeIds })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <Input
        className="border border-orange-800"
        label="Title"
        value={title}
        onChange={(e) => { setTitle(e.target.value); setErrors((p) => ({ ...p, title: '' })) }}
        placeholder="Issue title"
        error={errors.title}
      />
      <Textarea
        className="border border-orange-800"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe the issue..."
        rows={4}
      />
      {projectOptions.length > 0 && (
        <FormDropdown
          className="border border-orange-800"
          label="Project"
          value={projectId}
          onChange={setProjectId}
          options={projectOptions}
          error={errors.projectId}
        />
      )}
      <div className="grid grid-cols-2 gap-3 \">
        <FormDropdown label="Status" value={status} onChange={setStatus} options={statusOptions} />
        <FormDropdown label="Priority" value={priority} onChange={setPriority} options={priorityOptions} />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-2 tracking-wide uppercase ">
          Assignees
        </label>
        <AssigneePicker users={teamUsers} value={assigneeIds} onChange={setAssigneeIds} />
        {teamUsers.length === 0 && (
          <p className="text-[12px] cursor-pointer text-[var(--text-muted)] mt-2">
            Add team members to the project to assign this issue.
          </p>
        )}
      </div>

      <Button className="text-white hover:text-black cursor-pointer hover:bg-orange-800" type="submit" loading={loading}>
        {submitLabel}
      </Button>
    </form>
  )
}
