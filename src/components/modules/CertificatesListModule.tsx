import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { mockCertificates, mockEmployees, mockPositions, mockCertTypes, mockCertAreas } from '@/data/mockData';
import { ExportMenu } from '@/components/ui/export-menu';
import { exportToExcel, exportToPDF, exportToCSV } from '@/utils/exportUtils';

export const CertificatesListModule = () => {
  const [isCertDetailOpen, setIsCertDetailOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState<any>(null);

  const getCertificateDetails = (cert: any) => {
    const employee = mockEmployees.find(e => e.id === cert.employeeId);
    const certType = mockCertTypes.find(t => t.id === cert.certTypeId);
    const area = mockCertAreas.find(a => a.id === cert.areaId);
    const positions = employee?.positions.map(p => mockPositions.find(pos => pos.id === p)?.name).join(', ');

    return { employee, certType, area, positions };
  };

  const handleExportExcel = () => {
    const data = mockCertificates.map(cert => {
      const { employee, certType, area, positions } = getCertificateDetails(cert);
      return {
        'ФИО': employee?.fullName,
        'Компания': employee?.company,
        'Должность': positions,
        'Вид удостоверения': certType?.name,
        'Область аттестации': area?.name || '-',
        'Дата выдачи': new Date(cert.issueDate).toLocaleDateString('ru-RU'),
        'Срок действия': cert.isPermanent ? 'Бессрочно' : new Date(cert.expiryDate!).toLocaleDateString('ru-RU'),
        'Номер': cert.number,
        'Кем выдано': cert.issuer,
      };
    });
    exportToExcel(data, 'Удостоверения', 'Удостоверения');
  };

  const handleExportPDF = () => {
    const columns = [
      { header: 'ФИО', dataKey: 'fullName' },
      { header: 'Компания', dataKey: 'company' },
      { header: 'Вид', dataKey: 'certType' },
      { header: 'Область', dataKey: 'area' },
      { header: 'Номер', dataKey: 'number' },
      { header: 'Срок', dataKey: 'expiry' },
    ];
    const data = mockCertificates.map(cert => {
      const { employee, certType, area } = getCertificateDetails(cert);
      return {
        fullName: employee?.fullName,
        company: employee?.company,
        certType: certType?.name,
        area: area?.name || '-',
        number: cert.number,
        expiry: cert.isPermanent ? 'Бессрочно' : new Date(cert.expiryDate!).toLocaleDateString('ru-RU'),
      };
    });
    exportToPDF(data, columns, 'Удостоверения', 'Список удостоверений');
  };

  const handleExportCSV = () => {
    const data = mockCertificates.map(cert => {
      const { employee, certType, area, positions } = getCertificateDetails(cert);
      return {
        'ФИО': employee?.fullName,
        'Компания': employee?.company,
        'Должность': positions,
        'Вид удостоверения': certType?.name,
        'Область': area?.name || '-',
        'Номер': cert.number,
        'Срок действия': cert.isPermanent ? 'Бессрочно' : new Date(cert.expiryDate!).toLocaleDateString('ru-RU'),
      };
    });
    exportToCSV(data, 'Удостоверения');
  };

  const openCertDetail = (cert: any) => {
    setSelectedCert(cert);
    setIsCertDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск удостоверений..." className="w-80" />
        </div>
        <div className="flex gap-3">
          <ExportMenu 
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
          />
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ФИО</TableHead>
              <TableHead>Компания</TableHead>
              <TableHead>Должность</TableHead>
              <TableHead>Вид удостоверения</TableHead>
              <TableHead>Область аттестации</TableHead>
              <TableHead>Дата выдачи</TableHead>
              <TableHead>Срок действия</TableHead>
              <TableHead>Номер</TableHead>
              <TableHead>Кем выдано</TableHead>
              <TableHead className="text-center">Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockCertificates.map((cert) => {
              const { employee, certType, area, positions } = getCertificateDetails(cert);
              const isExpired = !cert.isPermanent && cert.expiryDate && new Date(cert.expiryDate) < new Date();
              const isExpiringSoon = !cert.isPermanent && cert.expiryDate && 
                new Date(cert.expiryDate) > new Date() && 
                new Date(cert.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);

              return (
                <TableRow key={cert.id} className="cursor-pointer hover:bg-gray-50" onClick={() => openCertDetail(cert)}>
                  <TableCell className="font-medium">{employee?.fullName}</TableCell>
                  <TableCell>{employee?.company}</TableCell>
                  <TableCell>{positions}</TableCell>
                  <TableCell>{certType?.name}</TableCell>
                  <TableCell>{area?.name || '-'}</TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {new Date(cert.issueDate).toLocaleDateString('ru-RU')}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {cert.isPermanent ? 'Бессрочно' : new Date(cert.expiryDate!).toLocaleDateString('ru-RU')}
                  </TableCell>
                  <TableCell>{cert.number}</TableCell>
                  <TableCell>{cert.issuer}</TableCell>
                  <TableCell className="text-center">
                    <Badge className={
                      cert.isPermanent ? 'bg-blue-100 text-blue-700' :
                      isExpired ? 'bg-red-100 text-red-700' :
                      isExpiringSoon ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }>
                      {cert.isPermanent ? 'Бессрочно' : isExpired ? 'Истекло' : isExpiringSoon ? 'Истекает' : 'Действует'}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>

      {selectedCert && (
        <Dialog open={isCertDetailOpen} onOpenChange={setIsCertDetailOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Карточка удостоверения</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Сотрудник</Label>
                  <Select defaultValue={selectedCert.employeeId.toString()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockEmployees.map(emp => (
                        <SelectItem key={emp.id} value={emp.id.toString()}>
                          {emp.fullName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Компания</Label>
                  <Input value={getCertificateDetails(selectedCert).employee?.company} disabled />
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Должность</Label>
                <Input value={getCertificateDetails(selectedCert).positions} disabled />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Вид удостоверения</Label>
                  <Select defaultValue={selectedCert.certTypeId.toString()}>
                    <SelectTrigger>
                      <SelectValue />
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
                  <Select defaultValue={selectedCert.areaId?.toString()}>
                    <SelectTrigger>
                      <SelectValue />
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
                <Input defaultValue={selectedCert.number} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Дата выдачи</Label>
                  <Input type="date" defaultValue={selectedCert.issueDate} />
                </div>
                <div className="grid gap-2">
                  <Label>Срок действия</Label>
                  <div className="flex gap-2 items-center">
                    <Input type="date" defaultValue={selectedCert.expiryDate || ''} disabled={selectedCert.isPermanent} />
                    <label className="flex items-center gap-2 whitespace-nowrap">
                      <input type="checkbox" checked={selectedCert.isPermanent} readOnly />
                      <span className="text-sm">Бессрочно</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <Label>Кем выдано</Label>
                <Input defaultValue={selectedCert.issuer} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Удостоверение (файл)</Label>
                  <div className="border rounded p-4 text-center bg-gray-50">
                    {selectedCert.documentUrl ? (
                      <div className="flex items-center justify-center gap-2">
                        <Icon name="FileText" size={32} className="text-blue-600" />
                        <p className="text-sm">Файл загружен</p>
                      </div>
                    ) : (
                      <div>
                        <Icon name="Upload" size={32} className="text-gray-400 mx-auto mb-2" />
                        <Button variant="outline" size="sm">
                          Загрузить файл
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Протокол (файл)</Label>
                  <div className="border rounded p-4 text-center bg-gray-50">
                    {selectedCert.protocolUrl ? (
                      <div className="flex items-center justify-center gap-2">
                        <Icon name="FileText" size={32} className="text-blue-600" />
                        <p className="text-sm">Файл загружен</p>
                      </div>
                    ) : (
                      <div>
                        <Icon name="Upload" size={32} className="text-gray-400 mx-auto mb-2" />
                        <Button variant="outline" size="sm">
                          Загрузить файл
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsCertDetailOpen(false)}>
                  Закрыть
                </Button>
                <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                  Сохранить изменения
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
