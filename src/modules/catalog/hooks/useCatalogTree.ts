import { useState, useCallback } from 'react';
import { CatalogNode } from '../types/catalog.types';

export const useCatalogTree = (initialExpandedNodes: number[] = []) => {
  const [expandedNodes, setExpandedNodes] = useState<number[]>(initialExpandedNodes);
  const [selectedNode, setSelectedNode] = useState<CatalogNode | null>(null);

  const toggleNode = useCallback((nodeId: number) => {
    setExpandedNodes((prev) =>
      prev.includes(nodeId)
        ? prev.filter((id) => id !== nodeId)
        : [...prev, nodeId]
    );
  }, []);

  const selectNode = useCallback((node: CatalogNode) => {
    setSelectedNode(node);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const expandAll = useCallback((nodes: CatalogNode[]) => {
    const allIds: number[] = [];
    const traverse = (node: CatalogNode) => {
      allIds.push(node.id);
      if (node.children) {
        node.children.forEach(traverse);
      }
    };
    nodes.forEach(traverse);
    setExpandedNodes(allIds);
  }, []);

  const collapseAll = useCallback(() => {
    setExpandedNodes([]);
  }, []);

  return {
    expandedNodes,
    selectedNode,
    toggleNode,
    selectNode,
    clearSelection,
    expandAll,
    collapseAll
  };
};
