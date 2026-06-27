# QA Seed Bugs - TaskFlow QA Playground

> ⚠️ **CONFIDENTIAL**: This document is intended for developers and mentors only.
> Do not share this document with QA trainees who are testing the application.

---

## Bug #1: Login Email Case Sensitivity

**Area**: Authentication / Login

**Location**: [`src/core/usecases/AuthUseCase.ts`](src/core/usecases/AuthUseCase.ts) - `login()` method

**Description**: Login fails when email is entered in uppercase or mixed case. The comparison uses strict equality (`!==`) without normalizing the email to lowercase first.

**Expected Behavior**: Email should be case-insensitive. `QAUSER@MAIL.COM`, `qauser@mail.com`, and `QAUser@Mail.Com` should all successfully log in.

**Actual Behavior**: Only the exact string `qauser@mail.com` works. Any variation in casing causes a login failure.

**Severity**: Medium
**Impact**: Usability issue. Users with caps lock on or auto-capitalized email fields will be unable to log in.

**How to Reproduce**:
1. Go to login page
2. Enter `QAUSER@MAIL.COM` as email
3. Enter `password123` as password
4. Click Sign In
5. Observe: "Invalid email or password" error

---

## Bug #2: Task Title Whitespace Validation

**Area**: Task Management / Create Task

**Location**: [`src/core/usecases/TaskUseCase.ts`](src/core/usecases/TaskUseCase.ts) - `createTask()` method

**Description**: Creating a task with a title containing only whitespace characters (spaces, tabs) is accepted by the system. The validation checks if the title is an empty string (`!title`) but does not trim the input first.

**Expected Behavior**: A title consisting only of whitespace should be rejected with a validation error.

**Actual Behavior**: The task is created successfully with a visually empty title.

**Severity**: Medium
**Impact**: Users can create tasks with blank titles, leading to confusing entries in the task list.

**How to Reproduce**:
1. Go to Tasks page
2. Click "Add Task"
3. Enter `   ` (3 spaces) as the title
4. Fill in other fields
5. Click "Create Task"
6. Observe: Task is created with an empty-looking title

---

## Bug #3: Title Max Length Check Uses Wrong Variable

**Area**: Task Management / Create Task

**Location**: [`src/core/usecases/TaskUseCase.ts`](src/core/usecases/TaskUseCase.ts) - `createTask()` method, line checking `description.length`

**Description**: The max length validation for the title incorrectly checks `description.length` instead of `title.length`. This means the title can exceed the stated 100-character limit even though the UI displays a counter showing 100 as the maximum.

**Expected Behavior**: Title should be limited to 100 characters with a validation error when exceeded.

**Actual Behavior**: Title can be longer than 100 characters (up to the HTML maxLength attribute, which is set to 150).

**Severity**: Low
**Impact**: Data integrity issue. Longer titles may break UI layouts.

**How to Reproduce**:
1. Go to Tasks page
2. Click "Add Task"
3. Enter a title of 150 characters (UI counter shows 150/100)
4. Click "Create Task"
5. Observe: Task is created with a title longer than 100 characters

---

## Bug #4: Search Not Trimming Whitespace

**Area**: Task Management / Search

**Location**: [`src/core/usecases/TaskUseCase.ts`](src/core/usecases/TaskUseCase.ts) - `searchTasks()` method

**Description**: When searching, leading or trailing whitespace in the search query is not trimmed before comparison. This causes searches with accidental spaces to fail to find matching tasks.

**Expected Behavior**: Search should trim whitespace from the query. Searching for `" test"` should find tasks containing "test".

**Actual Behavior**: Searching with leading/trailing spaces fails to match tasks that would otherwise match the trimmed query.

**Severity**: Low
**Impact**: User experience issue. Users who accidentally include spaces in their search may think tasks don't exist.

**How to Reproduce**:
1. Go to Tasks page
2. In search field, enter ` test` (space before the word)
3. Observe: No results, even though tasks contain the word "test"
4. Remove the leading space and search again
5. Observe: Results appear

---

## Bug #5: "Done" Status Filter Shows "In Progress" Tasks

**Area**: Task Management / Filter

**Location**: [`src/core/usecases/TaskUseCase.ts`](src/core/usecases/TaskUseCase.ts) - `filterByStatus()` method

**Description**: When filtering tasks by "done" status, the filter incorrectly also includes tasks with "in_progress" status due to flawed filter logic.

**Expected Behavior**: Filtering by "done" should only show tasks with status "done".

**Actual Behavior**: Filtering by "done" shows both "done" AND "in_progress" tasks.

**Severity**: High
**Impact**: Incorrect data display. Users filtering to see completed tasks will also see in-progress tasks, which defeats the purpose of the filter.

**How to Reproduce**:
1. Go to Tasks page
2. Ensure there are tasks with "in_progress" and "done" status
3. Select "Done" from the status filter dropdown
4. Observe: Both "Done" and "In Progress" tasks are displayed

---

## Bug #6: Pagination Not Resetting on Search/Filter

**Area**: Task Management / Pagination

**Location**: [`src/app/dashboard/tasks/page.tsx`](src/app/dashboard/tasks/page.tsx) - TasksPage component

**Description**: When a user is on page 2 (or any page beyond page 1) and performs a new search or changes a filter, the current page is not reset to page 1. This can result in an empty state being shown even though there are matching results, because the user is viewing a non-existent page.

**Expected Behavior**: Pagination should reset to page 1 whenever search query or filters change.

**Actual Behavior**: The page number remains at whatever page the user was on. If the filtered results have fewer pages than the current page, an empty state is shown.

**Severity**: Medium
**Impact**: Users may think no tasks match their search/filter when results actually exist on page 1.

**How to Reproduce**:
1. Go to Tasks page
2. If you have enough tasks, navigate to page 2
3. Type in a search query that matches some tasks
4. Observe: Empty state may appear if the matching results fit on a single page
5. Click page 1 manually
6. Observe: Results appear

---

## Bug #7: Task List Not Refreshing After Delete

**Area**: Task Management / Delete Task

**Location**: [`src/app/dashboard/tasks/page.tsx`](src/app/dashboard/tasks/page.tsx) - `handleDeleteTask()` function

**Description**: After deleting a task, the UI task list does not immediately reflect the deletion. The delete works correctly in localStorage, but the UI still shows the deleted task until the page is manually refreshed.

**Expected Behavior**: After confirming deletion, the task should immediately disappear from the task list without requiring a page refresh.

**Actual Behavior**: The deleted task remains visible in the UI until the user refreshes the page.

**Severity**: High
**Impact**: Users may be confused why a deleted task is still visible. They might attempt to interact with a task that no longer exists.

**How to Reproduce**:
1. Go to Tasks page
2. Click the delete button on any task
3. Confirm deletion in the modal
4. Observe: Task is still visible in the list
5. Refresh the page
6. Observe: Task is now gone

---

## Bug #8: Description Lost When Editing High Priority Task

**Area**: Task Management / Edit Task

**Location**: [`src/core/usecases/TaskUseCase.ts`](src/core/usecases/TaskUseCase.ts) - `updateTask()` method

**Description**: When editing a task and setting/changing its priority to "high", the description field is saved as an empty string. The original description is lost even if the user didn't modify it.

**Expected Behavior**: Changing the priority to "high" should not affect the description field. All other fields should remain intact.

**Actual Behavior**: Setting priority to "high" causes the description to become empty after saving.

**Severity**: Medium
**Impact**: Users may lose task descriptions when changing priority to high. This can result in loss of important task details.

**How to Reproduce**:
1. Go to Tasks page
2. Click the edit button on a task with a description and non-high priority
3. Change the priority to "High"
4. Click "Save Changes"
5. Observe: The description field is now empty
6. Edit the same task again
7. Observe: Description field is empty

---

## Bug #9: Back Button Shows Dashboard After Logout

**Area**: Authentication / Logout

**Location**: [`src/presentation/layouts/DashboardLayout.tsx`](src/presentation/layouts/DashboardLayout.tsx) - DashboardLayout component

**Description**: After logging out, the user can still see the dashboard by clicking the browser's back button. The application relies on client-side state checks, but the browser caches the previous page, allowing access via navigation history.

**Expected Behavior**: After logout, the user should not be able to access any authenticated pages via the browser back button. They should be redirected to the login page.

**Actual Behavior**: Clicking the back button after logout displays the dashboard momentarily (or fully, depending on caching).

**Severity**: High
**Impact**: Security issue. Although the data may not be interactive after the check runs, the user can briefly see sensitive information.

**How to Reproduce**:
1. Log in to the application
2. Navigate to Dashboard
3. Click Logout
4. You are redirected to login page
5. Click browser Back button
6. Observe: Dashboard page is displayed

---

## Bug #10: Edit Button Missing aria-label

**Area**: Accessibility / Task Management

**Location**: [`src/app/dashboard/tasks/page.tsx`](src/app/dashboard/tasks/page.tsx) - Task item edit button

**Description**: The edit button on each task item does not have an `aria-label` attribute. While the delete button properly has an `aria-label`, the edit button is missing this accessibility attribute, making it less accessible for screen reader users.

**Expected Behavior**: All icon-only buttons should have descriptive `aria-label` attributes for screen reader accessibility.

**Actual Behavior**: The edit button (`faPenToSquare` icon) has no `aria-label`. It only has a `title` attribute, which is not sufficient for all screen readers.

**Severity**: Low
**Impact**: Accessibility issue. Screen reader users may not be able to identify the edit button's purpose.

**How to Reproduce**:
1. Open browser developer tools
2. Inspect the edit (pencil icon) button on any task item
3. Observe: No `aria-label` attribute is present
4. Compare with the delete (trash icon) button next to it
5. Observe: Delete button has `aria-label="Delete task: {title}"`

---

## Summary Table

| # | Bug Name | Area | Severity | Type |
|---|----------|------|----------|------|
| 1 | Login Email Case Sensitivity | Authentication | Medium | Logic Error |
| 2 | Title Whitespace Validation | Task Creation | Medium | Validation Bug |
| 3 | Title Max Length Wrong Variable | Task Creation | Low | Logic Error |
| 4 | Search Not Trimming Whitespace | Task Search | Low | Validation Bug |
| 5 | Done Filter Shows In Progress | Task Filter | High | Logic Error |
| 6 | Pagination Not Resetting | Pagination | Medium | State Management |
| 7 | UI Not Refreshing After Delete | Task Delete | High | State Management |
| 8 | Description Lost on High Priority | Task Edit | Medium | Logic Error |
| 9 | Back Button After Logout | Authentication | High | Security |
| 10 | Edit Button Missing aria-label | Accessibility | Low | Accessibility |
