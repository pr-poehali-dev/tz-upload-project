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

const mockOrganizations = [
  {
    id: 1,
    name: 'Холдинг "ПромБезопасность"',
    type: 'holding',
    children: [
      {
        id: 2,
        name: 'ООО "Нефтехим"',
        type: 'legal',
        inn: '7701234567',
        children: [
          {
            id: 3,
            name: 'Филиал Московский',
            type: 'branch',
            children: [
              { id: 4, name: 'ОПО-012 "Резервуарный парк"', type: 'opo', class: 'I', status: 'Активен', nextExamination: '2025-03-15', responsible: 'Иванов И.И.' },
              { id: 5, name: 'ГТС-008 "Дамба водохранилища"', type: 'gts', class: 'II', status: 'Активен', nextExamination: '2025-06-20', responsible: 'Петров П.П.' },
            ]
          },
          {
            id: 6,
            name: 'Филиал Санкт-Петербургский',
            type: 'branch',
            children: [
              { id: 7, name: 'Здание-05 "Административный корпус"', type: 'building', status: 'Активен', nextExamination: '2025-01-10', responsible: 'Сидоров С.С.' },
              { id: 8, name: 'ОПО-025 "Компрессорная станция"', type: 'opo', class: 'II', status: 'Активен', nextExamination: '2024-12-05', responsible: 'Кузнецов К.К.' },
            ]
          }
        ]
      },
      {
        id: 9,
        name: 'ООО "ГазТранс"',
        type: 'legal',
        inn: '7702345678',
        children: [
          {
            id: 10,
            name: 'Филиал Уральский',
            type: 'branch',
            children: [
              { id: 11, name: 'ГТС-012 "Плотина"', type: 'gts', class: 'I', status: 'Активен', nextExamination: '2025-08-30', responsible: 'Смирнов А.А.' },
              { id: 12, name: 'ОПО-033 "Газопровод"', type: 'opo', class: 'III', status: 'На консервации', nextExamination: '-', responsible: 'Волков В.В.' },
            ]
          }
        ]
      }
    ]
  }
];

const mockDocuments = [
  { id: 1, objectId: 4, name: 'Паспорт безопасности ОПО', type: 'Паспорт', validUntil: '2025-12-31', uploadedAt: '2023-01-15' },
  { id: 2, objectId: 4, name: 'Схема резервуарного парка', type: 'Схема', validUntil: '2026-06-30', uploadedAt: '2023-02-20' },
  { id: 3, objectId: 5, name: 'Разрешение на эксплуатацию ГТС', type: 'Разрешение', validUntil: '2025-03-15', uploadedAt: '2023-03-10' },
];

const mockChecklists = [
  {
    id: 1,
    name: 'Проверка ОПО I класса опасности',
    description: 'Ежеквартальная проверка объектов повышенной опасности',
    sections: [
      {
        id: 1,
        name: 'Документация',
        questions: [
          { id: 1, text: 'Наличие паспорта безопасности', type: 'yesno', isCritical: true },
          { id: 2, text: 'Актуальность схем и планов', type: 'yesno', isCritical: true },
          { id: 3, text: 'Комментарий к документации', type: 'text', isCritical: false },
        ]
      },
      {
        id: 2,
        name: 'Техническое состояние',
        questions: [
          { id: 4, text: 'Отсутствие видимых повреждений', type: 'yesno', isCritical: true },
          { id: 5, text: 'Работоспособность систем безопасности', type: 'yesno', isCritical: true },
          { id: 6, text: 'Уровень коррозии (1-5)', type: 'number', isCritical: false },
        ]
      },
      {
        id: 3,
        name: 'Персонал',
        questions: [
          { id: 7, text: 'Наличие действующих аттестаций', type: 'yesno', isCritical: true },
          { id: 8, text: 'Соблюдение требований ТБ', type: 'yesno', isCritical: false },
        ]
      }
    ],
    createdAt: '2024-01-15',
    createdBy: 'Петров П.П.'
  },
  {
    id: 2,
    name: 'Проверка ГТС',
    description: 'Плановая проверка гидротехнических сооружений',
    sections: [
      {
        id: 4,
        name: 'Общее состояние',
        questions: [
          { id: 9, text: 'Состояние тела плотины', type: 'choice', options: ['Отлично', 'Хорошо', 'Удовлетворительно', 'Плохо'], isCritical: true },
          { id: 10, text: 'Наличие протечек', type: 'yesno', isCritical: true },
        ]
      }
    ],
    createdAt: '2024-02-20',
    createdBy: 'Сидоров С.С.'
  }
];

const mockInspections = [
  {
    id: 1,
    checklistId: 1,
    checklistName: 'Проверка ОПО I класса опасности',
    objectId: 4,
    objectName: 'ОПО-012 "Резервуарный парк"',
    inspector: 'Иванов И.И.',
    status: 'Завершена',
    plannedDate: '2024-09-15',
    completedDate: '2024-09-15',
    result: 85,
    incidentsCreated: 1,
  },
  {
    id: 2,
    checklistId: 1,
    checklistName: 'Проверка ОПО I класса опасности',
    objectId: 8,
    objectName: 'ОПО-025 "Компрессорная станция"',
    inspector: 'Петров П.П.',
    status: 'В процессе',
    plannedDate: '2024-10-05',
    completedDate: null,
    result: null,
    incidentsCreated: 0,
  },
  {
    id: 3,
    checklistId: 2,
    checklistName: 'Проверка ГТС',
    objectId: 5,
    objectName: 'ГТС-008 "Дамба водохранилища"',
    inspector: 'Сидоров С.С.',
    status: 'Запланирована',
    plannedDate: '2024-10-20',
    completedDate: null,
    result: null,
    incidentsCreated: 0,
  },
];

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [isIncidentModalOpen, setIsIncidentModalOpen] = useState(false);
  const [isObjectModalOpen, setIsObjectModalOpen] = useState(false);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<number[]>([1, 2, 9]);
  const [selectedObject, setSelectedObject] = useState<any>(null);
  const [selectedChecklist, setSelectedChecklist] = useState<any>(null);
  const [checklistView, setChecklistView] = useState<'templates' | 'inspections'>('inspections');

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

          {activeModule === 'catalog' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Структура организаций</CardTitle>
                </CardHeader>
                <CardContent>
                  <OrganizationTree
                    nodes={mockOrganizations}
                    expandedNodes={expandedNodes}
                    onToggle={(nodeId) => {
                      setExpandedNodes(prev =>
                        prev.includes(nodeId)
                          ? prev.filter(id => id !== nodeId)
                          : [...prev, nodeId]
                      );
                    }}
                    onSelectObject={(obj) => setSelectedObject(obj)}
                    selectedObjectId={selectedObject?.id}
                  />
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <Input placeholder="Поиск объектов..." className="w-80" />
                  <Dialog open={isObjectModalOpen} onOpenChange={setIsObjectModalOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                        <Icon name="Plus" size={16} className="mr-2" />
                        Добавить объект
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Создание объекта</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                          <Label htmlFor="obj-name">Наименование объекта</Label>
                          <Input id="obj-name" placeholder="Например: ОПО-015 'Резервуарный парк'" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="obj-type">Тип объекта</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите тип" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="opo">ОПО</SelectItem>
                                <SelectItem value="gts">ГТС</SelectItem>
                                <SelectItem value="building">Здание</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="obj-class">Класс опасности</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите класс" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="I">I класс</SelectItem>
                                <SelectItem value="II">II класс</SelectItem>
                                <SelectItem value="III">III класс</SelectItem>
                                <SelectItem value="IV">IV класс</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="obj-status">Статус</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите статус" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Активен</SelectItem>
                                <SelectItem value="conservation">На консервации</SelectItem>
                                <SelectItem value="liquidated">Ликвидирован</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="obj-responsible">Ответственный</Label>
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
                          <Label htmlFor="obj-exam">Дата следующей экспертизы</Label>
                          <Input id="obj-exam" type="date" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsObjectModalOpen(false)}>
                          Отмена
                        </Button>
                        <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsObjectModalOpen(false)}>
                          Создать объект
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                {selectedObject ? (
                  <Card>
                    <CardHeader className="border-b">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl">{selectedObject.name}</CardTitle>
                          <div className="flex items-center gap-3 mt-2">
                            <Badge className={selectedObject.status === 'Активен' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {selectedObject.status}
                            </Badge>
                            {selectedObject.class && (
                              <span className="text-sm text-gray-600">Класс опасности: {selectedObject.class}</span>
                            )}
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          <Icon name="Edit" size={16} className="mr-2" />
                          Редактировать
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-sm text-gray-600 mb-3">Основная информация</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Тип объекта:</span>
                              <span className="font-medium">{selectedObject.type === 'opo' ? 'ОПО' : selectedObject.type === 'gts' ? 'ГТС' : 'Здание'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Ответственный:</span>
                              <span className="font-medium">{selectedObject.responsible}</span>
                            </div>
                            {selectedObject.nextExamination && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">След. экспертиза:</span>
                                <span className="font-medium">{selectedObject.nextExamination}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm text-gray-600 mb-3">Документация</h4>
                          <div className="space-y-2">
                            {mockDocuments.filter(d => d.objectId === selectedObject.id).map((doc) => (
                              <div key={doc.id} className="p-2 border border-gray-200 rounded-lg flex items-center gap-2">
                                <Icon name="FileText" size={16} className="text-blue-500" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium truncate">{doc.name}</p>
                                  <p className="text-xs text-gray-500">До {doc.validUntil}</p>
                                </div>
                              </div>
                            ))}
                            <Button size="sm" variant="outline" className="w-full">
                              <Icon name="Upload" size={14} className="mr-2" />
                              Загрузить документ
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="h-96 flex items-center justify-center">
                    <div className="text-center text-gray-400">
                      <Icon name="Database" size={48} className="mx-auto mb-3 opacity-50" />
                      <p className="text-sm">Выберите объект из дерева для просмотра деталей</p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}

          {activeModule === 'checklists' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-3">
                  <Button
                    variant={checklistView === 'inspections' ? 'default' : 'outline'}
                    onClick={() => setChecklistView('inspections')}
                    className={checklistView === 'inspections' ? 'bg-[#3B82F6]' : ''}
                  >
                    <Icon name="ClipboardCheck" size={16} className="mr-2" />
                    Проверки
                  </Button>
                  <Button
                    variant={checklistView === 'templates' ? 'default' : 'outline'}
                    onClick={() => setChecklistView('templates')}
                    className={checklistView === 'templates' ? 'bg-[#3B82F6]' : ''}
                  >
                    <Icon name="FileText" size={16} className="mr-2" />
                    Шаблоны
                  </Button>
                </div>
                <div className="flex gap-3">
                  {checklistView === 'templates' ? (
                    <Dialog open={isChecklistModalOpen} onOpenChange={setIsChecklistModalOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Создать шаблон
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Конструктор чек-листа</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="checklist-name">Название чек-листа</Label>
                            <Input id="checklist-name" placeholder="Например: Проверка ОПО I класса" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="checklist-desc">Описание</Label>
                            <Textarea id="checklist-desc" placeholder="Краткое описание назначения чек-листа" rows={2} />
                          </div>
                          <div className="border rounded-lg p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-semibold">Разделы и вопросы</h4>
                              <Button size="sm" variant="outline">
                                <Icon name="Plus" size={14} className="mr-2" />
                                Добавить раздел
                              </Button>
                            </div>
                            <div className="space-y-3">
                              <div className="border rounded-lg p-3 bg-gray-50">
                                <div className="flex items-center justify-between mb-2">
                                  <Input defaultValue="Документация" className="font-medium bg-white" />
                                  <Button size="sm" variant="ghost">
                                    <Icon name="Trash2" size={14} />
                                  </Button>
                                </div>
                                <div className="space-y-2 mt-3">
                                  <div className="flex items-start gap-2 p-2 bg-white rounded border">
                                    <Icon name="GripVertical" size={16} className="text-gray-400 mt-1" />
                                    <div className="flex-1 grid gap-2">
                                      <Input defaultValue="Наличие паспорта безопасности" className="text-sm" />
                                      <div className="flex items-center gap-3">
                                        <Select defaultValue="yesno">
                                          <SelectTrigger className="w-48 h-8">
                                            <SelectValue />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem value="yesno">Да/Нет</SelectItem>
                                            <SelectItem value="text">Текст</SelectItem>
                                            <SelectItem value="number">Число</SelectItem>
                                            <SelectItem value="choice">Выбор</SelectItem>
                                          </SelectContent>
                                        </Select>
                                        <label className="flex items-center gap-2 text-sm">
                                          <input type="checkbox" defaultChecked className="rounded" />
                                          Критический
                                        </label>
                                      </div>
                                    </div>
                                    <Button size="sm" variant="ghost">
                                      <Icon name="X" size={14} />
                                    </Button>
                                  </div>
                                  <Button size="sm" variant="outline" className="w-full">
                                    <Icon name="Plus" size={14} className="mr-2" />
                                    Добавить вопрос
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button variant="outline" onClick={() => setIsChecklistModalOpen(false)}>
                            Отмена
                          </Button>
                          <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsChecklistModalOpen(false)}>
                            Сохранить шаблон
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Dialog open={isInspectionModalOpen} onOpenChange={setIsInspectionModalOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                          <Icon name="Plus" size={16} className="mr-2" />
                          Назначить проверку
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Назначение проверки</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="insp-checklist">Чек-лист</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите шаблон" />
                              </SelectTrigger>
                              <SelectContent>
                                {mockChecklists.map((cl) => (
                                  <SelectItem key={cl.id} value={cl.id.toString()}>
                                    {cl.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="insp-object">Объект</Label>
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
                          <div className="grid gap-2">
                            <Label htmlFor="insp-inspector">Исполнитель</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Выберите исполнителя" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="ivanov">Иванов И.И.</SelectItem>
                                <SelectItem value="petrov">Петров П.П.</SelectItem>
                                <SelectItem value="sidorov">Сидоров С.С.</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="insp-date">Планируемая дата</Label>
                            <Input id="insp-date" type="date" />
                          </div>
                        </div>
                        <div className="flex justify-end gap-3">
                          <Button variant="outline" onClick={() => setIsInspectionModalOpen(false)}>
                            Отмена
                          </Button>
                          <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsInspectionModalOpen(false)}>
                            Назначить проверку
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>

              {checklistView === 'templates' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockChecklists.map((checklist) => (
                    <Card key={checklist.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedChecklist(checklist)}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{checklist.name}</CardTitle>
                            <p className="text-sm text-gray-600">{checklist.description}</p>
                          </div>
                          <Icon name="FileText" className="text-blue-500" size={24} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Icon name="Layers" size={14} />
                            <span>{checklist.sections.length} разделов</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Icon name="HelpCircle" size={14} />
                            <span>{checklist.sections.reduce((acc, s) => acc + s.questions.length, 0)} вопросов</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Icon name="User" size={14} />
                            <span>{checklist.createdBy}</span>
                          </div>
                          <div className="pt-3 border-t flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Icon name="Edit" size={14} className="mr-2" />
                              Редактировать
                            </Button>
                            <Button size="sm" variant="outline" className="flex-1">
                              <Icon name="Copy" size={14} className="mr-2" />
                              Копировать
                            </Button>
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
                        <TableHead>Чек-лист</TableHead>
                        <TableHead>Объект</TableHead>
                        <TableHead>Исполнитель</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Плановая дата</TableHead>
                        <TableHead>Дата завершения</TableHead>
                        <TableHead>Результат</TableHead>
                        <TableHead>Инциденты</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockInspections.map((inspection) => (
                        <TableRow key={inspection.id}>
                          <TableCell className="font-medium">{inspection.id}</TableCell>
                          <TableCell className="font-medium">{inspection.checklistName}</TableCell>
                          <TableCell>{inspection.objectName}</TableCell>
                          <TableCell>{inspection.inspector}</TableCell>
                          <TableCell>
                            <Badge className={
                              inspection.status === 'Завершена' ? 'bg-green-100 text-green-800' :
                              inspection.status === 'В процессе' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }>
                              {inspection.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm">{inspection.plannedDate}</TableCell>
                          <TableCell className="text-sm">{inspection.completedDate || '-'}</TableCell>
                          <TableCell>
                            {inspection.result !== null ? (
                              <div className="flex items-center gap-2">
                                <div className={`w-16 h-2 rounded-full bg-gray-200 overflow-hidden`}>
                                  <div 
                                    className={`h-full ${inspection.result >= 80 ? 'bg-green-500' : inspection.result >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                    style={{ width: `${inspection.result}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{inspection.result}%</span>
                              </div>
                            ) : '-'}
                          </TableCell>
                          <TableCell>
                            {inspection.incidentsCreated > 0 ? (
                              <Badge variant="outline" className="text-red-600 border-red-200">
                                {inspection.incidentsCreated}
                              </Badge>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              )}

              {selectedChecklist && (
                <Dialog open={!!selectedChecklist} onOpenChange={() => setSelectedChecklist(null)}>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{selectedChecklist.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <p className="text-sm text-gray-600">{selectedChecklist.description}</p>
                      <div className="space-y-4">
                        {selectedChecklist.sections.map((section: any) => (
                          <div key={section.id} className="border rounded-lg p-4">
                            <h4 className="font-semibold mb-3">{section.name}</h4>
                            <div className="space-y-2">
                              {section.questions.map((question: any) => (
                                <div key={question.id} className="flex items-start gap-3 p-2 bg-gray-50 rounded">
                                  <div className="flex-1">
                                    <p className="text-sm">{question.text}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge variant="secondary" className="text-xs">
                                        {question.type === 'yesno' ? 'Да/Нет' : 
                                         question.type === 'text' ? 'Текст' : 
                                         question.type === 'number' ? 'Число' : 'Выбор'}
                                      </Badge>
                                      {question.isCritical && (
                                        <Badge className="text-xs bg-red-100 text-red-800">
                                          Критический
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const OrganizationTree = ({ nodes, expandedNodes, onToggle, onSelectObject, selectedObjectId }: any) => {
  const renderNode = (node: any, level: number = 0) => {
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const isObject = node.type === 'opo' || node.type === 'gts' || node.type === 'building';
    const isSelected = selectedObjectId === node.id;

    const getNodeIcon = () => {
      switch (node.type) {
        case 'holding': return 'Building2';
        case 'legal': return 'Building';
        case 'branch': return 'MapPin';
        case 'opo': return 'Factory';
        case 'gts': return 'Waves';
        case 'building': return 'Home';
        default: return 'Folder';
      }
    };

    return (
      <div key={node.id}>
        <button
          onClick={() => {
            if (isObject) {
              onSelectObject(node);
            } else if (hasChildren) {
              onToggle(node.id);
            }
          }}
          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-left ${
            isSelected ? 'bg-blue-50 border border-blue-200' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          {hasChildren && (
            <Icon
              name={isExpanded ? 'ChevronDown' : 'ChevronRight'}
              size={14}
              className="text-gray-500 flex-shrink-0"
            />
          )}
          <Icon name={getNodeIcon() as any} size={14} className="text-gray-600 flex-shrink-0" />
          <span className="text-sm flex-1 truncate">{node.name}</span>
          {node.inn && (
            <span className="text-xs text-gray-500">{node.inn}</span>
          )}
        </button>
        {hasChildren && isExpanded && (
          <div>
            {node.children.map((child: any) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {nodes.map((node: any) => renderNode(node))}
    </div>
  );
};

export default Dashboard;