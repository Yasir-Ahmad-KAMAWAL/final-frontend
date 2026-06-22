# KabulTrack Frontend — Feature Status

> Last updated: June 2026  
> Spec source: [`FRONTEND_SPECS.md`](./FRONTEND_SPECS.md)  
> Backend: `final-backend` @ `http://localhost:8000`  
> Frontend: Vite @ `http://localhost:5173`

---

## Summary

| Area | Status | API |
|------|--------|-----|
| Foundation & layout | ✅ Done | — |
| Auth (core) | ✅ Mostly done | Live |
| Auth (extended) | ⏳ Partial | Live / not built |
| Projects | ✅ UI done | Live API |
| Issues | ✅ UI done | Live API |
| Settings | ✅ Done | Live |
| Collaboration | ✅ UI done | Live API |

**Overall:** Projects, issues, and activity are wired to the live backend (MongoDB). Dashboard activity feed and file upload remain the main gaps.

---

## ✅ Done

### Foundation & architecture

- [x] React 18 + Vite + Tailwind CSS v4
- [x] Custom UI components (no shadcn) — Button, Input, Dropdown, Modal, Badge, Avatar, Tabs, etc.
- [x] Clean folder structure: `api/`, `components/`, `context/`, `hooks/`, `pages/`, `routes/`, `mocks/`, `types/`
- [x] Light / dark theme with `localStorage` persistence (`kabultrack-theme`)
- [x] Linear-inspired app shell — sidebar, top bar, responsive mobile drawer
- [x] Dynamic page headers via `PageHeaderContext`
- [x] Toast notifications (`react-hot-toast`)
- [x] Environment config — `VITE_API_BASE_URL`

### Routing & guards

- [x] `ProtectedRoute` — redirects unauthenticated users to `/login`
- [x] `PublicRoute` — redirects authenticated users to `/dashboard`
- [x] Session bootstrap on load — `GET /me` → refresh token retry → redirect if still unauthenticated
- [x] Home redirect — `/` → `/dashboard` or `/login`

| Route | Screen | Status |
|-------|--------|--------|
| `/login` | Login | ✅ |
| `/register` | Register | ✅ |
| `/verify-otp` | OTP verification | ✅ |
| `/forgot-password` | Forgot password | ✅ |
| `/reset-password` | Reset password | ✅ |
| `/dashboard` | Dashboard / My Issues overview | ✅ |
| `/projects` | Project list | ✅ |
| `/projects/new` | Create project | ✅ |
| `/projects/:id` | Project detail | ✅ |
| `/projects/:id/settings` | Project settings | ✅ |
| `/issues` | Issues (board + list) | ✅ |
| `/issues/new` | Create issue | ✅ |
| `/issues/:id` | Issue detail | ✅ |
| `/settings/profile` | Profile settings | ✅ |
| `/settings/security` | Change password | ✅ |

### Phase 1 — Auth (live API)

- [x] Email + password login with validation and error handling
- [x] Register — `POST /api/user/register` → OTP email
- [x] OTP verification — `POST /api/user/verify-otp` (10 min expiry messaging)
- [x] Unverified email on login → redirect to `/verify-otp`
- [x] Logout
- [x] Forgot password — `POST /api/user/forgot-password`
- [x] Reset password — `POST /api/user/reset-password` (`/reset-password?token=...&email=...`)
- [x] `AuthContext` — user, login, logout, `fetchUser`, `updateProfile`
- [x] Axios client — `withCredentials`, 401 → refresh → retry
- [x] Profile settings — `PATCH /api/user/profile` (name, avatar URL)
- [x] Change password — `PATCH /api/user/change-password` (hidden for Google-only accounts)

### Phase 2 — Projects (live API)

- [x] Project list with status filters (`Pending` \| `In Progress` \| `Completed`)
- [x] Create project
- [x] Edit project (settings page)
- [x] Delete project with confirmation
- [x] Project detail — stats, issues tab, overview tab
- [x] Status dropdown on detail (custom themed dropdown)
- [x] Team management — add by email, remove members
- [x] Sidebar project list stays in sync
- [x] `ProjectContext` + `api/projects.api.js` → `GET/POST/PATCH/DELETE /api/projects`

### Phase 3 — Issues (live API)

- [x] Issue list — status + priority filters
- [x] Kanban board (`Open` \| `In Progress` \| `Resolved`)
- [x] List view toggle
- [x] Create issue page — title, description, project, status, priority, assignees
- [x] Issue detail page — status change, priority badge, assignees, project link
- [x] Sub-issues checklist (add + toggle done)
- [x] Favorite / star toggle (per user)
- [x] Delete issue with confirmation
- [x] Priority badges with spec colors
- [x] Assignee multi-select from project team
- [x] `IssueContext` + `api/issues.api.js` → `GET/POST/PATCH/DELETE /api/issues`
- [x] Attachment UI placeholder on issue detail

### Phase 5 — Collaboration (live API)

- [x] Activity timeline on issue detail (comments + actions merged, sorted by date)
- [x] Add comment
- [x] Reply to comment (nested replies)
- [x] Auto-generated action entries on status/assignee changes (server-side)
- [x] `useActivity` hook + `api/activity.api.js` → `/api/issues/:id/activity`

### Phase 4 — Settings

- [x] Settings layout with Profile / Security nav
- [x] Profile preview card with avatar
- [x] Read-only email & username on profile

### UX polish (partial)

- [x] Empty states on project and issue lists
- [x] Loading skeletons on project and issue lists
- [x] Disable submit buttons while loading
- [x] Inline field validation on forms
- [x] API errors surfaced via toasts
- [x] Mobile collapsible sidebar

---

## ⏳ Remaining / not started

### Auth & public routes (intentionally skipped or not built)

| Feature | Notes |
|---------|--------|
| Register (`/register`) | ✅ Live API |
| OTP verification (`/verify-otp`) | ✅ Live API |
| Reset password (`/reset-password?token=...`) | ✅ Live API |
| Account activation (`/activate`) | Not built |
| Google OAuth | Not wired — no `@react-oauth/google` |
| Apple sign-in | Removed from current login page |
| Unverified email UX on login | ✅ Redirects to verify OTP |

### Phase 4 — Collaboration (not started)

| Feature | Notes |
|---------|--------|
| Dashboard recent activity | Summary cards only — no activity feed |

### Backend integration

| Feature | Status |
|---------|--------|
| Projects CRUD | ✅ Live API |
| Issues CRUD | ✅ Live API |
| Favorite toggle | ✅ Live API |
| Sub-issues checklist | ✅ Live API (`checklist` on backend) |
| File attachment upload | Placeholder button — upload endpoint TBD |
| Team member search | Add by email via `POST /api/projects/:id/team` |
| Activity feed | ✅ Live API |

### Dashboard & shell gaps

| Feature | Notes |
|---------|--------|
| Recent activity on dashboard | Summary cards only — no activity feed |
| Global search (`⌘K`) | UI shell only, not functional |
| Notifications bell | UI shell only |
| Views page | Sidebar link points to dashboard |
| Inbox | Routes to `/issues` — no dedicated inbox logic |

### UX / polish (from spec, not fully done)

| Feature | Notes |
|---------|--------|
| Assignee filter on issue list | Status + priority only |
| Editable assignees on issue detail | ✅ |
| Skeleton loaders everywhere | Only on list pages |
| Kanban drag-and-drop | Not implemented |
| Issue detail drawer | Full page used instead (acceptable) |
| Data persistence across refresh | Mock stores reset on reload |

### Legacy / unused code

These files exist from early scaffolding but are **not routed**:

- `src/components/IntroductionPage.jsx`
- `src/components/Signup.jsx`
- `src/components/Login.jsx` (superseded by `pages/auth/LoginPage.jsx`)
- `src/components/Dashboard.jsx` (superseded by `pages/dashboard/DashboardPage.jsx`)

---

## MVP checklist (from spec §14)

| # | Requirement | Status |
|---|-------------|--------|
| 1 | Register, verify OTP, login, logout, reset password | ✅ (no Google yet) |
| 2 | Google sign-in | ❌ |
| 3 | Dashboard shell + profile settings | ✅ |
| 4 | Project list + detail UI | ✅ (live API) |
| 5 | Issue kanban/list + detail UI | ✅ (live API) |
| 6 | Issue detail activity feed | ✅ (live API) |
| 7 | API errors via toasts | ✅ |
| 8 | Works at `:5173` against `:8000` | ✅ |

---

## Known issues & later fixes

Tracked separately in [`LaterFixes.md`](./LaterFixes.md):

1. **Project invites** — Users should be invited to projects even if not registered yet (register → auto-join).
2. **Issue detail** — Sub-issues should behave as full issues; activity/chat system needs proper design.
3. **Backend** — `refresh-token` handler should use `req.body?.refreshToken` (optional chaining) to avoid 500 when body is empty.

---

## Next recommended steps

1. **Dashboard activity feed** — Recent activity summary on dashboard.
2. **Cleanup** — Remove unused legacy components (`Login.jsx`, `Signup.jsx`, etc.).
3. **File upload** — When backend upload endpoint exists.

---

## Quick reference — what's real vs mock

```
Live API (cookies / JWT)
├── POST   /api/user/login
├── POST   /api/user/register
├── POST   /api/user/verify-otp
├── POST   /api/user/logout
├── GET    /api/user/me
├── POST   /api/user/refresh-token
├── POST   /api/user/forgot-password
├── POST   /api/user/reset-password
├── PATCH  /api/user/profile
├── PATCH  /api/user/change-password
├── GET/POST/PATCH/DELETE  /api/projects
├── POST/DELETE            /api/projects/:id/team[...]
├── GET/POST/PATCH/DELETE  /api/issues
├── POST                   /api/issues/:id/favorite
├── POST/PATCH             /api/issues/:id/sub-issues[...]
├── GET                    /api/issues/:id/activity
├── POST                   /api/issues/:id/activity/comments
└── POST                   /api/issues/:id/activity/:activityId/replies

All project, issue, and activity data persists in MongoDB (no frontend mocks).
```
