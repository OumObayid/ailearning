import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { DEBUGGING_MODULE_4_CHAPTERS } from '@/content/courses/debugging/module-4/data';

export const metadata = {
  title: 'Module 4 : Débogage des API et des systèmes Backend • Ingénierie du Débogage',
  description: "Investigation approfondie des architectures API et Backend : diagnostic des statuts HTTP, sécurisation CORS et JWT, requêtes SQL préparées, observabilité Winston et tests Postman.",
};

export default function DebuggingModule4Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 4 — Débogage d'API et Backend"
        description="Menez des investigations approfondies sur les architectures API et backend : diagnostiquez les codes d'état HTTP, les blocages CORS et les défaillances de charge utile. Utilisez Postman et curl pour isoler les pannes réseau, interceptez les flux avec des proxys et sécurisez la communication client-serveur de bout en bout."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Ingénierie du Débogage', href: '/cours/debugging' },
          { label: 'Module 4' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="debugging-module-4" />

          {/* Chapters List */}
          <div className="space-y-4">
            {DEBUGGING_MODULE_4_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/debugging/module-4/${chapter.slug}`}
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
            moduleId="debugging-module-4"
            baseHref="/cours/debugging/module-4"
            theme="lime"
          />
        </aside>
      </div>
    </div>
  );
}

