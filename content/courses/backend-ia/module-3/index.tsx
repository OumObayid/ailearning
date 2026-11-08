'use client';

import React from 'react';
import { Chapitre1Content } from './Chapitre1Content';
import { Chapitre2Content } from './Chapitre2Content';
import { Chapitre3Content } from './Chapitre3Content';
import { Chapitre4Content } from './Chapitre4Content';
import { Chapitre5Content } from './Chapitre5Content';

export * from './data';

export const BackendIaModule3Renderer: React.FC<{ slug: string }> = ({ slug }) => {
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
    default:
      return (
        <div className="rounded-2xl border-2 border-slate-300 bg-white p-8 text-center">
          <p className="text-lg font-bold text-slate-900">Chapitre non trouvé.</p>
        </div>
      );
  }
};

