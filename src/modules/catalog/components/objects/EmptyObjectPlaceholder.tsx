import React from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export const EmptyObjectPlaceholder: React.FC = () => {
  return (
    <Card className="h-96 flex items-center justify-center">
      <div className="text-center text-gray-400">
        <Icon name="Database" size={48} className="mx-auto mb-3 opacity-50" />
        <p className="text-sm">Выберите объект из дерева для просмотра деталей</p>
      </div>
    </Card>
  );
};
