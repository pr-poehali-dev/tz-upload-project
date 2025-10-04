import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { DashboardModule } from '@/components/modules/DashboardModule';
import { IncidentsModule } from '@/components/modules/IncidentsModule';
import { TasksModule } from '@/components/modules/TasksModule';
import { CatalogModule } from '@/components/modules/CatalogModule';
import { ChecklistsModule } from '@/components/modules/ChecklistsModule';
import { TenantsModule } from '@/components/modules/TenantsModule';

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState('dashboard');

  const modules = [
    { id: 'dashboard', name: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'tenants', name: 'Тенанты', icon: 'Building2' },
    { id: 'catalog', name: 'Каталог объектов', icon: 'Database' },
    { id: 'incidents', name: 'Инциденты', icon: 'AlertTriangle' },
    { id: 'checklists', name: 'Чек-листы', icon: 'ClipboardCheck' },
    { id: 'certification', name: 'Аттестация', icon: 'Award' },
    { id: 'tasks', name: 'Задачи', icon: 'ListTodo' },
    { id: 'diagnostics', name: 'Диагностика', icon: 'Stethoscope' },
    { id: 'maintenance', name: 'Ремонты', icon: 'Wrench' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-[#0F172A] text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Индекс Безопасности</h1>
          <p className="text-sm text-gray-400 mt-1">STP Platform v1.0</p>
        </div>
        
        <nav className="flex-1 px-3">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                activeModule === module.id
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Icon name={module.icon as any} size={20} />
              <span className="text-sm font-medium">{module.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center">
              <Icon name="User" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium">Администратор</p>
              <p className="text-xs text-gray-400">admin@stp.ru</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {modules.find(m => m.id === activeModule)?.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Управление промышленной безопасностью
              </p>
            </div>
            <Button className="bg-[#3B82F6] hover:bg-[#2563EB]">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
          </div>
        </header>

        <div className="p-8">
          {activeModule === 'dashboard' && <DashboardModule />}
          {activeModule === 'tenants' && <TenantsModule />}
          {activeModule === 'incidents' && <IncidentsModule />}
          {activeModule === 'tasks' && <TasksModule />}
          {activeModule === 'catalog' && <CatalogModule />}
          {activeModule === 'checklists' && <ChecklistsModule />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;