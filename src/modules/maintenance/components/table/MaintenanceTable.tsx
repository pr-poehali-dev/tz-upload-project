import { Maintenance } from '../../types/maintenance.types';
import { getStatusColor, getPriorityColor } from '../../utils/maintenance.utils';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface MaintenanceTableProps {
  maintenanceList: Maintenance[];
  onSelect: (maintenance: Maintenance) => void;
}

export const MaintenanceTable = ({ maintenanceList, onSelect }: MaintenanceTableProps) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Объект</TableHead>
            <TableHead>Тип ремонта</TableHead>
            <TableHead>Приоритет</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Начало</TableHead>
            <TableHead>Окончание</TableHead>
            <TableHead>Бюджет</TableHead>
            <TableHead>Израсходовано</TableHead>
            <TableHead>Ответственный</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {maintenanceList.map((maint) => (
            <TableRow key={maint.id}>
              <TableCell className="font-medium">{maint.id}</TableCell>
              <TableCell className="font-medium">{maint.object}</TableCell>
              <TableCell>{maint.type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getPriorityColor(maint.priority)}`} />
                  <span className="text-sm">{maint.priority}</span>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(maint.status)}>{maint.status}</Badge>
              </TableCell>
              <TableCell className="text-sm">{maint.plannedStart}</TableCell>
              <TableCell className="text-sm">{maint.actualEnd || maint.plannedEnd}</TableCell>
              <TableCell className="text-sm font-medium">
                {(maint.budget / 1000).toFixed(0)}k ₽
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div 
                      className="h-full bg-[#3B82F6]"
                      style={{ width: `${(maint.spent / maint.budget) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">
                    {Math.round((maint.spent / maint.budget) * 100)}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-sm">{maint.responsible}</TableCell>
              <TableCell>
                <Button size="sm" variant="ghost" onClick={() => onSelect(maint)}>
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
