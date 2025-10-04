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
import { CertificationFormData } from '../../types/attestation.types';

interface CertificationFormModalProps {
  open: boolean;
  onClose: () => void;
  employeeId: string | null;
  onSubmit: (data: CertificationFormData) => void;
}

export const CertificationFormModal: React.FC<CertificationFormModalProps> = ({
  open,
  onClose,
  employeeId,
  onSubmit
}) => {
  const handleSubmit = () => {
    if (!employeeId) return;
    
    const formData: CertificationFormData = {
      employeeId,
      name: '',
      certificationType: '',
      validFrom: '',
      validUntil: '',
      certificationNumber: '',
      issuedBy: ''
    };
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Добавление аттестации</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="certName">Наименование области аттестации</Label>
            <Input
              id="certName"
              placeholder="Например: Безопасность ОПО"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="certType">Тип аттестации</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rostechnadzor">Ростехнадзор</SelectItem>
                  <SelectItem value="internal">Внутренняя</SelectItem>
                  <SelectItem value="external">Внешняя</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="certNumber">Номер удостоверения</Label>
              <Input
                id="certNumber"
                placeholder="№ 12345"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="validFrom">Дата выдачи</Label>
              <Input
                id="validFrom"
                type="date"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="validUntil">Действует до</Label>
              <Input
                id="validUntil"
                type="date"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="issuedBy">Кем выдано</Label>
            <Input
              id="issuedBy"
              placeholder="Ростехнадзор"
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
            Добавить аттестацию
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
