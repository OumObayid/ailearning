import React from 'react';

interface ArchitectureDiagramProps {
  title?: string;
  diagram: string;
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({
  title,
  diagram,
}) => {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-slate-300 bg-slate-900 text-slate-100 shadow-md">
      {title && (
        <div className="border-b border-slate-800 bg-slate-950/80 px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-slate-300">
          {title}
        </div>
      )}
      <div className="overflow-x-auto p-5 font-mono text-sm sm:text-base leading-snug whitespace-pre text-indigo-200">
        {diagram}
      </div>
    </div>
  );
};

