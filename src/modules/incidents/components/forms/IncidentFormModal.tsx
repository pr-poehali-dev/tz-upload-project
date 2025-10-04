import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Incident, IncidentFormData } from '../../types/incident.types';

interface IncidentFormModalProps {
  open: boolean;
  onClose: () => void;
  incident?: Incident | null;
  onSubmit: (data: IncidentFormData) => void;
}

export const IncidentFormModal: React.FC<IncidentFormModalProps> = ({
  open,
  onClose,
  incident,
  onSubmit
}) => {
  const handleSubmit = () => {
    const formData: IncidentFormData = {
      title: '',
      type: 'violation',
      priority: 'medium',
      objectId: '',
      responsibleId: '',
      description: '',
      deadline: ''
    };
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {incident ? 'Редактирование инцидента' : 'Создание инцидента'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Название инцидента</Label>
            <Input
              id="title"
              placeholder="Краткое описание инцидента"
              defaultValue={incident?.title}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Тип инцидента</Label>
              <Select defaultValue={incident?.type}>
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
              <Select defaultValue={incident?.priority}>
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
              <Select defaultValue={incident?.objectId}>
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
              <Select defaultValue={incident?.responsibleId}>
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
            <Textarea
              id="description"
              placeholder="Подробное описание инцидента"
              rows={4}
              defaultValue={incident?.description}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="deadline">Срок устранения</Label>
            <Input
              id="deadline"
              type="date"
              defaultValue={incident?.deadline}
            />
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button
            className="bg-[#3B82F6] hover:bg-[#2563EB]"
            onClick={handleSubmit}
          >
            {incident ? 'Сохранить' : 'Создать инцидент'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
