import React from 'react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterNavigation } from '@/components/courses/ChapterNavigation';
import { CourseChapterLayout } from '@/components/courses/CourseChapterLayout';
import { CourseFullWidthToggle } from '@/components/courses/CourseFullWidthToggle';
import { getChapterNavigationForModule } from '@/lib/courseNavigation';
import { BACKEND_IA_MODULE_5_CHAPTERS } from '@/content/courses/backend-ia/module-5/data';
import { BackendIaModule5Renderer } from '@/content/courses/backend-ia/module-5';

interface ChapterPageProps {
  params: Promise<{ chapterId: string }>;
}

export async function generateStaticParams() {
  return BACKEND_IA_MODULE_5_CHAPTERS.map((c) => ({
    chapterId: c.slug,
  }));
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const currentChapter = BACKEND_IA_MODULE_5_CHAPTERS.find((c) => c.slug === chapterId);

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
  const currentChapter = BACKEND_IA_MODULE_5_CHAPTERS.find((c) => c.slug === chapterId);

  if (!currentChapter) {
    notFound();
  }

  const nav = getChapterNavigationForModule('backend-ia-module-5', chapterId);

  return (
    <CourseChapterLayout
      header={
        <PageHeader
          actions={<CourseFullWidthToggle />}
          breadcrumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Cours', href: '/cours' },
            { label: 'Backend IA', href: '/cours/backend-ia' },
            { label: 'Module 5', href: '/cours/backend-ia/module-5' },
            { label: `Chapitre ${currentChapter.number}` },
          ]}
        />
      }
      sidebar={
        <CourseSidebar
          moduleId="backend-ia-module-5"
          activeSlug={chapterId}
          baseHref="/cours/backend-ia/module-5"
        />
      }
    >
      <article className="rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-10 pt-6 sm:pt-8 shadow-sm">
        <BackendIaModule5Renderer slug={chapterId} />

        {/* Previous & Next Navigation */}
        <ChapterNavigation
          prev={nav.prev}
          next={nav.next}
          moduleId="backend-ia-module-5"
          baseHref="/cours/backend-ia/module-5"
        />
      </article>
    </CourseChapterLayout>
  );
}
