export interface CatalogNode {
  id: number;
  name: string;
  type: 'holding' | 'legal' | 'branch' | 'opo' | 'gts' | 'building';
  inn?: string;
  status?: 'active' | 'conservation' | 'liquidated';
  class?: 'I' | 'II' | 'III' | 'IV';
  responsible?: string;
  nextExamination?: string;
  children?: CatalogNode[];
}

export interface CatalogObject extends CatalogNode {
  address?: string;
  createdAt?: string;
  updatedAt?: string;
  documents?: CatalogDocument[];
}

export interface CatalogDocument {
  id: string;
  objectId: number;
  name: string;
  type: string;
  validUntil: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface CatalogFilters {
  search: string;
  type: string;
  status: string;
  class: string;
}
