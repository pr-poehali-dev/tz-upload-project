import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mockCertificates, mockEmployees, mockCertTypes, mockCertAreas, mockPositions } from '@/data/mockData';
import { ExportMenu } from '@/components/ui/export-menu';
import { exportToExcel, exportToPDF, exportToCSV } from '@/utils/exportUtils';

export const TrainingScheduleModule = () => {
  const getScheduleData = () => {
    const schedule: any[] = [];

    mockEmployees.forEach(employee => {
      const requiredCerts: number[] = [];
      employee.positions.forEach((posId: number) => {
        const pos = mockPositions.find(p => p.id === posId);
        if (pos) {
          requiredCerts.push(...pos.requiredCerts);
        }
      });

      const uniqueRequired = [...new Set(requiredCerts)];

      uniqueRequired.forEach(certTypeId => {
        const existingCert = mockCertificates.find(
          c => c.employeeId === employee.id && c.certTypeId === certTypeId
        );

        const certType = mockCertTypes.find(t => t.id === certTypeId);
        const area = existingCert ? mockCertAreas.find(a => a.id === existingCert.areaId) : null;

        schedule.push({
          employeeId: employee.id,
          employeeName: employee.fullName,
          company: employee.company,
          certType: certType?.name || '',
          area: area?.name || '-',
          status: existingCert ? 'Есть' : 'Отсутствует',
          expiryDate: existingCert?.expiryDate || null,
          isPermanent: existingCert?.isPermanent || false,
          priority: existingCert ? 
            (existingCert.isPermanent ? 3 : 
             (new Date(existingCert.expiryDate!) < new Date() ? 0 :
              new Date(existingCert.expiryDate!) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) ? 1 : 2)) 
            : 0,
        });
      });
    });

    return schedule.sort((a, b) => a.priority - b.priority);
  };

  const scheduleData = getScheduleData();

  const handleExportExcel = () => {
    const data = scheduleData.map(item => ({
      'ФИО': item.employeeName,
      'Компания': item.company,
      'Вид обучения': item.certType,
      'Область': item.area,
      'Статус': item.status,
      'Срок действия': item.isPermanent ? 'Бессрочно' : item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('ru-RU') : '-',
      'Приоритет': item.priority === 0 ? 'Критический' : item.priority === 1 ? 'Высокий' : item.priority === 2 ? 'Средний' : 'Низкий',
    }));
    exportToExcel(data, 'График обучения', 'График обучения');
  };

  const handleExportPDF = () => {
    const columns = [
      { header: 'ФИО', dataKey: 'employeeName' },
      { header: 'Компания', dataKey: 'company' },
      { header: 'Вид обучения', dataKey: 'certType' },
      { header: 'Статус', dataKey: 'status' },
      { header: 'Срок', dataKey: 'expiry' },
    ];
    const data = scheduleData.map(item => ({
      ...item,
      expiry: item.isPermanent ? 'Бессрочно' : item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('ru-RU') : '-',
    }));
    exportToPDF(data, columns, 'График обучения', 'График обучения сотрудников');
  };

  const handleExportCSV = () => {
    const data = scheduleData.map(item => ({
      'ФИО': item.employeeName,
      'Компания': item.company,
      'Вид обучения': item.certType,
      'Область': item.area,
      'Статус': item.status,
      'Срок действия': item.isPermanent ? 'Бессрочно' : item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('ru-RU') : '-',
    }));
    exportToCSV(data, 'График обучения');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск по сотруднику..." className="w-80" />
        </div>
        <div className="flex gap-3">
          <ExportMenu 
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Отсутствуют</p>
              <p className="text-2xl font-bold text-red-600">
                {scheduleData.filter(d => d.status === 'Отсутствует').length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Истекают</p>
              <p className="text-2xl font-bold text-yellow-600">
                {scheduleData.filter(d => d.priority === 1).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Действуют</p>
              <p className="text-2xl font-bold text-green-600">
                {scheduleData.filter(d => d.priority === 2).length}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Бессрочные</p>
              <p className="text-2xl font-bold text-blue-600">
                {scheduleData.filter(d => d.isPermanent).length}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ФИО</TableHead>
              <TableHead>Компания</TableHead>
              <TableHead>Вид обучения</TableHead>
              <TableHead>Область</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Срок действия</TableHead>
              <TableHead className="text-center">Приоритет</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scheduleData.map((item, index) => (
              <TableRow key={index} className={item.priority === 0 ? 'bg-red-50' : item.priority === 1 ? 'bg-yellow-50' : ''}>
                <TableCell className="font-medium">{item.employeeName}</TableCell>
                <TableCell>{item.company}</TableCell>
                <TableCell>{item.certType}</TableCell>
                <TableCell>{item.area}</TableCell>
                <TableCell>
                  <Badge className={item.status === 'Отсутствует' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-600">
                  {item.isPermanent ? 'Бессрочно' : item.expiryDate ? new Date(item.expiryDate).toLocaleDateString('ru-RU') : '-'}
                </TableCell>
                <TableCell className="text-center">
                  <Badge className={
                    item.priority === 0 ? 'bg-red-100 text-red-700' :
                    item.priority === 1 ? 'bg-yellow-100 text-yellow-700' :
                    item.priority === 2 ? 'bg-green-100 text-green-700' :
                    'bg-blue-100 text-blue-700'
                  }>
                    {item.priority === 0 ? 'Критический' : 
                     item.priority === 1 ? 'Высокий' : 
                     item.priority === 2 ? 'Средний' : 
                     'Низкий'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
