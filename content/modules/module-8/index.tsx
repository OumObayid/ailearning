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

export const VALID_MODULE_8_SLUGS = [
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

export type Module8Slug = typeof VALID_MODULE_8_SLUGS[number];

export function hasModule8Lesson(slug: string): slug is Module8Slug {
  return (VALID_MODULE_8_SLUGS as readonly string[]).includes(slug);
}

const MODULE_8_COMPONENTS: Record<Module8Slug, React.ComponentType> = {
  'chapitre-1': Chapitre1,
  'chapitre-2': Chapitre2,
  'chapitre-3': Chapitre3,
  'chapitre-4': Chapitre4,
  'chapitre-5': Chapitre5,
  'chapitre-6': Chapitre6,
  'chapitre-7': Chapitre7,
  'chapitre-8': Chapitre8,
  'chapitre-9': Chapitre9,
  'chapitre-10': Chapitre10,
  'chapitre-11': Chapitre11,
  'chapitre-12': Chapitre12,
  'chapitre-13': Chapitre13,
  'chapitre-14': Chapitre14,
  'chapitre-15': Chapitre15,
  'projet-synthese': ProjetSynthese,
  'evaluation': Evaluation,
};

interface Module8LessonRendererProps {
  slug: string;
}

export function Module8LessonRenderer({ slug }: Module8LessonRendererProps) {
  if (!hasModule8Lesson(slug)) {
    return null;
  }
  const Component = MODULE_8_COMPONENTS[slug];
  return <Component />;
}

