import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { PROMPT_ENGINEERING_MODULE_3_CHAPTERS } from '@/content/courses/prompt-engineering-ide/module-3/data';

export const metadata = {
  title: 'Module 3 : Techniques avancées de Prompt Engineering • Prompt Engineering IDE',
  description: "Maîtriser les 11 techniques avancées de Prompt Engineering et concevoir un agent IA d'élite sous Google Antigravity.",
};

export default function PromptEngineeringModule3Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 3 — Techniques Cognitives Avancées"
        description="Maîtrisez l'arsenal complet des 11 techniques cognitives fondamentales de l'ingénierie de prompt : Zero-shot, Few-shot, Chain-of-Thought et décomposition modulaire. Apprenez à combiner ces stratégies pour résoudre des problèmes algorithmiques complexes et réduire drastiquement le taux d'erreurs logicielles générées par l'IA."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Prompt Engineering IDE', href: '/cours/prompt-engineering-ide' },
          { label: 'Module 3' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="prompt-engineering-module-3" />

          {/* Chapters List */}
          <div className="space-y-4">
            {PROMPT_ENGINEERING_MODULE_3_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/prompt-engineering-ide/module-3/${chapter.slug}`}
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
            moduleId="prompt-engineering-module-3"
            baseHref="/cours/prompt-engineering-ide/module-3"
          />
        </aside>
      </div>
    </div>
  );
}

