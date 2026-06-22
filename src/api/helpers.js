/** Extract payload from standard API envelope */
export function unwrap(response) {
  return response.data?.data ?? response.data
}

/** Strip frontend-only fields before sending to API */
export function toIssuePayload(data) {
  const { actor, assigneeIds, ...rest } = data
  const payload = { ...rest }
  if (assigneeIds !== undefined) payload.assigneeIds = assigneeIds
  return payload
}
