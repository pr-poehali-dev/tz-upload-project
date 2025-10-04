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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { CatalogObject } from '../../types/catalog.types';

interface ObjectFormModalProps {
  open: boolean;
  onClose: () => void;
  object?: CatalogObject | null;
  onSubmit: (data: Partial<CatalogObject>) => void;
}

export const ObjectFormModal: React.FC<ObjectFormModalProps> = ({
  open,
  onClose,
  object,
  onSubmit
}) => {
  const handleSubmit = () => {
    onSubmit({});
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {object ? 'Редактирование объекта' : 'Создание объекта'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="obj-name">Наименование объекта</Label>
            <Input
              id="obj-name"
              placeholder="Например: ОПО-015 'Резервуарный парк'"
              defaultValue={object?.name}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="obj-type">Тип объекта</Label>
              <Select defaultValue={object?.type}>
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
              <Select defaultValue={object?.class}>
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
              <Select defaultValue={object?.status}>
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
              <Select defaultValue={object?.responsible}>
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
            <Input
              id="obj-exam"
              type="date"
              defaultValue={object?.nextExamination}
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
            {object ? 'Сохранить' : 'Создать объект'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
