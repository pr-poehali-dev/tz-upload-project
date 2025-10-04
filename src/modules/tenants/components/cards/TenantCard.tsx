import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tenant } from '../../types/tenant.types';
import { getStatusColor, getPlanColor } from '../../utils/tenant.utils';

interface TenantCardProps {
  tenant: Tenant;
  onClick: () => void;
}

export const TenantCard: React.FC<TenantCardProps> = ({ tenant, onClick }) => {
  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{tenant.name}</CardTitle>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(tenant.status)}>
                {tenant.status}
              </Badge>
              <Badge className={getPlanColor(tenant.plan)}>{tenant.plan}</Badge>
            </div>
          </div>
          <Icon name="Building2" className="text-gray-400" size={24} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Icon name="FileDigit" size={14} className="text-gray-500" />
            <span className="text-gray-600">ИНН: {tenant.inn}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Icon name="User" size={14} className="text-gray-500" />
            <span className="text-gray-600">{tenant.contactPerson}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-3 border-t">
            <div className="text-center">
              <div className="text-lg font-bold text-[#3B82F6]">
                {tenant.objectsCount}
              </div>
              <div className="text-xs text-gray-500">Объектов</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#3B82F6]">
                {tenant.usersCount}
              </div>
              <div className="text-xs text-gray-500">Польз.</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-[#3B82F6]">
                {tenant.incidentsCount}
              </div>
              <div className="text-xs text-gray-500">Инцид.</div>
            </div>
          </div>
          <div className="pt-3 border-t text-xs text-gray-500">
            Активен до: <span className="font-medium">{tenant.expiresAt}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
