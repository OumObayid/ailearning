import { redirect } from 'next/navigation';

interface LessonPageProps {
  params: Promise<{ moduleId: string; lessonId: string }>;
}

export default async function LegacyLessonRedirectPage({ params }: LessonPageProps) {
  const { moduleId, lessonId } = await params;
  redirect(`/cours/ai-engineering/${moduleId}/${lessonId}`);
}
