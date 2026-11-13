import React from 'react';
import Link from 'next/link';
import { CourseModule } from '@/types/course';
import { Icon } from '@/components/common/Icon';

interface ModuleCardProps {
  module: CourseModule;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border-2 border-indigo-200 bg-indigo-50/80 p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-400 hover:shadow-md cursor-pointer">
      <div className="space-y-4">
        {/* Header with Icon & Module Number */}
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-800 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
            <Icon name={module.iconName || 'sparkles'} className="h-6 w-6" />
          </div>
          <span className="inline-flex items-center rounded-lg bg-white border border-indigo-200 px-3 py-1 text-sm font-black text-indigo-950 shadow-xs">
            Module {module.order}
          </span>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-lg sm:text-xl font-black text-slate-950 group-hover:text-indigo-700 transition-colors line-clamp-2">
            <Link href={`/cours/ai-engineering/${module.id}`} className="focus:outline-none cursor-pointer">
              <span className="absolute inset-0" aria-hidden="true" />
              {module.title}
            </Link>
          </h3>
          <p className="mt-2.5 text-base text-slate-800 font-semibold leading-relaxed line-clamp-3">
            {module.description}
          </p>
        </div>
      </div>

      {/* Footer link */}
      <div className="mt-6 pt-4 border-t border-indigo-200 flex items-center justify-between text-base font-extrabold text-indigo-700">
        <span className="flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
          Accéder
          <Icon name="arrow-right" className="w-5 h-5" />
        </span>
        <span className="text-sm text-slate-700 font-bold">
          ID: {module.id}
        </span>
      </div>
    </div>
  );
};
