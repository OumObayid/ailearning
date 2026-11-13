import React from 'react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterNavigation } from '@/components/courses/ChapterNavigation';
import { CourseChapterLayout } from '@/components/courses/CourseChapterLayout';
import { CourseFullWidthToggle } from '@/components/courses/CourseFullWidthToggle';
import { getChapterNavigationForModule } from '@/lib/courseNavigation';
import { ORCHESTRATION_MODULE_2_CHAPTERS } from '@/content/courses/orchestration-agents-ide/module-2/data';
import { OrchestrationModule2Renderer } from '@/content/courses/orchestration-agents-ide/module-2';

interface ChapterPageProps {
  params: Promise<{ chapterId: string }>;
}

export async function generateStaticParams() {
  return ORCHESTRATION_MODULE_2_CHAPTERS.map((c) => ({
    chapterId: c.slug,
  }));
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const currentChapter = ORCHESTRATION_MODULE_2_CHAPTERS.find((c) => c.slug === chapterId);

  if (!currentChapter) {
    return { title: 'Chapitre non trouvé — AiLearning' };
  }

  return {
    title: `Chapitre ${currentChapter.number} : ${currentChapter.title} • Module 2 — AiLearning`,
    description: currentChapter.description,
  };
}

export default async function OrchestrationChapterDetailPage({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const currentChapter = ORCHESTRATION_MODULE_2_CHAPTERS.find((c) => c.slug === chapterId);

  if (!currentChapter) {
    notFound();
  }

  const nav = getChapterNavigationForModule('orchestration-agents-module-2', chapterId);

  return (
    <CourseChapterLayout
      header={
        <PageHeader
          actions={<CourseFullWidthToggle />}
          breadcrumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Cours', href: '/cours' },
            { label: "Orchestration d'agents IA", href: '/cours/orchestration-agents-ide' },
            { label: 'Module 2', href: '/cours/orchestration-agents-ide/module-2' },
            { label: `Chapitre ${currentChapter.number}` },
          ]}
        />
      }
      sidebar={
        <CourseSidebar
          moduleId="orchestration-agents-module-2"
          activeSlug={chapterId}
          baseHref="/cours/orchestration-agents-ide/module-2"
          theme="indigo"
        />
      }
    >
      <article className="rounded-3xl border-2 border-slate-300 bg-white p-4 sm:p-8 lg:p-10 pt-5 sm:pt-8 shadow-sm min-w-0 max-w-full overflow-hidden">
        <OrchestrationModule2Renderer slug={chapterId} />

        {/* Previous & Next Navigation */}
        <ChapterNavigation
          prev={nav.prev}
          next={nav.next}
          moduleId="orchestration-agents-module-2"
          baseHref="/cours/orchestration-agents-ide/module-2"
        />
      </article>
    </CourseChapterLayout>
  );
}