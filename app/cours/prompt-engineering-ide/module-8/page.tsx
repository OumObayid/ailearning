import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { PROMPT_ENGINEERING_MODULE_8_CHAPTERS } from '@/content/courses/prompt-engineering-ide/module-8/data';

export const metadata = {
  title: 'Module 8 : Projet final professionnel • Prompt Engineering IDE',
  description: "Concevoir un système d'agents IA complet pilotant un projet de développement React + Node.js : coordinateur, développeur, sécurité, testeur et documentaliste sous Google Antigravity.",
};

export default function PromptEngineeringModule8Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 8 — Projet Final : Escouade Multi-Agents"
        description="Projet de synthèse de la formation : concevez, configurez et pilotez une escouade complète de 5 agents IA spécialisés sur une architecture applicative moderne. De la planification initiale à la recette finale avec tests automatisés, vivez l'expérience d'un développement d'envergure mené de concert avec une équipe autonome d'IA."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Prompt Engineering IDE', href: '/cours/prompt-engineering-ide' },
          { label: 'Module 8' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="prompt-engineering-module-8" />

          {/* Chapters List */}
          <div className="space-y-4">
            {PROMPT_ENGINEERING_MODULE_8_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/prompt-engineering-ide/module-8/${chapter.slug}`}
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
            moduleId="prompt-engineering-module-8"
            activeSlug=""
            baseHref="/cours/prompt-engineering-ide/module-8"
          />
        </div>
      </div>
    </div>
  );
}

