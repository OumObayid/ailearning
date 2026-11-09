import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { DEBUGGING_MODULE_5_CHAPTERS } from '@/content/courses/debugging/module-5/data';

export const metadata = {
  title: 'Module 5 : Débogage avancé, performances et sécurité • Ingénierie du Débogage',
  description: "Optimisation et sécurisation avancées : diagnostic des fuites mémoire, analyse CPU, requêtes SQL lentes, gestion de la concurrence, prévention OWASP et observabilité Prometheus.",
};

export default function DebuggingModule5Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 5 — Diagnostic Mémoire et CPU"
        description="Optimisez la stabilité et la rapidité de vos systèmes logiciels : détectez et éliminez les fuites de mémoire (Memory Leaks) grâce aux snapshots de tas (Heap Profiling). Identifiez les goulots d'étranglement CPU, auditez les requêtes de base de données lentes avec EXPLAIN et renforcez la résilience globale de vos applications."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Ingénierie du Débogage', href: '/cours/debugging' },
          { label: 'Module 5' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="debugging-module-5" />

          {/* Chapters List */}
          <div className="space-y-4">
            {DEBUGGING_MODULE_5_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/debugging/module-5/${chapter.slug}`}
                duration={chapter.duration}
                description={chapter.description}
                theme="lime"
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 space-y-6">
          <CourseSidebar
            moduleId="debugging-module-5"
            baseHref="/cours/debugging/module-5"
            theme="lime"
          />
        </aside>
      </div>
    </div>
  );
}
