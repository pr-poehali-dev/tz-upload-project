export const mockIncidents = [
  { id: 1, title: 'Утечка масла на ОПО-012', type: 'Утечка', priority: 'Критический', object: 'ОПО-012', status: 'В работе', responsible: 'Иванов И.И.', created: '2024-10-01', deadline: '2024-10-08' },
  { id: 2, title: 'Нарушение техники безопасности', type: 'Нарушение', priority: 'Средний', object: 'Здание-05', status: 'Новый', responsible: 'Петров П.П.', created: '2024-10-03', deadline: '2024-10-15' },
  { id: 3, title: 'Пожар в цехе №3', type: 'Пожар', priority: 'Критический', object: 'ГТС-008', status: 'На проверке', responsible: 'Сидоров С.С.', created: '2024-09-28', deadline: '2024-10-05' },
];

export const mockTasks = [
  { id: 1, title: 'Устранить утечку масла', priority: 'Критический', assignee: 'Иванов И.И.', status: 'В работе', deadline: '2024-10-08' },
  { id: 2, title: 'Провести проверку цеха №5', priority: 'Высокий', assignee: 'Петров П.П.', status: 'Новая', deadline: '2024-10-10' },
  { id: 3, title: 'Подготовить отчет по экспертизе', priority: 'Средний', assignee: 'Сидоров С.С.', status: 'На проверке', deadline: '2024-10-12' },
  { id: 4, title: 'Обновить документацию ОПО', priority: 'Низкий', assignee: 'Кузнецов К.К.', status: 'Завершена', deadline: '2024-10-05' },
];

export const mockOrganizations = [
  {
    id: 1,
    name: 'Холдинг "ПромБезопасность"',
    type: 'holding',
    children: [
      {
        id: 2,
        name: 'ООО "Нефтехим"',
        type: 'legal',
        inn: '7701234567',
        children: [
          {
            id: 3,
            name: 'Филиал Московский',
            type: 'branch',
            children: [
              { id: 4, name: 'ОПО-012 "Резервуарный парк"', type: 'opo', class: 'I', status: 'Активен', nextExamination: '2025-03-15', responsible: 'Иванов И.И.' },
              { id: 5, name: 'ГТС-008 "Дамба водохранилища"', type: 'gts', class: 'II', status: 'Активен', nextExamination: '2025-06-20', responsible: 'Петров П.П.' },
            ]
          },
          {
            id: 6,
            name: 'Филиал Санкт-Петербургский',
            type: 'branch',
            children: [
              { id: 7, name: 'Здание-05 "Административный корпус"', type: 'building', status: 'Активен', nextExamination: '2025-01-10', responsible: 'Сидоров С.С.' },
              { id: 8, name: 'ОПО-025 "Компрессорная станция"', type: 'opo', class: 'II', status: 'Активен', nextExamination: '2024-12-05', responsible: 'Кузнецов К.К.' },
            ]
          }
        ]
      },
      {
        id: 9,
        name: 'ООО "ГазТранс"',
        type: 'legal',
        inn: '7702345678',
        children: [
          {
            id: 10,
            name: 'Филиал Уральский',
            type: 'branch',
            children: [
              { id: 11, name: 'ГТС-012 "Плотина"', type: 'gts', class: 'I', status: 'Активен', nextExamination: '2025-08-30', responsible: 'Смирнов А.А.' },
              { id: 12, name: 'ОПО-033 "Газопровод"', type: 'opo', class: 'III', status: 'На консервации', nextExamination: '-', responsible: 'Волков В.В.' },
            ]
          }
        ]
      }
    ]
  }
];

export const mockDocuments = [
  { id: 1, objectId: 4, name: 'Паспорт безопасности ОПО', type: 'Паспорт', validUntil: '2025-12-31', uploadedAt: '2023-01-15' },
  { id: 2, objectId: 4, name: 'Схема резервуарного парка', type: 'Схема', validUntil: '2026-06-30', uploadedAt: '2023-02-20' },
  { id: 3, objectId: 5, name: 'Разрешение на эксплуатацию ГТС', type: 'Разрешение', validUntil: '2025-03-15', uploadedAt: '2023-03-10' },
];

export const mockChecklists = [
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
          { id: 6, text: 'Уровень коррозии (1-5)', type: 'number', isCritical: false },
        ]
      },
      {
        id: 3,
        name: 'Персонал',
        questions: [
          { id: 7, text: 'Наличие действующих аттестаций', type: 'yesno', isCritical: true },
          { id: 8, text: 'Соблюдение требований ТБ', type: 'yesno', isCritical: false },
        ]
      }
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
          { id: 9, text: 'Состояние тела плотины', type: 'choice', options: ['Отлично', 'Хорошо', 'Удовлетворительно', 'Плохо'], isCritical: true },
          { id: 10, text: 'Наличие протечек', type: 'yesno', isCritical: true },
        ]
      }
    ],
    createdAt: '2024-02-20',
    createdBy: 'Сидоров С.С.'
  }
];

export const mockInspections = [
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
    completedDate: null,
    result: null,
    incidentsCreated: 0,
  },
  {
    id: 3,
    checklistId: 2,
    checklistName: 'Проверка ГТС',
    objectId: 5,
    objectName: 'ГТС-008 "Дамба водохранилища"',
    inspector: 'Сидоров С.С.',
    status: 'Запланирована',
    plannedDate: '2024-10-20',
    completedDate: null,
    result: null,
    incidentsCreated: 0,
  },
];
