import React from 'react';
import { CourseModule } from '@/types/course';
import { ModuleGrid } from './ModuleGrid';

interface ModuleListProps {
  modules: CourseModule[];
}

export const ModuleList: React.FC<ModuleListProps> = ({ modules }) => {
  return <ModuleGrid modules={modules} />;
};
