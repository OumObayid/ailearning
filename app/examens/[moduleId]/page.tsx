import { redirect, notFound } from 'next/navigation';
import { CourseService } from '@/services/courseService';

interface ExamModulePageProps {
  params: Promise<{ moduleId: string }>;
}

export async function generateStaticParams() {
  return CourseService.getAllModules().map((m) => ({ moduleId: m.id }));
}

export default async function LegacyExamRedirectPage({ params }: ExamModulePageProps) {
  const { moduleId } = await params;
  const moduleData = CourseService.getModuleById(moduleId);

  if (!moduleData) {
    notFound();
  }

  const courseSlug =
    moduleData.courseId ||
    (moduleData.id.startsWith('prompt-engineering')
      ? 'prompt-engineering-ide'
      : moduleData.id.startsWith('backend-ia')
        ? 'backend-ia'
        : 'ai-engineering');

  redirect(`/examens/${courseSlug}/module-${moduleData.order}`);
}
