/**
 * @typedef {import('./user.js').User} User
 *
 * @typedef {Object} CommentReply
 * @property {string} _id
 * @property {string} content
 * @property {User} createdBy
 * @property {string} createdAt
 *
 * @typedef {Object} Comment
 * @property {string} _id
 * @property {string} activityId
 * @property {string} content
 * @property {User} createdBy
 * @property {CommentReply[]} replies
 * @property {string} createdAt
 *
 * @typedef {Object} Action
 * @property {string} _id
 * @property {string} activityId
 * @property {User} createdBy
 * @property {string} content
 * @property {string} createdAt
 *
 * @typedef {Object} Activity
 * @property {string} _id
 * @property {'comment' | 'action'} type
 * @property {string} issueId
 * @property {string} refId
 * @property {string} createdAt
 * @property {string} updatedAt
 *
 * @typedef {Activity & { comment?: Comment, action?: Action }} ActivityEntry
 */

export {}
