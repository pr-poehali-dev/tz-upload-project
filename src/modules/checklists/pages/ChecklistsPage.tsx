import { useChecklists } from '../hooks/useChecklists';
import { ChecklistCard } from '../components/templates/ChecklistCard';
import { InspectionsTable } from '../components/inspections/InspectionsTable';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const ChecklistsPage = () => {
  const { checklists, inspections, view, setView, setSelectedChecklist } = useChecklists();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button
            variant={view === 'inspections' ? 'default' : 'outline'}
            onClick={() => setView('inspections')}
            className={view === 'inspections' ? 'bg-[#3B82F6]' : ''}
          >
            <Icon name="ClipboardCheck" size={16} className="mr-2" />
            Проверки
          </Button>
          <Button
            variant={view === 'templates' ? 'default' : 'outline'}
            onClick={() => setView('templates')}
            className={view === 'templates' ? 'bg-[#3B82F6]' : ''}
          >
            <Icon name="FileText" size={16} className="mr-2" />
            Шаблоны
          </Button>
        </div>
        <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
          <Icon name="Plus" size={16} className="mr-2" />
          {view === 'templates' ? 'Создать шаблон' : 'Назначить проверку'}
        </Button>
      </div>

      {view === 'templates' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {checklists.map((checklist) => (
            <ChecklistCard 
              key={checklist.id} 
              checklist={checklist} 
              onSelect={setSelectedChecklist}
            />
          ))}
        </div>
      ) : (
        <InspectionsTable inspections={inspections} />
      )}
    </div>
  );
};
