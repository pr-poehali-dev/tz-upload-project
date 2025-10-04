export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  deadline: string;
  createdAt?: string;
  objectId?: number;
  objectName?: string;
}

export type TaskStatus = 'Новая' | 'В работе' | 'На проверке' | 'Завершена';
export type TaskPriority = 'Низкий' | 'Средний' | 'Высокий' | 'Критический';

export interface TaskFilters {
  search: string;
  status: TaskStatus | 'all';
  priority: TaskPriority | 'all';
}
