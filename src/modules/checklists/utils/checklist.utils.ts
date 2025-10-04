import { Checklist, Inspection } from '../types/checklist.types';

export const mockChecklists: Checklist[] = [
  {
    id: 1,
    name: 'Проверка ОПО I класса опасности',
    description: 'Ежеквартальная проверка объектов повышенной опасности',
    sections: [
      {
        id: 1,
        name: 'Документация',
        questions: [
          { id: 1, text: 'Наличие паспорта безопасности', type: 'yesno', isCritical: true },
          { id: 2, text: 'Актуальность схем и планов', type: 'yesno', isCritical: true },
          { id: 3, text: 'Комментарий к документации', type: 'text', isCritical: false },
        ]
      },
      {
        id: 2,
        name: 'Техническое состояние',
        questions: [
          { id: 4, text: 'Отсутствие видимых повреждений', type: 'yesno', isCritical: true },
          { id: 5, text: 'Работоспособность систем безопасности', type: 'yesno', isCritical: true },
        ]
      },
    ],
    createdAt: '2024-01-15',
    createdBy: 'Петров П.П.'
  },
  {
    id: 2,
    name: 'Проверка ГТС',
    description: 'Плановая проверка гидротехнических сооружений',
    sections: [
      {
        id: 4,
        name: 'Общее состояние',
        questions: [
          { id: 9, text: 'Состояние тела плотины', type: 'choice', options: ['Отлично', 'Хорошо', 'Удовлетворительно'], isCritical: true },
          { id: 10, text: 'Наличие протечек', type: 'yesno', isCritical: true },
        ]
      }
    ],
    createdAt: '2024-02-20',
    createdBy: 'Сидоров С.С.'
  }
];

export const mockInspections: Inspection[] = [
  {
    id: 1,
    checklistId: 1,
    checklistName: 'Проверка ОПО I класса опасности',
    objectId: 4,
    objectName: 'ОПО-012 "Резервуарный парк"',
    inspector: 'Иванов И.И.',
    status: 'Завершена',
    plannedDate: '2024-09-15',
    completedDate: '2024-09-15',
    result: 85,
    incidentsCreated: 1,
  },
  {
    id: 2,
    checklistId: 1,
    checklistName: 'Проверка ОПО I класса опасности',
    objectId: 8,
    objectName: 'ОПО-025 "Компрессорная станция"',
    inspector: 'Петров П.П.',
    status: 'В процессе',
    plannedDate: '2024-10-05',
    result: 70,
    incidentsCreated: 0,
  },
];

export const getInspectionStatusColor = (status: string): string => {
  switch (status) {
    case 'Завершена':
      return 'bg-green-100 text-green-800';
    case 'В процессе':
      return 'bg-yellow-100 text-yellow-800';
    case 'Запланирована':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const getResultColor = (result: number): string => {
  if (result >= 80) return 'bg-green-500';
  if (result >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
};
