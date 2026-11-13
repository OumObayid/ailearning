import React from 'react';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterNavigation } from '@/components/courses/ChapterNavigation';
import { CourseChapterLayout } from '@/components/courses/CourseChapterLayout';
import { CourseFullWidthToggle } from '@/components/courses/CourseFullWidthToggle';
import { getChapterNavigationForModule } from '@/lib/courseNavigation';
import { PROMPT_ENGINEERING_MODULE_2_CHAPTERS } from '@/content/courses/prompt-engineering-ide/module-2/data';
import { PromptEngineeringModule2Renderer } from '@/content/courses/prompt-engineering-ide/module-2';

interface ChapterPageProps {
  params: Promise<{ chapterId: string }>;
}

export async function generateStaticParams() {
  return PROMPT_ENGINEERING_MODULE_2_CHAPTERS.map((c) => ({
    chapterId: c.slug,
  }));
}

export async function generateMetadata({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const currentChapter = PROMPT_ENGINEERING_MODULE_2_CHAPTERS.find((c) => c.slug === chapterId);

  if (!currentChapter) {
    return { title: 'Chapitre non trouvé — AiLearning' };
  }

  return {
    title: `Chapitre ${currentChapter.number} : ${currentChapter.title} • Prompt Engineering IDE — AiLearning`,
    description: currentChapter.description,
  };
}

export default async function PromptEngineeringChapterDetailPage({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const currentChapter = PROMPT_ENGINEERING_MODULE_2_CHAPTERS.find((c) => c.slug === chapterId);

  if (!currentChapter) {
    notFound();
  }

  const nav = getChapterNavigationForModule('prompt-engineering-module-2', chapterId);

  return (
    <CourseChapterLayout
      header={
        <PageHeader
          actions={<CourseFullWidthToggle />}
          breadcrumbs={[
            { label: 'Accueil', href: '/' },
            { label: 'Cours', href: '/cours' },
            { label: 'Prompt Engineering & IDE', href: '/cours/prompt-engineering-ide' },
            { label: 'Module 2', href: '/cours/prompt-engineering-ide/module-2' },
            { label: `Chapitre ${currentChapter.number}` },
          ]}
        />
      }
      sidebar={
        <CourseSidebar
          moduleId="prompt-engineering-module-2"
          activeSlug={chapterId}
          baseHref="/cours/prompt-engineering-ide/module-2"
        />
      }
    >
      <article className="rounded-3xl border-2 border-slate-300 bg-white p-6 sm:p-10 pt-6 sm:pt-8 shadow-sm min-w-0 max-w-full overflow-hidden">
        <PromptEngineeringModule2Renderer slug={chapterId} />

        {/* Previous & Next Navigation */}
        <ChapterNavigation
          prev={nav.prev}
          next={nav.next}
          moduleId="prompt-engineering-module-2"
          baseHref="/cours/prompt-engineering-ide/module-2"
        />
      </article>
    </CourseChapterLayout>
  );
}
