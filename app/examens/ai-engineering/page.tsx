import Image from 'next/image';
import { CourseService } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { EXAMS_REGISTRY } from '@/data/exams';
import { CourseModuleExamList } from '@/components/exam/CourseModuleExamList';

export const metadata = {
  title: 'Examens de Certification — AI Engineering • AiLearning',
  description: 'Passez les 8 examens officiels de certification du cursus AI Engineering : Google Gemini, React Streaming, Node.js, RAG avec Qdrant, n8n et orchestration d’agents avec LangGraph.',
};

export default function AiEngineeringExamsPage() {
  const modules = CourseService.getAiEngineeringModules();
  const availableExamIds = Object.keys(EXAMS_REGISTRY);

  return (
    <div className="space-y-8 w-full">
      <PageHeader
        size="large"
        title="Examens de Certification — AI Engineering"
        description="Validez vos acquis sur l'ingénierie des LLMs : passez les 8 examens de certification surveillés en conditions réelles (chronométrage 40 min, seuil de 80%, attestation officielle)."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Examens', href: '/examens' },
          { label: 'AI Engineering' },
        ]}
      />

      <div className="relative overflow-hidden rounded-3xl border-2 border-blue-200 shadow-sm bg-slate-950">
        <Image
          src="/images/cours/ai-engineering/course-card-blue.jpg"
          alt="Illustration des examens AI Engineering"
          width={1280}
          height={480}
          priority
          className="w-full h-auto max-h-[360px] object-cover"
        />
      </div>

      <CourseModuleExamList
        modules={modules}
        availableExamIds={availableExamIds}
        theme="blue"
        courseTitle="AI Engineering"
        courseHref="/cours/ai-engineering"
      />
    </div>
  );
}
