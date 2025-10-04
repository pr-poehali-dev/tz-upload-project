import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Icon from '@/components/ui/icon';

interface ExportMenuProps {
  onExportExcel: () => void;
  onExportPDF: () => void;
  onExportCSV?: () => void;
}

export const ExportMenu = ({ onExportExcel, onExportPDF, onExportCSV }: ExportMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Icon name="Download" size={16} className="mr-2" />
          Экспорт
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onExportExcel}>
          <Icon name="FileSpreadsheet" size={16} className="mr-2 text-green-600" />
          Excel (.xlsx)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onExportPDF}>
          <Icon name="FileText" size={16} className="mr-2 text-red-600" />
          PDF (.pdf)
        </DropdownMenuItem>
        {onExportCSV && (
          <DropdownMenuItem onClick={onExportCSV}>
            <Icon name="FileType" size={16} className="mr-2 text-blue-600" />
            CSV (.csv)
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
