import Image from 'next/image';
import { CourseService } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { EXAMS_REGISTRY } from '@/data/exams';
import { CourseModuleExamList } from '@/components/exam/CourseModuleExamList';

export const metadata = {
  title: 'Examens de Certification — Prompt Engineering IDE • AiLearning',
  description: 'Passez les 8 examens officiels de certification du cursus Prompt Engineering dans les IDE : architecture d’instructions permanentes, gestion des tokens, moindre privilège, défenses anti-injection et systèmes multi-agents.',
};

export default function PromptEngineeringIdeExamsPage() {
  const modules = CourseService.getPromptEngineeringModules();
  const availableExamIds = Object.keys(EXAMS_REGISTRY);

  return (
    <div className="space-y-8 w-full">
      <PageHeader
        size="large"
        title="Examens de Certification — Prompt Engineering IDE"
        description="Validez vos compétences sur le pilotage des agents de développement dans les IDE : passez les 8 examens de certification surveillés en conditions réelles (chronométrage 40 min, seuil de 80%, attestation officielle)."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Examens', href: '/examens' },
          { label: 'Prompt Engineering IDE' },
        ]}
      />

      <div className="relative overflow-hidden rounded-3xl border-2 border-purple-200 shadow-sm bg-slate-950">
        <Image
          src="/images/cours/prompt-engineering-ide/course-card-purple.jpg"
          alt="Illustration des examens Prompt Engineering dans les IDE"
          width={1280}
          height={480}
          priority
          className="w-full h-auto max-h-[360px] object-cover"
        />
      </div>

      <CourseModuleExamList
        modules={modules}
        availableExamIds={availableExamIds}
        theme="purple"
        courseTitle="Prompt Engineering IDE"
        courseHref="/cours/prompt-engineering-ide"
      />
    </div>
  );
}
