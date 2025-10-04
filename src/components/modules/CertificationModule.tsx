import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';

const mockCertifications = [
  { id: 1, employee: 'Иванов Иван Иванович', position: 'Инженер по ТБ', category: 'A.1', nextExam: '2025-03-15', status: 'Активна', organization: 'ООО "Нефтехим"' },
  { id: 2, employee: 'Петрова Мария Сергеевна', position: 'Главный инженер', category: 'A.2', nextExam: '2024-12-20', status: 'Истекает', organization: 'ООО "Нефтехим"' },
  { id: 3, employee: 'Сидоров Петр Алексеевич', position: 'Механик', category: 'B.1', nextExam: '2024-09-10', status: 'Просрочена', organization: 'ООО "ГазТранс"' },
  { id: 4, employee: 'Кузнецова Анна Владимировна', position: 'Специалист ПБ', category: 'A.1', nextExam: '2025-06-30', status: 'Активна', organization: 'АО "ПромСтрой"' },
];

export const CertificationModule = () => {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Активна': return 'bg-green-100 text-green-800';
      case 'Истекает': return 'bg-yellow-100 text-yellow-800';
      case 'Просрочена': return 'bg-red-100 text-red-800';
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
                <p className="text-sm text-gray-600">Активных</p>
                <p className="text-2xl font-bold text-green-600">2</p>
              </div>
              <Icon name="CheckCircle" size={32} className="text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Истекают</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <Icon name="AlertTriangle" size={32} className="text-yellow-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Просрочено</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <Icon name="XCircle" size={32} className="text-red-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Всего</p>
                <p className="text-2xl font-bold text-[#3B82F6]">4</p>
              </div>
              <Icon name="Award" size={32} className="text-[#3B82F6] opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск по ФИО или должности..." className="w-80" />
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Активна</SelectItem>
              <SelectItem value="expiring">Истекает</SelectItem>
              <SelectItem value="expired">Просрочена</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={isCertModalOpen} onOpenChange={setIsCertModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить аттестацию
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Регистрация аттестации</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="cert-employee">Сотрудник</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите сотрудника" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Иванов Иван Иванович</SelectItem>
                    <SelectItem value="2">Петрова Мария Сергеевна</SelectItem>
                    <SelectItem value="3">Сидоров Петр Алексеевич</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cert-category">Категория аттестации</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="a1">A.1 - Эксплуатация ОПО</SelectItem>
                      <SelectItem value="a2">A.2 - Надзор за эксплуатацией</SelectItem>
                      <SelectItem value="b1">B.1 - Техническое обслуживание</SelectItem>
                      <SelectItem value="b2">B.2 - Ремонт оборудования</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cert-number">Номер удостоверения</Label>
                  <Input id="cert-number" placeholder="AB-123456" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="cert-date">Дата получения</Label>
                  <Input id="cert-date" type="date" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cert-expire">Следующая аттестация</Label>
                  <Input id="cert-expire" type="date" />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cert-org">Организация, выдавшая удостоверение</Label>
                <Input id="cert-org" placeholder="Ростехнадзор / Обучающий центр" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsCertModalOpen(false)}>
                Отмена
              </Button>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsCertModalOpen(false)}>
                Сохранить
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
              <TableHead>Сотрудник</TableHead>
              <TableHead>Должность</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Организация</TableHead>
              <TableHead>Следующий экзамен</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCertifications.map((cert) => (
              <TableRow key={cert.id}>
                <TableCell className="font-medium">{cert.id}</TableCell>
                <TableCell className="font-medium">{cert.employee}</TableCell>
                <TableCell>{cert.position}</TableCell>
                <TableCell>
                  <Badge variant="outline">{cert.category}</Badge>
                </TableCell>
                <TableCell className="text-sm">{cert.organization}</TableCell>
                <TableCell className="text-sm">{cert.nextExam}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(cert.status)}>{cert.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      <Icon name="Eye" size={14} />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Icon name="Edit" size={14} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
