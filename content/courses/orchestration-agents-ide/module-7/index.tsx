'use client';

import React from 'react';
import dynamic from 'next/dynamic';

export * from './data';

const Chapitre1Content = dynamic(() => import('./Chapitre1Content').then((mod) => mod.Chapitre1Content), { ssr: true });
const Chapitre2Content = dynamic(() => import('./Chapitre2Content').then((mod) => mod.Chapitre2Content), { ssr: true });
const Chapitre3Content = dynamic(() => import('./Chapitre3Content').then((mod) => mod.Chapitre3Content), { ssr: true });
const Chapitre4Content = dynamic(() => import('./Chapitre4Content').then((mod) => mod.Chapitre4Content), { ssr: true });
const Chapitre5Content = dynamic(() => import('./Chapitre5Content').then((mod) => mod.Chapitre5Content), { ssr: true });
const Chapitre6Content = dynamic(() => import('./Chapitre6Content').then((mod) => mod.Chapitre6Content), { ssr: true });
const Chapitre7Content = dynamic(() => import('./Chapitre7Content').then((mod) => mod.Chapitre7Content), { ssr: true });
const Chapitre8Content = dynamic(() => import('./Chapitre8Content').then((mod) => mod.Chapitre8Content), { ssr: true });
const Chapitre9Content = dynamic(() => import('./Chapitre9Content').then((mod) => mod.Chapitre9Content), { ssr: true });
const Chapitre10Content = dynamic(() => import('./Chapitre10Content').then((mod) => mod.Chapitre10Content), { ssr: true });

export const OrchestrationModule7Renderer: React.FC<{ slug: string }> = ({ slug }) => {
  switch (slug.toLowerCase()) {
    case 'chapitre-1':
      return <Chapitre1Content />;
    case 'chapitre-2':
      return <Chapitre2Content />;
    case 'chapitre-3':
      return <Chapitre3Content />;
    case 'chapitre-4':
      return <Chapitre4Content />;
    case 'chapitre-5':
      return <Chapitre5Content />;
    case 'chapitre-6':
      return <Chapitre6Content />;
    case 'chapitre-7':
      return <Chapitre7Content />;
    case 'chapitre-8':
      return <Chapitre8Content />;
    case 'chapitre-9':
      return <Chapitre9Content />;
    case 'tp':
    case 'chapitre-10':
      return <Chapitre10Content />;
    default:
      return (
        <div className="rounded-2xl border-2 border-slate-300 bg-white dark:bg-slate-900 p-8 text-center">
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">Chapitre non trouvé.</p>
        </div>
      );
  }
};
