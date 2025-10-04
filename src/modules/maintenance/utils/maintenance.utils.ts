import { Maintenance, MaintenancePriority, MaintenanceStatus } from '../types/maintenance.types';

export const mockMaintenance: Maintenance[] = [
  { id: 1, object: 'ОПО-012 "Резервуарный парк"', type: 'Плановый ремонт', priority: 'Средний', status: 'В работе', plannedStart: '2024-10-15', plannedEnd: '2024-10-22', actualEnd: null, budget: 450000, spent: 180000, responsible: 'Иванов И.И.' },
  { id: 2, object: 'ГТС-008 "Дамба водохранилища"', type: 'Капитальный ремонт', priority: 'Высокий', status: 'Запланирован', plannedStart: '2024-11-01', plannedEnd: '2024-12-15', actualEnd: null, budget: 2500000, spent: 0, responsible: 'Петров П.П.' },
  { id: 3, object: 'Здание-05 "Административный корпус"', type: 'Текущий ремонт', priority: 'Низкий', status: 'Завершен', plannedStart: '2024-09-01', plannedEnd: '2024-09-15', actualEnd: '2024-09-14', budget: 180000, spent: 175000, responsible: 'Сидоров С.С.' },
  { id: 4, object: 'ОПО-025 "Компрессорная станция"', type: 'Аварийный ремонт', priority: 'Критический', status: 'В работе', plannedStart: '2024-10-03', plannedEnd: '2024-10-08', actualEnd: null, budget: 800000, spent: 650000, responsible: 'Кузнецов К.К.' },
];

export const getStatusColor = (status: MaintenanceStatus): string => {
  switch (status) {
    case 'В работе':
      return 'bg-blue-100 text-blue-800';
    case 'Запланирован':
      return 'bg-yellow-100 text-yellow-800';
    case 'Завершен':
      return 'bg-green-100 text-green-800';
    case 'Приостановлен':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getPriorityColor = (priority: MaintenancePriority): string => {
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
