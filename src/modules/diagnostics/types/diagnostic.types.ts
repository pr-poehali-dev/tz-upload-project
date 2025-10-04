export interface Diagnostic {
  id: number;
  object: string;
  type: DiagnosticType;
  date: string | null;
  nextDate: string;
  status: DiagnosticStatus;
  result: DiagnosticResult | null;
  defectsFound: number;
  organization?: string;
}

export type DiagnosticType = 'Техническая диагностика' | 'Экспертиза ПБ' | 'Обследование';
export type DiagnosticStatus = 'Выполнена' | 'Запланирована' | 'Просрочена';
export type DiagnosticResult = 'Хорошо' | 'Удовлетворительно' | 'Неудовлетворительно';
