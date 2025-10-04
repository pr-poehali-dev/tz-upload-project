import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { ExportMenu } from '@/components/ui/export-menu';
import { createMaintenanceExport } from '@/utils/addExportToModules';

const mockMaintenance = [
  { id: 1, object: 'ОПО-012 "Резервуарный парк"', type: 'Плановый ремонт', priority: 'Средний', status: 'В работе', plannedStart: '2024-10-15', plannedEnd: '2024-10-22', actualEnd: null, budget: 450000, spent: 180000, responsible: 'Иванов И.И.' },
  { id: 2, object: 'ГТС-008 "Дамба водохранилища"', type: 'Капитальный ремонт', priority: 'Высокий', status: 'Запланирован', plannedStart: '2024-11-01', plannedEnd: '2024-12-15', actualEnd: null, budget: 2500000, spent: 0, responsible: 'Петров П.П.' },
  { id: 3, object: 'Здание-05 "Административный корпус"', type: 'Текущий ремонт', priority: 'Низкий', status: 'Завершен', plannedStart: '2024-09-01', plannedEnd: '2024-09-15', actualEnd: '2024-09-14', budget: 180000, spent: 175000, responsible: 'Сидоров С.С.' },
  { id: 4, object: 'ОПО-025 "Компрессорная станция"', type: 'Аварийный ремонт', priority: 'Критический', status: 'В работе', plannedStart: '2024-10-03', plannedEnd: '2024-10-08', actualEnd: null, budget: 800000, spent: 650000, responsible: 'Кузнецов К.К.' },
];

export const MaintenanceModule = () => {
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<any>(null);
  const { handleExportExcel, handleExportPDF, handleExportCSV } = createMaintenanceExport(mockMaintenance);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'В работе': return 'bg-blue-100 text-blue-800';
      case 'Запланирован': return 'bg-yellow-100 text-yellow-800';
      case 'Завершен': return 'bg-green-100 text-green-800';
      case 'Приостановлен': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Критический': return 'bg-red-500';
      case 'Высокий': return 'bg-orange-500';
      case 'Средний': return 'bg-yellow-500';
      case 'Низкий': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">В работе</p>
                <p className="text-2xl font-bold text-blue-600">2</p>
              </div>
              <Icon name="Wrench" size={32} className="text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Запланировано</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <Icon name="Calendar" size={32} className="text-yellow-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Завершено</p>
                <p className="text-2xl font-bold text-green-600">1</p>
              </div>
              <Icon name="CheckCircle" size={32} className="text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Бюджет (млн ₽)</p>
                <p className="text-2xl font-bold text-[#3B82F6]">3.9</p>
              </div>
              <Icon name="Wallet" size={32} className="text-[#3B82F6] opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск по объекту..." className="w-80" />
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Тип ремонта" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="planned">Плановый</SelectItem>
              <SelectItem value="capital">Капитальный</SelectItem>
              <SelectItem value="current">Текущий</SelectItem>
              <SelectItem value="emergency">Аварийный</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="inwork">В работе</SelectItem>
              <SelectItem value="planned">Запланирован</SelectItem>
              <SelectItem value="completed">Завершен</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3">
          <ExportMenu 
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
          />
          <Dialog open={isMaintenanceModalOpen} onOpenChange={setIsMaintenanceModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Icon name="Plus" size={16} className="mr-2" />
                Создать ремонт
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Планирование ремонта</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="maint-object">Объект</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите объект" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4">ОПО-012 "Резервуарный парк"</SelectItem>
                    <SelectItem value="5">ГТС-008 "Дамба водохранилища"</SelectItem>
                    <SelectItem value="8">ОПО-025 "Компрессорная станция"</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="maint-type">Тип ремонта</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planned">Плановый ремонт</SelectItem>
                      <SelectItem value="capital">Капитальный ремонт</SelectItem>
                      <SelectItem value="current">Текущий ремонт</SelectItem>
                      <SelectItem value="emergency">Аварийный ремонт</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maint-priority">Приоритет</Label>
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
                  <Label htmlFor="maint-start">Дата начала</Label>
                  <Input id="maint-start" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maint-end">Дата окончания</Label>
                  <Input id="maint-end" type="date" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="maint-budget">Бюджет (₽)</Label>
                  <Input id="maint-budget" type="number" placeholder="500000" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maint-resp">Ответственный</Label>
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
                <Label htmlFor="maint-desc">Описание работ</Label>
                <Textarea id="maint-desc" placeholder="Детальное описание ремонтных работ" rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsMaintenanceModalOpen(false)}>
                Отмена
              </Button>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsMaintenanceModalOpen(false)}>
                Создать
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
            {mockMaintenance.map((maint) => (
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
                  <Button size="sm" variant="ghost" onClick={() => setSelectedMaintenance(maint)}>
                    <Icon name="Eye" size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {selectedMaintenance && (
        <Dialog open={!!selectedMaintenance} onOpenChange={() => setSelectedMaintenance(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-xl">Ремонт #{selectedMaintenance.id}</DialogTitle>
                  <p className="text-sm text-gray-600 mt-1">{selectedMaintenance.object}</p>
                </div>
                <Badge className={getStatusColor(selectedMaintenance.status)}>
                  {selectedMaintenance.status}
                </Badge>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Информация о ремонте</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Тип ремонта:</span>
                      <span className="font-medium">{selectedMaintenance.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Приоритет:</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(selectedMaintenance.priority)}`} />
                        <span className="font-medium">{selectedMaintenance.priority}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ответственный:</span>
                      <span className="font-medium">{selectedMaintenance.responsible}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Сроки</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Плановое начало:</span>
                      <span className="font-medium">{selectedMaintenance.plannedStart}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Плановое окончание:</span>
                      <span className="font-medium">{selectedMaintenance.plannedEnd}</span>
                    </div>
                    {selectedMaintenance.actualEnd && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Фактическое окончание:</span>
                        <span className="font-medium text-green-600">{selectedMaintenance.actualEnd}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Бюджет и расходы</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Запланировано:</span>
                    <span className="text-lg font-bold">{selectedMaintenance.budget.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Израсходовано:</span>
                    <span className="text-lg font-bold text-[#3B82F6]">{selectedMaintenance.spent.toLocaleString()} ₽</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
                    <div 
                      className="h-full bg-[#3B82F6]"
                      style={{ width: `${(selectedMaintenance.spent / selectedMaintenance.budget) * 100}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Прогресс:</span>
                    <span className="font-medium">{Math.round((selectedMaintenance.spent / selectedMaintenance.budget) * 100)}%</span>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Выполненные работы</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Icon name="CheckCircle" size={16} className="text-green-600 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Демонтаж старого оборудования</p>
                      <p className="text-xs text-gray-600 mt-1">Выполнено 05.10.2024</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <Icon name="Loader" size={16} className="text-blue-600 mt-1" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Установка нового оборудования</p>
                      <p className="text-xs text-gray-600 mt-1">В процессе</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">
                <Icon name="Download" size={16} className="mr-2" />
                Отчет
              </Button>
              <Button variant="outline">
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать
              </Button>
              {selectedMaintenance.status === 'В работе' && (
                <Button className="bg-green-600 hover:bg-green-700">
                  <Icon name="CheckCircle" size={16} className="mr-2" />
                  Завершить
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};