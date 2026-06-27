# QA Portfolio Guide - TaskFlow QA Playground

This guide explains how to use the TaskFlow QA Playground application to create a professional QA portfolio.

## 🎯 Overview

TaskFlow QA Playground is a web application with **intentionally planted bugs** designed for QA Manual testers to practice and build their portfolio. By testing this application, you can demonstrate your ability to:

- Analyze requirements and create test documentation
- Execute manual tests systematically
- Identify, document, and report bugs professionally
- Summarize testing results
- Communicate findings clearly

---

## 📁 Documents to Create for Your Portfolio

### 1. Test Scenario Document

A test scenario is a high-level description of what to test. It breaks down features into testable areas.

**Example Format:**

```
Feature: Authentication

Scenario 1: Successful Login
- Verify user can login with valid credentials
- Verify redirect to dashboard after login
- Verify email is case-insensitive

Scenario 2: Failed Login
- Verify error message with wrong password
- Verify error message with unregistered email
- Verify validation for empty fields

Scenario 3: Logout
- Verify logout button functionality
- Verify redirect to login page after logout
- Verify back button behavior after logout
```

### 2. Test Case Document

Test cases are detailed step-by-step instructions for executing tests. Each test case includes preconditions, test data, steps, and expected results.

**Example Format:**

```
Test Case ID: TC-LOGIN-001
Title: Verify successful login with valid credentials
Feature: Authentication
Precondition: User is on login page
Test Data:
  - Email: qauser@mail.com
  - Password: password123

Steps:
  1. Enter "qauser@mail.com" in the email field
  2. Enter "password123" in the password field
  3. Click "Sign In" button

Expected Result:
  - User is redirected to Dashboard page
  - Dashboard shows welcome message with user name

Actual Result:
Status: [PASS / FAIL]
Notes:
```

**Template for Test Case:**

| Field | Description |
|-------|-------------|
| Test Case ID | Unique identifier (e.g., TC-LOGIN-001) |
| Title | Clear, descriptive title |
| Feature | Feature being tested |
| Precondition | State before test execution |
| Test Data | Input values used |
| Steps | Numbered step-by-step instructions |
| Expected Result | What should happen |
| Actual Result | What actually happened |
| Status | PASS / FAIL |
| Notes | Observations, screenshots, references |

### 3. Bug Report Document

A bug report documents a defect found during testing. Each bug should be detailed enough for a developer to reproduce and fix it.

**Example Format:**

```
Bug ID: BUG-001
Title: Login fails with uppercase email
Severity: Medium
Priority: Medium
Feature: Authentication
Environment: Chrome 120, macOS Sonoma

Description:
Login fails when email is entered in uppercase letters,
even though the credentials are correct.

Steps to Reproduce:
1. Go to login page
2. Enter "QAUSER@MAIL.COM" as email
3. Enter "password123" as password
4. Click "Sign In"

Expected Result:
User should be logged in and redirected to dashboard.

Actual Result:
Error message "Invalid email or password" is displayed.

Attachment: [screenshot or video link]
```

**Severity Classification:**

| Severity | Description |
|----------|-------------|
| Blocker | Prevents further testing or usage |
| High | Major feature broken, no workaround |
| Medium | Feature partially broken, has workaround |
| Low | Minor issue,不影响 user experience |

### 4. Test Summary Report

A summary report provides an overview of testing activities, results, and recommendations.

**Example Format:**

```
Test Summary Report
Application: TaskFlow QA Playground
Test Period: [Start Date] - [End Date]
Tester: [Your Name]

1. Test Execution Summary
   - Total Test Cases: 30
   - Passed: 22
   - Failed: 8
   - Blocked: 0
   - Pass Rate: 73%

2. Bugs Found
   - Total Bugs: 8
   - Critical: 1
   - High: 2
   - Medium: 3
   - Low: 2

3. Features Tested
   - Authentication: 4 passed, 1 failed
   - Dashboard: 3 passed, 0 failed
   - Task Management: 12 passed, 5 failed
   - Profile: 3 passed, 2 failed

4. Key Findings
   - Login email validation is case-sensitive (BUG-001)
   - Task deletion does not refresh UI (BUG-007)
   - Description field data lost on priority change (BUG-008)

5. Recommendations
   - Fix high severity bugs before release
   - Improve input validation for task creation
   - Enhance search functionality with whitespace handling
```

---

## 📝 Suggested Test Cases by Feature

### Authentication (5-8 test cases)

Test login with:
1. Valid credentials (email: `qauser@mail.com`, password: `password123`)
2. Uppercase email with valid password
3. Invalid email format
4. Empty email field
5. Empty password field
6. Wrong password
7. Demo login button
8. Logout and back button behavior

### Dashboard (3-5 test cases)

Test dashboard:
1. Statistics display correct counts
2. Overdue warning appears when tasks are overdue
3. Recent tasks list is up-to-date
4. "View all" link redirects correctly
5. Navigation to other pages

### Task Management (15-20 test cases)

Test task CRUD:
1. Create task with all fields
2. Create task with minimum fields
3. Create task with whitespace-only title
4. Create task with title exceeding 100 characters
5. Create task with long description
6. Edit task title
7. Edit task description
8. Edit task with high priority (check description)
9. Delete task
10. Cancel deletion
11. Search by title
12. Search with leading/trailing spaces
13. Search by partial text
14. Filter by status (each option)
15. Filter by priority (each option)
16. Combine filters
17. Navigate pagination
18. Search on non-first page
19. Verify empty state messages

### Profile (3-5 test cases)

Test profile:
1. Profile information displays correctly
2. Task statistics match actual data
3. Completion rate shows correct percentage
4. Overdue warning matches tasks page

---

## 🎓 Tips for QA Portfolio

1. **Screenshots are essential** - Capture screenshots for each bug with annotations
2. **Use a bug tracking template** - Consistent formatting shows professionalism
3. **Write clear reproduction steps** - A developer should be able to reproduce the bug
4. **Include environment details** - Browser, OS, screen size
5. **Be thorough** - Test edge cases, not just happy paths
6. **Organize your documents** - Use folders: Test_Cases/, Bug_Reports/, Summary_Reports/
7. **Show your process** - Include test plan, execution, and results
8. **Quantify your work** - "Found 10 bugs, 2 critical, 5 medium, 3 low"
9. **Use tools** - Excel/Google Sheets for test cases, screen recording tools
10. **Explain the impact** - For each bug, explain why it matters to the user

---

## 📂 Suggested Portfolio Structure

```
your-qa-portfolio/
  README.md                   # Overview of your portfolio
  Test_Plan.md                # Brief test plan
  Test_Cases/
    TC_Authentication.md
    TC_Dashboard.md
    TC_TaskManagement.md
    TC_Profile.md
  Bug_Reports/
    BUG-001_Login_Case_Sensitivity.md
    BUG-002_Whitespace_Title.md
    BUG-003_Title_Max_Length.md
    BUG-004_Search_Whitespace.md
    BUG-005_Filter_Done_Status.md
    BUG-006_Pagination_Reset.md
    BUG-007_Delete_Refresh.md
    BUG-008_Description_High_Priority.md
    BUG-009_Logout_Back_Button.md
    BUG-010_Edit_Button_Accessibility.md
  Summary_Reports/
    Test_Summary_Report_v1.md
  Screenshots/
    (Attach screenshots for each bug)
```

## 🚀 Getting Started

1. Install and run the application (`npm install && npm run dev`)
2. Explore the features as a user
3. Read the REQUIREMENTS.md document
4. Create your test scenarios and test cases
5. Execute tests systematically
6. Document any bugs you find
7. Compare with QA_SEED_BUGS.md (if you have access)
8. Compile your test summary report
9. Build your portfolio

Good luck with your QA journey! 🎉
