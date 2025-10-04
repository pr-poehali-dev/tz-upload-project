import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { Tenant } from '../../types/tenant.types';
import { getStatusColor, getPlanColor } from '../../utils/tenant.utils';

interface TenantsTableProps {
  tenants: Tenant[];
  onRowClick: (tenant: Tenant) => void;
}

export const TenantsTable: React.FC<TenantsTableProps> = ({
  tenants,
  onRowClick
}) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Организация</TableHead>
            <TableHead>ИНН</TableHead>
            <TableHead>План</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Объекты</TableHead>
            <TableHead>Пользователи</TableHead>
            <TableHead>Инциденты</TableHead>
            <TableHead>Создан</TableHead>
            <TableHead>Действует до</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants.map((tenant) => (
            <TableRow key={tenant.id}>
              <TableCell className="font-medium">{tenant.id}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{tenant.name}</div>
                  <div className="text-xs text-gray-500">
                    {tenant.contactPerson}
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-mono text-sm">{tenant.inn}</TableCell>
              <TableCell>
                <Badge className={getPlanColor(tenant.plan)}>
                  {tenant.plan}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(tenant.status)}>
                  {tenant.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                {tenant.objectsCount}
              </TableCell>
              <TableCell className="text-center">{tenant.usersCount}</TableCell>
              <TableCell className="text-center">
                {tenant.incidentsCount}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {tenant.createdAt}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {tenant.expiresAt}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => onRowClick(tenant)}
                >
                  <Icon name="Eye" size={14} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
