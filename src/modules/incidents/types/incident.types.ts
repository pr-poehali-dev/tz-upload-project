export interface Incident {
  id: string;
  title: string;
  type: 'leak' | 'fire' | 'violation' | 'accident';
  priority: 'critical' | 'high' | 'medium' | 'low';
  status: 'new' | 'in-progress' | 'review' | 'closed';
  object: string;
  objectId?: string;
  responsible: string;
  responsibleId?: string;
  description?: string;
  created: string;
  deadline: string;
  updatedAt?: string;
  closedAt?: string;
  assignedTo?: string[];
  attachments?: IncidentAttachment[];
  comments?: IncidentComment[];
}

export interface IncidentAttachment {
  id: string;
  incidentId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
}

export interface IncidentComment {
  id: string;
  incidentId: string;
  author: string;
  authorId: string;
  text: string;
  createdAt: string;
  updatedAt?: string;
}

export interface IncidentFilters {
  search: string;
  status: string;
  priority: string;
  type: string;
  dateFrom: string;
  dateTo: string;
}

export interface IncidentFormData {
  title: string;
  type: Incident['type'];
  priority: Incident['priority'];
  objectId: string;
  responsibleId: string;
  description: string;
  deadline: string;
}
