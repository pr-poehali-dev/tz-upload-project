import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { CatalogObject, CatalogDocument } from '../../types/catalog.types';
import { getStatusColor, getStatusLabel, getTypeLabel } from '../../utils/catalog.utils';

interface ObjectCardProps {
  object: CatalogObject;
  documents: CatalogDocument[];
  onEdit: () => void;
  onUploadDocument: () => void;
}

export const ObjectCard: React.FC<ObjectCardProps> = ({
  object,
  documents,
  onEdit,
  onUploadDocument
}) => {
  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{object.name}</h3>
            <div className="flex items-center gap-3 mt-2">
              {object.status && (
                <Badge className={getStatusColor(object.status)}>
                  {getStatusLabel(object.status)}
                </Badge>
              )}
              {object.class && (
                <span className="text-sm text-gray-600">
                  Класс опасности: {object.class}
                </span>
              )}
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={onEdit}>
            <Icon name="Edit" size={16} className="mr-2" />
            Редактировать
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-sm text-gray-600 mb-3">
              Основная информация
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Тип объекта:</span>
                <span className="font-medium">{getTypeLabel(object.type)}</span>
              </div>
              {object.responsible && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Ответственный:</span>
                  <span className="font-medium">{object.responsible}</span>
                </div>
              )}
              {object.nextExamination && (
                <div className="flex justify-between">
                  <span className="text-gray-600">След. экспертиза:</span>
                  <span className="font-medium">{object.nextExamination}</span>
                </div>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-gray-600 mb-3">
              Документация
            </h4>
            <div className="space-y-2">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="p-2 border border-gray-200 rounded-lg flex items-center gap-2"
                >
                  <Icon name="FileText" size={16} className="text-blue-500" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{doc.name}</p>
                    <p className="text-xs text-gray-500">До {doc.validUntil}</p>
                  </div>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                className="w-full"
                onClick={onUploadDocument}
              >
                <Icon name="Upload" size={14} className="mr-2" />
                Загрузить документ
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
