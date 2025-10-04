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
import { TenantCard } from '../components/cards/TenantCard';
import { TenantsTable } from '../components/table/TenantsTable';
import { TenantFormModal } from '../components/forms/TenantFormModal';
import { TenantDetailsModal } from '../components/details/TenantDetailsModal';
import { useTenants } from '../hooks/useTenants';
import { mockTenants } from '@/data/mockData';
import { formatTenantForExport } from '../utils/tenant.utils';
import { exportToExcel, exportToPDF, exportToCSV } from '@/utils/exportUtils';
import { Tenant, TenantFormData } from '../types/tenant.types';

export const TenantsPage: React.FC = () => {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [editingTenant, setEditingTenant] = useState<Tenant | null>(null);

  const { tenants, filters, viewMode, updateFilters, setViewMode } =
    useTenants(mockTenants);

  const handleExportExcel = () => {
    const data = tenants.map(formatTenantForExport);
    exportToExcel(data, 'Тенанты', 'Тенанты');
  };

  const handleExportPDF = () => {
    const columns = [
      { header: 'Организация', dataKey: 'name' },
      { header: 'ИНН', dataKey: 'inn' },
      { header: 'План', dataKey: 'plan' },
      { header: 'Статус', dataKey: 'status' },
      { header: 'Объекты', dataKey: 'objectsCount' },
      { header: 'Пользователи', dataKey: 'usersCount' },
      { header: 'Действует до', dataKey: 'expiresAt' }
    ];
    exportToPDF(tenants, columns, 'Тенанты', 'Отчет по тенантам');
  };

  const handleExportCSV = () => {
    const data = tenants.map(formatTenantForExport);
    exportToCSV(data, 'Тенанты');
  };

  const handleSubmit = (data: TenantFormData) => {
    console.log('Submitting tenant:', data);
  };

  const handleEdit = (tenant: Tenant) => {
    setEditingTenant(tenant);
    setSelectedTenant(null);
    setIsFormModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input
            placeholder="Поиск по названию или ИНН..."
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
              <SelectItem value="Активен">Активен</SelectItem>
              <SelectItem value="Истекает">Истекает</SelectItem>
              <SelectItem value="Неактивен">Неактивен</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.plan}
            onValueChange={(value) => updateFilters({ plan: value })}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Тарифный план" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все планы</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
              <SelectItem value="Basic">Basic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3">
          <div className="flex border border-gray-200 rounded-lg">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
              className={viewMode === 'cards' ? 'bg-[#3B82F6]' : ''}
            >
              <Icon name="LayoutGrid" size={16} />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className={viewMode === 'table' ? 'bg-[#3B82F6]' : ''}
            >
              <Icon name="List" size={16} />
            </Button>
          </div>
          <ExportMenu
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
          />
          <Button
            className="bg-[#3B82F6] hover:bg-[#2563EB]"
            onClick={() => {
              setEditingTenant(null);
              setIsFormModalOpen(true);
            }}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить тенанта
          </Button>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tenants.map((tenant) => (
            <TenantCard
              key={tenant.id}
              tenant={tenant}
              onClick={() => setSelectedTenant(tenant)}
            />
          ))}
        </div>
      ) : (
        <TenantsTable tenants={tenants} onRowClick={setSelectedTenant} />
      )}

      <TenantFormModal
        open={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingTenant(null);
        }}
        tenant={editingTenant}
        onSubmit={handleSubmit}
      />

      <TenantDetailsModal
        tenant={selectedTenant}
        onClose={() => setSelectedTenant(null)}
        onEdit={() => selectedTenant && handleEdit(selectedTenant)}
      />
    </div>
  );
};
