import Link from 'next/link';
import { Icon } from '@/components/common/Icon';
import { APP_NAME } from '@/lib/constants';

export const metadata = {
  title: 'Accueil — Plateforme d’Excellence en Ingénierie IA & Systèmes Agentiques',
  description: 'Plateforme spécialisée dans la conception, l’orchestration d’agents autonomes, les architectures backend haute performance et la certification d’aptitudes professionnelles.',
};

interface EngineeringDomain {
  id: string;
  category: string;
  title: string;
  punchline: string;
  iconName: string;
  technologies: string[];
  theme: {
    cardBorder: string;
    cardBg: string;
    iconBg: string;
    iconText: string;
    badgeBorder: string;
    badgeBg: string;
    badgeText: string;
    tagBorder: string;
    tagBg: string;
    tagText: string;
  };
}

const ENGINEERING_DOMAINS: EngineeringDomain[] = [
  {
    id: 'agentic-ai',
    category: 'Conception & Intelligence',
    title: 'Modèles & Systèmes Agentiques',
    punchline: "Pipelines RAG vectoriels, orchestration d'agents autonomes et streaming d'états d'inférence.",
    iconName: 'sparkles',
    technologies: ['Gemini 2.5', 'LangGraph', 'Qdrant', 'React Streaming'],
    theme: {
      cardBorder: 'border-blue-200',
      cardBg: 'bg-gradient-to-b from-blue-50/60 to-white',
      iconBg: 'bg-blue-100',
      iconText: 'text-blue-700',
      badgeBorder: 'border-blue-200',
      badgeBg: 'bg-blue-100/70',
      badgeText: 'text-blue-950 font-bold',
      tagBorder: 'border-blue-200',
      tagBg: 'bg-blue-50/80',
      tagText: 'text-blue-950 font-semibold',
    },
  },
  {
    id: 'backend-performance',
    category: 'Scalabilité & Systèmes',
    title: 'Runtimes & Haute Concurrence',
    punchline: "Gestion de l'Event Loop V8, threads parallèles, indexation SQL et cache Redis distribué.",
    iconName: 'server',
    technologies: ['Node.js & V8', 'Worker Threads', 'Redis', 'PostgreSQL'],
    theme: {
      cardBorder: 'border-amber-200',
      cardBg: 'bg-gradient-to-b from-amber-50/60 to-white',
      iconBg: 'bg-amber-100',
      iconText: 'text-amber-800',
      badgeBorder: 'border-amber-200',
      badgeBg: 'bg-amber-100/70',
      badgeText: 'text-amber-950 font-bold',
      tagBorder: 'border-amber-200',
      tagBg: 'bg-amber-50/80',
      tagText: 'text-amber-950 font-semibold',
    },
  },
  {
    id: 'ide-prompt-engineering',
    category: 'Outillage & Productivité',
    title: 'Prompts & Agents d\'IDE',
    punchline: "Orchestration de sous-agents en IDE, protocoles MCP et défenses contre l'injection de prompt.",
    iconName: 'bot',
    technologies: ['Google Antigravity', 'Protocole MCP', 'Multi-Agents', 'Sécurité Prompt'],
    theme: {
      cardBorder: 'border-purple-200',
      cardBg: 'bg-gradient-to-b from-purple-50/60 to-white',
      iconBg: 'bg-purple-100',
      iconText: 'text-purple-700',
      badgeBorder: 'border-purple-200',
      badgeBg: 'bg-purple-100/70',
      badgeText: 'text-purple-950 font-bold',
      tagBorder: 'border-purple-200',
      tagBg: 'bg-purple-50/80',
      tagText: 'text-purple-950 font-semibold',
    },
  },
  {
    id: 'debugging-rca',
    category: 'Résilience & Qualité',
    title: 'Diagnostic Systémique & RCA',
    punchline: "Analyse causale (RCA), profilage mémoire, traçage de call stacks et audit critique du code IA.",
    iconName: 'bug',
    technologies: ['Chrome DevTools', 'VS Code Debugger', 'Call Stacks & RCA', 'Memory Profiler'],
    theme: {
      cardBorder: 'border-lime-200',
      cardBg: 'bg-gradient-to-b from-lime-50/60 to-white',
      iconBg: 'bg-lime-100',
      iconText: 'text-lime-800',
      badgeBorder: 'border-lime-200',
      badgeBg: 'bg-lime-100/70',
      badgeText: 'text-lime-950 font-bold',
      tagBorder: 'border-lime-200',
      tagBg: 'bg-lime-50/80',
      tagText: 'text-lime-950 font-semibold',
    },
  },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* 1. HERO BANNER GLOBAL — ÉPURÉ, HARMONIEUX & PROPORTIONNÉ */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-white via-indigo-50/50 to-slate-50 p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 border border-indigo-300 px-3 py-1 text-xs font-bold text-indigo-950 shadow-2xs">
            <Icon name="sparkles" className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Plateforme d&apos;Ingénierie &amp; Certifications Officielles</span>
          </div>

          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Maîtrisez l&apos;Ingénierie IA &amp; les Systèmes Agentiques
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium max-w-2xl">
            {APP_NAME} propose des formations d&apos;ingénierie et des certifications officielles pour concevoir, optimiser et fiabiliser des systèmes d&apos;IA industriels.
          </p>

          {/* 4 Métriques clés centrées et protégées contre le wrap */}
          <div className="pt-1 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto w-full">
            <div className="px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white border border-indigo-100 shadow-2xs text-center flex flex-col items-center justify-center">
              <div className="text-base sm:text-lg font-extrabold text-blue-600 whitespace-nowrap">4 Cursus</div>
              <div className="text-xs font-medium text-slate-600 mt-0.5 whitespace-nowrap">Filières complètes</div>
            </div>
            <div className="px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white border border-indigo-100 shadow-2xs text-center flex flex-col items-center justify-center">
              <div className="text-base sm:text-lg font-extrabold text-indigo-600 whitespace-nowrap">31 Épreuves</div>
              <div className="text-xs font-medium text-slate-600 mt-0.5 whitespace-nowrap">Certifications</div>
            </div>
            <div className="px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white border border-indigo-100 shadow-2xs text-center flex flex-col items-center justify-center">
              <div className="text-base sm:text-lg font-extrabold text-emerald-600 whitespace-nowrap">80% Requis</div>
              <div className="text-xs font-medium text-slate-600 mt-0.5 whitespace-nowrap">Excellence exigée</div>
            </div>
            <div className="px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-white border border-indigo-100 shadow-2xs text-center flex flex-col items-center justify-center">
              <div className="text-base sm:text-lg font-extrabold text-amber-600 whitespace-nowrap">100% Pratique</div>
              <div className="text-xs font-medium text-slate-600 mt-0.5 whitespace-nowrap">Bacs à sable &amp; code</div>
            </div>
          </div>

          {/* Boutons d'action centrés */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/cours"
              className="inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-indigo-500 transition cursor-pointer"
            >
              <Icon name="book-open" className="w-4 h-4" />
              <span>Explorer les Formations</span>
              <Icon name="arrow-right" className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/examens"
              className="inline-flex h-10 sm:h-11 items-center justify-center gap-2 rounded-xl border-2 border-indigo-200 bg-white px-5 text-xs sm:text-sm font-bold text-indigo-950 shadow-sm hover:bg-indigo-50 hover:border-indigo-300 transition cursor-pointer"
            >
              <Icon name="academic-cap" className="w-4 h-4 text-indigo-700" />
              <span>Centre d&apos;Évaluation</span>
            </Link>
          </div>
        </div>

        {/* Décoration douce */}
        <div className="absolute right-0 top-0 -mt-16 -mr-16 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-20 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
      </section>

      {/* 2. LES 4 GRANDS DOMAINES D'EXPERTISE (SYNTHÉTIQUE, VISUEL & AÉRÉ) */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-300 pb-4">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
            4 Domaines d&apos;Expertise
          </h2>
          <p className="text-base text-slate-700 font-semibold mt-1">
            De la conception des agents autonomes au diagnostic des pannes en production.
          </p>
        </div>

        {/* Grille aérée des 4 pôles technologiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ENGINEERING_DOMAINS.map((domain) => (
            <div
              key={domain.id}
              className={`flex flex-col justify-between rounded-3xl border-2 ${domain.theme.cardBorder} ${domain.theme.cardBg} p-6 shadow-xs hover:shadow-md transition space-y-4`}
            >
              <div className="space-y-3">
                {/* En-tête : Icône & Catégorie */}
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${domain.theme.iconBg} ${domain.theme.iconText} shadow-xs`}
                  >
                    <Icon name={domain.iconName} className="w-5 h-5" />
                  </div>
                  <span
                    className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-bold ${domain.theme.badgeBg} ${domain.theme.badgeText} border ${domain.theme.badgeBorder}`}
                  >
                    {domain.category}
                  </span>
                </div>

                {/* Titre & phrase percutante */}
                <h3 className="text-xl font-black text-slate-950">
                  {domain.title}
                </h3>
                <p className="text-sm text-slate-700 font-semibold leading-relaxed">
                  {domain.punchline}
                </p>
              </div>

              {/* Technologies clés */}
              <div className="pt-2 border-t border-slate-200/70 flex flex-wrap gap-1.5">
                {domain.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-md px-2 py-0.5 text-xs font-semibold ${domain.theme.tagBg} ${domain.theme.tagText} border ${domain.theme.tagBorder}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bannière de transition concise vers le catalogue */}
        <div className="rounded-2xl border-2 border-indigo-200 bg-gradient-to-r from-indigo-50/90 via-white to-blue-50/70 p-5 sm:p-6 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <Icon name="book-open" className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-black text-slate-950">
                31 modules interactifs &amp; 320 chapitres pratiques
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600">
                Chaque domaine dispose d&apos;un syllabus complet et d&apos;exercices outillés.
              </div>
            </div>
          </div>

          <div className="shrink-0">
            <Link
              href="/cours"
              className="inline-flex h-11 w-full md:w-auto items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 transition cursor-pointer"
            >
              <span>Voir le Catalogue</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. LES 4 PILIERS DE LA MÉTHODE PÉDAGOGIQUE — SYNTHÉTIQUE */}
      <section className="rounded-3xl border-2 border-slate-300 bg-white p-8 sm:p-10 shadow-sm space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            Conçu pour la Pratique Industrielle
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-semibold">
            4 principes fondamentaux pour une autonomie technique immédiate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 text-lg font-black">
              1
            </div>
            <h3 className="text-base font-black text-slate-950">Fondations Internes</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
              Algorithmes d&apos;attention, AST, ramasse-miettes V8 et protocoles d&apos;outils expliqués en détail.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 text-lg font-black">
              2
            </div>
            <h3 className="text-base font-black text-slate-950">Projets &amp; Code Réel</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
              Bacs à sable complets, streaming temps réel, APIs typées et tests de résistance.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 text-lg font-black">
              3
            </div>
            <h3 className="text-base font-black text-slate-950">Examens Surveillés</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
              Immersion plein écran, chronomètre strict et surveillance anti-triche active.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700 text-lg font-black">
              4
            </div>
            <h3 className="text-base font-black text-slate-950">Certification à 80%</h3>
            <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
              Seuil d&apos;excellence pour des attestations reflétant de vraies compétences.
            </p>
          </div>
        </div>
      </section>

      {/* 4. BANNIÈRE CENTRE D'ÉVALUATION & CERTIFICATION — ÉPURÉE & SANS TEXTE WRAPPÉ */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50/70 via-white to-purple-50/50 p-6 sm:p-8 lg:p-10 shadow-sm">
        <div className="relative z-10 space-y-6">
          {/* En-tête : Titre & Description sans contrainte de wrap artificielle */}
          <div className="max-w-4xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Prouvez Votre Savoir-Faire Technique
            </h2>

            <p className="text-sm sm:text-base text-slate-700 font-semibold leading-relaxed">
              31 épreuves chronométrées avec corrigé détaillé pour valider vos compétences dans les 4 filières.
            </p>
          </div>

          {/* Grille des 3 caractéristiques avec texte net sans wrap */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3.5 rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-2xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
                <Icon name="clock" className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black text-slate-950 whitespace-nowrap">40 min / épreuve</div>
                <div className="text-xs font-semibold text-slate-600 whitespace-nowrap">Session chronométrée</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-2xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <Icon name="shield-check" className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black text-slate-950 whitespace-nowrap">Seuil à 80%</div>
                <div className="text-xs font-semibold text-slate-600 whitespace-nowrap">Notation intransigeante</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-indigo-100 bg-white/90 p-4 shadow-2xs">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
                <Icon name="academic-cap" className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-black text-slate-950 whitespace-nowrap">Attestation officielle</div>
                <div className="text-xs font-semibold text-slate-600 whitespace-nowrap">Certificat vérifiable</div>
              </div>
            </div>
          </div>

          {/* Zone d'action : Boutons et note parfaitement centrés */}
          <div className="pt-4 border-t border-indigo-100/90 flex flex-col items-center justify-center space-y-3">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <Link
                href="/examens"
                className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-bold text-white shadow-sm hover:bg-indigo-500 transition cursor-pointer"
              >
                <Icon name="academic-cap" className="w-5 h-5 shrink-0" />
                <span>Accéder aux 31 Épreuves</span>
                <Icon name="arrow-right" className="w-4 h-4 shrink-0" />
              </Link>

              <Link
                href="/profil"
                className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border-2 border-indigo-200 bg-white px-6 text-sm font-bold text-indigo-950 shadow-sm hover:bg-indigo-50 hover:border-indigo-300 transition cursor-pointer"
              >
                <Icon name="user" className="w-5 h-5 text-indigo-700 shrink-0" />
                <span>Suivre Mon Profil</span>
              </Link>
            </div>

            <div className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-2 text-center">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>Accès immédiat • Attestations sauvegardées</span>
            </div>
          </div>
        </div>

        {/* Décoration douce d'arrière-plan */}
        <div className="absolute right-0 top-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-16 h-56 w-56 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none" />
      </section>
    </div>
  );
}
