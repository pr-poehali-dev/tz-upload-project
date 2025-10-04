export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Критический': return 'bg-red-500';
    case 'Высокий': return 'bg-orange-500';
    case 'Средний': return 'bg-yellow-500';
    case 'Низкий': return 'bg-blue-500';
    default: return 'bg-gray-500';
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'Новый': case 'Новая': return 'bg-blue-100 text-blue-800';
    case 'В работе': return 'bg-yellow-100 text-yellow-800';
    case 'На проверке': return 'bg-purple-100 text-purple-800';
    case 'Закрыт': case 'Завершена': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};
