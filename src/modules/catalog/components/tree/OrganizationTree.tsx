import React from 'react';
import Icon from '@/components/ui/icon';
import { CatalogNode } from '../../types/catalog.types';
import { getNodeIcon, isObjectNode, hasChildren } from '../../utils/catalog.utils';

interface OrganizationTreeProps {
  nodes: CatalogNode[];
  expandedNodes: number[];
  selectedNodeId: number | null;
  onToggle: (nodeId: number) => void;
  onSelectNode: (node: CatalogNode) => void;
}

export const OrganizationTree: React.FC<OrganizationTreeProps> = ({
  nodes,
  expandedNodes,
  selectedNodeId,
  onToggle,
  onSelectNode
}) => {
  const renderNode = (node: CatalogNode, level: number = 0): React.ReactNode => {
    const isExpanded = expandedNodes.includes(node.id);
    const hasChildNodes = hasChildren(node);
    const isObject = isObjectNode(node);
    const isSelected = selectedNodeId === node.id;

    return (
      <div key={node.id}>
        <button
          onClick={() => {
            if (isObject) {
              onSelectNode(node);
            } else if (hasChildNodes) {
              onToggle(node.id);
            }
          }}
          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-left ${
            isSelected ? 'bg-blue-50 border border-blue-200' : ''
          }`}
          style={{ paddingLeft: `${level * 16 + 8}px` }}
        >
          {hasChildNodes && (
            <Icon
              name={isExpanded ? 'ChevronDown' : 'ChevronRight'}
              size={14}
              className="text-gray-500 flex-shrink-0"
            />
          )}
          <Icon 
            name={getNodeIcon(node.type) as any} 
            size={14} 
            className="text-gray-600 flex-shrink-0" 
          />
          <span className="text-sm flex-1 truncate">{node.name}</span>
          {node.inn && (
            <span className="text-xs text-gray-500">{node.inn}</span>
          )}
        </button>
        {hasChildNodes && isExpanded && (
          <div>
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-1">
      {nodes.map((node) => renderNode(node))}
    </div>
  );
};
