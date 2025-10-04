import { useState } from 'react';
import { Diagnostic } from '../types/diagnostic.types';
import { mockDiagnostics } from '../utils/diagnostic.utils';

export const useDiagnostics = () => {
  const [diagnostics] = useState<Diagnostic[]>(mockDiagnostics);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState<Diagnostic | null>(null);

  const stats = {
    completed: diagnostics.filter(d => d.status === 'Выполнена').length,
    planned: diagnostics.filter(d => d.status === 'Запланирована').length,
    defectsTotal: diagnostics.reduce((acc, d) => acc + d.defectsFound, 0),
    nextDate: diagnostics
      .filter(d => d.status === 'Запланирована')
      .sort((a, b) => new Date(a.nextDate).getTime() - new Date(b.nextDate).getTime())[0]?.nextDate || '-',
  };

  return {
    diagnostics,
    selectedDiagnostic,
    setSelectedDiagnostic,
    stats,
  };
};
