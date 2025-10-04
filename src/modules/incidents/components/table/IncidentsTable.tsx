import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Incident } from '../../types/incident.types';
import {
  getPriorityColor,
  getPriorityLabel,
  getStatusColor,
  getStatusLabel,
  getTypeLabel
} from '../../utils/incident.utils';

interface IncidentsTableProps {
  incidents: Incident[];
  onRowClick?: (incident: Incident) => void;
}

export const IncidentsTable: React.FC<IncidentsTableProps> = ({
  incidents,
  onRowClick
}) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Название</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Приоритет</TableHead>
            <TableHead>Объект</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Ответственный</TableHead>
            <TableHead>Создан</TableHead>
            <TableHead>Срок</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow
              key={incident.id}
              onClick={() => onRowClick?.(incident)}
              className={onRowClick ? 'cursor-pointer' : ''}
            >
              <TableCell className="font-medium">{incident.id}</TableCell>
              <TableCell className="font-medium">{incident.title}</TableCell>
              <TableCell>{getTypeLabel(incident.type)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${getPriorityColor(
                      incident.priority
                    )}`}
                  />
                  <span className="text-sm">
                    {getPriorityLabel(incident.priority)}
                  </span>
                </div>
              </TableCell>
              <TableCell>{incident.object}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(incident.status)}>
                  {getStatusLabel(incident.status)}
                </Badge>
              </TableCell>
              <TableCell>{incident.responsible}</TableCell>
              <TableCell className="text-sm text-gray-600">
                {incident.created}
              </TableCell>
              <TableCell className="text-sm text-gray-600">
                {incident.deadline}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
