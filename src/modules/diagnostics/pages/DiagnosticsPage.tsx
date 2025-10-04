import { useDiagnostics } from '../hooks/useDiagnostics';
import { DiagnosticStats } from '../components/stats/DiagnosticStats';
import { DiagnosticsTable } from '../components/table/DiagnosticsTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

export const DiagnosticsPage = () => {
  const { diagnostics, setSelectedDiagnostic, stats } = useDiagnostics();

  return (
    <div className="space-y-6">
      <DiagnosticStats stats={stats} />

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск по объекту..." className="w-80" />
        </div>
        <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
          <Icon name="Plus" size={16} className="mr-2" />
          Назначить диагностику
        </Button>
      </div>

      <DiagnosticsTable diagnostics={diagnostics} onSelect={setSelectedDiagnostic} />
    </div>
  );
};
