import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { BACKEND_IA_MODULE_7_CHAPTERS } from '@/content/courses/backend-ia/module-7/data';

export const metadata = {
  title: 'Module 7 : Projet Final — Backend IA Optimisé & Application d’Analyse Intelligente • Parcours Backend IA',
  description: 'Projet final capstone complet : React avec Vite, Node.js avec Express, Google Gemini, MySQL, Redis et Worker Threads.',
};

export default function BackendIaModule7Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 7 — Projet Final : Backend IA Optimisé"
        description="L'apogée de votre parcours Backend IA : concevez et déployez pas-à-pas une application d'analyse intelligente optimisée pour la haute charge. Connectez harmonieusement un backend Express non bloquant, des Worker Threads, l'API Google Gemini, une base MySQL, un cache Redis distribué et un frontend réactif en streaming."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Backend IA', href: '/cours/backend-ia' },
          { label: 'Module 7' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="backend-ia-module-7" />

          {/* Chapters List */}
          <div className="space-y-4">
            {BACKEND_IA_MODULE_7_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/backend-ia/module-7/${chapter.slug}`}
                duration={chapter.duration}
                description={chapter.description}
                theme="amber"
              />
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6 lg:sticky lg:top-20">
          <CourseSidebar
            moduleId="backend-ia-module-7"
            baseHref="/cours/backend-ia/module-7"
          />
        </div>
      </div>
    </div>
  );
}

