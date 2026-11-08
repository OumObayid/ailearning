import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { PROMPT_ENGINEERING_MODULE_6_CHAPTERS } from '@/content/courses/prompt-engineering-ide/module-6/data';

export const metadata = {
  title: "Module 6 : Sécurité et gouvernance des agents • Prompt Engineering IDE",
  description: "Empêcher les agents IA d'effectuer des actions non autorisées : moindre privilège, périmètre de projet, protection .env, anti-prompt injection et validation humaine.",
};

export default function PromptEngineeringModule6Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 6 — Sécurité et Gouvernance des Agents"
        description="Maîtrisez l'ensemble des règles de gouvernance et de sécurité indispensables pour opérer avec des agents de développement autonomes en entreprise. Appliquez le principe du moindre privilège, neutralisez les tentatives d'injection indirecte de prompt et préservez l'intégrité de vos fichiers sensibles et de vos dépôts Git."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Prompt Engineering IDE', href: '/cours/prompt-engineering-ide' },
          { label: 'Module 6' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="prompt-engineering-module-6" />

          {/* Chapters List */}
          <div className="space-y-4">
            {PROMPT_ENGINEERING_MODULE_6_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/prompt-engineering-ide/module-6/${chapter.slug}`}
                duration={chapter.duration}
                description={chapter.description}
                theme="purple"
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-6">
          <CourseSidebar
            moduleId="prompt-engineering-module-6"
            baseHref="/cours/prompt-engineering-ide/module-6"
          />
        </aside>
      </div>
    </div>
  );
}

