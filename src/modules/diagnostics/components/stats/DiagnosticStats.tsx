import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DiagnosticStatsProps {
  stats: {
    completed: number;
    planned: number;
    defectsTotal: number;
    nextDate: string;
  };
}

export const DiagnosticStats = ({ stats }: DiagnosticStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Выполнено</p>
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
              <p className="text-sm text-gray-600">Запланировано</p>
              <p className="text-2xl font-bold text-blue-600">{stats.planned}</p>
            </div>
            <Icon name="Calendar" size={32} className="text-blue-600 opacity-50" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Найдено дефектов</p>
              <p className="text-2xl font-bold text-red-600">{stats.defectsTotal}</p>
            </div>
            <Icon name="AlertCircle" size={32} className="text-red-600 opacity-50" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Ближайшая</p>
              <p className="text-sm font-medium text-[#3B82F6]">{stats.nextDate}</p>
            </div>
            <Icon name="Stethoscope" size={32} className="text-[#3B82F6] opacity-50" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
