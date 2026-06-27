import { Task } from '@/core/entities/Task';
import { User } from '@/core/entities/User';
import { STORAGE_KEYS } from '@/shared/constants';
import { getSeedTasks } from '@/shared/utils/seedData';

export class LocalStorageManager {
  static initializeTasks(): void {
    const existing = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!existing) {
      const seedTasks = getSeedTasks();
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(seedTasks));
    }
  }

  static getTasks(): Task[] {
    const data = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!data) {
      this.initializeTasks();
      return this.getTasks();
    }
    try {
      return JSON.parse(data) as Task[];
    } catch {
      return [];
    }
  }

  static saveTasks(tasks: Task[]): void {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }

  static getAuth(): boolean {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  }

  static setAuth(value: boolean): void {
    if (value) {
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
  }

  static getUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    if (!data) return null;
    try {
      return JSON.parse(data) as User;
    } catch {
      return null;
    }
  }

  static setUser(user: User | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }

  static clearAll(): void {
    localStorage.removeItem(STORAGE_KEYS.TASKS);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
}
