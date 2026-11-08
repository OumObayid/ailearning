import React from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { ModuleIllustration } from '@/components/courses/ModuleIllustration';
import { BACKEND_IA_MODULE_6_CHAPTERS } from '@/content/courses/backend-ia/module-6/data';

export const metadata = {
  title: 'Module 6 : WebAssembly et WebGPU — Accélération et Inférence Côté Client • Parcours Backend IA',
  description: 'Maîtriser WebAssembly (WASM), WebGPU, les Compute Shaders en WGSL, et l’exécution locale de modèles IA avec Transformers.js et ONNX Runtime Web.',
};

export default function BackendIaModule6Page() {
  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title="Module 6 — WebAssembly et Accélération WebGPU"
        description="Repoussez les limites de la vitesse d'exécution en intégrant WebAssembly (WASM) compilé en binaire depuis C ou Rust pour vos traitements de données massifs. Découvrez l'accélération matérielle moderne offerte par WebGPU et ses Compute Shaders en langage WGSL, et déployez des modèles d'inférence locaux avec Transformers.js."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'Backend IA', href: '/cours/backend-ia' },
          { label: 'Module 6' },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Module Illustration */}
          <ModuleIllustration moduleId="backend-ia-module-6" />

          {/* Chapters List */}
          <div className="space-y-4">
            {BACKEND_IA_MODULE_6_CHAPTERS.map((chapter) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number}
                title={chapter.title}
                href={`/cours/backend-ia/module-6/${chapter.slug}`}
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
            moduleId="backend-ia-module-6"
            baseHref="/cours/backend-ia/module-6"
          />
        </div>
      </div>
    </div>
  );
}

