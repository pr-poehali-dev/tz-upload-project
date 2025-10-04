import React, { useState, useMemo, useCallback } from 'react';
import { Box, Button } from '@mui/material';
import { Assignment, Edit, Description, Upload, Download } from '@mui/icons-material';
import { 
  DataTable, 
  FilterBar, 
  StatusBadge,
  renderAvatar,
  renderActions 
} from '@/core/ui';
import { EmployeeFormModal } from './EmployeeFormModal';
import { CertificationFormModal } from '../certifications/CertificationFormModal';
import { useAttestationStore } from '../../store/attestationStore';
import { Employee } from '../../types/attestation.types';
import { getStatusInfo } from '../../utils/certificationUtils';
import { ErrorBoundary } from '@/core/error/ErrorBoundary';
import { useEmployeeApi } from '../../hooks/useApi';

interface EmployeeWithCertifications extends Employee {
  certificationAreas?: any[];
}

export const EmployeeList: React.FC = () => {
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [certificationModalOpen, setCertificationModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    organization: '',
    certificationType: ''
  });

  const { execute } = useEmployeeApi();
  const { getEmployeesWithCertifications, setEmployeeFilters } = useAttestationStore();

  const employeesWithCerts = getEmployeesWithCertifications();

  const filteredEmployees = useMemo(() => {
    return employeesWithCerts.filter((employee: EmployeeWithCertifications) => {
      const matchesSearch = !filters.search || 
        employee.fullName.toLowerCase().includes(filters.search.toLowerCase()) ||
        employee.position.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesStatus = !filters.status || employee.status === filters.status;
      const matchesOrganization = !filters.organization || employee.organizationId === filters.organization;
      const matchesCertificationType = !filters.certificationType ||
        employee.certificationAreas?.some(cert => cert.certificationType === filters.certificationType);
      
      return matchesSearch && matchesStatus && matchesOrganization && matchesCertificationType;
    });
  }, [employeesWithCerts, filters]);

  const handleAddCertification = useCallback((employeeId: string) => {
    setSelectedEmployee(employeeId);
    setCertificationModalOpen(true);
  }, []);

  const handleEditEmployee = useCallback((employeeId: string) => {
    setSelectedEmployee(employeeId);
    setEmployeeModalOpen(true);
  }, []);

  const handleViewDocument = useCallback(async (employeeId: string) => {
    await execute(() => Promise.resolve(console.log('View document:', employeeId)));
  }, [execute]);

  const columns = useMemo(() => [
    {
      key: 'organizationName',
      label: 'Организация',
      render: (value: string) => value || '-'
    },
    {
      key: 'fullName',
      label: 'ФИО',
      render: (value: string, row: EmployeeWithCertifications) => 
        renderAvatar(value, row.position)
    },
    {
      key: 'position',
      label: 'Должность'
    },
    {
      key: 'certificationAreas',
      label: 'Области аттестации',
      render: (_: any, row: EmployeeWithCertifications) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {row.certificationAreas?.map((cert: any, index: number) => {
            const statusInfo = getStatusInfo(cert.status);
            return (
              <Box key={`${cert.id}-${index}`} sx={{ 
                p: 1, 
                bgcolor: `${statusInfo.color}.light`,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'divider'
              }}>
                <StatusBadge status={cert.status} size="small" />
              </Box>
            );
          })}
        </Box>
      )
    },
    {
      key: 'actions',
      label: 'Действия',
      align: 'center' as const,
      render: (_: any, row: EmployeeWithCertifications) => renderActions([
        {
          icon: <Description fontSize="small" />,
          tooltip: 'Просмотреть документы',
          onClick: () => handleViewDocument(row.id),
          color: 'primary' as const
        },
        {
          icon: <Assignment fontSize="small" />,
          tooltip: 'Добавить аттестацию',
          onClick: () => handleAddCertification(row.id),
          color: 'primary' as const
        },
        {
          icon: <Edit fontSize="small" />,
          tooltip: 'Редактировать',
          onClick: () => handleEditEmployee(row.id),
          color: 'secondary' as const
        }
      ])
    }
  ], [handleViewDocument, handleAddCertification, handleEditEmployee]);

  return (
    <ErrorBoundary>
      <Box>
        <FilterBar
          filters={filters}
          onFiltersChange={(newFilters) => {
            setFilters(prev => ({ ...prev, ...newFilters }));
            setEmployeeFilters(newFilters);
          }}
          onAddClick={() => {
            setSelectedEmployee(null);
            setEmployeeModalOpen(true);
          }}
          addButtonLabel="Добавить сотрудника"
          searchPlaceholder="Поиск по ФИО или должности..."
          showSearch={true}
          additionalActions={
            <>
              <Button startIcon={<Upload />} variant="outlined">Импорт</Button>
              <Button startIcon={<Download />} variant="outlined">Экспорт</Button>
            </>
          }
        />

        <DataTable
          data={filteredEmployees}
          columns={columns}
          loading={false}
          onRowClick={(row) => handleEditEmployee(row.id)}
          hover={true}
          striped={true}
          emptyMessage="Нет сотрудников для отображения"
        />

        <EmployeeFormModal
          open={employeeModalOpen}
          onClose={() => {
            setEmployeeModalOpen(false);
            setSelectedEmployee(null);
          }}
          employeeId={selectedEmployee}
        />

        <CertificationFormModal
          open={certificationModalOpen}
          onClose={() => {
            setCertificationModalOpen(false);
            setSelectedEmployee(null);
          }}
          employeeId={selectedEmployee}
        />
      </Box>
    </ErrorBoundary>
  );
};
