import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { PROMPT_ENGINEERING_MODULE_5_CHAPTERS } from '@/content/courses/prompt-engineering-ide/module-5/data';

export const metadata = {
  title: "Module 5 : Création d'agents spécialisés • Prompt Engineering IDE",
  description: "Concevoir, configurer et orchestrer une équipe d'agents IA spécialisés (Architecte, Développeur, Auditeur, Sécurité, Testeur, Documentaliste) sous Google Antigravity.",
};

export default function PromptEngineeringModule5Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 5 — Création d'Agents Spécialisés"
        description="Apprenez à concevoir et orchestrer une véritable équipe d'agents IA spécialisés aux responsabilités parfaitement délimitées dans votre environnement de développement. Répartissez les missions entre Architecte, Développeur, Testeur et Réviseur de code afin de maximiser la qualité logicielle sur des projets de grande envergure."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Prompt Engineering IDE', href: '/cours/prompt-engineering-ide' },
          { label: 'Module 5' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="prompt-engineering-module-5" />

          {/* Chapters List */}
          <div className="space-y-4">
            {PROMPT_ENGINEERING_MODULE_5_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/prompt-engineering-ide/module-5/${chapter.slug}`}
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
            moduleId="prompt-engineering-module-5"
            baseHref="/cours/prompt-engineering-ide/module-5"
          />
        </aside>
      </div>
    </div>
  );
}

