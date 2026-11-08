import React from 'react';
import { CourseModule } from '@/types/course';
import { ModuleCard } from './ModuleCard';

interface ModuleGridProps {
  modules: CourseModule[];
  className?: string;
}

export const ModuleGrid: React.FC<ModuleGridProps> = ({ modules, className = '' }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${className}`}>
      {modules.map((module) => (
        <ModuleCard key={module.id} module={module} />
      ))}
    </div>
  );
};

