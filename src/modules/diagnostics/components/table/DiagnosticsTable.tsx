import { Diagnostic } from '../../types/diagnostic.types';
import { getStatusColor, getResultColor } from '../../utils/diagnostic.utils';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DiagnosticsTableProps {
  diagnostics: Diagnostic[];
  onSelect: (diagnostic: Diagnostic) => void;
}

export const DiagnosticsTable = ({ diagnostics, onSelect }: DiagnosticsTableProps) => {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Объект</TableHead>
            <TableHead>Тип диагностики</TableHead>
            <TableHead>Дата проведения</TableHead>
            <TableHead>Следующая дата</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead>Результат</TableHead>
            <TableHead>Дефекты</TableHead>
            <TableHead>Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {diagnostics.map((diag) => (
            <TableRow key={diag.id}>
              <TableCell className="font-medium">{diag.id}</TableCell>
              <TableCell className="font-medium">{diag.object}</TableCell>
              <TableCell>{diag.type}</TableCell>
              <TableCell className="text-sm">{diag.date || '-'}</TableCell>
              <TableCell className="text-sm">{diag.nextDate}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(diag.status)}>{diag.status}</Badge>
              </TableCell>
              <TableCell>
                {diag.result ? (
                  <Badge className={getResultColor(diag.result)}>{diag.result}</Badge>
                ) : '-'}
              </TableCell>
              <TableCell className="text-center">
                {diag.defectsFound > 0 ? (
                  <Badge variant="outline" className="text-red-600 border-red-200">
                    {diag.defectsFound}
                  </Badge>
                ) : '-'}
              </TableCell>
              <TableCell>
                <Button size="sm" variant="ghost" onClick={() => onSelect(diag)}>
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
