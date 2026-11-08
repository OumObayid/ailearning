import { notFound } from 'next/navigation';
import { CourseService } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { CourseSidebar } from '@/components/courses/CourseSidebar';
import { ChapterCard } from '@/components/courses/ChapterCard';
import { getChaptersForModule } from '@/lib/courseNavigation';

interface ModulePageProps {
  params: Promise<{ moduleId: string }>;
}

export async function generateStaticParams() {
  return [
    { moduleId: 'module-1' },
    { moduleId: 'module-2' },
    { moduleId: 'module-3' },
    { moduleId: 'module-4' },
    { moduleId: 'module-5' },
    { moduleId: 'module-6' },
    { moduleId: 'module-7' },
    { moduleId: 'module-8' },
  ];
}

export async function generateMetadata({ params }: ModulePageProps) {
  const { moduleId } = await params;
  const moduleData = CourseService.getModuleById(moduleId);

  if (!moduleData) {
    return {
      title: 'Module non trouvé — AiLearning',
    };
  }

  const title =
    moduleData.id === 'module-1'
      ? "Module 1 — Maîtrise Avancée de Google Gemini : Intégration des API d'IA — AiLearning"
      : `Module ${moduleData.order} : ${moduleData.title} • AI Engineering — AiLearning`;

  return {
    title,
    description: moduleData.description,
  };
}

export default async function AiEngineeringModuleDetailPage({ params }: ModulePageProps) {
  const { moduleId } = await params;
  const moduleData = CourseService.getModuleById(moduleId);

  if (!moduleData) {
    notFound();
  }

  const chapters = getChaptersForModule(moduleId);

  return (
    <div className="space-y-10">
      <PageHeader
        size="large"
        title={`Module ${moduleData.order} — ${moduleData.title}`}
        description={moduleData.description}
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours', href: '/cours' },
          { label: 'AI Engineering', href: '/cours/ai-engineering' },
          { label: `Module ${moduleData.order}` },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Chapters List */}
          <div className="space-y-4">
            {chapters.map((chapter, idx) => (
              <ChapterCard
                key={chapter.slug}
                number={chapter.number || idx + 1}
                title={chapter.title}
                href={`/cours/ai-engineering/${moduleId}/${chapter.slug}`}
                duration={chapter.duration}
                description={chapter.description}
                theme="blue"
              />
            ))}
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6 lg:sticky lg:top-20">
          <CourseSidebar
            moduleId={moduleId}
            baseHref={`/cours/ai-engineering/${moduleId}`}
          />
        </div>
      </div>
    </div>
  );
}
