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
const Chapitre11Content = dynamic(() => import('./Chapitre11Content').then((mod) => mod.Chapitre11Content), { ssr: true });
const Chapitre12Content = dynamic(() => import('./Chapitre12Content').then((mod) => mod.Chapitre12Content), { ssr: true });
const Chapitre13Content = dynamic(() => import('./Chapitre13Content').then((mod) => mod.Chapitre13Content), { ssr: true });
const Chapitre14Content = dynamic(() => import('./Chapitre14Content').then((mod) => mod.Chapitre14Content), { ssr: true });
const Chapitre15Content = dynamic(() => import('./Chapitre15Content').then((mod) => mod.Chapitre15Content), { ssr: true });
const Chapitre16Content = dynamic(() => import('./Chapitre16Content').then((mod) => mod.Chapitre16Content), { ssr: true });
const Chapitre17Content = dynamic(() => import('./Chapitre17Content').then((mod) => mod.Chapitre17Content), { ssr: true });
const Chapitre18Content = dynamic(() => import('./Chapitre18Content').then((mod) => mod.Chapitre18Content), { ssr: true });
const Chapitre19Content = dynamic(() => import('./Chapitre19Content').then((mod) => mod.Chapitre19Content), { ssr: true });

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
