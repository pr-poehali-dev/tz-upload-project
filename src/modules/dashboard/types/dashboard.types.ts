export interface DashboardStats {
  totalIncidents: number;
  activeTasks: number;
  overdue: number;
  totalObjects: number;
}

export interface RecentActivity {
  id: number;
  title: string;
  type: 'incident' | 'task' | 'inspection' | 'maintenance';
  priority: string;
  object: string;
  responsible: string;
  status: string;
}
