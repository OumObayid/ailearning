import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { PROMPT_ENGINEERING_MODULE_1_CHAPTERS } from '@/content/courses/prompt-engineering-ide/module-1/data';

export const metadata = {
  title: 'Module 1 : Fondamentaux avancés du Prompt Engineering • Prompt Engineering IDE',
  description: "Maîtriser la conception de prompts professionnels capables de guider un agent IA avec précision, sans ambiguïté et avec des résultats vérifiables.",
};

export default function PromptEngineeringModule1Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 1 — Fondamentaux du Prompting"
        description="Maîtrisez la conception de prompts professionnels capables de guider un agent IA avec une précision absolue, sans ambiguïté et avec des résultats reproductibles. Comprenez la tokenisation, le rôle des métadonnées contextuelles et structurez vos directives pour obtenir un code directement exploitable dans votre IDE."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Prompt Engineering IDE', href: '/cours/prompt-engineering-ide' },
          { label: 'Module 1' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="prompt-engineering-module-1" />

          {/* Chapters List */}
          <div className="space-y-4">
            {PROMPT_ENGINEERING_MODULE_1_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/prompt-engineering-ide/module-1/${chapter.slug}`}
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
            moduleId="prompt-engineering-module-1"
            baseHref="/cours/prompt-engineering-ide/module-1"
          />
        </aside>
      </div>
    </div>
  );
}
