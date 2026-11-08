import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { BACKEND_IA_MODULE_5_CHAPTERS } from '@/content/courses/backend-ia/module-5/data';

export const metadata = {
  title: 'Module 5 : Cache, Redis, Optimisation et Rate Limiting pour l’IA • Parcours Backend IA',
  description: 'Maîtriser Redis en mémoire, la stratégie Cache-Aside, l’expiration TTL, le hachage SHA-256 des inférences Gemini et le Rate Limiting distribué avec script Lua (HTTP 429).',
};

export default function BackendIaModule5Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 5 — Cache Redis et Rate Limiting"
        description="Passez à l'échelle supérieure en exploitant la puissance du stockage en mémoire vive avec Redis : implémentez le pattern Cache-Aside pour stocker les inférences IA fréquentes. Générez des clés de hachage cryptographiques SHA-256 déterministes et protégez vos quotas d'API grâce à un Rate Limiter distribué en script Lua."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Backend IA', href: '/cours/backend-ia' },
          { label: 'Module 5' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="backend-ia-module-5" />

          {/* Chapters List */}
          <div className="space-y-4">
            {BACKEND_IA_MODULE_5_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/backend-ia/module-5/${chapter.slug}`}
                duration={chapter.duration}
                description={chapter.description}
                theme="amber"
              />
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6 lg:sticky lg:top-20">
          <CourseSidebar
            moduleId="backend-ia-module-5"
            baseHref="/cours/backend-ia/module-5"
          />
        </div>
      </div>
    </div>
  );
}

