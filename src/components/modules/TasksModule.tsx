import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { mockTasks } from '@/data/mockData';
import { getPriorityColor } from '@/utils/helpers';

export const TasksModule = () => {
  return (
    <div className="space-y-6">
      <div className="flex gap-6">
        {['Новая', 'В работе', 'На проверке', 'Завершена'].map((status) => (
          <div key={status} className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">{status}</h3>
                  <Badge variant="secondary">
                    {mockTasks.filter(t => t.status === status).length}
                  </Badge>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {mockTasks.filter(t => t.status === status).map((task) => (
                  <div key={task.id} className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-2 mb-2">
                      <div className={`w-1 h-12 rounded ${getPriorityColor(task.priority)}`} />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-1">{task.title}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Icon name="User" size={12} />
                          <span>{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                          <Icon name="Calendar" size={12} />
                          <span>До {task.deadline}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
