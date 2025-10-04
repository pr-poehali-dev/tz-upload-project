import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { ExportMenu } from '@/components/ui/export-menu';
import { createUsersExport } from '@/utils/addExportToModules';

const mockUsers = [
  { id: 1, name: 'Иванов Иван Иванович', email: 'ivanov@neftehim.ru', role: 'Администратор', tenant: 'ООО "Нефтехим"', status: 'Активен', lastLogin: '2024-10-05 14:32' },
  { id: 2, name: 'Петрова Мария Сергеевна', email: 'petrova@neftehim.ru', role: 'Инженер ПБ', tenant: 'ООО "Нефтехим"', status: 'Активен', lastLogin: '2024-10-05 12:15' },
  { id: 3, name: 'Сидоров Петр Алексеевич', email: 'sidorov@gaztrans.ru', role: 'Наблюдатель', tenant: 'ООО "ГазТранс"', status: 'Активен', lastLogin: '2024-10-04 18:45' },
  { id: 4, name: 'Кузнецова Анна Владимировна', email: 'kuznetsova@promstroy.ru', role: 'Менеджер', tenant: 'АО "ПромСтрой"', status: 'Заблокирован', lastLogin: '2024-09-28 10:20' },
];

export const UsersModule = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const { handleExportExcel, handleExportPDF, handleExportCSV } = createUsersExport(mockUsers);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Администратор': return 'bg-purple-100 text-purple-800';
      case 'Инженер ПБ': return 'bg-blue-100 text-blue-800';
      case 'Менеджер': return 'bg-green-100 text-green-800';
      case 'Наблюдатель': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Активен': return 'bg-green-100 text-green-800';
      case 'Заблокирован': return 'bg-red-100 text-red-800';
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
                <p className="text-sm text-gray-600">Всего пользователей</p>
                <p className="text-2xl font-bold text-[#3B82F6]">4</p>
              </div>
              <Icon name="Users" size={32} className="text-[#3B82F6] opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Активных</p>
                <p className="text-2xl font-bold text-green-600">3</p>
              </div>
              <Icon name="UserCheck" size={32} className="text-green-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Заблокировано</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <Icon name="UserX" size={32} className="text-red-600 opacity-50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Онлайн сейчас</p>
                <p className="text-2xl font-bold text-[#3B82F6]">2</p>
              </div>
              <Icon name="Activity" size={32} className="text-[#3B82F6] opacity-50" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск по имени или email..." className="w-80" />
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Роль" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все роли</SelectItem>
              <SelectItem value="admin">Администратор</SelectItem>
              <SelectItem value="engineer">Инженер ПБ</SelectItem>
              <SelectItem value="manager">Менеджер</SelectItem>
              <SelectItem value="observer">Наблюдатель</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3">
          <ExportMenu 
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
          />
          <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить пользователя
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Создание пользователя</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="user-name">ФИО</Label>
                  <Input id="user-name" placeholder="Иванов Иван Иванович" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="user-email">Email</Label>
                  <Input id="user-email" type="email" placeholder="user@company.ru" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="user-tenant">Организация</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите организацию" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">ООО "Нефтехим"</SelectItem>
                      <SelectItem value="2">ООО "ГазТранс"</SelectItem>
                      <SelectItem value="3">АО "ПромСтрой"</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="user-role">Роль</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите роль" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Администратор</SelectItem>
                      <SelectItem value="engineer">Инженер ПБ</SelectItem>
                      <SelectItem value="manager">Менеджер</SelectItem>
                      <SelectItem value="observer">Наблюдатель</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-semibold mb-2 text-sm">Права доступа</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Просмотр инцидентов</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Создание инцидентов</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Управление пользователями</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <span className="text-sm">Доступ к отчетам</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsUserModalOpen(false)}>
                Отмена
              </Button>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsUserModalOpen(false)}>
                Создать пользователя
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
              <TableHead>Пользователь</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Организация</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Последний вход</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.id}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-sm font-medium">
                      {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{user.email}</TableCell>
                <TableCell className="text-sm">{user.tenant}</TableCell>
                <TableCell>
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">{user.lastLogin}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setSelectedUser(user)}>
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

      {selectedUser && (
        <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#3B82F6] flex items-center justify-center text-white text-2xl font-medium">
                    {selectedUser.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <DialogTitle className="text-xl">{selectedUser.name}</DialogTitle>
                    <p className="text-sm text-gray-600 mt-1">{selectedUser.email}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(selectedUser.status)}>{selectedUser.status}</Badge>
              </div>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Основная информация</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Организация:</span>
                      <span className="font-medium">{selectedUser.tenant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Роль:</span>
                      <Badge className={getRoleColor(selectedUser.role)}>{selectedUser.role}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{selectedUser.email}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Активность</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Последний вход:</span>
                      <span className="font-medium">{selectedUser.lastLogin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Создано инцидентов:</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Закрыто задач:</span>
                      <span className="font-medium">45</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">
                <Icon name="Mail" size={16} className="mr-2" />
                Отправить письмо
              </Button>
              <Button variant="outline">
                <Icon name="Edit" size={16} className="mr-2" />
                Редактировать
              </Button>
              {selectedUser.status === 'Активен' ? (
                <Button variant="outline" className="text-red-600 hover:text-red-700">
                  <Icon name="UserX" size={16} className="mr-2" />
                  Заблокировать
                </Button>
              ) : (
                <Button className="bg-green-600 hover:bg-green-700">
                  <Icon name="UserCheck" size={16} className="mr-2" />
                  Разблокировать
                </Button>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};