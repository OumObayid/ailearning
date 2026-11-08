import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { PROMPT_ENGINEERING_MODULE_4_CHAPTERS } from '@/content/courses/prompt-engineering-ide/module-4/data';

export const metadata = {
  title: 'Module 4 : Fonctionnement des agents IA dans Google Antigravity • Prompt Engineering IDE',
  description: "Comprendre comment un agent IA passe d'une instruction à une action concrète dans un IDE : contexte, planification, outils, fichiers, terminal, validation et autorisations.",
};

export default function PromptEngineeringModule4Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 4 — Agents IA dans Google Antigravity"
        description="Comprenez en profondeur le cycle de fonctionnement autonome d'un agent de développement : distinguez un simple modèle de chat d'un agent doué d'action outillée. Analysez la boucle Perception-Décision-Action, l'utilisation sécurisée du terminal de commande et le protocole de vérification continue des modifications apportées."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Prompt Engineering IDE', href: '/cours/prompt-engineering-ide' },
          { label: 'Module 4' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="prompt-engineering-module-4" />

          {/* Chapters List */}
          <div className="space-y-4">
            {PROMPT_ENGINEERING_MODULE_4_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/prompt-engineering-ide/module-4/${chapter.slug}`}
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
            moduleId="prompt-engineering-module-4"
            baseHref="/cours/prompt-engineering-ide/module-4"
          />
        </aside>
      </div>
    </div>
  );
}

