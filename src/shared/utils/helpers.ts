import { Task } from '@/core/entities/Task';

export function generateId(): string {
  return `task-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function isOverdue(task: Task): boolean {
  if (task.status === 'done') return false;
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dueDate < today;
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'todo':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'in_progress':
      return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'done':
      return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'low':
      return 'bg-teal-100 text-teal-800 border-teal-300';
    case 'medium':
      return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'high':
      return 'bg-rose-100 text-rose-800 border-rose-300';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-300';
  }
}

export function getStatusText(status: string): string {
  switch (status) {
    case 'todo':
      return 'To Do';
    case 'in_progress':
      return 'In Progress';
    case 'done':
      return 'Done';
    default:
      return status;
  }
}

export function getPriorityText(priority: string): string {
  switch (priority) {
    case 'low':
      return 'Low';
    case 'medium':
      return 'Medium';
    case 'high':
      return 'High';
    default:
      return priority;
  }
}
