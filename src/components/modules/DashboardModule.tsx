import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { mockIncidents, mockTasks } from '@/data/mockData';
import { getPriorityColor, getStatusColor } from '@/utils/helpers';

export const DashboardModule = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Всего инцидентов
            </CardTitle>
            <Icon name="AlertTriangle" className="text-red-500" size={20} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">247</div>
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
            <div className="text-3xl font-bold">89</div>
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
            <div className="text-3xl font-bold">12</div>
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
            <div className="text-3xl font-bold">156</div>
            <p className="text-xs text-gray-600 mt-1">8 филиалов</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Последние инциденты</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockIncidents.slice(0, 3).map((incident) => (
                <div key={incident.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${getPriorityColor(incident.priority)}`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{incident.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                      <span>{incident.object}</span>
                      <span>•</span>
                      <span>{incident.responsible}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(incident.status)}>
                    {incident.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Задачи на контроле</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTasks.filter(t => t.status !== 'Завершена').slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
                  <Icon name="CheckSquare" className="text-blue-500 mt-1" size={16} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{task.title}</p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                      <span>{task.assignee}</span>
                      <span>•</span>
                      <span>До {task.deadline}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor(task.status)}>
                    {task.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
