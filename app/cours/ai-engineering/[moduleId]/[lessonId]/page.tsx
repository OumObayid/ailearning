import { notFound } from 'next/navigation';
import { CourseService } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterNavigation } from '@/components/courses/ChapterNavigation';
import { CourseChapterLayout } from '@/components/courses/CourseChapterLayout';
import { CourseFullWidthToggle } from '@/components/courses/CourseFullWidthToggle';
import { getChaptersForModule, getChapterNavigationForModule } from '@/lib/courseNavigation';
import { hasModule1Lesson, Module1LessonRenderer } from '@/content/modules/module-1';
import { hasModule2Lesson, Module2LessonRenderer } from '@/content/modules/module-2';
import { hasModule3Lesson, Module3LessonRenderer } from '@/content/modules/module-3';
import { hasModule4Lesson, Module4LessonRenderer } from '@/content/modules/module-4';
import { hasModule5Lesson, Module5LessonRenderer } from '@/content/modules/module-5';
import { hasModule6Lesson, Module6LessonRenderer } from '@/content/modules/module-6';
import { hasModule7Lesson, Module7LessonRenderer } from '@/content/modules/module-7';
import { hasModule8Lesson, Module8LessonRenderer } from '@/content/modules/module-8';

interface LessonPageProps {
  params: Promise<{ moduleId: string; lessonId: string }>;
}

export async function generateStaticParams() {
  const m1Chapters = getChaptersForModule('module-1').map((c) => ({
    moduleId: 'module-1',
    lessonId: c.slug,
  }));

  const m2Chapters = getChaptersForModule('module-2').map((c) => ({
    moduleId: 'module-2',
    lessonId: c.slug,
  }));

  const m3Chapters = getChaptersForModule('module-3').map((c) => ({
    moduleId: 'module-3',
    lessonId: c.slug,
  }));

  const m4Chapters = getChaptersForModule('module-4').map((c) => ({
    moduleId: 'module-4',
    lessonId: c.slug,
  }));

  const m5Chapters = getChaptersForModule('module-5').map((c) => ({
    moduleId: 'module-5',
    lessonId: c.slug,
  }));

  const m6Chapters = getChaptersForModule('module-6').map((c) => ({
    moduleId: 'module-6',
    lessonId: c.slug,
  }));

  const m7Chapters = getChaptersForModule('module-7').map((c) => ({
    moduleId: 'module-7',
    lessonId: c.slug,
  }));

  const m8Chapters = getChaptersForModule('module-8').map((c) => ({
    moduleId: 'module-8',
    lessonId: c.slug,
  }));

  return [...m1Chapters, ...m2Chapters, ...m3Chapters, ...m4Chapters, ...m5Chapters, ...m6Chapters, ...m7Chapters, ...m8Chapters];
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { moduleId, lessonId } = await params;
  const moduleData = CourseService.getModuleById(moduleId);
  const chapters = getChaptersForModule(moduleId);
  const currentChapter = chapters.find((c) => c.slug === lessonId);

  return {
    title: `${currentChapter ? currentChapter.title : lessonId} • ${moduleData?.title || 'Cours'} — AiLearning`,
  };
}

export default async function AiEngineeringLessonDetailPage({ params }: LessonPageProps) {
  const { moduleId, lessonId } = await params;
  const moduleData = CourseService.getModuleById(moduleId);

  if (!moduleData) {
    notFound();
  }

  const isModule1 = moduleData.id === 'module-1';
  const isModule2 = moduleData.id === 'module-2';
  const isModule3 = moduleData.id === 'module-3';
  const isModule4 = moduleData.id === 'module-4';
  const isModule5 = moduleData.id === 'module-5';
  const isModule6 = moduleData.id === 'module-6';
  const isModule7 = moduleData.id === 'module-7';
  const isModule8 = moduleData.id === 'module-8';

  if (isModule1 && !hasModule1Lesson(lessonId)) notFound();
  if (isModule2 && !hasModule2Lesson(lessonId)) notFound();
  if (isModule3 && !hasModule3Lesson(lessonId)) notFound();
  if (isModule4 && !hasModule4Lesson(lessonId)) notFound();
  if (isModule5 && !hasModule5Lesson(lessonId)) notFound();
  if (isModule6 && !hasModule6Lesson(lessonId)) notFound();
  if (isModule7 && !hasModule7Lesson(lessonId)) notFound();
  if (isModule8 && !hasModule8Lesson(lessonId)) notFound();

  if (!isModule1 && !isModule2 && !isModule3 && !isModule4 && !isModule5 && !isModule6 && !isModule7 && !isModule8) {
    notFound();
  }

  const chapters = getChaptersForModule(moduleId);
  const currentChapter = chapters.find((c) => c.slug === lessonId);
  const nav = getChapterNavigationForModule(moduleId, lessonId);

  const chapterTitle = currentChapter ? currentChapter.title : lessonId;

  return (
    <CourseChapterLayout
      header={
        <PageHeader
          actions={<CourseFullWidthToggle />}
          breadcrumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Cours', href: '/cours' },
            { label: 'AI Engineering', href: '/cours/ai-engineering' },
            { label: `Module ${moduleData.order}`, href: `/cours/ai-engineering/${moduleData.id}` },
            { label: currentChapter?.number ? `Chapitre ${currentChapter.number}` : chapterTitle },
          ]}
        />
      }
      sidebar={
        <CourseSidebar
          moduleId={moduleData.id}
          activeSlug={lessonId}
          baseHref={`/cours/ai-engineering/${moduleData.id}`}
        />
      }
    >
      <article className="rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-10 pt-6 sm:pt-8 shadow-sm">
        <div className="course-content text-slate-900 leading-relaxed text-base sm:text-lg">
          {isModule1 && <Module1LessonRenderer slug={lessonId} />}
          {isModule2 && <Module2LessonRenderer slug={lessonId} />}
          {isModule3 && <Module3LessonRenderer slug={lessonId} />}
          {isModule4 && <Module4LessonRenderer slug={lessonId} />}
          {isModule5 && <Module5LessonRenderer slug={lessonId} />}
          {isModule6 && <Module6LessonRenderer slug={lessonId} />}
          {isModule7 && <Module7LessonRenderer slug={lessonId} />}
          {isModule8 && <Module8LessonRenderer slug={lessonId} />}
        </div>

        {/* Previous & Next Navigation */}
        <ChapterNavigation
          prev={nav.prev}
          next={nav.next}
          moduleId={moduleData.id}
          baseHref={`/cours/ai-engineering/${moduleData.id}`}
        />
      </article>
    </CourseChapterLayout>
  );
}
