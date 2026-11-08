import Image from 'next/image';
import { CourseService } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { EXAMS_REGISTRY } from '@/data/exams';
import { CourseModuleExamList } from '@/components/exam/CourseModuleExamList';

export const metadata = {
  title: 'Examens de Certification — Ingénierie du Débogage • AiLearning',
  description: "Passez les examens officiels de certification du cursus Ingénierie du Débogage : diagnostic rigoureux, analyse causale (RCA), maîtrise des outils et protocoles d'investigation.",
};

export default function DebuggingExamsPage() {
  const modules = CourseService.getDebuggingModules();
  const availableExamIds = Object.keys(EXAMS_REGISTRY);

  return (
    <div className="space-y-8 w-full">
      <PageHeader
        size="large"
        title="Examens de Certification — Ingénierie du Débogage"
        description="Validez vos compétences de diagnostic, de recherche causale et de résolution d'anomalies : passez les examens de certification surveillés en conditions réelles (chronométrage 30 min, seuil de 80%, attestation officielle)."
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Examens', href: '/examens' },
          { label: 'Ingénierie du Débogage' },
        ]}
      />

      <div className="relative overflow-hidden rounded-3xl border-2 border-lime-200 shadow-sm bg-slate-950">
        <Image
          src="/images/cours/debugging/course-card-emerald.jpg"
          alt="Illustration des examens Ingénierie du Débogage"
          width={1280}
          height={480}
          priority
          className="w-full h-auto max-h-[360px] object-cover"
        />
      </div>

      <CourseModuleExamList
        modules={modules}
        availableExamIds={availableExamIds}
        theme="lime"
        courseTitle="Ingénierie du Débogage"
        courseHref="/cours/debugging"
      />
    </div>
  );
}
