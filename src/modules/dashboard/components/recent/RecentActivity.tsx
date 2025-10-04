import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Activity {
  id: number;
  title: string;
  priority: string;
  object: string;
  responsible: string;
  status: string;
}

interface RecentActivityProps {
  title: string;
  activities: Activity[];
  priorityColor: (priority: string) => string;
  statusColor: (status: string) => string;
}

export const RecentActivity = ({ title, activities, priorityColor, statusColor }: RecentActivityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${priorityColor(activity.priority)}`} />
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.title}</p>
                <div className="flex items-center gap-2 mt-1 text-xs text-gray-600">
                  <span>{activity.object}</span>
                  <span>•</span>
                  <span>{activity.responsible}</span>
                </div>
              </div>
              <Badge className={statusColor(activity.status)}>
                {activity.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
