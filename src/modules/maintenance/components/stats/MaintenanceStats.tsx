import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface MaintenanceStatsProps {
  stats: {
    inProgress: number;
    planned: number;
    completed: number;
    totalBudget: number;
  };
}

export const MaintenanceStats = ({ stats }: MaintenanceStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">В работе</p>
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
            </div>
            <Icon name="Wrench" size={32} className="text-blue-600 opacity-50" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Запланировано</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.planned}</p>
            </div>
            <Icon name="Calendar" size={32} className="text-yellow-600 opacity-50" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Завершено</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <Icon name="CheckCircle" size={32} className="text-green-600 opacity-50" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Бюджет (млн ₽)</p>
              <p className="text-2xl font-bold text-[#3B82F6]">{stats.totalBudget.toFixed(1)}</p>
            </div>
            <Icon name="Wallet" size={32} className="text-[#3B82F6] opacity-50" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
