import { CourseService } from '@/services/courseService';
import { CourseCard } from '@/components/courses/CourseCard';
import { PageHeader } from '@/components/layout/PageHeader';

export const metadata = {
  title: 'Nos Cours & Formations — AiLearning',
  description: "Catalogue des programmes de formation disponibles. Sélectionnez un cursus d'apprentissage pour accéder à ses modules.",
};

export default function CoursesCatalogPage() {
  const courses = CourseService.getAllCourses();

  return (
    <div className="space-y-8">
      <PageHeader
        size="large"
        title="Catalogue des cours"
        description="Découvrez l'ensemble de nos programmes de formation. Sélectionnez un cours pour accéder à son parcours d'apprentissage complet, ses modules interactifs et ses évaluations."
        badge={`${courses.filter(c => c.isAvailable).length} Formations actives`}
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Cours' },
        ]}
      />

      {/* Courses List Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
