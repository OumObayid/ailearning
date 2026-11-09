import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { DEBUGGING_MODULE_7_CHAPTERS } from '@/content/courses/debugging/module-7/data';

export const metadata = {
  title: 'Module 7 : Projet final : Audit, diagnostic et correction d\'une application complète • Ingénierie du Débogage',
  description: "Projet final d'ingénierie du débogage : audit complet d'une application React, Express, MySQL et IA, analyse des causes racines, remédiation progressive et validation Vitest.",
};

export default function DebuggingModule7Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 7 — Projet Final : Audit et Correctifs"
        description="Projet final de synthèse en ingénierie du débogage : prenez en charge une application full-stack complète (React, Express, MySQL, IA) affectée d'anomalies critiques réelles. Appliquez l'ensemble du protocole d'investigation méthodique, isolez chaque cause racine, corrigez les défaillances et produisez un rapport d'audit d'incident."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Ingénierie du Débogage', href: '/cours/debugging' },
          { label: 'Module 7' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="debugging-module-7" />

          {/* Chapters List */}
          <div className="space-y-4">
            {DEBUGGING_MODULE_7_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/debugging/module-7/${chapter.slug}`}
                duration={chapter.duration}
                description={chapter.description}
                theme="lime"
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-6">
          <CourseSidebar
            moduleId="debugging-module-7"
            baseHref="/cours/debugging/module-7"
            theme="lime"
          />
        </aside>
      </div>
    </div>
  );
}
