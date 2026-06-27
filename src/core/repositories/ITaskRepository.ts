import { Task } from '../entities/Task';

export interface ITaskRepository {
  getAll(): Task[];
  getById(id: string): Task | undefined;
  create(task: Task): void;
  update(task: Task): void;
  delete(id: string): void;
}
