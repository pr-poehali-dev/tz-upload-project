export interface Maintenance {
  id: number;
  object: string;
  type: MaintenanceType;
  priority: MaintenancePriority;
  status: MaintenanceStatus;
  plannedStart: string;
  plannedEnd: string;
  actualEnd: string | null;
  budget: number;
  spent: number;
  responsible: string;
  description?: string;
}

export type MaintenanceType = 'Плановый ремонт' | 'Капитальный ремонт' | 'Текущий ремонт' | 'Аварийный ремонт';
export type MaintenancePriority = 'Критический' | 'Высокий' | 'Средний' | 'Низкий';
export type MaintenanceStatus = 'В работе' | 'Запланирован' | 'Завершен' | 'Приостановлен';
