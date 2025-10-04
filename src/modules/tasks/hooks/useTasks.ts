import { useState, useMemo } from 'react';
import { Task, TaskFilters, TaskStatus } from '../types/task.types';
import { mockTasks } from '../utils/task.utils';

export const useTasks = () => {
  const [tasks] = useState<Task[]>(mockTasks);
  const [filters, setFilters] = useState<TaskFilters>({
    search: '',
    status: 'all',
    priority: 'all',
  });

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase());
      const matchesStatus = filters.status === 'all' || task.status === filters.status;
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, filters]);

  const tasksByStatus = (status: TaskStatus) => {
    return filteredTasks.filter(t => t.status === status);
  };

  return {
    tasks: filteredTasks,
    filters,
    setFilters,
    tasksByStatus,
  };
};
