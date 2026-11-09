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

      {/* 4 Piliers de la formation — Même structure et style que dans /examens */}
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4 sm:p-5 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs h-full">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-800 text-lg font-bold mb-2">📚</span>
          <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">4 Cursus Complets</div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">30 modules experts</div>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs h-full">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 text-lg font-bold mb-2">🔬</span>
          <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">Labs Interactifs</div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">Pratique &amp; simulateurs</div>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs h-full">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 text-lg font-bold mb-2">💡</span>
          <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">Cas Concrets</div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">Architecture &amp; code</div>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs h-full">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-800 text-lg font-bold mb-2">🎓</span>
          <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">Certifications</div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">Validation des acquis</div>
        </div>
      </div>

      {/* Courses List Grid */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
