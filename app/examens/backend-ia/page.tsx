import Image from 'next/image';
import { CourseService } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { EXAMS_REGISTRY } from '@/data/exams';
import { CourseModuleExamList } from '@/components/exam/CourseModuleExamList';

export const metadata = {
  title: 'Examens de Certification — Parcours Backend IA • AiLearning',
  description: 'Passez les 7 examens officiels de certification du cursus Backend IA : V8 et mémoire Heap/Stack, Worker Threads, WebSockets/SSE, indexation SQL B+Tree, cache Redis, WebAssembly/WebGPU et projet final.',
};

export default function BackendIaExamsPage() {
  const modules = CourseService.getBackendIaModules();
  const availableExamIds = Object.keys(EXAMS_REGISTRY);

  return (
    <div className="space-y-8 w-full">
      <PageHeader
        size="large"
        title="Examens de Certification — Parcours Backend IA"
        description="Validez vos acquis sur l'architecture backend et la haute performance pour l'IA : passez les 7 examens de certification surveillés en conditions réelles (chronométrage 40 min, seuil de 80%, attestation officielle)."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Examens', href: '/examens' },
          { label: 'Backend IA' },
        ]}
      />

      <div className="relative overflow-hidden rounded-3xl border-2 border-amber-200 shadow-sm bg-slate-950">
        <Image
          src="/images/cours/backend-ia/course-card-amber.jpg"
          alt="Illustration des examens Backend IA"
          width={1280}
          height={480}
          priority
          className="w-full h-auto max-h-[360px] object-cover"
        />
      </div>

      <CourseModuleExamList
        modules={modules}
        availableExamIds={availableExamIds}
        theme="amber"
        courseTitle="Backend IA"
        courseHref="/cours/backend-ia"
      />
    </div>
  );
}
