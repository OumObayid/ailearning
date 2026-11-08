import React from 'react';
import Chapitre1 from './chapitre-1.mdx';
import Chapitre2 from './chapitre-2.mdx';
import Chapitre3 from './chapitre-3.mdx';
import Chapitre4 from './chapitre-4.mdx';
import Chapitre5 from './chapitre-5.mdx';
import Chapitre6 from './chapitre-6.mdx';
import Chapitre7 from './chapitre-7.mdx';
import Chapitre8 from './chapitre-8.mdx';
import Chapitre9 from './chapitre-9.mdx';
import Chapitre10 from './chapitre-10.mdx';
import Chapitre11 from './chapitre-11.mdx';
import Chapitre12 from './chapitre-12.mdx';
import Chapitre13 from './chapitre-13.mdx';
import Chapitre14 from './chapitre-14.mdx';
import Chapitre15 from './chapitre-15.mdx';
import ProjetSynthese from './projet-synthese.mdx';
import Evaluation from './evaluation.mdx';

export const VALID_MODULE_7_SLUGS = [
  'chapitre-1',
  'chapitre-2',
  'chapitre-3',
  'chapitre-4',
  'chapitre-5',
  'chapitre-6',
  'chapitre-7',
  'chapitre-8',
  'chapitre-9',
  'chapitre-10',
  'chapitre-11',
  'chapitre-12',
  'chapitre-13',
  'chapitre-14',
  'chapitre-15',
  'projet-synthese',
  'evaluation',
] as const;

export type Module7Slug = (typeof VALID_MODULE_7_SLUGS)[number];

export function hasModule7Lesson(slug: string): slug is Module7Slug {
  return VALID_MODULE_7_SLUGS.includes(slug as Module7Slug);
}

export function Module7LessonRenderer({ slug }: { slug: string }) {
  switch (slug) {
    case 'chapitre-1':
      return <Chapitre1 />;
    case 'chapitre-2':
      return <Chapitre2 />;
    case 'chapitre-3':
      return <Chapitre3 />;
    case 'chapitre-4':
      return <Chapitre4 />;
    case 'chapitre-5':
      return <Chapitre5 />;
    case 'chapitre-6':
      return <Chapitre6 />;
    case 'chapitre-7':
      return <Chapitre7 />;
    case 'chapitre-8':
      return <Chapitre8 />;
    case 'chapitre-9':
      return <Chapitre9 />;
    case 'chapitre-10':
      return <Chapitre10 />;
    case 'chapitre-11':
      return <Chapitre11 />;
    case 'chapitre-12':
      return <Chapitre12 />;
    case 'chapitre-13':
      return <Chapitre13 />;
    case 'chapitre-14':
      return <Chapitre14 />;
    case 'chapitre-15':
      return <Chapitre15 />;
    case 'projet-synthese':
      return <ProjetSynthese />;
    case 'evaluation':
      return <Evaluation />;
    default:
      return null;
  }
}

