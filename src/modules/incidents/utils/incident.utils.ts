import { Incident } from '../types/incident.types';

export const getPriorityColor = (priority: Incident['priority']): string => {
  const colorMap: Record<Incident['priority'], string> = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-blue-500'
  };
  return colorMap[priority] || 'bg-gray-500';
};

export const getStatusColor = (status: Incident['status']): string => {
  const colorMap: Record<Incident['status'], string> = {
    new: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-yellow-100 text-yellow-800',
    review: 'bg-purple-100 text-purple-800',
    closed: 'bg-green-100 text-green-800'
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};

export const getTypeLabel = (type: Incident['type']): string => {
  const labelMap: Record<Incident['type'], string> = {
    leak: 'Утечка',
    fire: 'Пожар',
    violation: 'Нарушение',
    accident: 'Авария'
  };
  return labelMap[type] || type;
};

export const getPriorityLabel = (priority: Incident['priority']): string => {
  const labelMap: Record<Incident['priority'], string> = {
    critical: 'Критический',
    high: 'Высокий',
    medium: 'Средний',
    low: 'Низкий'
  };
  return labelMap[priority] || priority;
};

export const getStatusLabel = (status: Incident['status']): string => {
  const labelMap: Record<Incident['status'], string> = {
    new: 'Новый',
    'in-progress': 'В работе',
    review: 'На проверке',
    closed: 'Закрыт'
  };
  return labelMap[status] || status;
};

export const isOverdue = (deadline: string): boolean => {
  return new Date(deadline) < new Date();
};

export const getDaysUntilDeadline = (deadline: string): number => {
  const now = new Date();
  const deadlineDate = new Date(deadline);
  const diff = deadlineDate.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

export const formatIncidentForExport = (incident: Incident) => ({
  'ID': incident.id,
  'Название': incident.title,
  'Тип': getTypeLabel(incident.type),
  'Приоритет': getPriorityLabel(incident.priority),
  'Объект': incident.object,
  'Статус': getStatusLabel(incident.status),
  'Ответственный': incident.responsible,
  'Создан': incident.created,
  'Срок': incident.deadline
});
