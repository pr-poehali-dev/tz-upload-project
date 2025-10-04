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
import { Employee, EmployeeFormData } from '../../types/attestation.types';

interface EmployeeFormModalProps {
  open: boolean;
  onClose: () => void;
  employee?: Employee | null;
  onSubmit: (data: EmployeeFormData) => void;
}

export const EmployeeFormModal: React.FC<EmployeeFormModalProps> = ({
  open,
  onClose,
  employee,
  onSubmit
}) => {
  const handleSubmit = () => {
    const formData: EmployeeFormData = {
      fullName: '',
      position: '',
      organizationId: '',
      email: '',
      phone: '',
      hireDate: ''
    };
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {employee ? 'Редактирование сотрудника' : 'Добавление сотрудника'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">ФИО</Label>
            <Input
              id="fullName"
              placeholder="Иванов Иван Иванович"
              defaultValue={employee?.fullName}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="position">Должность</Label>
              <Input
                id="position"
                placeholder="Инженер"
                defaultValue={employee?.position}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="organization">Организация</Label>
              <Select defaultValue={employee?.organizationId}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите организацию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="org1">Организация 1</SelectItem>
                  <SelectItem value="org2">Организация 2</SelectItem>
                  <SelectItem value="org3">Организация 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                defaultValue={employee?.email}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Телефон</Label>
              <Input
                id="phone"
                placeholder="+7 (___) ___-__-__"
                defaultValue={employee?.phone}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hireDate">Дата найма</Label>
            <Input
              id="hireDate"
              type="date"
              defaultValue={employee?.hireDate}
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
            {employee ? 'Сохранить' : 'Добавить сотрудника'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
