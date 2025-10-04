import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { mockOrganizations, mockDocuments } from '@/data/mockData';

interface OrganizationTreeProps {
  nodes: any[];
  expandedNodes: number[];
  onToggle: (nodeId: number) => void;
  onSelectObject: (obj: any) => void;
  selectedObjectId: number | null;
}

const OrganizationTree = ({ nodes, expandedNodes, onToggle, onSelectObject, selectedObjectId }: OrganizationTreeProps) => {
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

export const CatalogModule = () => {
  const [isObjectModalOpen, setIsObjectModalOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<number[]>([1, 2, 9]);
  const [selectedObject, setSelectedObject] = useState<any>(null);

  return (
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
  );
};
