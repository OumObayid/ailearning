import { CourseService } from '@/services/courseService';
import {
  ExamModuleView,
  resolveInternalModuleId,
  COURSE_DISPLAY_NAMES,
} from '@/components/exam/ExamModuleView';

interface PageProps {
  params: Promise<{ moduleId: string }>;
}

export async function generateStaticParams() {
  return CourseService.getAiEngineeringModules().map((m) => ({
    moduleId: `module-${m.order}`,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { moduleId } = await params;
  const internalId = resolveInternalModuleId('ai-engineering', moduleId);
  const moduleData = CourseService.getModuleById(internalId);

  if (!moduleData) {
    return { title: 'Examen non trouvé — AiLearning' };
  }

  return {
    title: `Examen • ${COURSE_DISPLAY_NAMES['ai-engineering']} — Module ${moduleData.order} : ${moduleData.title} — AiLearning`,
    description: `Examen officiel de certification du ${moduleData.title}`,
  };
}

export default async function AiEngineeringExamDetailPage({ params }: PageProps) {
  const { moduleId } = await params;
  return <ExamModuleView courseSlug="ai-engineering" moduleSlug={moduleId} />;
}

