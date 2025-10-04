import { Inspection } from '../../types/checklist.types';
import { getInspectionStatusColor, getResultColor } from '../../utils/checklist.utils';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface InspectionsTableProps {
  inspections: Inspection[];
}

export const InspectionsTable = ({ inspections }: InspectionsTableProps) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Чек-лист</TableHead>
            <TableHead>Объект</TableHead>
            <TableHead>Исполнитель</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Плановая дата</TableHead>
            <TableHead>Дата завершения</TableHead>
            <TableHead>Результат</TableHead>
            <TableHead>Инциденты</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inspections.map((inspection) => (
            <TableRow key={inspection.id}>
              <TableCell className="font-medium">{inspection.id}</TableCell>
              <TableCell className="font-medium">{inspection.checklistName}</TableCell>
              <TableCell>{inspection.objectName}</TableCell>
              <TableCell>{inspection.inspector}</TableCell>
              <TableCell>
                <Badge className={getInspectionStatusColor(inspection.status)}>
                  {inspection.status}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{inspection.plannedDate}</TableCell>
              <TableCell className="text-sm">{inspection.completedDate || '-'}</TableCell>
              <TableCell>
                {inspection.result !== undefined ? (
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div 
                        className={`h-full ${getResultColor(inspection.result)}`}
                        style={{ width: `${inspection.result}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{inspection.result}%</span>
                  </div>
                ) : '-'}
              </TableCell>
              <TableCell>
                {inspection.incidentsCreated > 0 ? (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    {inspection.incidentsCreated}
                  </Badge>
                ) : (
                  <span className="text-sm text-gray-400">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};
