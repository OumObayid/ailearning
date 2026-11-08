import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { PROMPT_ENGINEERING_MODULE_2_CHAPTERS } from '@/content/courses/prompt-engineering-ide/module-2/data';

export const metadata = {
  title: 'Module 2 : Architecture des instructions principales • Prompt Engineering IDE',
  description: "Apprendre à construire un fichier d'instructions qui définit durablement le comportement d'un agent IA dans Google Antigravity.",
};

export default function PromptEngineeringModule2Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 2 — Instructions Permanentes (Rules)"
        description="Maîtrisez la conception d'un fichier d'instructions permanent (Rules / AGENTS.md) pour encadrer durablement le comportement de votre agent dans l'IDE. Délimitez ses prérogatives techniques, interdisez les modifications destructives de code et bâtissez un cadre de travail sécurisé sur un projet fil rouge d'analyste documentaire."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Prompt Engineering IDE', href: '/cours/prompt-engineering-ide' },
          { label: 'Module 2' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="prompt-engineering-module-2" />

          {/* Chapters List */}
          <div className="space-y-4">
            {PROMPT_ENGINEERING_MODULE_2_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/prompt-engineering-ide/module-2/${chapter.slug}`}
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
            moduleId="prompt-engineering-module-2"
            baseHref="/cours/prompt-engineering-ide/module-2"
          />
        </aside>
      </div>
    </div>
  );
}

