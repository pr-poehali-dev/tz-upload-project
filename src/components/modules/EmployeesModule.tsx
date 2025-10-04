import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { mockEmployees, mockPositions, mockCertificates, mockCertTypes, mockCertAreas } from '@/data/mockData';
import { ExportMenu } from '@/components/ui/export-menu';
import { exportToExcel, exportToPDF, exportToCSV } from '@/utils/exportUtils';

export const EmployeesModule = () => {
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [isEmployeeDetailOpen, setIsEmployeeDetailOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const getEmployeeCerts = (employeeId: number) => {
    return mockCertificates.filter(c => c.employeeId === employeeId);
  };

  const getRequiredCertsForEmployee = (employee: any) => {
    const allRequired: number[] = [];
    employee.positions.forEach((posId: number) => {
      const pos = mockPositions.find(p => p.id === posId);
      if (pos) {
        allRequired.push(...pos.requiredCerts);
      }
    });
    return [...new Set(allRequired)];
  };

  const checkMissingCerts = (employee: any) => {
    const required = getRequiredCertsForEmployee(employee);
    const hasCerts = getEmployeeCerts(employee.id).map(c => c.certTypeId);
    return required.filter(r => !hasCerts.includes(r));
  };

  const handleExportExcel = () => {
    const data = mockEmployees.map(employee => ({
      'ФИО': employee.fullName,
      'Компания': employee.company,
      'Должности': employee.positions.map(p => mockPositions.find(pos => pos.id === p)?.name).join(', '),
      'Удостоверения': getEmployeeCerts(employee.id).length,
      'Отсутствующие': checkMissingCerts(employee).length,
    }));
    exportToExcel(data, 'Сотрудники', 'Сотрудники');
  };

  const handleExportPDF = () => {
    const columns = [
      { header: 'ФИО', dataKey: 'fullName' },
      { header: 'Компания', dataKey: 'company' },
      { header: 'Должности', dataKey: 'positions' },
      { header: 'Удостоверения', dataKey: 'certs' },
    ];
    const data = mockEmployees.map(employee => ({
      fullName: employee.fullName,
      company: employee.company,
      positions: employee.positions.map(p => mockPositions.find(pos => pos.id === p)?.name).join(', '),
      certs: getEmployeeCerts(employee.id).length,
    }));
    exportToPDF(data, columns, 'Сотрудники', 'Список сотрудников');
  };

  const handleExportCSV = () => {
    const data = mockEmployees.map(employee => ({
      'ФИО': employee.fullName,
      'Компания': employee.company,
      'Должности': employee.positions.map(p => mockPositions.find(pos => pos.id === p)?.name).join(', '),
      'Удостоверения': getEmployeeCerts(employee.id).length,
    }));
    exportToCSV(data, 'Сотрудники');
  };

  const openEmployeeDetail = (employee: any) => {
    setSelectedEmployee(employee);
    setIsEmployeeDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск сотрудников..." className="w-80" />
        </div>
        <div className="flex gap-3">
          <ExportMenu 
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
          />
          <Dialog open={isEmployeeModalOpen} onOpenChange={setIsEmployeeModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить сотрудника
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Добавление сотрудника</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="fullName">ФИО</Label>
                  <Input id="fullName" placeholder="Иванов Иван Иванович" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Компания</Label>
                  <Input id="company" placeholder="ООО Ромашка" />
                </div>
                <div className="grid gap-2">
                  <Label>Должности (можно выбрать несколько)</Label>
                  <div className="grid gap-2">
                    {mockPositions.map(pos => (
                      <label key={pos.id} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm">{pos.name} ({pos.company})</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEmployeeModalOpen(false)}>
                  Отмена
                </Button>
                <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsEmployeeModalOpen(false)}>
                  Добавить
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Компания</TableHead>
              <TableHead>ФИО</TableHead>
              <TableHead>Должность</TableHead>
              <TableHead className="text-center">Удостоверения</TableHead>
              <TableHead className="text-center">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockEmployees.map((employee) => {
              const missing = checkMissingCerts(employee);
              return (
                <TableRow key={employee.id} className="cursor-pointer hover:bg-gray-50" onClick={() => openEmployeeDetail(employee)}>
                  <TableCell>{employee.company}</TableCell>
                  <TableCell className="font-medium">{employee.fullName}</TableCell>
                  <TableCell>
                    {employee.positions.map((posId: number) => 
                      mockPositions.find(p => p.id === posId)?.name
                    ).join(', ')}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="outline" className="bg-green-50">
                        {getEmployeeCerts(employee.id).length}
                      </Badge>
                      {missing.length > 0 && (
                        <Badge variant="outline" className="bg-red-50 text-red-700">
                          -{missing.length}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); openEmployeeDetail(employee); }}>
                      <Icon name="Eye" size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {selectedEmployee && (
        <Dialog open={isEmployeeDetailOpen} onOpenChange={setIsEmployeeDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Карточка сотрудника: {selectedEmployee.fullName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded">
                <div>
                  <p className="text-sm text-gray-600">ФИО</p>
                  <p className="font-medium">{selectedEmployee.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Компания</p>
                  <p className="font-medium">{selectedEmployee.company}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Должности</p>
                  <p className="font-medium">
                    {selectedEmployee.positions.map((posId: number) => 
                      mockPositions.find(p => p.id === posId)?.name
                    ).join(', ')}
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Удостоверения</h3>
                  <Button size="sm" onClick={() => setIsCertModalOpen(true)}>
                    <Icon name="Plus" size={16} className="mr-2" />
                    Добавить удостоверение
                  </Button>
                </div>

                <div className="space-y-2">
                  {getRequiredCertsForEmployee(selectedEmployee).map(certTypeId => {
                    const cert = getEmployeeCerts(selectedEmployee.id).find(c => c.certTypeId === certTypeId);
                    const certType = mockCertTypes.find(t => t.id === certTypeId);
                    const area = cert ? mockCertAreas.find(a => a.id === cert.areaId) : null;

                    return (
                      <div key={certTypeId} className="p-4 border rounded">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{certType?.name} - {certType?.description}</p>
                            {cert ? (
                              <div className="text-sm text-gray-600 mt-1">
                                <p>Область: {area?.name || '-'}</p>
                                <p>Номер: {cert.number}</p>
                                <p>Срок: {cert.isPermanent ? 'Бессрочно' : `до ${new Date(cert.expiryDate!).toLocaleDateString('ru-RU')}`}</p>
                              </div>
                            ) : (
                              <Badge className="mt-1 bg-red-100 text-red-700">Отсутствует</Badge>
                            )}
                          </div>
                          {cert && (
                            <Badge className={cert.isPermanent || new Date(cert.expiryDate!) > new Date() ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                              {cert.isPermanent ? 'Бессрочно' : new Date(cert.expiryDate!) > new Date() ? 'Действует' : 'Истекло'}
                            </Badge>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsScheduleOpen(true)}>
                  <Icon name="Calendar" size={16} className="mr-2" />
                  График обучения
                </Button>
                <Button variant="outline">
                  <Icon name="Printer" size={16} className="mr-2" />
                  Распечатать удостоверения
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Dialog open={isCertModalOpen} onOpenChange={setIsCertModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Добавление удостоверения</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Вид удостоверения</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите вид" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCertTypes.map(cert => (
                      <SelectItem key={cert.id} value={cert.id.toString()}>
                        {cert.name} - {cert.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Область аттестации</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите область" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCertAreas.map(area => (
                      <SelectItem key={area.id} value={area.id.toString()}>
                        {area.name} - {area.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Номер удостоверения</Label>
              <Input placeholder="256/56" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Дата выдачи</Label>
                <Input type="date" />
              </div>
              <div className="grid gap-2">
                <Label>Срок действия</Label>
                <div className="flex gap-2 items-center">
                  <Input type="date" />
                  <label className="flex items-center gap-2 whitespace-nowrap">
                    <input type="checkbox" />
                    <span className="text-sm">Бессрочно</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Кем выдано</Label>
              <Input placeholder="АНО ДПО" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Удостоверение (файл)</Label>
                <Button variant="outline" size="sm">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить
                </Button>
              </div>
              <div className="grid gap-2">
                <Label>Протокол (файл)</Label>
                <Button variant="outline" size="sm">
                  <Icon name="Upload" size={16} className="mr-2" />
                  Загрузить
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsCertModalOpen(false)}>
              Отмена
            </Button>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsCertModalOpen(false)}>
              Добавить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>График обучения: {selectedEmployee?.fullName}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Вид удостоверения</TableHead>
                  <TableHead>Область</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Срок действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {selectedEmployee && getRequiredCertsForEmployee(selectedEmployee).map(certTypeId => {
                  const cert = getEmployeeCerts(selectedEmployee.id).find(c => c.certTypeId === certTypeId);
                  const certType = mockCertTypes.find(t => t.id === certTypeId);
                  const area = cert ? mockCertAreas.find(a => a.id === cert.areaId) : null;

                  return (
                    <TableRow key={certTypeId}>
                      <TableCell className="font-medium">{certType?.name}</TableCell>
                      <TableCell>{area?.name || '-'}</TableCell>
                      <TableCell>
                        {cert ? (
                          <Badge className="bg-green-100 text-green-700">Есть</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-700">Отсутствует</Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        {cert ? (
                          cert.isPermanent ? 'Бессрочно' : new Date(cert.expiryDate!).toLocaleDateString('ru-RU')
                        ) : (
                          '-'
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
