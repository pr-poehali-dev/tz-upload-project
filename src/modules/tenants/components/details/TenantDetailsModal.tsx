import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Tenant } from '../../types/tenant.types';
import { getStatusColor, getPlanColor } from '../../utils/tenant.utils';

interface TenantDetailsModalProps {
  tenant: Tenant | null;
  onClose: () => void;
  onEdit?: () => void;
}

export const TenantDetailsModal: React.FC<TenantDetailsModalProps> = ({
  tenant,
  onClose,
  onEdit
}) => {
  if (!tenant) return null;

  return (
    <Dialog open={!!tenant} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between">
            <div>
              <DialogTitle className="text-2xl">{tenant.name}</DialogTitle>
              <div className="flex items-center gap-2 mt-2">
                <Badge className={getStatusColor(tenant.status)}>
                  {tenant.status}
                </Badge>
                <Badge className={getPlanColor(tenant.plan)}>{tenant.plan}</Badge>
              </div>
            </div>
            <Button size="sm" variant="outline" onClick={onEdit}>
              <Icon name="Edit" size={16} className="mr-2" />
              Редактировать
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-4 py-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3B82F6]">
                  {tenant.objectsCount}
                </div>
                <div className="text-sm text-gray-600 mt-1">Объектов</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3B82F6]">
                  {tenant.usersCount}
                </div>
                <div className="text-sm text-gray-600 mt-1">Пользователей</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#3B82F6]">
                  {tenant.incidentsCount}
                </div>
                <div className="text-sm text-gray-600 mt-1">Инцидентов</div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-4">Основная информация</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600">ИНН</div>
                <div className="font-medium font-mono">{tenant.inn}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Юридический адрес</div>
                <div className="font-medium">{tenant.address}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Дата регистрации</div>
                <div className="font-medium">{tenant.createdAt}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Действует до</div>
                <div className="font-medium">{tenant.expiresAt}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Контактная информация</h3>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-gray-600">Контактное лицо</div>
                <div className="font-medium">{tenant.contactPerson}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Email</div>
                <div className="font-medium">{tenant.contactEmail}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Телефон</div>
                <div className="font-medium">{tenant.contactPhone}</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Возможности тарифного плана</h3>
          <div className="flex flex-wrap gap-2">
            {tenant.features.map((feature, idx) => (
              <Badge key={idx} variant="outline" className="text-sm">
                <Icon name="Check" size={12} className="mr-1 text-green-600" />
                {feature}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t">
          <Button variant="outline" className="flex-1">
            <Icon name="Settings" size={16} className="mr-2" />
            Управление доступом
          </Button>
          <Button variant="outline" className="flex-1">
            <Icon name="CreditCard" size={16} className="mr-2" />
            Изменить тариф
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-red-600 hover:text-red-700"
          >
            <Icon name="Trash2" size={16} className="mr-2" />
            Деактивировать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
