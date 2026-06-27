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
    // ==========================================
    // BUG #2: Validation bug - title with only spaces is accepted
    // We check if title is empty string, but trim() is not used.
    // Expected: title with only spaces should be rejected
    // ==========================================
    if (!title || title.length === 0) {
      throw new Error('Title is required');
    }

    // ==========================================
    // BUG #3: Max length check uses wrong variable
    // The check compares against description length instead of title
    // So title can exceed 100 characters
    // Expected: title should be limited to 100 characters
    // ==========================================
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

    // ==========================================
    // BUG #8: Edit bug - description is lost when priority is 'high'
    // If priority is 'high', the description field is replaced with empty string.
    // Expected: description should retain its value regardless of priority
    // ==========================================
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
    // ==========================================
    // BUG #7: Delete bug - UI data not refreshed after delete
    // The delete works in storage, but we return void and
    // the UI caller doesn't refresh the list.
    // Expected: UI should refresh after delete
    // ==========================================
    this.repository.delete(id);
  }

  searchTasks(tasks: Task[], query: string): Task[] {
    // ==========================================
    // BUG #4: Search bug - no trim on search query
    // Search with spaces at start/end will not match results.
    // Expected: search should trim whitespace from query
    // ==========================================
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

    // ==========================================
    // BUG #5: Filter bug - "done" filter also shows "in_progress" tasks
    // The condition uses incorrect logic. When filtering for "done",
    // it incorrectly includes "in_progress" tasks too.
    // Expected: only tasks with matching status should be returned
    // ==========================================
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
    // ==========================================
    // BUG #6: Pagination bug - page doesn't reset on filter/search
    // If user is on page 2 and performs a new search,
    // the page doesn't reset, potentially showing empty state.
    // Expected: page should reset to 1 on new search/filter
    // ==========================================
    const startIndex = (page - 1) * itemsPerPage;
    return tasks.slice(startIndex, startIndex + itemsPerPage);
  }

  getTotalPages(tasks: Task[], itemsPerPage: number): number {
    return Math.ceil(tasks.length / itemsPerPage);
  }
}
