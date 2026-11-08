import React from 'react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterNavigation } from '@/components/courses/ChapterNavigation';
import { CourseChapterLayout } from '@/components/courses/CourseChapterLayout';
import { CourseFullWidthToggle } from '@/components/courses/CourseFullWidthToggle';
import { getChapterNavigationForModule } from '@/lib/courseNavigation';
import { DEBUGGING_MODULE_4_CHAPTERS } from '@/content/courses/debugging/module-4/data';
import { DebuggingModule4Renderer } from '@/content/courses/debugging/module-4';

interface ChapterPageProps {
  params: Promise<{ chapterId: string }>;
}

export async function generateStaticParams() {
  return DEBUGGING_MODULE_4_CHAPTERS.map((c) => ({
    chapterId: c.slug,
  }));
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const currentChapter = DEBUGGING_MODULE_4_CHAPTERS.find((c) => c.slug === chapterId);

  if (!currentChapter) {
    return { title: 'Chapitre non trouvé — AiLearning' };
  }

  return {
    title: `Chapitre ${currentChapter.number} : ${currentChapter.title} • Ingénierie du Débogage — AiLearning`,
    description: currentChapter.description,
  };
}

export default async function DebuggingModule4ChapterDetailPage({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const currentChapter = DEBUGGING_MODULE_4_CHAPTERS.find((c) => c.slug === chapterId);

  if (!currentChapter) {
    notFound();
  }

  const nav = getChapterNavigationForModule('debugging-module-4', chapterId);

  return (
    <CourseChapterLayout
      header={
        <PageHeader
          actions={<CourseFullWidthToggle />}
          breadcrumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Cours', href: '/cours' },
            { label: 'Ingénierie du Débogage', href: '/cours/debugging' },
            { label: 'Module 4', href: '/cours/debugging/module-4' },
            { label: `Chapitre ${currentChapter.number}` },
          ]}
        />
      }
      sidebar={
        <CourseSidebar
          moduleId="debugging-module-4"
          baseHref="/cours/debugging/module-4"
          activeSlug={chapterId}
          theme="lime"
        />
      }
    >
      <article className="rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-10 pt-6 sm:pt-8 shadow-sm">
        <DebuggingModule4Renderer chapterSlug={chapterId} />

        {/* Previous & Next Navigation */}
        <ChapterNavigation
          prev={nav.prev}
          next={nav.next}
          moduleId="debugging-module-4"
          baseHref="/cours/debugging/module-4"
        />
      </article>
    </CourseChapterLayout>
  );
}

