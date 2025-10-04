import { useState } from 'react';
import { Maintenance } from '../types/maintenance.types';
import { mockMaintenance } from '../utils/maintenance.utils';

export const useMaintenance = () => {
  const [maintenanceList] = useState<Maintenance[]>(mockMaintenance);
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);

  const stats = {
    inProgress: maintenanceList.filter(m => m.status === 'В работе').length,
    planned: maintenanceList.filter(m => m.status === 'Запланирован').length,
    completed: maintenanceList.filter(m => m.status === 'Завершен').length,
    totalBudget: maintenanceList.reduce((acc, m) => acc + m.budget, 0) / 1000000,
  };

  return {
    maintenanceList,
    selectedMaintenance,
    setSelectedMaintenance,
    stats,
  };
};
