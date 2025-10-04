import { Diagnostic, DiagnosticStatus, DiagnosticResult } from '../types/diagnostic.types';

export const mockDiagnostics: Diagnostic[] = [
  { id: 1, object: 'ОПО-012 "Резервуарный парк"', type: 'Техническая диагностика', date: '2024-09-15', nextDate: '2025-03-15', status: 'Выполнена', result: 'Удовлетворительно', defectsFound: 2 },
  { id: 2, object: 'ГТС-008 "Дамба водохранилища"', type: 'Экспертиза ПБ', date: '2024-08-20', nextDate: '2025-02-20', status: 'Выполнена', result: 'Хорошо', defectsFound: 0 },
  { id: 3, object: 'ОПО-025 "Компрессорная станция"', type: 'Техническая диагностика', date: null, nextDate: '2024-10-10', status: 'Запланирована', result: null, defectsFound: 0 },
  { id: 4, object: 'Здание-05 "Административный корпус"', type: 'Обследование', date: '2024-07-05', nextDate: '2025-01-05', status: 'Выполнена', result: 'Удовлетворительно', defectsFound: 5 },
];

export const getStatusColor = (status: DiagnosticStatus): string => {
  switch (status) {
    case 'Выполнена':
      return 'bg-green-100 text-green-800';
    case 'Запланирована':
      return 'bg-blue-100 text-blue-800';
    case 'Просрочена':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getResultColor = (result: DiagnosticResult | null): string => {
  switch (result) {
    case 'Хорошо':
      return 'bg-green-100 text-green-800';
    case 'Удовлетворительно':
      return 'bg-yellow-100 text-yellow-800';
    case 'Неудовлетворительно':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
