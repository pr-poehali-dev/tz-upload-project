import { Employee, CertificationArea } from '../types/attestation.types';

export const getStatusColor = (status: Employee['status']): string => {
  const colorMap: Record<Employee['status'], string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-yellow-100 text-yellow-800',
    dismissed: 'bg-gray-100 text-gray-800'
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusLabel = (status: Employee['status']): string => {
  const labelMap: Record<Employee['status'], string> = {
    active: 'Активен',
    inactive: 'Неактивен',
    dismissed: 'Уволен'
  };
  return labelMap[status] || status;
};

export const getCertificationStatusColor = (status: CertificationArea['status']): string => {
  const colorMap: Record<CertificationArea['status'], string> = {
    valid: 'bg-green-100 text-green-800',
    expiring: 'bg-yellow-100 text-yellow-800',
    expired: 'bg-red-100 text-red-800',
    pending: 'bg-blue-100 text-blue-800'
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};

export const getCertificationStatusLabel = (status: CertificationArea['status']): string => {
  const labelMap: Record<CertificationArea['status'], string> = {
    valid: 'Действует',
    expiring: 'Истекает',
    expired: 'Истёк',
    pending: 'В ожидании'
  };
  return labelMap[status] || status;
};

export const formatEmployeeForExport = (employee: Employee) => ({
  'ID': employee.id,
  'ФИО': employee.fullName,
  'Должность': employee.position,
  'Организация': employee.organizationName,
  'Статус': getStatusLabel(employee.status),
  'Email': employee.email || '',
  'Телефон': employee.phone || '',
  'Дата найма': employee.hireDate || ''
});

export const getInitials = (fullName: string): string => {
  return fullName
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

export const isExpiringSoon = (validUntil: string, daysThreshold: number = 30): boolean => {
  const expiryDate = new Date(validUntil);
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= daysThreshold && diffDays > 0;
};
