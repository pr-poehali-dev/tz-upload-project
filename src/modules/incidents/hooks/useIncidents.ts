import { useState, useMemo, useCallback } from 'react';
import { Incident, IncidentFilters } from '../types/incident.types';

export const useIncidents = (initialIncidents: Incident[]) => {
  const [incidents] = useState<Incident[]>(initialIncidents);
  const [filters, setFilters] = useState<IncidentFilters>({
    search: '',
    status: '',
    priority: '',
    type: '',
    dateFrom: '',
    dateTo: ''
  });

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesSearch =
        !filters.search ||
        incident.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        incident.object.toLowerCase().includes(filters.search.toLowerCase()) ||
        incident.responsible.toLowerCase().includes(filters.search.toLowerCase());

      const matchesStatus = !filters.status || incident.status === filters.status;
      const matchesPriority = !filters.priority || incident.priority === filters.priority;
      const matchesType = !filters.type || incident.type === filters.type;

      const matchesDateFrom =
        !filters.dateFrom || new Date(incident.created) >= new Date(filters.dateFrom);
      const matchesDateTo =
        !filters.dateTo || new Date(incident.created) <= new Date(filters.dateTo);

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority &&
        matchesType &&
        matchesDateFrom &&
        matchesDateTo
      );
    });
  }, [incidents, filters]);

  const updateFilters = useCallback((newFilters: Partial<IncidentFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      search: '',
      status: '',
      priority: '',
      type: '',
      dateFrom: '',
      dateTo: ''
    });
  }, []);

  return {
    incidents: filteredIncidents,
    filters,
    updateFilters,
    clearFilters
  };
};
