import { useMaintenance } from '../hooks/useMaintenance';
import { MaintenanceStats } from '../components/stats/MaintenanceStats';
import { MaintenanceTable } from '../components/table/MaintenanceTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export const MaintenancePage = () => {
  const { maintenanceList, setSelectedMaintenance, stats } = useMaintenance();

  return (
    <div className="space-y-6">
      <MaintenanceStats stats={stats} />

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск по объекту..." className="w-80" />
        </div>
        <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
          <Icon name="Plus" size={16} className="mr-2" />
          Создать ремонт
        </Button>
      </div>

      <MaintenanceTable maintenanceList={maintenanceList} onSelect={setSelectedMaintenance} />
    </div>
  );
};
