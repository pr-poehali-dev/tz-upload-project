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

const mockDiagnostics = [
  { id: 1, object: 'ОПО-012 "Резервуарный парк"', type: 'Техническая диагностика', date: '2024-09-15', nextDate: '2025-03-15', status: 'Выполнена', result: 'Удовлетворительно', defectsFound: 2 },
  { id: 2, object: 'ГТС-008 "Дамба водохранилища"', type: 'Экспертиза ПБ', date: '2024-08-20', nextDate: '2025-02-20', status: 'Выполнена', result: 'Хорошо', defectsFound: 0 },
  { id: 3, object: 'ОПО-025 "Компрессорная станция"', type: 'Техническая диагностика', date: null, nextDate: '2024-10-10', status: 'Запланирована', result: null, defectsFound: 0 },
  { id: 4, object: 'Здание-05 "Административный корпус"', type: 'Обследование', date: '2024-07-05', nextDate: '2025-01-05', status: 'Выполнена', result: 'Удовлетворительно', defectsFound: 5 },
];

export const DiagnosticsModule = () => {
  const [isDiagModalOpen, setIsDiagModalOpen] = useState(false);
  const [selectedDiag, setSelectedDiag] = useState<any>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Выполнена': return 'bg-green-100 text-green-800';
      case 'Запланирована': return 'bg-blue-100 text-blue-800';
      case 'Просрочена': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultColor = (result: string | null) => {
    switch (result) {
      case 'Хорошо': return 'bg-green-100 text-green-800';
      case 'Удовлетворительно': return 'bg-yellow-100 text-yellow-800';
      case 'Неудовлетворительно': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Выполнено</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <Icon name="CheckCircle" size={32} className="text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Запланировано</p>
                <p className="text-2xl font-bold text-blue-600">1</p>
              </div>
              <Icon name="Calendar" size={32} className="text-blue-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Найдено дефектов</p>
                <p className="text-2xl font-bold text-red-600">7</p>
              </div>
              <Icon name="AlertCircle" size={32} className="text-red-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Ближайшая</p>
                <p className="text-sm font-medium text-[#3B82F6]">10.10.2024</p>
              </div>
              <Icon name="Stethoscope" size={32} className="text-[#3B82F6] opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск по объекту..." className="w-80" />
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Тип диагностики" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="tech">Техническая диагностика</SelectItem>
              <SelectItem value="expert">Экспертиза ПБ</SelectItem>
              <SelectItem value="inspect">Обследование</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isDiagModalOpen} onOpenChange={setIsDiagModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
              <Icon name="Plus" size={16} className="mr-2" />
              Назначить диагностику
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Назначение диагностики</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="diag-object">Объект</Label>
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
                  <Label htmlFor="diag-type">Тип диагностики</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tech">Техническая диагностика</SelectItem>
                      <SelectItem value="expert">Экспертиза промышленной безопасности</SelectItem>
                      <SelectItem value="inspect">Обследование</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="diag-date">Плановая дата</Label>
                  <Input id="diag-date" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="diag-org">Организация-исполнитель</Label>
                <Input id="diag-org" placeholder="Название организации" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="diag-notes">Примечания</Label>
                <Textarea id="diag-notes" placeholder="Дополнительная информация" rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsDiagModalOpen(false)}>
                Отмена
              </Button>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsDiagModalOpen(false)}>
                Назначить
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
            {mockDiagnostics.map((diag) => (
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
                  <Button size="sm" variant="ghost" onClick={() => setSelectedDiag(diag)}>
                    <Icon name="Eye" size={14} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {selectedDiag && (
        <Dialog open={!!selectedDiag} onOpenChange={() => setSelectedDiag(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Результаты диагностики #{selectedDiag.id}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Информация о диагностике</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Объект:</span>
                      <span className="font-medium">{selectedDiag.object}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Тип:</span>
                      <span className="font-medium">{selectedDiag.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Дата:</span>
                      <span className="font-medium">{selectedDiag.date || 'Не проведена'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Статус:</span>
                      <Badge className={getStatusColor(selectedDiag.status)}>{selectedDiag.status}</Badge>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Результаты</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Общая оценка:</span>
                      {selectedDiag.result ? (
                        <Badge className={getResultColor(selectedDiag.result)}>{selectedDiag.result}</Badge>
                      ) : <span>-</span>}
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Найдено дефектов:</span>
                      <span className="font-medium text-red-600">{selectedDiag.defectsFound}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">След. диагностика:</span>
                      <span className="font-medium">{selectedDiag.nextDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              {selectedDiag.defectsFound > 0 && (
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Выявленные дефекты</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Icon name="AlertCircle" size={16} className="text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">Коррозия на резервуаре №3</p>
                          <p className="text-xs text-gray-600 mt-1">Требуется замена участка трубопровода</p>
                        </div>
                        <Badge className="bg-red-100 text-red-800">Критический</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">
                <Icon name="Download" size={16} className="mr-2" />
                Скачать отчет
              </Button>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Icon name="FileText" size={16} className="mr-2" />
                Создать инцидент
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
