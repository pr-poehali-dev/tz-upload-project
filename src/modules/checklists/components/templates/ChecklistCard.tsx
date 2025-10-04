import { Checklist } from '../../types/checklist.types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ChecklistCardProps {
  checklist: Checklist;
  onSelect: (checklist: Checklist) => void;
}

export const ChecklistCard = ({ checklist, onSelect }: ChecklistCardProps) => {
  const totalQuestions = checklist.sections.reduce((acc, s) => acc + s.questions.length, 0);

  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelect(checklist)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{checklist.name}</CardTitle>
            <p className="text-sm text-gray-600">{checklist.description}</p>
          </div>
          <Icon name="FileText" className="text-blue-500" size={24} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon name="Layers" size={14} />
            <span>{checklist.sections.length} разделов</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon name="HelpCircle" size={14} />
            <span>{totalQuestions} вопросов</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Icon name="User" size={14} />
            <span>{checklist.createdBy}</span>
          </div>
          <div className="pt-3 border-t flex gap-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Icon name="Edit" size={14} className="mr-2" />
              Редактировать
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Icon name="Copy" size={14} className="mr-2" />
              Копировать
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
