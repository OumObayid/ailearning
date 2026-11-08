import { CourseService } from '@/services/courseService';
import { PageHeader } from '@/components/layout/PageHeader';
import { ExamCourseCard, ExamCourseCardProps } from '@/components/exam/ExamCourseCard';

export const metadata = {
  title: 'Examens de Certification Officiels — AiLearning',
  description: "Centre d'évaluation certifiant pour les cursus AI Engineering, Parcours Backend IA, Prompt Engineering et Ingénierie du Débogage : épreuves chronométrées, environnement sécurisé et attestations vérifiables.",
};

export default function ExamsPage() {
  const aiModules = CourseService.getAiEngineeringModules();
  const backendIaModules = CourseService.getBackendIaModules();
  const promptEngModules = CourseService.getPromptEngineeringModules();
  const debuggingModules = CourseService.getDebuggingModules();

  const examTracks: ExamCourseCardProps[] = [
    {
      id: 'ai-engineering',
      title: 'AI Engineering & Google Gemini',
      subtitle: `${aiModules.length} Certifications officielles de compétences`,
      description: "Évaluez votre maîtrise du développement d'applications d'IA : requêtes multimodales Gemini, streaming React, pipelines RAG avec Qdrant, flux n8n et orchestration d'agents autonomes avec LangGraph.",
      examsCount: aiModules.length,
      imageSrc: '/images/cours/ai-engineering/course-card-blue.jpg',
      href: '/examens/ai-engineering',
      theme: 'blue',
      iconName: 'sparkles',
    },
    {
      id: 'backend-ia',
      title: 'Parcours Backend IA & Haute Performance',
      subtitle: `${backendIaModules.length} Certifications officielles de compétences`,
      description: "Validez vos compétences sur les entrailles de Node.js et l'infrastructure pour l'IA : mémoire V8 Heap/Stack, Worker Threads, WebSockets/SSE, indexation SQL B+Tree, Redis et WebAssembly.",
      examsCount: backendIaModules.length,
      imageSrc: '/images/cours/backend-ia/course-card-amber.jpg',
      href: '/examens/backend-ia',
      theme: 'amber',
      iconName: 'server',
    },
    {
      id: 'prompt-engineering-ide',
      title: 'Prompt Engineering dans les IDE',
      subtitle: `${promptEngModules.length} Certifications officielles de compétences`,
      description: "Mesurez votre expertise sur le pilotage d'agents de code dans Google Antigravity : architecture d'instructions système, gestion des tokens, moindre privilège, anti-injection et systèmes multi-agents.",
      examsCount: promptEngModules.length,
      imageSrc: '/images/cours/prompt-engineering-ide/course-card-purple.jpg',
      href: '/examens/prompt-engineering-ide',
      theme: 'purple',
      iconName: 'bot',
    },
    {
      id: 'debugging',
      title: 'Ingénierie du Débogage',
      subtitle: `${debuggingModules.length} ${debuggingModules.length > 1 ? 'Certifications officielles' : 'Certification officielle'} de compétences`,
      description: "Validez votre méthodologie d'analyse causale, d'isolation de bugs et de résolution d'anomalies : reproduction contrôlée, DevTools, VS Code, requêtes SQL et post-mortem.",
      examsCount: debuggingModules.length,
      imageSrc: '/images/cours/debugging/course-card-emerald.jpg',
      href: '/examens/debugging',
      theme: 'lime',
      iconName: 'bug',
    },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        size="large"
        title="Centre d'Évaluation & Certification"
        description="Passez les examens officiels de chaque formation en conditions réelles de certification : épreuves chronométrées, environnement immersif plein écran et surveillance anti-triche."
        badge={`${examTracks.length} Examens actifs`}
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Examens' },
        ]}
      />

      {/* 4 Piliers de l'évaluation certifiante — Strictement 2 lignes de texte par bloc pour une harmonie parfaite */}
      <div className="rounded-3xl border-2 border-slate-200 bg-white p-4 sm:p-5 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs h-full">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-800 text-lg font-bold mb-2">⏱️</span>
          <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">40 Minutes</div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">Chronométré strict</div>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs h-full">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 text-lg font-bold mb-2">🎯</span>
          <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">Seuil 80%</div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">Validation requise</div>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs h-full">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-800 text-lg font-bold mb-2">🛡️</span>
          <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">Anti-Triche</div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">Surveillance active</div>
        </div>

        <div className="flex flex-col items-center justify-center text-center p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs h-full">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-800 text-lg font-bold mb-2">📝</span>
          <div className="font-black text-sm sm:text-base text-slate-950 whitespace-nowrap">Corrigé Détaillé</div>
          <div className="text-xs font-semibold text-slate-600 mt-0.5 whitespace-nowrap">Solutions &amp; badge</div>
        </div>
      </div>

      {/* Grille des Cursus d'Examens */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {examTracks.map((track) => (
          <ExamCourseCard key={track.id} {...track} />
        ))}
      </div>
    </div>
  );
}
