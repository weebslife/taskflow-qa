import { Task } from '@/core/entities/Task';

export function getSeedTasks(): Task[] {
  const now = new Date();
  const daysAgo = (days: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() - days);
    return d.toISOString();
  };
  const daysFromNow = (days: number) => {
    const d = new Date(now);
    d.setDate(d.getDate() + days);
    return d.toISOString();
  };

  return [
    {
      id: 'seed-task-1',
      title: 'Create test plan for login feature',
      description: 'Write comprehensive test cases covering all login scenarios including valid credentials, invalid passwords, and edge cases.',
      status: 'done',
      priority: 'high',
      dueDate: daysAgo(2),
      createdAt: daysAgo(10),
      updatedAt: daysAgo(2),
    },
    {
      id: 'seed-task-2',
      title: 'Perform regression testing on dashboard',
      description: 'Run full regression test suite on the dashboard module after the latest UI changes.',
      status: 'in_progress',
      priority: 'high',
      dueDate: daysFromNow(1),
      createdAt: daysAgo(7),
      updatedAt: daysAgo(1),
    },
    {
      id: 'seed-task-3',
      title: 'Write API integration tests',
      description: 'Create automated integration tests for the REST API endpoints in the user management module.',
      status: 'in_progress',
      priority: 'medium',
      dueDate: daysFromNow(3),
      createdAt: daysAgo(5),
      updatedAt: daysAgo(1),
    },
    {
      id: 'seed-task-4',
      title: 'Test file upload functionality',
      description: 'Verify file upload with various file types, sizes, and verify error handling for invalid files.',
      status: 'todo',
      priority: 'medium',
      dueDate: daysFromNow(5),
      createdAt: daysAgo(3),
      updatedAt: daysAgo(3),
    },
    {
      id: 'seed-task-5',
      title: 'Accessibility audit for navigation',
      description: 'Check keyboard navigation, screen reader compatibility, and color contrast for all navigation elements.',
      status: 'todo',
      priority: 'high',
      dueDate: daysFromNow(2),
      createdAt: daysAgo(4),
      updatedAt: daysAgo(4),
    },
    {
      id: 'seed-task-6',
      title: 'Cross-browser compatibility check',
      description: 'Test the application on Chrome, Firefox, Safari, and Edge to ensure consistent behavior.',
      status: 'todo',
      priority: 'low',
      dueDate: daysFromNow(7),
      createdAt: daysAgo(6),
      updatedAt: daysAgo(6),
    },
    {
      id: 'seed-task-7',
      title: 'Database migration testing',
      description: 'Verify that database migrations run correctly without data loss and rollback works as expected.',
      status: 'done',
      priority: 'high',
      dueDate: daysAgo(5),
      createdAt: daysAgo(12),
      updatedAt: daysAgo(5),
    },
    {
      id: 'seed-task-8',
      title: 'Review error messages and logging',
      description: 'Ensure all error messages are user-friendly and logs contain sufficient information for debugging.',
      status: 'in_progress',
      priority: 'low',
      dueDate: daysFromNow(4),
      createdAt: daysAgo(3),
      updatedAt: daysAgo(1),
    },
    {
      id: 'seed-task-9',
      title: 'Performance testing on search feature',
      description: 'Run load tests on the search functionality to ensure it performs well under concurrent usage.',
      status: 'todo',
      priority: 'medium',
      dueDate: daysAgo(1),
      createdAt: daysAgo(8),
      updatedAt: daysAgo(8),
    },
    {
      id: 'seed-task-10',
      title: 'Security scan for XSS vulnerabilities',
      description: 'Run automated security scanning tools to identify potential cross-site scripting vulnerabilities in input fields.',
      status: 'todo',
      priority: 'high',
      dueDate: daysFromNow(6),
      createdAt: daysAgo(2),
      updatedAt: daysAgo(2),
    },
    {
      id: 'seed-task-11',
      title: 'Test password reset flow',
      description: 'Verify the complete password reset flow including email notification, token validation, and new password setup.',
      status: 'done',
      priority: 'medium',
      dueDate: daysAgo(3),
      createdAt: daysAgo(15),
      updatedAt: daysAgo(3),
    },
    {
      id: 'seed-task-12',
      title: 'Mobile responsive testing',
      description: 'Test all pages on mobile viewports to ensure proper layout, touch targets, and navigation.',
      status: 'in_progress',
      priority: 'medium',
      dueDate: daysFromNow(2),
      createdAt: daysAgo(5),
      updatedAt: daysAgo(1),
    },
  ];
}
