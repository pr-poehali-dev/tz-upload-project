import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StaffingModule } from './StaffingModule';
import { EmployeesModule } from './EmployeesModule';
import { CertificatesListModule } from './CertificatesListModule';
import { TrainingScheduleModule } from './TrainingScheduleModule';

export const CertificationSystemModule = () => {
  return (
    <Tabs defaultValue="employees" className="space-y-6">
      <TabsList className="grid w-full grid-cols-4 lg:w-auto">
        <TabsTrigger value="employees">Сотрудники</TabsTrigger>
        <TabsTrigger value="certificates">Удостоверения</TabsTrigger>
        <TabsTrigger value="staffing">Штатное расписание</TabsTrigger>
        <TabsTrigger value="training">График обучения</TabsTrigger>
      </TabsList>

      <TabsContent value="employees" className="space-y-4">
        <EmployeesModule />
      </TabsContent>

      <TabsContent value="certificates" className="space-y-4">
        <CertificatesListModule />
      </TabsContent>

      <TabsContent value="staffing" className="space-y-4">
        <StaffingModule />
      </TabsContent>

      <TabsContent value="training" className="space-y-4">
        <TrainingScheduleModule />
      </TabsContent>
    </Tabs>
  );
};
