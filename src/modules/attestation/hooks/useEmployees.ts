import { useState, useMemo, useCallback } from 'react';
import { Employee, EmployeeFilters } from '../types/attestation.types';

export const useEmployees = (initialEmployees: Employee[]) => {
  const [employees] = useState<Employee[]>(initialEmployees);
  const [filters, setFilters] = useState<EmployeeFilters>({
    search: '',
    status: '',
    organization: '',
    certificationType: ''
  });

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const matchesSearch =
        !filters.search ||
        employee.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.position.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus = !filters.status || employee.status === filters.status;
      
      const matchesOrganization =
        !filters.organization || employee.organizationId === filters.organization;
      
      const matchesCertificationType =
        !filters.certificationType ||
        employee.certificationAreas?.some(
          (cert) => cert.certificationType === filters.certificationType
        );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesOrganization &&
        matchesCertificationType
      );
    });
  }, [employees, filters]);

  const updateFilters = useCallback((newFilters: Partial<EmployeeFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      status: '',
      organization: '',
      certificationType: ''
    });
  }, []);

  return {
    employees: filteredEmployees,
    filters,
    updateFilters,
    clearFilters
  };
};
