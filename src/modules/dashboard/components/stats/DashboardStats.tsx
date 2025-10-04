import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DashboardStatsProps {
  stats: {
    totalIncidents: number;
    activeTasks: number;
    overdue: number;
    totalObjects: number;
  };
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Всего инцидентов
          </CardTitle>
          <Icon name="AlertTriangle" className="text-red-500" size={20} />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.totalIncidents}</div>
          <p className="text-xs text-green-600 mt-1">-12% за месяц</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Активные задачи
          </CardTitle>
          <Icon name="ListTodo" className="text-blue-500" size={20} />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.activeTasks}</div>
          <p className="text-xs text-yellow-600 mt-1">+5 новых</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Просрочено
          </CardTitle>
          <Icon name="Clock" className="text-orange-500" size={20} />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.overdue}</div>
          <p className="text-xs text-red-600 mt-1">Требует внимания</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Объекты ОПО/ГТС
          </CardTitle>
          <Icon name="Database" className="text-green-500" size={20} />
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{stats.totalObjects}</div>
          <p className="text-xs text-gray-600 mt-1">8 филиалов</p>
        </CardContent>
      </Card>
    </div>
  );
};
