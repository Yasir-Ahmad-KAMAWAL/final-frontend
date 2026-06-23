# Frontend Build Specification — Tasks / Project Management App

Use this document as the single source of truth when building the frontend. It is derived from the current backend (`final-backend`) codebase.

---

## 1. Product overview

A **team project & issue tracking app** (Jira/Linear-style) where users:

- Sign up / log in (email + password, OTP verification, or Google)
- Manage **projects** with teams and status
- Create and track **issues** (tasks/bugs) with assignees, priority, sub-issues, and attachments
- Collaborate via **comments**, **actions** (activity log entries), and a unified **activity feed** per issue

**Backend base URL (dev):** `http://localhost:8000`  
**Frontend URL (dev):** `http://localhost:5173` (Vite default — must match `CORS_ORIGIN` in backend `.env`)

---

## 2. Recommended frontend stack

| Area | Recommendation |
|------|----------------|
| Framework | React 18+ with Vite |
| Routing | React Router v6 |
| HTTP | Axios or `fetch` with `credentials: "include"` |
| Forms | React Hook Form + Zod validation |
| UI | Tailwind CSS + shadcn/ui (or similar component library) |
| Auth state | React Context or Zustand |
| Google Sign-In | `@react-oauth/google` → send `idToken` to backend |
| Notifications | Sonner / react-hot-toast for API messages |

---

## 3. API conventions

### 3.1 Response shape

**Success** (from `ApiResponse`):

```json
{
  "statusCode": 200,
  "success": true,
  "message": "Logged in successfully",
  "data": { }
}
```

**Error** (from `errorHandler`):

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Name, email, and password are required",
  "errors": []
}
```

Always read `message` for user-facing toasts. Use `data` for payloads.

### 3.2 Authentication

- JWT **access token** (15 min) and **refresh token** (7 days) are set as **httpOnly cookies**: `accessToken`, `refreshToken`
- CORS is configured with `credentials: true` — **every API call must use** `credentials: "include"` (or Axios `withCredentials: true`)
- Protected routes also accept `Authorization: Bearer <accessToken>` as fallback
- On `401`, call `POST /api/user/refresh-token` then retry the original request once
- If refresh fails, redirect to `/login`

### 3.3 Content-Type

Send JSON bodies with `Content-Type: application/json`.

---

## 4. Implemented API endpoints (auth & user)

All routes are prefixed with `/api/user`.

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/register` | Public | Register; sends 6-digit OTP email |
| `POST` | `/verify-otp` | Public | Verify OTP; activates account & logs in |
| `POST` | `/login` | Public | Email + password login |
| `POST` | `/auth/google` | Public | Google Sign-In via `idToken` |
| `POST` | `/forgot-password` | Public | Send password reset email |
| `POST` | `/reset-password` | Public | Reset password with token |
| `POST` | `/send-activation` | Public | Resend account activation link |
| `GET` | `/activate` | Public | Activate account via email link |
| `POST` | `/refresh-token` | Cookie/body | Refresh access token |
| `POST` | `/logout` | Protected | Logout & clear cookies |
| `GET` | `/me` | Protected | Current user profile |
| `PATCH` | `/profile` | Protected | Update name / avatar URL |
| `PATCH` | `/change-password` | Protected | Change password (local accounts) |

**Health check:** `GET /health` → `{ "status": "ok" }`

### 4.1 Request / response details

#### `POST /register`

```json
{ "name": "Yasir", "email": "user@example.com", "password": "secret12" }
```

- Password min length: **6**
- Response `201`: `{ "email": "user@example.com" }`, message: OTP sent
- `409` if email already verified

#### `POST /verify-otp`

```json
{ "email": "user@example.com", "otp": "123456" }
```

- OTP expires in **10 minutes**
- Response `200`: `{ "user": {...}, "accessToken", "refreshToken" }` + cookies set

#### `POST /login`

```json
{ "email": "user@example.com", "password": "secret12" }
```

- `403` if email not verified
- `400` if account is Google-only

#### `POST /auth/google`

```json
{ "idToken": "<Google ID token from client SDK>" }
```

Requires `GOOGLE_CLIENT_ID` on backend; frontend must use the **same** client ID.

#### `POST /forgot-password`

```json
{ "email": "user@example.com" }
```

Always returns success message (no email enumeration).

#### `POST /reset-password`

```json
{ "token": "...", "email": "user@example.com", "newPassword": "newpass" }
```

Frontend route: `/reset-password?token=...&email=...` (backend builds this link using `FRONTEND_URL`).

#### `POST /send-activation`

```json
{ "email": "user@example.com" }
```

#### `GET /activate?token=...&email=...`

Returns activated user in `data`. Frontend route: `/activate?token=...&email=...`

#### `PATCH /profile`

```json
{ "name": "New Name", "avatar": "https://..." }
```

Both fields optional; at least one required.

#### `PATCH /change-password`

```json
{ "currentPassword": "...", "newPassword": "..." }
```

Not available for Google-only accounts without a local password.

### 4.2 User object (`toPublicJSON`)

```ts
interface User {
  _id: string;
  name: string;
  username: string;       // auto-generated, unique, lowercase
  email: string;
  avatar: string;         // URL or empty string
  isActive: boolean;
  isEmailVerified: boolean;
  authProvider: "local" | "google";
  createdAt: string;
  updatedAt: string;
}
```

---

## 5. Planned API endpoints (backend models exist — routes NOT built yet)

Build the UI against these **expected** contracts. Coordinate with backend before final integration; shapes match current Mongoose schemas.

### 5.1 Projects — `/api/projects` (planned)

```ts
interface Project {
  _id: string;
  name: string;
  description?: string;
  status: "Pending" | "In Progress" | "Completed";
  team: User[] | string[];   // populated User refs
  createdAt: string;
  updatedAt: string;
}
```

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | List projects for current user |
| `POST` | `/` | Create project |
| `GET` | `/:id` | Project detail |
| `PATCH` | `/:id` | Update name, description, status |
| `DELETE` | `/:id` | Delete project |
| `POST` | `/:id/team` | Add member by userId |
| `DELETE` | `/:id/team/:userId` | Remove member |

### 5.2 Issues — `/api/issues` (planned)

```ts
interface Issue {
  _id: string;
  title: string;
  description?: string;
  status: "Open" | "In Progress" | "Resolved";
  priority: "Low" | "Medium" | "High";
  file?: string;              // attachment URL/path
  assignees: User[] | string[];
  favorite: string[];         // user IDs who starred this issue
  subIssues: Issue[] | string[];
  createdAt: string;
  updatedAt: string;
}
```

> **Schema gap:** `Issue` has no `projectId` field yet. UI should assume a `projectId` will be added, or treat issues as global until backend is updated.

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/` | List issues (filter by project, status, assignee) |
| `POST` | `/` | Create issue |
| `GET` | `/:id` | Issue detail with sub-issues |
| `PATCH` | `/:id` | Update fields / status |
| `DELETE` | `/:id` | Delete issue |
| `POST` | `/:id/favorite` | Toggle favorite |
| `POST` | `/:id/assignees` | Set assignees |
| `POST` | `/:id/sub-issues` | Link sub-issue |

### 5.3 Activity feed — `/api/issues/:issueId/activity` (planned)

```ts
interface Activity {
  _id: string;
  type: "comment" | "action";
  issueId: string;
  refId: string;              // Comment._id or Action._id
  createdAt: string;
  updatedAt: string;
}
```

### 5.4 Comments — nested under activity (planned)

```ts
interface Comment {
  _id: string;
  activityId: string;
  content: string;
  createdBy: User | string;
  replies: {
    content: string;
    createdBy: User | string;
  }[];
}
```

### 5.5 Actions — audit / system events (planned)

```ts
interface Action {
  _id: string;
  activityId: string;
  createdBy: User | string;
  content: string;            // e.g. "changed status to In Progress"
}
```

---

## 6. Screens & routes

### 6.1 Public (unauthenticated)

| Route | Screen | Key actions |
|-------|--------|-------------|
| `/login` | Login | Email/password, link to register & forgot password, Google button |
| `/register` | Register | Name, email, password → redirect to OTP screen |
| `/verify-otp` | OTP verification | 6-digit input, resend OTP (re-register flow), email in query/state |
| `/forgot-password` | Forgot password | Email input |
| `/reset-password` | Reset password | Read `token` & `email` from query; new password form |
| `/activate` | Account activation | Call `GET /api/user/activate` with query params; show success/error |

### 6.2 Authenticated (app shell)

Use a **layout** with: sidebar, top bar (user menu), main content.

| Route | Screen | Key actions |
|-------|--------|-------------|
| `/` or `/dashboard` | Dashboard | Summary cards: my projects, open issues, recent activity |
| `/projects` | Project list | Grid/list of projects, status badges, create button |
| `/projects/new` | Create project | Name, description, initial team (optional) |
| `/projects/:id` | Project detail | Project info, team members, issues board/list tab |
| `/projects/:id/settings` | Project settings | Edit project, manage team, delete |
| `/issues` | All issues | Filterable table/kanban across projects |
| `/issues/new` | Create issue | Title, description, priority, assignees, project |
| `/issues/:id` | Issue detail | Status, priority, assignees, sub-issues, file attachment, activity feed |
| `/settings/profile` | Profile settings | Name, avatar URL, save |
| `/settings/security` | Security | Change password (local users only) |

### 6.3 Route guards

- Public routes → redirect to `/dashboard` if already logged in
- Protected routes → redirect to `/login` if no valid session
- On app load: call `GET /api/user/me`; on failure try refresh; then redirect if still unauthenticated

---

## 7. Feature breakdown

### Phase 1 — Auth (backend ready ✅)

- [ ] Register with validation (name, email, password ≥ 6 chars)
- [ ] OTP verification screen (10 min expiry messaging)
- [ ] Login with error handling (unverified email → link to verify/resend)
- [ ] Google OAuth button (`@react-oauth/google`)
- [ ] Forgot / reset password flows
- [ ] Email activation link handler (`/activate`)
- [ ] Auth context: user, login, logout, refresh
- [ ] HTTP interceptor: credentials + 401 refresh retry
- [ ] Profile page (name, avatar)
- [ ] Change password (hide for Google-only users)

### Phase 2 — Projects (backend pending ⏳)

- [ ] Project list with status filters (`Pending` | `In Progress` | `Completed`)
- [ ] Create / edit / delete project
- [ ] Team management: add/remove members (search users by name/email when user search API exists)
- [ ] Project detail header with status dropdown

### Phase 3 — Issues (backend pending ⏳)

- [ ] Issue list with filters: status, priority, assignee
- [ ] Kanban board view (columns: Open, In Progress, Resolved)
- [ ] List/table view toggle
- [ ] Create issue modal/page
- [ ] Issue detail drawer or full page
- [ ] Assignee multi-select (avatars)
- [ ] Priority badges (Low / Medium / High colors)
- [ ] Sub-issues checklist
- [ ] Favorite/star toggle
- [ ] File attachment upload UI (backend upload endpoint TBD; `file` is a string URL in schema)

### Phase 4 — Collaboration (backend pending ⏳)

- [ ] Activity timeline on issue detail (comments + actions merged, sorted by date)
- [ ] Add comment
- [ ] Reply to comment (nested replies)
- [ ] Auto-generated action entries on status/assignee changes (backend responsibility; UI displays them)

---

## 8. UI / UX guidelines

### Visual design

- Clean, professional **project management** aesthetic (not playful)
- Status colors:
  - Project: Pending = gray, In Progress = blue, Completed = green
  - Issue: Open = slate, In Progress = amber, Resolved = green
  - Priority: Low = gray, Medium = yellow, High = red
- Show **user avatars** (fallback: initials from name)
- Empty states on every list screen with CTA to create

### Forms & validation (mirror backend rules)

| Field | Rules |
|-------|-------|
| Name | Required on register |
| Email | Required, valid format |
| Password | Min 6 characters |
| OTP | Exactly 6 digits |

### Loading & errors

- Skeleton loaders on lists
- Disable submit buttons while loading
- Toast on success/error using API `message`
- Inline field errors for validation

### Responsive

- Desktop: sidebar + kanban
- Mobile: collapsible nav, stack kanban columns vertically or switch to list-only

---

## 9. Frontend environment variables

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_GOOGLE_CLIENT_ID=<same as backend GOOGLE_CLIENT_ID>
```

---

## 10. Suggested folder structure

```
src/
  api/
    client.ts          # axios instance, interceptors
    auth.api.ts
    projects.api.ts    # stub until backend ready
    issues.api.ts
  components/
    layout/
    ui/
    projects/
    issues/
  context/
    AuthContext.tsx
  hooks/
    useAuth.ts
  pages/
    auth/
    dashboard/
    projects/
    issues/
    settings/
  routes/
    AppRoutes.tsx
    ProtectedRoute.tsx
  types/
    user.ts
    project.ts
    issue.ts
  utils/
    constants.ts
```

---

## 11. Auth flow diagrams

### Register → OTP → Dashboard

```
Register form → POST /register → Verify OTP page
  → POST /verify-otp → cookies set → GET /me → Dashboard
```

### Login

```
Login form → POST /login → cookies set → GET /me → Dashboard
```

### Session refresh

```
API 401 → POST /refresh-token → retry request
  → still 401 → clear state → /login
```

### Google Sign-In

```
Google popup → idToken → POST /auth/google → cookies set → Dashboard
```

---

## 12. Mock data strategy (until project/issue APIs exist)

Until backend implements project/issue routes:

1. Build all screens with **mock data** matching the TypeScript interfaces in §5
2. Centralize mocks in `src/mocks/` for easy swap to real API
3. Auth flows must use **real API** from day one

---

## 13. Backend gaps to watch

| Gap | Impact on frontend |
|-----|-------------------|
| No `projectId` on Issue model | Cannot reliably scope issues to a project until backend adds field |
| No project/issue routes yet | Use mocks; don't block UI work |
| No file upload endpoint | Attachment UI can be built; wire up when upload API exists |
| No user search endpoint | Team picker may need email input until search API exists |
| `activateAccount` GET does not set cookies | After activation link, redirect user to login (or backend may add auto-login later) |

---

## 14. Definition of done (MVP)

1. User can register, verify OTP, log in, log out, reset password
2. Google sign-in works with configured client ID
3. Authenticated user sees dashboard shell and profile settings
4. Project list + detail UI works (mock or live API)
5. Issue kanban/list + detail UI works (mock or live API)
6. Issue detail shows activity feed placeholder
7. All API errors surfaced via toasts
8. App works at `http://localhost:5173` against backend at `http://localhost:8000`

---

## 15. Quick reference — auth API curl examples

```bash
# Register
curl -X POST http://localhost:8000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"pass123"}'

# Login (saves cookies)
curl -X POST http://localhost:8000/api/user/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"test@example.com","password":"pass123"}'

# Get current user
curl http://localhost:8000/api/user/me -b cookies.txt
```

---

*Generated from backend repo `final-backend`. Update this file when new API routes are added.*
