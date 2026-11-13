'use client';

import React from 'react';
import { Chapitre1Content } from './Chapitre1Content';
import { Chapitre2Content } from './Chapitre2Content';
import { Chapitre3Content } from './Chapitre3Content';
import { Chapitre4Content } from './Chapitre4Content';
import { Chapitre5Content } from './Chapitre5Content';
import { Chapitre6Content } from './Chapitre6Content';
import { Chapitre7Content } from './Chapitre7Content';
import { Chapitre8Content } from './Chapitre8Content';
import { Chapitre9Content } from './Chapitre9Content';
import { Chapitre10Content } from './Chapitre10Content';

export * from './data';

export const OrchestrationModule8Renderer: React.FC<{ slug: string }> = ({ slug }) => {
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
