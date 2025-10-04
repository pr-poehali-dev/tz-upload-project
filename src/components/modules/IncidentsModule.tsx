import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { mockIncidents } from '@/data/mockData';
import { getPriorityColor, getStatusColor } from '@/utils/helpers';
import { ExportMenu } from '@/components/ui/export-menu';
import { exportToExcel, exportToPDF, exportToCSV } from '@/utils/exportUtils';

export const IncidentsModule = () => {
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);

  const handleExportExcel = () => {
    const data = mockIncidents.map(incident => ({
      'ID': incident.id,
      'Название': incident.title,
      'Тип': incident.type,
      'Приоритет': incident.priority,
      'Объект': incident.object,
      'Статус': incident.status,
      'Ответственный': incident.responsible,
      'Создан': incident.created,
      'Срок': incident.deadline,
    }));
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
      { header: 'Срок', dataKey: 'deadline' },
    ];
    exportToPDF(mockIncidents, columns, 'Инциденты', 'Отчет по инцидентам');
  };

  const handleExportCSV = () => {
    const data = mockIncidents.map(incident => ({
      'ID': incident.id,
      'Название': incident.title,
      'Тип': incident.type,
      'Приоритет': incident.priority,
      'Объект': incident.object,
      'Статус': incident.status,
      'Ответственный': incident.responsible,
      'Создан': incident.created,
      'Срок': incident.deadline,
    }));
    exportToCSV(data, 'Инциденты');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск инцидентов..." className="w-80" />
          <Select defaultValue="all">
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
          <Dialog open={isIncidentModalOpen} onOpenChange={setIsIncidentModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать инцидент
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Создание инцидента</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Название инцидента</Label>
                <Input id="title" placeholder="Краткое описание инцидента" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">Тип инцидента</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="leak">Утечка</SelectItem>
                      <SelectItem value="fire">Пожар</SelectItem>
                      <SelectItem value="violation">Нарушение</SelectItem>
                      <SelectItem value="accident">Авария</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="priority">Приоритет</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите приоритет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Критический</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="low">Низкий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="object">Объект</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите объект" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="opo-012">ОПО-012</SelectItem>
                      <SelectItem value="gts-008">ГТС-008</SelectItem>
                      <SelectItem value="building-05">Здание-05</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="responsible">Ответственный</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите ответственного" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ivanov">Иванов И.И.</SelectItem>
                      <SelectItem value="petrov">Петров П.П.</SelectItem>
                      <SelectItem value="sidorov">Сидоров С.С.</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea id="description" placeholder="Подробное описание инцидента" rows={4} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="deadline">Срок устранения</Label>
                <Input id="deadline" type="date" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsIncidentModalOpen(false)}>
                Отмена
              </Button>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsIncidentModalOpen(false)}>
                Создать инцидент
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
            {mockIncidents.map((incident) => (
              <TableRow key={incident.id}>
                <TableCell className="font-medium">{incident.id}</TableCell>
                <TableCell className="font-medium">{incident.title}</TableCell>
                <TableCell>{incident.type}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getPriorityColor(incident.priority)}`} />
                    <span className="text-sm">{incident.priority}</span>
                  </div>
                </TableCell>
                <TableCell>{incident.object}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(incident.status)}>
                    {incident.status}
                  </Badge>
                </TableCell>
                <TableCell>{incident.responsible}</TableCell>
                <TableCell className="text-sm text-gray-600">{incident.created}</TableCell>
                <TableCell className="text-sm text-gray-600">{incident.deadline}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};