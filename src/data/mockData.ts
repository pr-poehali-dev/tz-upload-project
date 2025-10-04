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

export const mockTenants = [
  {
    id: 1,
    name: 'ООО "Нефтехим"',
    inn: '7701234567',
    status: 'Активен',
    plan: 'Enterprise',
    objectsCount: 4,
    usersCount: 12,
    incidentsCount: 8,
    createdAt: '2023-01-15',
    expiresAt: '2025-01-15',
    contactPerson: 'Иванов Иван Иванович',
    contactEmail: 'ivanov@neftehim.ru',
    contactPhone: '+7 (495) 123-45-67',
    address: 'г. Москва, ул. Промышленная, д. 15',
    features: ['API доступ', 'Интеграции', 'Приоритетная поддержка', 'Безлимитные пользователи'],
  },
  {
    id: 2,
    name: 'ООО "ГазТранс"',
    inn: '7702345678',
    status: 'Активен',
    plan: 'Professional',
    objectsCount: 2,
    usersCount: 8,
    incidentsCount: 3,
    createdAt: '2023-03-20',
    expiresAt: '2024-12-20',
    contactPerson: 'Петров Петр Петрович',
    contactEmail: 'petrov@gaztrans.ru',
    contactPhone: '+7 (495) 234-56-78',
    address: 'г. Екатеринбург, пр. Ленина, д. 45',
    features: ['До 50 пользователей', 'Email поддержка', 'Базовые интеграции'],
  },
  {
    id: 3,
    name: 'АО "ПромСтрой"',
    inn: '7703456789',
    status: 'Активен',
    plan: 'Basic',
    objectsCount: 1,
    usersCount: 5,
    incidentsCount: 1,
    createdAt: '2024-06-10',
    expiresAt: '2025-06-10',
    contactPerson: 'Сидорова Мария Васильевна',
    contactEmail: 'sidorova@promstroy.ru',
    contactPhone: '+7 (812) 345-67-89',
    address: 'г. Санкт-Петербург, ул. Индустриальная, д. 8',
    features: ['До 10 пользователей', 'Базовый функционал'],
  },
  {
    id: 4,
    name: 'ООО "ТехСервис"',
    inn: '7704567890',
    status: 'Истекает',
    plan: 'Professional',
    objectsCount: 3,
    usersCount: 6,
    incidentsCount: 5,
    createdAt: '2023-10-05',
    expiresAt: '2024-10-15',
    contactPerson: 'Кузнецов Алексей Николаевич',
    contactEmail: 'kuznetsov@tehservice.ru',
    contactPhone: '+7 (495) 456-78-90',
    address: 'г. Москва, ул. Техническая, д. 22',
    features: ['До 50 пользователей', 'Email поддержка', 'Базовые интеграции'],
  },
  {
    id: 5,
    name: 'ЗАО "ЭнергоМаш"',
    inn: '7705678901',
    status: 'Неактивен',
    plan: 'Basic',
    objectsCount: 0,
    usersCount: 3,
    incidentsCount: 0,
    createdAt: '2022-05-12',
    expiresAt: '2024-09-12',
    contactPerson: 'Смирнов Владимир Сергеевич',
    contactEmail: 'smirnov@energomash.ru',
    contactPhone: '+7 (495) 567-89-01',
    address: 'г. Москва, пр. Энергетиков, д. 33',
    features: ['До 10 пользователей', 'Базовый функционал'],
  },
];