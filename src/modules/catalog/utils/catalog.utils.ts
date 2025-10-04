import { CatalogNode } from '../types/catalog.types';

export const getNodeIcon = (type: CatalogNode['type']): string => {
  const iconMap: Record<CatalogNode['type'], string> = {
    holding: 'Building2',
    legal: 'Building',
    branch: 'MapPin',
    opo: 'Factory',
    gts: 'Waves',
    building: 'Home'
  };
  return iconMap[type] || 'Folder';
};

export const getStatusColor = (status: string): string => {
  const colorMap: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    conservation: 'bg-yellow-100 text-yellow-800',
    liquidated: 'bg-gray-100 text-gray-800',
    'Активен': 'bg-green-100 text-green-800',
    'На консервации': 'bg-yellow-100 text-yellow-800',
    'Ликвидирован': 'bg-gray-100 text-gray-800'
  };
  return colorMap[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusLabel = (status: string): string => {
  const labelMap: Record<string, string> = {
    active: 'Активен',
    conservation: 'На консервации',
    liquidated: 'Ликвидирован'
  };
  return labelMap[status] || status;
};

export const getTypeLabel = (type: CatalogNode['type']): string => {
  const labelMap: Record<CatalogNode['type'], string> = {
    holding: 'Холдинг',
    legal: 'Юридическое лицо',
    branch: 'Филиал',
    opo: 'ОПО',
    gts: 'ГТС',
    building: 'Здание'
  };
  return labelMap[type] || type;
};

export const isObjectNode = (node: CatalogNode): boolean => {
  return ['opo', 'gts', 'building'].includes(node.type);
};

export const hasChildren = (node: CatalogNode): boolean => {
  return !!node.children && node.children.length > 0;
};

export const flattenTree = (nodes: CatalogNode[]): CatalogNode[] => {
  const result: CatalogNode[] = [];
  
  const traverse = (node: CatalogNode) => {
    result.push(node);
    if (node.children) {
      node.children.forEach(traverse);
    }
  };
  
  nodes.forEach(traverse);
  return result;
};

export const findNodeById = (nodes: CatalogNode[], id: number): CatalogNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};
