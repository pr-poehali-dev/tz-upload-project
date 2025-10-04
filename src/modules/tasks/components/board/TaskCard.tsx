import { Task } from '../../types/task.types';
import { getPriorityColor } from '../../utils/task.utils';
import Icon from '@/components/ui/icon';

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
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
  );
};
