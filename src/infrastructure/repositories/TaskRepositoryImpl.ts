import { Task } from '@/core/entities/Task';
import { ITaskRepository } from '@/core/repositories/ITaskRepository';
import { LocalStorageManager } from '@/infrastructure/storage/localStorage';

export class TaskRepositoryImpl implements ITaskRepository {
  getAll(): Task[] {
    return LocalStorageManager.getTasks();
  }

  getById(id: string): Task | undefined {
    const tasks = this.getAll();
    return tasks.find((task) => task.id === id);
  }

  create(task: Task): void {
    const tasks = this.getAll();
    tasks.push(task);
    LocalStorageManager.saveTasks(tasks);
  }

  update(task: Task): void {
    const tasks = this.getAll();
    const index = tasks.findIndex((t) => t.id === task.id);
    if (index !== -1) {
      tasks[index] = task;
      LocalStorageManager.saveTasks(tasks);
    }
  }

  delete(id: string): void {
    const tasks = this.getAll();
    const filtered = tasks.filter((task) => task.id !== id);
    LocalStorageManager.saveTasks(filtered);
  }
}
