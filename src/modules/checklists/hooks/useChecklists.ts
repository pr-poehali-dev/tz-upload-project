import { useState } from 'react';
import { Checklist, Inspection, ChecklistView } from '../types/checklist.types';
import { mockChecklists, mockInspections } from '../utils/checklist.utils';

export const useChecklists = () => {
  const [checklists] = useState<Checklist[]>(mockChecklists);
  const [inspections] = useState<Inspection[]>(mockInspections);
  const [view, setView] = useState<ChecklistView>('inspections');
  const [selectedChecklist, setSelectedChecklist] = useState<Checklist | null>(null);

  return {
    checklists,
    inspections,
    view,
    setView,
    selectedChecklist,
    setSelectedChecklist,
  };
};
