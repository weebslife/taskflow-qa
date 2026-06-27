import { TaskStatus, TaskPriority } from '@/core/entities/Task';

export interface TaskFilter {
  search?: string;
  status?: TaskStatus | 'all';
  priority?: TaskPriority | 'all';
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface DashboardStats {
  total: number;
  todo: number;
  inProgress: number;
  done: number;
  overdue: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
  } | null;
}
