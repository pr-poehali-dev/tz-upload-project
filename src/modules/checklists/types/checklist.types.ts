export interface Question {
  id: number;
  text: string;
  type: 'yesno' | 'text' | 'number' | 'choice';
  options?: string[];
  isCritical: boolean;
}

export interface Section {
  id: number;
  name: string;
  questions: Question[];
}

export interface Checklist {
  id: number;
  name: string;
  description: string;
  sections: Section[];
  createdAt: string;
  createdBy: string;
}

export interface Inspection {
  id: number;
  checklistId: number;
  checklistName: string;
  objectId: number;
  objectName: string;
  inspector: string;
  status: InspectionStatus;
  plannedDate: string;
  completedDate?: string;
  result?: number;
  incidentsCreated: number;
}

export type InspectionStatus = 'Запланирована' | 'В процессе' | 'Завершена';
export type ChecklistView = 'templates' | 'inspections';
