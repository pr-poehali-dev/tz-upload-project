import { exportToExcel, exportToPDF, exportToCSV } from './exportUtils';

export const createCertificationExport = (mockCertifications: any[]) => ({
  handleExportExcel: () => {
    const data = mockCertifications.map(cert => ({
      'ID': cert.id,
      'Сотрудник': cert.employee,
      'Должность': cert.position,
      'Категория': cert.category,
      'Организация': cert.organization,
      'Следующий экзамен': cert.nextExam,
      'Статус': cert.status,
    }));
    exportToExcel(data, 'Аттестация', 'Аттестация');
  },
  handleExportPDF: () => {
    const columns = [
      { header: 'Сотрудник', dataKey: 'employee' },
      { header: 'Должность', dataKey: 'position' },
      { header: 'Категория', dataKey: 'category' },
      { header: 'Организация', dataKey: 'organization' },
      { header: 'Следующий экзамен', dataKey: 'nextExam' },
      { header: 'Статус', dataKey: 'status' },
    ];
    exportToPDF(mockCertifications, columns, 'Аттестация', 'Отчет по аттестации');
  },
  handleExportCSV: () => {
    const data = mockCertifications.map(cert => ({
      'ID': cert.id,
      'Сотрудник': cert.employee,
      'Должность': cert.position,
      'Категория': cert.category,
      'Организация': cert.organization,
      'Следующий экзамен': cert.nextExam,
      'Статус': cert.status,
    }));
    exportToCSV(data, 'Аттестация');
  }
});

export const createDiagnosticsExport = (mockDiagnostics: any[]) => ({
  handleExportExcel: () => {
    const data = mockDiagnostics.map(diag => ({
      'ID': diag.id,
      'Объект': diag.object,
      'Тип': diag.type,
      'Дата проведения': diag.date || '-',
      'Следующая дата': diag.nextDate,
      'Статус': diag.status,
      'Результат': diag.result || '-',
      'Дефекты': diag.defectsFound,
    }));
    exportToExcel(data, 'Диагностика', 'Диагностика');
  },
  handleExportPDF: () => {
    const columns = [
      { header: 'Объект', dataKey: 'object' },
      { header: 'Тип', dataKey: 'type' },
      { header: 'Дата', dataKey: 'date' },
      { header: 'Статус', dataKey: 'status' },
      { header: 'Результат', dataKey: 'result' },
      { header: 'Дефекты', dataKey: 'defectsFound' },
    ];
    exportToPDF(mockDiagnostics, columns, 'Диагностика', 'Отчет по технической диагностике');
  },
  handleExportCSV: () => {
    const data = mockDiagnostics.map(diag => ({
      'ID': diag.id,
      'Объект': diag.object,
      'Тип': diag.type,
      'Статус': diag.status,
      'Дефекты': diag.defectsFound,
    }));
    exportToCSV(data, 'Диагностика');
  }
});

export const createMaintenanceExport = (mockMaintenance: any[]) => ({
  handleExportExcel: () => {
    const data = mockMaintenance.map(maint => ({
      'ID': maint.id,
      'Объект': maint.object,
      'Тип': maint.type,
      'Приоритет': maint.priority,
      'Статус': maint.status,
      'Начало': maint.plannedStart,
      'Окончание': maint.actualEnd || maint.plannedEnd,
      'Бюджет': maint.budget,
      'Израсходовано': maint.spent,
      'Ответственный': maint.responsible,
    }));
    exportToExcel(data, 'Ремонты', 'Ремонты');
  },
  handleExportPDF: () => {
    const columns = [
      { header: 'Объект', dataKey: 'object' },
      { header: 'Тип', dataKey: 'type' },
      { header: 'Приоритет', dataKey: 'priority' },
      { header: 'Статус', dataKey: 'status' },
      { header: 'Бюджет', dataKey: 'budget' },
      { header: 'Израсходовано', dataKey: 'spent' },
      { header: 'Ответственный', dataKey: 'responsible' },
    ];
    exportToPDF(mockMaintenance, columns, 'Ремонты', 'Отчет по ремонтам');
  },
  handleExportCSV: () => {
    const data = mockMaintenance.map(maint => ({
      'ID': maint.id,
      'Объект': maint.object,
      'Тип': maint.type,
      'Статус': maint.status,
      'Бюджет': maint.budget,
      'Израсходовано': maint.spent,
    }));
    exportToCSV(data, 'Ремонты');
  }
});

export const createUsersExport = (mockUsers: any[]) => ({
  handleExportExcel: () => {
    const data = mockUsers.map(user => ({
      'ID': user.id,
      'ФИО': user.name,
      'Email': user.email,
      'Организация': user.tenant,
      'Роль': user.role,
      'Статус': user.status,
      'Последний вход': user.lastLogin,
    }));
    exportToExcel(data, 'Пользователи', 'Пользователи');
  },
  handleExportPDF: () => {
    const columns = [
      { header: 'ФИО', dataKey: 'name' },
      { header: 'Email', dataKey: 'email' },
      { header: 'Организация', dataKey: 'tenant' },
      { header: 'Роль', dataKey: 'role' },
      { header: 'Статус', dataKey: 'status' },
    ];
    exportToPDF(mockUsers, columns, 'Пользователи', 'Отчет по пользователям');
  },
  handleExportCSV: () => {
    const data = mockUsers.map(user => ({
      'ID': user.id,
      'ФИО': user.name,
      'Email': user.email,
      'Роль': user.role,
      'Статус': user.status,
    }));
    exportToCSV(data, 'Пользователи');
  }
});
