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
import { mockChecklists, mockInspections } from '@/data/mockData';

export const ChecklistsModule = () => {
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);
  const [selectedChecklist, setSelectedChecklist] = useState<any>(null);
  const [checklistView, setChecklistView] = useState<'templates' | 'inspections'>('inspections');

  return (
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
                        <div className="w-16 h-2 rounded-full bg-gray-200 overflow-hidden">
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
  );
};
