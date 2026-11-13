import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ORCHESTRATION_MODULE_3_CHAPTERS } from '@/content/courses/orchestration-agents-ide/module-3/data';

export const metadata = {
  title: "Module 3 : Maîtriser Git pour le travail avec plusieurs agents • Orchestration Agents IDE",
  description: "Structurez vos dépôts, branches et commits pour tracer, isoler et contrôler rigoureusement le code écrit par les agents.",
};

export default function OrchestrationModule3Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 3 — Maîtriser Git pour le travail avec plusieurs agents"
        description="Structurez vos dépôts, branches et commits pour tracer, isoler et contrôler rigoureusement le code écrit par les agents."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: "Orchestration d'agents IA", href: '/cours/orchestration-agents-ide' },
          { label: 'Module 3' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start min-w-0 max-w-full">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-4 min-w-0 max-w-full">
          {ORCHESTRATION_MODULE_3_CHAPTERS.map((chapter) => (
            <ChapterCard
              key={chapter.slug}
              number={chapter.number}
              title={chapter.title}
              href={`/cours/orchestration-agents-ide/module-3/${chapter.slug}`}
              duration={chapter.duration}
              description={chapter.description}
              theme="indigo"
            />
          ))}
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-6 min-w-0 max-w-full">
          <CourseSidebar
            moduleId="orchestration-agents-module-3"
            baseHref="/cours/orchestration-agents-ide/module-3"
            theme="indigo"
          />
        </aside>
      </div>
    </div>
  );
}
