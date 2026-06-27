# TaskFlow QA Playground - Requirements Document

## 1. Authentication (Login)

### FR-001: User Login
**Description**: User can log in using email and password.
**Acceptance Criteria**:
- [ ] Login form displays email and password fields
- [ ] Form validation shows error for empty fields
- [ ] Form validation shows error for invalid email format
- [ ] Login succeeds with valid credentials: `qauser@mail.com` / `password123`
- [ ] Login fails with incorrect credentials
- [ ] Error message displayed on failed login
- [ ] Successful login redirects to Dashboard
- [ ] Email should be case-insensitive (QAUSER@MAIL.COM should work)

### FR-002: Demo Login
**Description**: User can login with one click using demo credentials.
**Acceptance Criteria**:
- [ ] "Login as Demo User" button available on login page
- [ ] Clicking the button fills credentials and logs in automatically

### FR-003: Logout
**Description**: User can log out from the application.
**Acceptance Criteria**:
- [ ] Logout button is available in sidebar (desktop) and bottom nav (mobile)
- [ ] After logout, user is redirected to login page
- [ ] After logout, browser back button should not show dashboard

## 2. Dashboard

### FR-004: Dashboard Overview
**Description**: Dashboard shows summary of all tasks.
**Acceptance Criteria**:
- [ ] Display total task count
- [ ] Display total "To Do" tasks
- [ ] Display total "In Progress" tasks
- [ ] Display total "Done" tasks
- [ ] Display overdue task count
- [ ] Warning banner shown when there are overdue tasks

### FR-005: Recent Tasks
**Description**: Dashboard shows list of recent tasks.
**Acceptance Criteria**:
- [ ] Show 5 most recently updated tasks
- [ ] Each task shows title, due date, status badge, and priority badge
- [ ] Overdue indicator shown on overdue tasks
- [ ] "View all" link navigates to Tasks page

## 3. Task Management

### FR-006: Create Task
**Description**: User can create a new task.
**Acceptance Criteria**:
- [ ] "Add Task" button opens modal with task form
- [ ] Form fields: Title (required), Description, Status, Priority, Due Date
- [ ] Title cannot be empty or only whitespace
- [ ] Title maximum 100 characters
- [ ] Form validation shows error for invalid inputs
- [ ] New task appears in task list after creation
- [ ] Task is persisted in localStorage

### FR-007: Edit Task
**Description**: User can edit an existing task.
**Acceptance Criteria**:
- [ ] Edit button on each task opens edit modal with pre-filled data
- [ ] All fields are editable
- [ ] Description field retains its value regardless of priority selection
- [ ] Changes are saved and reflected in task list
- [ ] Task is updated in localStorage

### FR-008: Delete Task
**Description**: User can delete a task.
**Acceptance Criteria**:
- [ ] Delete button on each task opens confirmation modal
- [ ] Confirmation modal shows task title
- [ ] Cancel button closes modal without deleting
- [ ] Delete button removes task permanently
- [ ] Task list updates immediately after deletion

### FR-009: Search Tasks
**Description**: User can search tasks by title or description.
**Acceptance Criteria**:
- [ ] Search input available above task list
- [ ] Search filters tasks in real-time as user types
- [ ] Search should ignore leading/trailing whitespace
- [ ] Clear search shows all tasks again
- [ ] Empty state shown when no results match

### FR-010: Filter Tasks
**Description**: User can filter tasks by status and priority.
**Acceptance Criteria**:
- [ ] Status filter dropdown (All, To Do, In Progress, Done)
- [ ] Priority filter dropdown (All, Low, Medium, High)
- [ ] Filters can be combined
- [ ] "Done" filter only shows tasks with "Done" status
- [ ] Empty state shown when no tasks match filters

### FR-011: Pagination
**Description**: Task list is paginated.
**Acceptance Criteria**:
- [ ] Display 5 tasks per page
- [ ] Pagination controls shown when more than 5 tasks
- [ ] Current page is visually highlighted
- [ ] Previous/Next buttons are disabled appropriately
- [ ] Page resets to 1 when search or filter changes

## 4. Profile

### FR-012: Profile Page
**Description**: User can view their profile.
**Acceptance Criteria**:
- [ ] Display user name
- [ ] Display user email
- [ ] Display user role
- [ ] Display task statistics (total, todo, in progress, done)
- [ ] Display task completion rate with progress bar
- [ ] Display overdue task warning if applicable

## 5. UI/UX Requirements

### FR-013: Responsive Design
**Description**: Application works on desktop and mobile.
**Acceptance Criteria**:
- [ ] Desktop shows sidebar navigation
- [ ] Mobile shows bottom navigation bar
- [ ] All pages are usable on mobile viewports
- [ ] Touch targets are appropriately sized

### FR-014: Accessibility
**Description**: Application is accessible.
**Acceptance Criteria**:
- [ ] All form inputs have associated labels
- [ ] Interactive elements have visible focus states
- [ ] Keyboard navigation works for all features
- [ ] Status is not indicated by color alone (text labels included)
- [ ] All icon buttons have aria-labels
- [ ] Color contrast meets WCAG AA standards

### FR-015: Visual Design
**Description**: Application follows specified design guidelines.
**Acceptance Criteria**:
- [ ] Cream background (#fefcf5)
- [ ] White/cream cards
- [ ] Colorful accent colors (teal, coral, lavender, mustard, soft green)
- [ ] Modern, soft, friendly appearance
- [ ] Professional task management application look
