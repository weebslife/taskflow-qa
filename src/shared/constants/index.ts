import { TaskStatus, TaskPriority } from '@/core/entities/Task';

export const DUMMY_USER = {
  id: 'user-001',
  name: 'QA Tester',
  email: 'qauser@mail.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=qa',
  role: 'QA Engineer',
};

export const DUMMY_CREDENTIALS = {
  email: 'qauser@mail.com',
  password: 'password123',
};

export const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
};

export const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const PRIORITY_ORDER: Record<TaskPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
};

export const ITEMS_PER_PAGE = 5;

export const MAX_TITLE_LENGTH = 100;
export const MAX_DESCRIPTION_LENGTH = 500;

export const STORAGE_KEYS = {
  TASKS: 'taskflow_tasks',
  AUTH: 'taskflow_auth',
  USER: 'taskflow_user',
} as const;
