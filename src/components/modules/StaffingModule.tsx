import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Icon from '@/components/ui/icon';
import { mockPositions, mockCertTypes } from '@/data/mockData';
import { ExportMenu } from '@/components/ui/export-menu';
import { exportToExcel, exportToPDF, exportToCSV } from '@/utils/exportUtils';

export const StaffingModule = () => {
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);

  const handleExportExcel = () => {
    const data = mockPositions.map(position => ({
      'Должность': position.name,
      'Компания': position.company,
      'Кол-во человек': position.quantity,
      'Требуемые удостоверения': position.requiredCerts
        .map(id => mockCertTypes.find(t => t.id === id)?.name)
        .join(', '),
    }));
    exportToExcel(data, 'Штатное расписание', 'Штатное расписание');
  };

  const handleExportPDF = () => {
    const columns = [
      { header: 'Должность', dataKey: 'name' },
      { header: 'Компания', dataKey: 'company' },
      { header: 'Кол-во', dataKey: 'quantity' },
      { header: 'Требуемые удостоверения', dataKey: 'certs' },
    ];
    const data = mockPositions.map(position => ({
      ...position,
      certs: position.requiredCerts
        .map(id => mockCertTypes.find(t => t.id === id)?.name)
        .join(', '),
    }));
    exportToPDF(data, columns, 'Штатное расписание', 'Штатное расписание');
  };

  const handleExportCSV = () => {
    const data = mockPositions.map(position => ({
      'Должность': position.name,
      'Компания': position.company,
      'Кол-во человек': position.quantity,
      'Требуемые удостоверения': position.requiredCerts
        .map(id => mockCertTypes.find(t => t.id === id)?.name)
        .join(', '),
    }));
    exportToCSV(data, 'Штатное расписание');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Input placeholder="Поиск должностей..." className="w-80" />
        </div>
        <div className="flex gap-3">
          <ExportMenu 
            onExportExcel={handleExportExcel}
            onExportPDF={handleExportPDF}
            onExportCSV={handleExportCSV}
          />
          <Dialog open={isPositionModalOpen} onOpenChange={setIsPositionModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
                <Icon name="Plus" size={16} className="mr-2" />
                Добавить должность
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Добавление должности</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="position-name">Название должности</Label>
                  <Input id="position-name" placeholder="Директор" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="company">Компания</Label>
                    <Input id="company" placeholder="ООО Ромашка" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Количество человек</Label>
                    <Input id="quantity" type="number" placeholder="1" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Требуемые удостоверения</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {mockCertTypes.map(cert => (
                      <label key={cert.id} className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4" />
                        <span className="text-sm">{cert.name} - {cert.description}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsPositionModalOpen(false)}>
                  Отмена
                </Button>
                <Button className="bg-[#3B82F6] hover:bg-[#2563EB]" onClick={() => setIsPositionModalOpen(false)}>
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
              <TableHead>Должность</TableHead>
              <TableHead>Компания</TableHead>
              <TableHead>Кол-во чел.</TableHead>
              {mockCertTypes.map(cert => (
                <TableHead key={cert.id} className="text-center">{cert.name}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockPositions.map((position) => (
              <TableRow key={position.id}>
                <TableCell className="font-medium">{position.name}</TableCell>
                <TableCell>{position.company}</TableCell>
                <TableCell className="text-center">{position.quantity}</TableCell>
                {mockCertTypes.map(cert => (
                  <TableCell key={cert.id} className="text-center">
                    {position.requiredCerts.includes(cert.id) && (
                      <Icon name="Check" size={20} className="text-green-600 mx-auto" />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
