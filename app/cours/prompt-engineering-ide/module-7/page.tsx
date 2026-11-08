import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { PROMPT_ENGINEERING_MODULE_7_CHAPTERS } from '@/content/courses/prompt-engineering-ide/module-7/data';

export const metadata = {
  title: 'Module 7 : Pilotage et optimisation des agents • Prompt Engineering IDE',
  description: "Améliorer la fiabilité des agents IA et corriger leurs comportements : diagnostic d'erreurs, débogage de prompt, réduction des ambiguïtés, détection des hallucinations, critères d'évaluation et conformité.",
};

export default function PromptEngineeringModule7Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 7 — Pilotage et Optimisation d'Agents"
        description="Développez une démarche méthodique pour évaluer la qualité et la fiabilité des agents IA : mettez en œuvre des protocoles de débogage de prompts et de mémoires de contexte. Corrigez les dérives comportementales, réduisez la répétition d'erreurs et affinez progressivement les consignes pour une assistance technique optimale."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Prompt Engineering IDE', href: '/cours/prompt-engineering-ide' },
          { label: 'Module 7' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="prompt-engineering-module-7" />

          {/* Chapters List */}
          <div className="space-y-4">
            {PROMPT_ENGINEERING_MODULE_7_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/prompt-engineering-ide/module-7/${chapter.slug}`}
                duration={chapter.duration}
                description={chapter.description}
                theme="purple"
              />
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6 lg:sticky lg:top-20">
          <CourseSidebar
            moduleId="prompt-engineering-module-7"
            activeSlug=""
            baseHref="/cours/prompt-engineering-ide/module-7"
          />
        </div>
      </div>
    </div>
  );
}

