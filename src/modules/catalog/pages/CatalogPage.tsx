import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { OrganizationTree } from '../components/tree/OrganizationTree';
import { ObjectCard } from '../components/objects/ObjectCard';
import { ObjectFormModal } from '../components/objects/ObjectFormModal';
import { EmptyObjectPlaceholder } from '../components/objects/EmptyObjectPlaceholder';
import { useCatalogTree } from '../hooks/useCatalogTree';
import { mockOrganizations, mockDocuments } from '@/data/mockData';
import { isObjectNode } from '../utils/catalog.utils';
import { CatalogObject } from '../types/catalog.types';

export const CatalogPage: React.FC = () => {
  const [isObjectModalOpen, setIsObjectModalOpen] = useState(false);
  const [editingObject, setEditingObject] = useState<CatalogObject | null>(null);
  
  const { expandedNodes, selectedNode, toggleNode, selectNode } = useCatalogTree([1, 2, 9]);

  const handleEditObject = () => {
    if (selectedNode && isObjectNode(selectedNode)) {
      setEditingObject(selectedNode as CatalogObject);
      setIsObjectModalOpen(true);
    }
  };

  const handleCreateObject = () => {
    setEditingObject(null);
    setIsObjectModalOpen(true);
  };

  const handleSubmitObject = (data: Partial<CatalogObject>) => {
    console.log('Submitting object:', data);
  };

  const handleUploadDocument = () => {
    console.log('Upload document');
  };

  const selectedObjectDocuments = selectedNode
    ? mockDocuments.filter((d) => d.objectId === selectedNode.id)
    : [];

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
            selectedNodeId={selectedNode?.id || null}
            onToggle={toggleNode}
            onSelectNode={selectNode}
          />
        </CardContent>
      </Card>

      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between">
          <Input placeholder="Поиск объектов..." className="w-80" />
          <Button
            className="bg-[#3B82F6] hover:bg-[#2563EB]"
            onClick={handleCreateObject}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Добавить объект
          </Button>
        </div>

        {selectedNode && isObjectNode(selectedNode) ? (
          <ObjectCard
            object={selectedNode as CatalogObject}
            documents={selectedObjectDocuments}
            onEdit={handleEditObject}
            onUploadDocument={handleUploadDocument}
          />
        ) : (
          <EmptyObjectPlaceholder />
        )}
      </div>

      <ObjectFormModal
        open={isObjectModalOpen}
        onClose={() => {
          setIsObjectModalOpen(false);
          setEditingObject(null);
        }}
        object={editingObject}
        onSubmit={handleSubmitObject}
      />
    </div>
  );
};
