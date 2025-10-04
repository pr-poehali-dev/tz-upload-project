export interface Tenant {
  id: string;
  name: string;
  inn: string;
  address: string;
  plan: 'Basic' | 'Professional' | 'Enterprise';
  status: 'Активен' | 'Истекает' | 'Неактивен';
  objectsCount: number;
  usersCount: number;
  incidentsCount: number;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  createdAt: string;
  expiresAt: string;
  features: string[];
}

export interface TenantFilters {
  search: string;
  status: string;
  plan: string;
}

export interface TenantFormData {
  name: string;
  inn: string;
  address: string;
  plan: Tenant['plan'];
  expiresAt: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
}

export type TenantViewMode = 'cards' | 'table';
