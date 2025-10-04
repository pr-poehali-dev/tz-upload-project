import { DashboardStats } from '../components/stats/DashboardStats';
import { RecentActivity } from '../components/recent/RecentActivity';
import { mockDashboardStats } from '../utils/dashboard.utils';
import { mockIncidents } from '@/data/mockData';
import { mockTasks } from '@/modules/tasks/utils/task.utils';
import { getPriorityColor } from '@/modules/tasks/utils/task.utils';
import { getStatusColor as getIncidentStatusColor } from '@/modules/incidents/utils/incident.utils';
import { getStatusColor as getTaskStatusColor } from '@/modules/tasks/utils/task.utils';

export const DashboardPage = () => {
  const recentIncidents = mockIncidents.slice(0, 3);
  const recentTasks = mockTasks.slice(0, 3);

  return (
    <div className="space-y-8">
      <DashboardStats stats={mockDashboardStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity
          title="Последние инциденты"
          activities={recentIncidents}
          priorityColor={getPriorityColor}
          statusColor={getIncidentStatusColor}
        />
        <RecentActivity
          title="Активные задачи"
          activities={recentTasks}
          priorityColor={getPriorityColor}
          statusColor={getTaskStatusColor}
        />
      </div>
    </div>
  );
};
