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
import { mockTenants } from '@/data/mockData';

export const TenantsModule = () => {
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Активен': return 'bg-green-100 text-green-800';
      case 'Истекает': return 'bg-yellow-100 text-yellow-800';
      case 'Неактивен': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      case 'Professional': return 'bg-blue-100 text-blue-800';
      case 'Basic': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск по названию или ИНН..." className="w-80" />
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Активен</SelectItem>
              <SelectItem value="expiring">Истекает</SelectItem>
              <SelectItem value="inactive">Неактивен</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Тарифный план" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все планы</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="professional">Professional</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-3">
          <div className="flex border border-gray-200 rounded-lg">
            <Button
              variant={viewMode === 'cards' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
              className={viewMode === 'cards' ? 'bg-[#3B82F6]' : ''}
            >
              <Icon name="LayoutGrid" size={16} />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className={viewMode === 'table' ? 'bg-[#3B82F6]' : ''}
            >
              <Icon name="List" size={16} />
            </Button>
          </div>
          <Dialog open={isTenantModalOpen} onOpenChange={setIsTenantModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить тенанта
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Создание тенанта</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-name">Название организации</Label>
                    <Input id="tenant-name" placeholder="ООО 'Компания'" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-inn">ИНН</Label>
                    <Input id="tenant-inn" placeholder="7701234567" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="tenant-address">Юридический адрес</Label>
                  <Input id="tenant-address" placeholder="г. Москва, ул. ..." />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-plan">Тарифный план</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите план" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="basic">Basic - до 10 пользователей</SelectItem>
                        <SelectItem value="professional">Professional - до 50 пользователей</SelectItem>
                        <SelectItem value="enterprise">Enterprise - безлимит</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tenant-expires">Дата окончания</Label>
                    <Input id="tenant-expires" type="date" />
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3">Контактное лицо</h4>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="contact-person">ФИО</Label>
                      <Input id="contact-person" placeholder="Иванов Иван Иванович" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="contact-email">Email</Label>
                        <Input id="contact-email" type="email" placeholder="email@company.ru" />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="contact-phone">Телефон</Label>
                        <Input id="contact-phone" placeholder="+7 (___) ___-__-__" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsTenantModalOpen(false)}>
                  Отмена
                </Button>
                <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsTenantModalOpen(false)}>
                  Создать тенанта
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTenants.map((tenant) => (
            <Card key={tenant.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedTenant(tenant)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{tenant.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(tenant.status)}>
                        {tenant.status}
                      </Badge>
                      <Badge className={getPlanColor(tenant.plan)}>
                        {tenant.plan}
                      </Badge>
                    </div>
                  </div>
                  <Icon name="Building2" className="text-gray-400" size={24} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="FileDigit" size={14} className="text-gray-500" />
                    <span className="text-gray-600">ИНН: {tenant.inn}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Icon name="User" size={14} className="text-gray-500" />
                    <span className="text-gray-600">{tenant.contactPerson}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t">
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#3B82F6]">{tenant.objectsCount}</div>
                      <div className="text-xs text-gray-500">Объектов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#3B82F6]">{tenant.usersCount}</div>
                      <div className="text-xs text-gray-500">Польз.</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#3B82F6]">{tenant.incidentsCount}</div>
                      <div className="text-xs text-gray-500">Инцид.</div>
                    </div>
                  </div>
                  <div className="pt-3 border-t text-xs text-gray-500">
                    Активен до: <span className="font-medium">{tenant.expiresAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Организация</TableHead>
                <TableHead>ИНН</TableHead>
                <TableHead>План</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Объекты</TableHead>
                <TableHead>Пользователи</TableHead>
                <TableHead>Инциденты</TableHead>
                <TableHead>Создан</TableHead>
                <TableHead>Действует до</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTenants.map((tenant) => (
                <TableRow key={tenant.id}>
                  <TableCell className="font-medium">{tenant.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{tenant.name}</div>
                      <div className="text-xs text-gray-500">{tenant.contactPerson}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{tenant.inn}</TableCell>
                  <TableCell>
                    <Badge className={getPlanColor(tenant.plan)}>
                      {tenant.plan}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(tenant.status)}>
                      {tenant.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{tenant.objectsCount}</TableCell>
                  <TableCell className="text-center">{tenant.usersCount}</TableCell>
                  <TableCell className="text-center">{tenant.incidentsCount}</TableCell>
                  <TableCell className="text-sm text-gray-600">{tenant.createdAt}</TableCell>
                  <TableCell className="text-sm text-gray-600">{tenant.expiresAt}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="ghost" onClick={() => setSelectedTenant(tenant)}>
                      <Icon name="Eye" size={14} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {selectedTenant && (
        <Dialog open={!!selectedTenant} onOpenChange={() => setSelectedTenant(null)}>
          <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-start justify-between">
                <div>
                  <DialogTitle className="text-2xl">{selectedTenant.name}</DialogTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getStatusColor(selectedTenant.status)}>
                      {selectedTenant.status}
                    </Badge>
                    <Badge className={getPlanColor(selectedTenant.plan)}>
                      {selectedTenant.plan}
                    </Badge>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  <Icon name="Edit" size={16} className="mr-2" />
                  Редактировать
                </Button>
              </div>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-4 py-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#3B82F6]">{selectedTenant.objectsCount}</div>
                    <div className="text-sm text-gray-600 mt-1">Объектов</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#3B82F6]">{selectedTenant.usersCount}</div>
                    <div className="text-sm text-gray-600 mt-1">Пользователей</div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#3B82F6]">{selectedTenant.incidentsCount}</div>
                    <div className="text-sm text-gray-600 mt-1">Инцидентов</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-4">Основная информация</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">ИНН</div>
                    <div className="font-medium font-mono">{selectedTenant.inn}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Юридический адрес</div>
                    <div className="font-medium">{selectedTenant.address}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Дата регистрации</div>
                    <div className="font-medium">{selectedTenant.createdAt}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Действует до</div>
                    <div className="font-medium">{selectedTenant.expiresAt}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Контактная информация</h3>
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-gray-600">Контактное лицо</div>
                    <div className="font-medium">{selectedTenant.contactPerson}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Email</div>
                    <div className="font-medium">{selectedTenant.contactEmail}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Телефон</div>
                    <div className="font-medium">{selectedTenant.contactPhone}</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Возможности тарифного плана</h3>
              <div className="flex flex-wrap gap-2">
                {selectedTenant.features.map((feature: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-sm">
                    <Icon name="Check" size={12} className="mr-1 text-green-600" />
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" className="flex-1">
                <Icon name="Settings" size={16} className="mr-2" />
                Управление доступом
              </Button>
              <Button variant="outline" className="flex-1">
                <Icon name="CreditCard" size={16} className="mr-2" />
                Изменить тариф
              </Button>
              <Button variant="outline" className="flex-1 text-red-600 hover:text-red-700">
                <Icon name="Trash2" size={16} className="mr-2" />
                Деактивировать
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
