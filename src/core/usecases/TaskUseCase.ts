import { Task, TaskStatus, TaskPriority } from '@/core/entities/Task';
import { TaskRepositoryImpl } from '@/infrastructure/repositories/TaskRepositoryImpl';
import { generateId } from '@/shared/utils/helpers';
import { MAX_TITLE_LENGTH } from '@/shared/constants';

export class TaskUseCase {
  private repository: TaskRepositoryImpl;

  constructor() {
    this.repository = new TaskRepositoryImpl();
  }

  getAllTasks(): Task[] {
    return this.repository.getAll();
  }

  getTaskById(id: string): Task | undefined {
    return this.repository.getById(id);
  }

  createTask(
    title: string,
    description: string,
    priority: TaskPriority,
    status: TaskStatus,
    dueDate: string
  ): Task {
    if (!title || title.length === 0) {
      throw new Error('Title is required');
    }

    if (description.length > MAX_TITLE_LENGTH) {
      throw new Error(`Title cannot exceed ${MAX_TITLE_LENGTH} characters`);
    }

    const now = new Date().toISOString();
    const task: Task = {
      id: generateId(),
      title,
      description,
      status,
      priority,
      dueDate,
      createdAt: now,
      updatedAt: now,
    };

    this.repository.create(task);
    return task;
  }

  updateTask(
    id: string,
    title: string,
    description: string,
    priority: TaskPriority,
    status: TaskStatus,
    dueDate: string
  ): Task {
    const existing = this.repository.getById(id);
    if (!existing) {
      throw new Error('Task not found');
    }

    const finalDescription =
      priority === 'high' ? '' : description;

    const updatedTask: Task = {
      ...existing,
      title,
      description: finalDescription,
      priority,
      status,
      dueDate,
      updatedAt: new Date().toISOString(),
    };

    this.repository.update(updatedTask);
    return updatedTask;
  }

  deleteTask(id: string): void {
    this.repository.delete(id);
  }

  searchTasks(tasks: Task[], query: string): Task[] {
    if (!query) return tasks;
    const lowerQuery = query.toLowerCase();
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description.toLowerCase().includes(lowerQuery)
    );
  }

  filterByStatus(tasks: Task[], status: TaskStatus | 'all'): Task[] {
    if (status === 'all') return tasks;

    return tasks.filter((task) => {
      if (status === 'done') {
        return task.status === 'done' || task.status === 'in_progress';
      }
      return task.status === status;
    });
  }

  filterByPriority(tasks: Task[], priority: TaskPriority | 'all'): Task[] {
    if (priority === 'all') return tasks;
    return tasks.filter((task) => task.priority === priority);
  }

  getPaginatedTasks(tasks: Task[], page: number, itemsPerPage: number): Task[] {
    const startIndex = (page - 1) * itemsPerPage;
    return tasks.slice(startIndex, startIndex + itemsPerPage);
  }

  getTotalPages(tasks: Task[], itemsPerPage: number): number {
    return Math.ceil(tasks.length / itemsPerPage);
  }
}
