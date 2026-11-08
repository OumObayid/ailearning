import React from 'react';
import { notFound } from 'next/navigation';
import { CourseService } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { ComingSoon } from '@/components/common/ComingSoon';
import { ExamRunner } from '@/components/exam/ExamRunner';
import { getExamByModuleId } from '@/data/exams';

export type ExamCourseSlug = 'ai-engineering' | 'backend-ia' | 'prompt-engineering-ide' | 'debugging';

export interface ExamModuleViewProps {
  courseSlug: ExamCourseSlug;
  moduleSlug: string; // ex: "module-1"
}

export function resolveInternalModuleId(courseSlug: ExamCourseSlug, moduleSlug: string): string {
  if (courseSlug === 'prompt-engineering-ide') {
    return `prompt-engineering-${moduleSlug}`;
  }
  if (courseSlug === 'backend-ia') {
    return `backend-ia-${moduleSlug}`;
  }
  if (courseSlug === 'debugging') {
    return `debugging-${moduleSlug}`;
  }
  return moduleSlug;
}

export const COURSE_DISPLAY_NAMES: Record<ExamCourseSlug, string> = {
  'ai-engineering': 'AI Engineering',
  'backend-ia': 'Backend IA',
  'prompt-engineering-ide': 'Prompt Engineering IDE',
  'debugging': 'Ingénierie du Débogage',
};

export function ExamModuleView({ courseSlug, moduleSlug }: ExamModuleViewProps) {
  const internalId = resolveInternalModuleId(courseSlug, moduleSlug);
  const moduleData = CourseService.getModuleById(internalId);

  if (!moduleData) {
    notFound();
  }

  const courseTitle = COURSE_DISPLAY_NAMES[courseSlug] || moduleData.courseTitle || 'Formation';
  const examCourseHref = `/examens/${courseSlug}`;
  const targetCourseModuleUrl = `/cours/${courseSlug}/${moduleSlug}`;

  // Récupération de l'examen configuré dans le registre
  const examBundle = getExamByModuleId(internalId);

  if (examBundle) {
    return (
      <div className="space-y-6">
        <PageHeader
          size="large"
          title={`Module ${moduleData.order} : ${moduleData.title}`}
          description={moduleData.description}
          titleClassName="text-[26px] sm:text-[30px]"
          breadcrumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Examens', href: '/examens' },
            { label: courseTitle, href: examCourseHref },
            { label: `Module ${moduleData.order}` },
          ]}
        />

        <ExamRunner
          courseId={courseSlug}
          moduleId={moduleData.id}
          moduleOrder={moduleData.order}
          moduleTitle={moduleData.title}
          durationMinutes={examBundle.metadata.durationMinutes}
          passingScorePercent={examBundle.metadata.passingScorePercent}
          questions={examBundle.questions}
        />
      </div>
    );
  }

  // Pour les autres modules en attente de leurs quiz respectifs
  return (
    <div className="space-y-8">
      <PageHeader
        size="large"
        title={`Module ${moduleData.order} : ${moduleData.title}`}
        description={moduleData.description}
        titleClassName="text-[26px] sm:text-[30px]"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Examens', href: '/examens' },
          { label: courseTitle, href: examCourseHref },
          { label: `Module ${moduleData.order}` },
        ]}
      />

      <ComingSoon
        title="Évaluation en cours d'intégration"
        description="Le questionnaire d'évaluation certifiant et le système de validation des compétences de ce module sont en cours de finalisation."
        badge="Disponible prochainement"
        backHref={examCourseHref}
        backLabel={`Retour aux examens ${courseTitle}`}
        actionHref={targetCourseModuleUrl}
        actionLabel="Consulter le cours associé"
      />
    </div>
  );
}
