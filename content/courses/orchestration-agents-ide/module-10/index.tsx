'use client';

import React from 'react';
export * from './data';

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
import { Chapitre11Content } from './Chapitre11Content';
import { Chapitre12Content } from './Chapitre12Content';
import { Chapitre13Content } from './Chapitre13Content';
import { Chapitre14Content } from './Chapitre14Content';
import { Chapitre15Content } from './Chapitre15Content';
import { Chapitre16Content } from './Chapitre16Content';
import { Chapitre17Content } from './Chapitre17Content';
import { Chapitre18Content } from './Chapitre18Content';
import { Chapitre19Content } from './Chapitre19Content';

export const OrchestrationModule10Renderer: React.FC<{ slug: string }> = ({ slug }) => {
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
    case 'chapitre-10':
      return <Chapitre10Content />;
    case 'chapitre-11':
      return <Chapitre11Content />;
    case 'chapitre-12':
      return <Chapitre12Content />;
    case 'chapitre-13':
      return <Chapitre13Content />;
    case 'chapitre-14':
      return <Chapitre14Content />;
    case 'chapitre-15':
      return <Chapitre15Content />;
    case 'chapitre-16':
      return <Chapitre16Content />;
    case 'chapitre-17':
      return <Chapitre17Content />;
    case 'chapitre-18':
      return <Chapitre18Content />;
    case 'chapitre-19':
      return <Chapitre19Content />;
    default:
      return (
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-6 sm:p-8">
            <span className="inline-flex items-center rounded-lg bg-indigo-600 px-3 py-1 text-xs font-black text-white uppercase tracking-wider mb-3">
              Module 10 • Projet TaskFlow
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-indigo-950 mb-3">
              Chapitre non trouvé : {slug}
            </h2>
            <p className="text-base text-slate-700 leading-relaxed font-medium">
              Veuillez sélectionner un chapitre valide du Module 10 (chapitre 1 à 19).
            </p>
          </div>
        </div>
      );
  }
};
