import { Task, TaskPriority } from '../types/task.types';

export const mockTasks: Task[] = [
  { id: 1, title: 'Проверить давление в системе', status: 'Новая', priority: 'Высокий', assignee: 'Иванов И.И.', deadline: '2024-10-15', objectName: 'ОПО-012' },
  { id: 2, title: 'Замена фильтра', status: 'В работе', priority: 'Средний', assignee: 'Петров П.П.', deadline: '2024-10-20', objectName: 'ГТС-008' },
  { id: 3, title: 'Проверка документации', status: 'На проверке', priority: 'Низкий', assignee: 'Сидоров С.С.', deadline: '2024-10-18', objectName: 'Здание-05' },
  { id: 4, title: 'Устранение утечки', status: 'Завершена', priority: 'Критический', assignee: 'Кузнецов К.К.', deadline: '2024-10-05', objectName: 'ОПО-025' },
];

export const getPriorityColor = (priority: TaskPriority): string => {
  switch (priority) {
    case 'Критический':
      return 'bg-red-500';
    case 'Высокий':
      return 'bg-orange-500';
    case 'Средний':
      return 'bg-yellow-500';
    case 'Низкий':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'Новая':
      return 'bg-blue-100 text-blue-800';
    case 'В работе':
      return 'bg-yellow-100 text-yellow-800';
    case 'На проверке':
      return 'bg-purple-100 text-purple-800';
    case 'Завершена':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
