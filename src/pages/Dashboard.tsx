import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const mockIncidents = [
  { id: 1, title: 'Утечка масла на ОПО-012', type: 'Утечка', priority: 'Критический', object: 'ОПО-012', status: 'В работе', responsible: 'Иванов И.И.', created: '2024-10-01', deadline: '2024-10-08' },
  { id: 2, title: 'Нарушение техники безопасности', type: 'Нарушение', priority: 'Средний', object: 'Здание-05', status: 'Новый', responsible: 'Петров П.П.', created: '2024-10-03', deadline: '2024-10-15' },
  { id: 3, title: 'Пожар в цехе №3', type: 'Пожар', priority: 'Критический', object: 'ГТС-008', status: 'На проверке', responsible: 'Сидоров С.С.', created: '2024-09-28', deadline: '2024-10-05' },
];

const mockTasks = [
  { id: 1, title: 'Устранить утечку масла', priority: 'Критический', assignee: 'Иванов И.И.', status: 'В работе', deadline: '2024-10-08' },
  { id: 2, title: 'Провести проверку цеха №5', priority: 'Высокий', assignee: 'Петров П.П.', status: 'Новая', deadline: '2024-10-10' },
  { id: 3, title: 'Подготовить отчет по экспертизе', priority: 'Средний', assignee: 'Сидоров С.С.', status: 'На проверке', deadline: '2024-10-12' },
  { id: 4, title: 'Обновить документацию ОПО', priority: 'Низкий', assignee: 'Кузнецов К.К.', status: 'Завершена', deadline: '2024-10-05' },
];

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);

  const modules = [
    { id: 'dashboard', name: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'tenants', name: 'Тенанты', icon: 'Building2' },
    { id: 'catalog', name: 'Каталог объектов', icon: 'Database' },
    { id: 'incidents', name: 'Инциденты', icon: 'AlertTriangle' },
    { id: 'checklists', name: 'Чек-листы', icon: 'ClipboardCheck' },
    { id: 'certification', name: 'Аттестация', icon: 'Award' },
    { id: 'tasks', name: 'Задачи', icon: 'ListTodo' },
    { id: 'diagnostics', name: 'Диагностика', icon: 'Stethoscope' },
    { id: 'maintenance', name: 'Ремонты', icon: 'Wrench' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Критический': return 'bg-red-500';
      case 'Высокий': return 'bg-orange-500';
      case 'Средний': return 'bg-yellow-500';
      case 'Низкий': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новый': case 'Новая': return 'bg-blue-100 text-blue-800';
      case 'В работе': return 'bg-yellow-100 text-yellow-800';
      case 'На проверке': return 'bg-purple-100 text-purple-800';
      case 'Закрыт': case 'Завершена': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Индекс Безопасности</h1>
          <p className="text-sm text-gray-400 mt-1">STP Platform v1.0</p>
        </div>
        
        <nav className="flex-1 px-3">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                activeModule === module.id
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon name={module.icon as any} size={20} />
              <span className="text-sm font-medium">{module.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center">
              <Icon name="User" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">Администратор</p>
              <p className="text-xs text-gray-400">admin@stp.ru</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {modules.find(m => m.id === activeModule)?.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Управление промышленной безопасностью
              </p>
            </div>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
          </div>
        </header>

        <div className="p-8">
          {activeModule === 'dashboard' && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Всего инцидентов
                    </CardTitle>
                    <Icon name="AlertTriangle" className="text-red-500" size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">247</div>
                    <p className="text-xs text-green-600 mt-1">-12% за месяц</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Активные задачи
                    </CardTitle>
                    <Icon name="ListTodo" className="text-blue-500" size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">89</div>
                    <p className="text-xs text-yellow-600 mt-1">+5 новых</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Просрочено
                    </CardTitle>
                    <Icon name="Clock" className="text-orange-500" size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12</div>
                    <p className="text-xs text-red-600 mt-1">Требует внимания</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      Объекты ОПО/ГТС
                    </CardTitle>
                    <Icon name="Database" className="text-green-500" size={20} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">156</div>
                    <p className="text-xs text-gray-600 mt-1">8 филиалов</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Последние инциденты</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockIncidents.slice(0, 3).map((incident) => (
                        <div key={incident.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                          <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(incident.priority)}`} />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{incident.title}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                              <span>{incident.object}</span>
                              <span>•</span>
                              <span>{incident.responsible}</span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(incident.status)}>
                            {incident.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Задачи на контроле</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockTasks.filter(t => t.status !== 'Завершена').slice(0, 3).map((task) => (
                        <div key={task.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                          <Icon name="CheckSquare" className="text-blue-500 mt-1" size={16} />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{task.title}</p>
                            <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                              <span>{task.assignee}</span>
                              <span>•</span>
                              <span>До {task.deadline}</span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(task.status)}>
                            {task.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activeModule === 'incidents' && (
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
          )}

          {activeModule === 'tasks' && (
            <div className="space-y-6">
              <div className="flex gap-6">
                {['Новая', 'В работе', 'На проверке', 'Завершена'].map((status) => (
                  <div key={status} className="flex-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{status}</h3>
                          <Badge variant="secondary">
                            {mockTasks.filter(t => t.status === status).length}
                          </Badge>
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        {mockTasks.filter(t => t.status === status).map((task) => (
                          <div key={task.id} className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex items-start gap-2 mb-2">
                              <div className={`w-1 h-12 rounded ${getPriorityColor(task.priority)}`} />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900 mb-1">{task.title}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                  <Icon name="User" size={12} />
                                  <span>{task.assignee}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                                  <Icon name="Calendar" size={12} />
                                  <span>До {task.deadline}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
