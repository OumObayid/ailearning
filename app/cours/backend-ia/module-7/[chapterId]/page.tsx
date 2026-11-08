import React from 'react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterNavigation } from '@/components/courses/ChapterNavigation';
import { CourseChapterLayout } from '@/components/courses/CourseChapterLayout';
import { CourseFullWidthToggle } from '@/components/courses/CourseFullWidthToggle';
import { getChapterNavigationForModule } from '@/lib/courseNavigation';
import { BACKEND_IA_MODULE_7_CHAPTERS } from '@/content/courses/backend-ia/module-7/data';
import { BackendIaModule7Renderer } from '@/content/courses/backend-ia/module-7';

interface ChapterPageProps {
  params: Promise<{ chapterId: string }>;
}

export async function generateStaticParams() {
  return BACKEND_IA_MODULE_7_CHAPTERS.map((c) => ({
    chapterId: c.slug,
  }));
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const currentChapter = BACKEND_IA_MODULE_7_CHAPTERS.find((c) => c.slug === chapterId);

  if (!currentChapter) {
    return { title: 'Chapitre non trouvé — AiLearning' };
  }

  return {
    title: `Chapitre ${currentChapter.number} : ${currentChapter.title} • Backend IA — AiLearning`,
    description: currentChapter.description,
  };
}

export default async function BackendIaChapterDetailPage({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const currentChapter = BACKEND_IA_MODULE_7_CHAPTERS.find((c) => c.slug === chapterId);

  if (!currentChapter) {
    notFound();
  }

  const nav = getChapterNavigationForModule('backend-ia-module-7', chapterId);

  return (
    <CourseChapterLayout
      header={
        <PageHeader
          actions={<CourseFullWidthToggle />}
          breadcrumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Cours', href: '/cours' },
            { label: 'Backend IA', href: '/cours/backend-ia' },
            { label: 'Module 7', href: '/cours/backend-ia/module-7' },
            { label: `Chapitre ${currentChapter.number}` },
          ]}
        />
      }
      sidebar={
        <CourseSidebar
          moduleId="backend-ia-module-7"
          activeSlug={chapterId}
          baseHref="/cours/backend-ia/module-7"
        />
      }
    >
      <article className="rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-10 pt-6 sm:pt-8 shadow-sm">
        <BackendIaModule7Renderer slug={chapterId} />

        {/* Previous & Next Navigation */}
        <ChapterNavigation
          prev={nav.prev}
          next={nav.next}
          moduleId="backend-ia-module-7"
          baseHref="/cours/backend-ia/module-7"
        />
      </article>
    </CourseChapterLayout>
  );
}
