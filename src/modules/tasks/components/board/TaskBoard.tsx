import { TaskStatus } from '../../types/task.types';
import { useTasks } from '../../hooks/useTasks';
import { TaskCard } from './TaskCard';
import { Badge } from '@/components/ui/badge';

const STATUSES: TaskStatus[] = ['Новая', 'В работе', 'На проверке', 'Завершена'];

export const TaskBoard = () => {
  const { tasksByStatus } = useTasks();

  return (
    <div className="flex gap-6">
      {STATUSES.map((status) => (
        <div key={status} className="flex-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">{status}</h3>
                <Badge variant="secondary">
                  {tasksByStatus(status).length}
                </Badge>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {tasksByStatus(status).map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
