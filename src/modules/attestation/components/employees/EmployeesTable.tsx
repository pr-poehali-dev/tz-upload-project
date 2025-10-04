import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Employee } from '../../types/attestation.types';
import {
  getStatusColor,
  getStatusLabel,
  getCertificationStatusColor,
  getCertificationStatusLabel,
  getInitials
} from '../../utils/attestation.utils';

interface EmployeesTableProps {
  employees: Employee[];
  onEdit: (employeeId: string) => void;
  onAddCertification: (employeeId: string) => void;
  onViewDocuments: (employeeId: string) => void;
}

export const EmployeesTable: React.FC<EmployeesTableProps> = ({
  employees,
  onEdit,
  onAddCertification,
  onViewDocuments
}) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Сотрудник</TableHead>
            <TableHead>Организация</TableHead>
            <TableHead>Должность</TableHead>
            <TableHead>Аттестации</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id} className="cursor-pointer hover:bg-gray-50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-blue-100 text-blue-700">
                      {getInitials(employee.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{employee.fullName}</div>
                    {employee.email && (
                      <div className="text-xs text-gray-500">{employee.email}</div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {employee.organizationName}
              </TableCell>
              <TableCell className="text-sm">{employee.position}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {employee.certificationAreas?.slice(0, 2).map((cert) => (
                    <Badge
                      key={cert.id}
                      className={getCertificationStatusColor(cert.status)}
                    >
                      {getCertificationStatusLabel(cert.status)}
                    </Badge>
                  ))}
                  {(employee.certificationAreas?.length || 0) > 2 && (
                    <Badge variant="outline">
                      +{(employee.certificationAreas?.length || 0) - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(employee.status)}>
                  {getStatusLabel(employee.status)}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onViewDocuments(employee.id)}
                  >
                    <Icon name="FileText" size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onAddCertification(employee.id)}
                  >
                    <Icon name="Award" size={16} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onEdit(employee.id)}
                  >
                    <Icon name="Edit" size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
