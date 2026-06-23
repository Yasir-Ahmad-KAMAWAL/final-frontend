/**
 * @typedef {Object} SubIssue
 * @property {string} _id
 * @property {string} title
 * @property {boolean} done
 *
 * @typedef {Object} IssueAssignee
 * @property {string} _id
 * @property {string} name
 * @property {string} [avatar]
 *
 * @typedef {Object} Issue
 * @property {string} _id
 * @property {string} key
 * @property {string} title
 * @property {string} [description]
 * @property {'Open' | 'In Progress' | 'Resolved'} status
 * @property {'Low' | 'Medium' | 'High'} priority
 * @property {string} [projectId]
 * @property {string} [projectName]
 * @property {IssueAssignee[]} assignees
 * @property {string[]} favorite
 * @property {SubIssue[]} subIssues
 * @property {string} [file]
 * @property {string} createdAt
 * @property {string} updatedAt
 */

export {}
