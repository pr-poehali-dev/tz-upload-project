import { useState, useMemo, useCallback } from 'react';
import { Tenant, TenantFilters, TenantViewMode } from '../types/tenant.types';

export const useTenants = (initialTenants: Tenant[]) => {
  const [tenants] = useState<Tenant[]>(initialTenants);
  const [filters, setFilters] = useState<TenantFilters>({
    search: '',
    status: '',
    plan: ''
  });
  const [viewMode, setViewMode] = useState<TenantViewMode>('cards');

  const filteredTenants = useMemo(() => {
    return tenants.filter((tenant) => {
      const matchesSearch =
        !filters.search ||
        tenant.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        tenant.inn.includes(filters.search) ||
        tenant.contactPerson.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus = !filters.status || tenant.status === filters.status;
      const matchesPlan = !filters.plan || tenant.plan === filters.plan;

      return matchesSearch && matchesStatus && matchesPlan;
    });
  }, [tenants, filters]);

  const updateFilters = useCallback((newFilters: Partial<TenantFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      status: '',
      plan: ''
    });
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'cards' ? 'table' : 'cards'));
  }, []);

  return {
    tenants: filteredTenants,
    filters,
    viewMode,
    updateFilters,
    clearFilters,
    setViewMode,
    toggleViewMode
  };
};
