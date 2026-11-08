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

export * from './data';
export {
  Chapitre1Content,
  Chapitre2Content,
  Chapitre3Content,
  Chapitre4Content,
  Chapitre5Content,
  Chapitre6Content,
  Chapitre7Content,
  Chapitre8Content,
  Chapitre9Content
};

export const BackendIaModule7Renderer: React.FC<{ slug: string }> = ({ slug }) => {
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
    default:
      return (
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-8 text-center space-y-3">
          <p className="text-xl font-black text-slate-950">Chapitre introuvable</p>
          <p className="text-sm text-slate-700">
            Le chapitre demandé n&apos;est pas disponible dans ce module.
          </p>
        </div>
      );
  }
};
