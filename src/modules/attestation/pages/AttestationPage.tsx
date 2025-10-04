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
import { EmployeesTable } from '../components/employees/EmployeesTable';
import { EmployeeFormModal } from '../components/employees/EmployeeFormModal';
import { CertificationFormModal } from '../components/certifications/CertificationFormModal';
import { useEmployees } from '../hooks/useEmployees';
import { formatEmployeeForExport } from '../utils/attestation.utils';
import { exportToExcel, exportToPDF, exportToCSV } from '@/utils/exportUtils';
import { Employee, EmployeeFormData, CertificationFormData } from '../types/attestation.types';

const mockEmployees: Employee[] = [
  {
    id: '1',
    fullName: 'Иванов Иван Иванович',
    position: 'Инженер по ТБ',
    organizationId: 'org1',
    organizationName: 'ООО "Газпром"',
    status: 'active',
    email: 'ivanov@example.com',
    phone: '+7 (999) 123-45-67',
    hireDate: '2020-01-15',
    certificationAreas: [
      {
        id: 'cert1',
        employeeId: '1',
        name: 'Безопасность ОПО',
        certificationType: 'rostechnadzor',
        status: 'valid',
        validFrom: '2023-01-01',
        validUntil: '2026-01-01',
        certificationNumber: '№ 12345',
        issuedBy: 'Ростехнадзор'
      }
    ]
  },
  {
    id: '2',
    fullName: 'Петров Петр Петрович',
    position: 'Начальник смены',
    organizationId: 'org1',
    organizationName: 'ООО "Газпром"',
    status: 'active',
    email: 'petrov@example.com',
    phone: '+7 (999) 234-56-78',
    hireDate: '2019-05-20',
    certificationAreas: [
      {
        id: 'cert2',
        employeeId: '2',
        name: 'Эксплуатация ГТС',
        certificationType: 'rostechnadzor',
        status: 'expiring',
        validFrom: '2022-06-01',
        validUntil: '2025-11-30',
        certificationNumber: '№ 67890',
        issuedBy: 'Ростехнадзор'
      }
    ]
  },
  {
    id: '3',
    fullName: 'Сидорова Анна Сергеевна',
    position: 'Специалист по охране труда',
    organizationId: 'org2',
    organizationName: 'АО "Роснефть"',
    status: 'active',
    email: 'sidorova@example.com',
    phone: '+7 (999) 345-67-89',
    hireDate: '2021-03-10',
    certificationAreas: []
  }
];

export const AttestationPage: React.FC = () => {
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isCertificationModalOpen, setIsCertificationModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);

  const { employees, filters, updateFilters } = useEmployees(mockEmployees);

  const handleExportExcel = () => {
    const data = employees.map(formatEmployeeForExport);
    exportToExcel(data, 'Сотрудники', 'Сотрудники');
  };

  const handleExportPDF = () => {
    const columns = [
      { header: 'ID', dataKey: 'id' },
      { header: 'ФИО', dataKey: 'fullName' },
      { header: 'Должность', dataKey: 'position' },
      { header: 'Организация', dataKey: 'organizationName' },
      { header: 'Статус', dataKey: 'status' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Телефон', dataKey: 'phone' }
    ];
    exportToPDF(employees, columns, 'Сотрудники', 'Отчет по сотрудникам');
  };

  const handleExportCSV = () => {
    const data = employees.map(formatEmployeeForExport);
    exportToCSV(data, 'Сотрудники');
  };

  const handleSubmitEmployee = (data: EmployeeFormData) => {
    console.log('Creating employee:', data);
  };

  const handleSubmitCertification = (data: CertificationFormData) => {
    console.log('Adding certification:', data);
  };

  const handleEdit = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setIsEmployeeModalOpen(true);
  };

  const handleAddCertification = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setIsCertificationModalOpen(true);
  };

  const handleViewDocuments = (employeeId: string) => {
    console.log('View documents for employee:', employeeId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input
            placeholder="Поиск по ФИО или должности..."
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
              <SelectItem value="active">Активен</SelectItem>
              <SelectItem value="inactive">Неактивен</SelectItem>
              <SelectItem value="dismissed">Уволен</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={filters.organization}
            onValueChange={(value) => updateFilters({ organization: value })}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Организация" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все организации</SelectItem>
              <SelectItem value="org1">ООО "Газпром"</SelectItem>
              <SelectItem value="org2">АО "Роснефть"</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Icon name="Upload" size={16} className="mr-2" />
            Импорт
          </Button>
          <ExportMenu
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
          />
          <Button
            className="bg-[#3B82F6] hover:bg-[#2563EB]"
            onClick={() => {
              setSelectedEmployeeId(null);
              setIsEmployeeModalOpen(true);
            }}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить сотрудника
          </Button>
        </div>
      </div>

      <EmployeesTable
        employees={employees}
        onEdit={handleEdit}
        onAddCertification={handleAddCertification}
        onViewDocuments={handleViewDocuments}
      />

      <EmployeeFormModal
        open={isEmployeeModalOpen}
        onClose={() => {
          setIsEmployeeModalOpen(false);
          setSelectedEmployeeId(null);
        }}
        employee={
          selectedEmployeeId
            ? employees.find((e) => e.id === selectedEmployeeId)
            : null
        }
        onSubmit={handleSubmitEmployee}
      />

      <CertificationFormModal
        open={isCertificationModalOpen}
        onClose={() => {
          setIsCertificationModalOpen(false);
          setSelectedEmployeeId(null);
        }}
        employeeId={selectedEmployeeId}
        onSubmit={handleSubmitCertification}
      />
    </div>
  );
};
