import { Tenant } from '../types/tenant.types';

export const getStatusColor = (status: Tenant['status']): string => {
  const colorMap: Record<Tenant['status'], string> = {
    'Активен': 'bg-green-100 text-green-800',
    'Истекает': 'bg-yellow-100 text-yellow-800',
    'Неактивен': 'bg-gray-100 text-gray-800'
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};

export const getPlanColor = (plan: Tenant['plan']): string => {
  const colorMap: Record<Tenant['plan'], string> = {
    'Enterprise': 'bg-purple-100 text-purple-800',
    'Professional': 'bg-blue-100 text-blue-800',
    'Basic': 'bg-gray-100 text-gray-800'
  };
  return colorMap[plan] || 'bg-gray-100 text-gray-800';
};

export const getPlanDescription = (plan: Tenant['plan']): string => {
  const descriptionMap: Record<Tenant['plan'], string> = {
    'Basic': 'до 10 пользователей',
    'Professional': 'до 50 пользователей',
    'Enterprise': 'безлимит'
  };
  return descriptionMap[plan] || '';
};

export const formatTenantForExport = (tenant: Tenant) => ({
  'ID': tenant.id,
  'Организация': tenant.name,
  'ИНН': tenant.inn,
  'План': tenant.plan,
  'Статус': tenant.status,
  'Объекты': tenant.objectsCount,
  'Пользователи': tenant.usersCount,
  'Инциденты': tenant.incidentsCount,
  'Контактное лицо': tenant.contactPerson,
  'Email': tenant.contactEmail,
  'Телефон': tenant.contactPhone,
  'Создан': tenant.createdAt,
  'Действует до': tenant.expiresAt
});

export const isExpiringSoon = (expiresAt: string, daysThreshold: number = 30): boolean => {
  const expiryDate = new Date(expiresAt);
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= daysThreshold && diffDays > 0;
};

export const isExpired = (expiresAt: string): boolean => {
  return new Date(expiresAt) < new Date();
};
