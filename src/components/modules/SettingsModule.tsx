import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

export const SettingsModule = () => {
  const [activeTab, setActiveTab] = useState('general');

  const tabs = [
    { id: 'general', name: 'Общие настройки', icon: 'Settings' },
    { id: 'notifications', name: 'Уведомления', icon: 'Bell' },
    { id: 'security', name: 'Безопасность', icon: 'Shield' },
    { id: 'integrations', name: 'Интеграции', icon: 'Plug' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-3 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#3B82F6] text-[#3B82F6]'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            <Icon name={tab.icon as any} size={18} />
            <span className="font-medium">{tab.name}</span>
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Информация о системе</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="system-name">Название системы</Label>
                <Input id="system-name" defaultValue="Индекс Безопасности" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="system-desc">Описание</Label>
                <Textarea id="system-desc" defaultValue="Управление промышленной безопасностью" rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="system-lang">Язык интерфейса</Label>
                  <Select defaultValue="ru">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ru">Русский</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="system-timezone">Часовой пояс</Label>
                  <Select defaultValue="msk">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="msk">МСК (UTC+3)</SelectItem>
                      <SelectItem value="ekb">ЕКБ (UTC+5)</SelectItem>
                      <SelectItem value="nsk">НСК (UTC+7)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-4">
                <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить изменения
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Настройки отображения</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium">Темная тема</span>
                  <input type="checkbox" className="rounded" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium">Компактный режим</span>
                  <input type="checkbox" className="rounded" />
                </label>
                <label className="flex items-center justify-between">
                  <span className="text-sm font-medium">Показывать подсказки</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email-уведомления</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Новые инциденты</p>
                  <p className="text-xs text-gray-600">Получать уведомления о создании инцидентов</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Истечение сроков</p>
                  <p className="text-xs text-gray-600">Напоминания о приближающихся сроках</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Назначение задач</p>
                  <p className="text-xs text-gray-600">Уведомления о новых задачах</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Еженедельный отчет</p>
                  <p className="text-xs text-gray-600">Сводка активности за неделю</p>
                </div>
                <input type="checkbox" className="rounded" />
              </label>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Push-уведомления</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Критические события</p>
                  <p className="text-xs text-gray-600">Мгновенные уведомления о критических инцидентах</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
              <label className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Упоминания</p>
                  <p className="text-xs text-gray-600">Когда вас упоминают в комментариях</p>
                </div>
                <input type="checkbox" defaultChecked className="rounded" />
              </label>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Политика паролей</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Минимальная длина пароля</Label>
                  <Select defaultValue="8">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6">6 символов</SelectItem>
                      <SelectItem value="8">8 символов</SelectItem>
                      <SelectItem value="12">12 символов</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Срок действия пароля</Label>
                  <Select defaultValue="90">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 дней</SelectItem>
                      <SelectItem value="90">90 дней</SelectItem>
                      <SelectItem value="never">Бессрочно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Требовать специальные символы</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Требовать цифры</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded" />
                  <span className="text-sm">Требовать заглавные буквы</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Двухфакторная аутентификация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Icon name="Shield" size={24} className="text-blue-600" />
                  <div>
                    <p className="font-medium">2FA не настроена</p>
                    <p className="text-sm text-gray-600">Повысьте безопасность аккаунта</p>
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Icon name="Key" size={16} className="mr-2" />
                  Настроить
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Журнал безопасности</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { event: 'Успешный вход в систему', ip: '192.168.1.100', time: '2024-10-05 14:32' },
                  { event: 'Изменение пароля', ip: '192.168.1.100', time: '2024-10-01 10:15' },
                  { event: 'Успешный вход в систему', ip: '192.168.1.105', time: '2024-09-30 09:20' },
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name="Activity" size={16} className="text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">{log.event}</p>
                        <p className="text-xs text-gray-600">IP: {log.ip}</p>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{log.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Доступные интеграции</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Telegram Bot', desc: 'Получайте уведомления в Telegram', icon: 'MessageSquare', connected: true },
                  { name: '1С: Предприятие', desc: 'Синхронизация данных с 1С', icon: 'Database', connected: false },
                  { name: 'Email (SMTP)', desc: 'Настройка email-уведомлений', icon: 'Mail', connected: true },
                  { name: 'API Webhook', desc: 'Отправка событий во внешние системы', icon: 'Webhook', connected: false },
                ].map((integration, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#3B82F6] bg-opacity-10 flex items-center justify-center">
                        <Icon name={integration.icon as any} size={20} className="text-[#3B82F6]" />
                      </div>
                      <div>
                        <p className="font-medium">{integration.name}</p>
                        <p className="text-sm text-gray-600">{integration.desc}</p>
                      </div>
                    </div>
                    {integration.connected ? (
                      <Button variant="outline" className="text-red-600 hover:text-red-700">
                        <Icon name="Unplug" size={16} className="mr-2" />
                        Отключить
                      </Button>
                    ) : (
                      <Button variant="outline">
                        <Icon name="Plug" size={16} className="mr-2" />
                        Подключить
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API ключи</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Production API Key</span>
                    <Button size="sm" variant="ghost">
                      <Icon name="Copy" size={14} />
                    </Button>
                  </div>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">sk_prod_a1b2c3d4e5f6g7h8i9j0</code>
                  <p className="text-xs text-gray-600 mt-2">Создан: 2024-01-15</p>
                </div>
                <Button variant="outline" className="w-full">
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать новый ключ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
