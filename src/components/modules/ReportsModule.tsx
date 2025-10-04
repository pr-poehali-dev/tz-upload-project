import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const mockReports = [
  { id: 1, name: 'Отчет по инцидентам за месяц', type: 'Инциденты', period: 'Сентябрь 2024', createdAt: '2024-10-01', createdBy: 'Иванов И.И.', format: 'PDF', size: '2.4 МБ' },
  { id: 2, name: 'Аттестация персонала', type: 'Аттестация', period: 'Q3 2024', createdAt: '2024-09-30', createdBy: 'Петрова М.С.', format: 'Excel', size: '1.8 МБ' },
  { id: 3, name: 'Результаты технической диагностики', type: 'Диагностика', period: 'Август 2024', createdAt: '2024-09-15', createdBy: 'Сидоров П.А.', format: 'PDF', size: '5.2 МБ' },
  { id: 4, name: 'Выполнение плана ремонтов', type: 'Ремонты', period: 'Q3 2024', createdAt: '2024-09-28', createdBy: 'Кузнецов К.К.', format: 'Excel', size: '980 КБ' },
];

export const ReportsModule = () => {
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'PDF': return 'bg-red-100 text-red-800';
      case 'Excel': return 'bg-green-100 text-green-800';
      case 'Word': return 'bg-blue-100 text-blue-800';
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
                <p className="text-sm text-gray-600">Всего отчетов</p>
                <p className="text-2xl font-bold text-[#3B82F6]">{mockReports.length}</p>
              </div>
              <Icon name="FileText" size={32} className="text-[#3B82F6] opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">За этот месяц</p>
                <p className="text-2xl font-bold text-green-600">2</p>
              </div>
              <Icon name="Calendar" size={32} className="text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Шаблонов</p>
                <p className="text-2xl font-bold text-purple-600">8</p>
              </div>
              <Icon name="FileStack" size={32} className="text-purple-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Размер архива</p>
                <p className="text-lg font-bold text-[#3B82F6]">10.4 МБ</p>
              </div>
              <Icon name="HardDrive" size={32} className="text-[#3B82F6] opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск отчетов..." className="w-80" />
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Тип отчета" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="incidents">Инциденты</SelectItem>
              <SelectItem value="certification">Аттестация</SelectItem>
              <SelectItem value="diagnostics">Диагностика</SelectItem>
              <SelectItem value="maintenance">Ремонты</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
              <Icon name="Plus" size={16} className="mr-2" />
              Создать отчет
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Создание отчета</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="report-type">Тип отчета</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип отчета" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="incidents">Отчет по инцидентам</SelectItem>
                    <SelectItem value="certification">Отчет по аттестации</SelectItem>
                    <SelectItem value="diagnostics">Отчет по диагностике</SelectItem>
                    <SelectItem value="maintenance">Отчет по ремонтам</SelectItem>
                    <SelectItem value="checklists">Отчет по проверкам</SelectItem>
                    <SelectItem value="objects">Отчет по объектам</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="report-period-start">Период с</Label>
                  <Input id="report-period-start" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="report-period-end">Период по</Label>
                  <Input id="report-period-end" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="report-tenant">Организация</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите организацию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все организации</SelectItem>
                    <SelectItem value="1">ООО "Нефтехим"</SelectItem>
                    <SelectItem value="2">ООО "ГазТранс"</SelectItem>
                    <SelectItem value="3">АО "ПромСтрой"</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="report-format">Формат</Label>
                <Select defaultValue="pdf">
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите формат" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="excel">Excel (XLSX)</SelectItem>
                    <SelectItem value="word">Word (DOCX)</SelectItem>
                    <SelectItem value="csv">CSV</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50">
                <Label className="text-sm font-semibold">Дополнительные параметры</Label>
                <div className="space-y-2 mt-3">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Включить графики</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Показать детальную информацию</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Группировка по категориям</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Добавить подписи ответственных</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsReportModalOpen(false)}>
                Отмена
              </Button>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsReportModalOpen(false)}>
                <Icon name="Download" size={16} className="mr-2" />
                Создать и скачать
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReports.map((report) => (
          <Card key={report.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base mb-2">{report.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{report.type}</Badge>
                    <Badge className={getFormatColor(report.format)}>{report.format}</Badge>
                  </div>
                </div>
                <Icon name="FileText" className="text-gray-400" size={24} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="Calendar" size={14} />
                  <span>{report.period}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="User" size={14} />
                  <span>{report.createdBy}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="Clock" size={14} />
                  <span>{report.createdAt}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Icon name="HardDrive" size={14} />
                  <span>{report.size}</span>
                </div>
                <div className="pt-3 border-t flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Icon name="Download" size={14} className="mr-2" />
                    Скачать
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Icon name="Eye" size={14} className="mr-2" />
                    Просмотр
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Шаблоны отчетов</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Ежемесячный отчет по инцидентам', icon: 'AlertTriangle', color: 'text-red-500' },
              { name: 'Квартальная аттестация', icon: 'Award', color: 'text-blue-500' },
              { name: 'Годовой отчет по ремонтам', icon: 'Wrench', color: 'text-green-500' },
              { name: 'Отчет по техническому состоянию ОПО', icon: 'Factory', color: 'text-purple-500' },
            ].map((template, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <Icon name={template.icon as any} className={template.color} size={24} />
                  <span className="font-medium">{template.name}</span>
                </div>
                <Button size="sm" variant="outline">
                  <Icon name="Play" size={14} className="mr-2" />
                  Запустить
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
