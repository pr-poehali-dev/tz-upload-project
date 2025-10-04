import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { ExportMenu } from '@/components/ui/export-menu';
import { IncidentsTable } from '../components/table/IncidentsTable';
import { IncidentFormModal } from '../components/forms/IncidentFormModal';
import { useIncidents } from '../hooks/useIncidents';
import { mockIncidents } from '@/data/mockData';
import { formatIncidentForExport } from '../utils/incident.utils';
import { exportToExcel, exportToPDF, exportToCSV } from '@/utils/exportUtils';
import { IncidentFormData } from '../types/incident.types';

export const IncidentsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { incidents, filters, updateFilters } = useIncidents(mockIncidents);

  const handleExportExcel = () => {
    const data = incidents.map(formatIncidentForExport);
    exportToExcel(data, 'Инциденты', 'Инциденты');
  };

  const handleExportPDF = () => {
    const columns = [
      { header: 'ID', dataKey: 'id' },
      { header: 'Название', dataKey: 'title' },
      { header: 'Тип', dataKey: 'type' },
      { header: 'Приоритет', dataKey: 'priority' },
      { header: 'Объект', dataKey: 'object' },
      { header: 'Статус', dataKey: 'status' },
      { header: 'Ответственный', dataKey: 'responsible' },
      { header: 'Создан', dataKey: 'created' },
      { header: 'Срок', dataKey: 'deadline' }
    ];
    exportToPDF(incidents, columns, 'Инциденты', 'Отчет по инцидентам');
  };

  const handleExportCSV = () => {
    const data = incidents.map(formatIncidentForExport);
    exportToCSV(data, 'Инциденты');
  };

  const handleSubmit = (data: IncidentFormData) => {
    console.log('Creating incident:', data);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input
            placeholder="Поиск инцидентов..."
            className="w-80"
            value={filters.search}
            onChange={(e) => updateFilters({ search: e.target.value })}
          />
          <Select
            value={filters.status}
            onValueChange={(value) => updateFilters({ status: value })}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="new">Новый</SelectItem>
              <SelectItem value="in-progress">В работе</SelectItem>
              <SelectItem value="review">На проверке</SelectItem>
              <SelectItem value="closed">Закрыт</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3">
          <ExportMenu
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
          />
          <Button
            className="bg-[#3B82F6] hover:bg-[#2563EB]"
            onClick={() => setIsModalOpen(true)}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Создать инцидент
          </Button>
        </div>
      </div>

      <IncidentsTable incidents={incidents} />

      <IncidentFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
