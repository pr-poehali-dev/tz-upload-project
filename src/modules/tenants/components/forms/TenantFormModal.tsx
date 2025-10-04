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
import { Tenant, TenantFormData } from '../../types/tenant.types';
import { getPlanDescription } from '../../utils/tenant.utils';

interface TenantFormModalProps {
  open: boolean;
  onClose: () => void;
  tenant?: Tenant | null;
  onSubmit: (data: TenantFormData) => void;
}

export const TenantFormModal: React.FC<TenantFormModalProps> = ({
  open,
  onClose,
  tenant,
  onSubmit
}) => {
  const handleSubmit = () => {
    const formData: TenantFormData = {
      name: '',
      inn: '',
      address: '',
      plan: 'Basic',
      expiresAt: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: ''
    };
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {tenant ? 'Редактирование тенанта' : 'Создание тенанта'}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tenant-name">Название организации</Label>
              <Input
                id="tenant-name"
                placeholder="ООО 'Компания'"
                defaultValue={tenant?.name}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tenant-inn">ИНН</Label>
              <Input
                id="tenant-inn"
                placeholder="7701234567"
                defaultValue={tenant?.inn}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tenant-address">Юридический адрес</Label>
            <Input
              id="tenant-address"
              placeholder="г. Москва, ул. ..."
              defaultValue={tenant?.address}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="tenant-plan">Тарифный план</Label>
              <Select defaultValue={tenant?.plan}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите план" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic">
                    Basic - {getPlanDescription('Basic')}
                  </SelectItem>
                  <SelectItem value="Professional">
                    Professional - {getPlanDescription('Professional')}
                  </SelectItem>
                  <SelectItem value="Enterprise">
                    Enterprise - {getPlanDescription('Enterprise')}
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="tenant-expires">Дата окончания</Label>
              <Input
                id="tenant-expires"
                type="date"
                defaultValue={tenant?.expiresAt}
              />
            </div>
          </div>
          <div className="border-t pt-4">
            <h4 className="font-semibold mb-3">Контактное лицо</h4>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact-person">ФИО</Label>
                <Input
                  id="contact-person"
                  placeholder="Иванов Иван Иванович"
                  defaultValue={tenant?.contactPerson}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="email@company.ru"
                    defaultValue={tenant?.contactEmail}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contact-phone">Телефон</Label>
                  <Input
                    id="contact-phone"
                    placeholder="+7 (___) ___-__-__"
                    defaultValue={tenant?.contactPhone}
                  />
                </div>
              </div>
            </div>
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
            {tenant ? 'Сохранить' : 'Создать тенанта'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
