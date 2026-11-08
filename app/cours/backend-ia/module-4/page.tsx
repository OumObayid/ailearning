import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { BACKEND_IA_MODULE_4_CHAPTERS } from '@/content/courses/backend-ia/module-4/data';

export const metadata = {
  title: 'Module 4 : Bases de données, Indexation B+Tree, EXPLAIN & Pool MySQL • Parcours Backend IA',
  description: 'Maîtriser les index SQL, InnoDB, EXPLAIN, la Cursor Pagination et les pools de connexions pour des API d’IA ultra-rapides.',
};

export default function BackendIaModule4Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 4 — Indexation et Optimisation SQL"
        description="Optimisez les performances de persistance des données pour vos backends d'IA : analysez le fonctionnement interne des index B+Tree InnoDB et auditez vos requêtes SQL avec EXPLAIN ANALYZE. Appliquez la règle du préfixe gauche, éliminez les scans de table et implémentez une pagination par curseur scalable en O(1)."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Backend IA', href: '/cours/backend-ia' },
          { label: 'Module 4' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="backend-ia-module-4" />

          {/* Chapters List */}
          <div className="space-y-4">
            {BACKEND_IA_MODULE_4_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/backend-ia/module-4/${chapter.slug}`}
                duration={chapter.duration}
                description={chapter.description}
                theme="amber"
              />
            ))}
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="space-y-6 lg:sticky lg:top-20">
          <CourseSidebar
            moduleId="backend-ia-module-4"
            activeSlug=""
            baseHref="/cours/backend-ia/module-4"
          />

          <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 shadow-sm space-y-3">
            <h4 className="text-base font-black text-slate-950">Objectif de validation</h4>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              À l&apos;issue de ce module, vous serez capable de diagnostiquer n&apos;importe quelle requête lente avec EXPLAIN, d&apos;éliminer les Full Table Scans et de concevoir un pool de connexions MySQL haute performance pour vos microservices d&apos;IA.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

