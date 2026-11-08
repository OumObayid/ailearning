import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { BACKEND_IA_MODULE_3_CHAPTERS } from '@/content/courses/backend-ia/module-3/data';

export const metadata = {
  title: 'Module 3 : Communication Temps Réel, Polling, WebSocket & SSE avec Gemini • Parcours Backend IA',
  description: 'Maîtriser HTTP, Polling, WebSocket et SSE pour diffuser des flux de réponses IA vers React en temps réel.',
};

export default function BackendIaModule3Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 3 — Communication WebSockets et SSE"
        description="Maîtrisez les 5 mécanismes fondamentaux du web temps réel : comprenez le cycle HTTP/1.1 et HTTP/2, le chiffrement TLS et les limites du polling. Bâtissez des serveurs WebSockets bidirectionnels avec le package ws et diffusez les tokens génératifs de l'IA mot par mot grâce au streaming Server-Sent Events (SSE)."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Backend IA', href: '/cours/backend-ia' },
          { label: 'Module 3' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="backend-ia-module-3" />

          {/* Chapters List */}
          <div className="space-y-4">
            {BACKEND_IA_MODULE_3_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/backend-ia/module-3/${chapter.slug}`}
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
            moduleId="backend-ia-module-3"
            activeSlug=""
            baseHref="/cours/backend-ia/module-3"
          />

          <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 shadow-sm space-y-3">
            <h4 className="text-base font-black text-slate-950">Objectif de validation</h4>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              À l&apos;issue de ce module, vous serez capable d&apos;orchestrer une communication client-serveur complète, d&apos;écouter des streams de données de Gemini en continu et de construire une interface React capable d&apos;afficher le texte généré au fil de l&apos;eau avec interruption à la demande.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

