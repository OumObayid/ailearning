'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Module 3 — Prompt Engineering IDE</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 5 — Le Role Prompting (Personnification d&apos;expert)
        </h1>
        <p className="mt-2 text-base text-slate-700">
          Changer les « lunettes » de l&apos;IA : lui attribuer une casquette professionnelle précise pour orienter son vocabulaire, ses priorités et son niveau d&apos;exigence.
        </p>
      </div>

      {/* 1. Définition et Analogie */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          1. Pourquoi donner un rôle à l&apos;IA ?
        </h2>

        <p className="text-base sm:text-lg text-slate-800 font-medium">
          Par défaut, un grand modèle linguistique a été entraîné sur la quasi-totalité d&apos;Internet. Si vous ne lui donnez aucun rôle, il vous donnera une <strong>réponse moyenne généraliste</strong>, comme un élève qui récite un cours sans prise de position.
        </p>

        {/* L'Analogie des lunettes */}
        <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/70 p-5 space-y-2">
          <div className="flex items-center gap-2 text-indigo-900 font-black text-sm uppercase">
            <span>💡 L&apos;analogie du plan d&apos;architecte</span>
          </div>
          <p className="text-sm text-slate-800 leading-relaxed">
            Montrez le plan d&apos;un appartement à 3 personnes différentes :
          </p>
          <ul className="text-sm text-slate-700 list-disc list-inside space-y-1">
            <li><strong>L&apos;électricien</strong> regarde où sont les prises, le disjoncteur et la puissance disponible.</li>
            <li><strong>Le décorateur</strong> regarde la lumière, les volumes et l&apos;harmonie des couleurs.</li>
            <li><strong>L&apos;agent immobilier</strong> regarde le prix au mètre carré et le potentiel de revente.</li>
          </ul>
          <p className="text-sm text-slate-800 mt-2">
            Le plan est <strong>strictement le même</strong>, mais chacun l&apos;analyse selon ses priorités de métier. Le <strong>Role Prompting</strong> fait exactement cela avec l&apos;IA : il lui fait chausser les lunettes du spécialiste dont vous avez besoin à l&apos;instant T !
          </p>
        </div>

        {/* Ce que le rôle N'EST PAS */}
        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 text-xs sm:text-sm text-slate-700 space-y-1">
          <strong className="text-rose-900 font-bold block">❌ Le mythe du débutant : « Tu es le plus grand génie de l&apos;univers »</strong>
          Flatter l&apos;IA ne la rend pas plus intelligente. Ce qui fonctionne, ce n&apos;est pas la flatterie, mais <strong>la définition précise de son domaine de compétences, de ses critères de qualité et de ses limites</strong>.
        </div>
      </section>

      {/* 2. Les 4 Casquettes clés du Développeur */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          2. Les 4 rôles majeurs à alterner dans votre IDE
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-bold text-xs flex items-center justify-center">1</span>
              <h3 className="font-extrabold text-sm text-slate-900">Le Tech Lead / Architecte</h3>
            </div>
            <p className="text-xs text-slate-600">
              <strong>Priorité :</strong> Modularité, maintenabilité, respect des design patterns et séparation des couches (MVC). Idéal pour concevoir l&apos;arborescence d&apos;un projet ou choisir une dépendance.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="font-extrabold text-sm text-slate-900">L&apos;Ingénieur QA (Testeur impitoyable)</h3>
            </div>
            <p className="text-xs text-slate-600">
              <strong>Priorité :</strong> Trouver les failles, les cas limites, les valeurs <code>null</code>/<code>undefined</code>, les coupures réseau et écrire des tests unitaires robustes.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="font-extrabold text-sm text-slate-900">L&apos;Auditeur Sécurité (AppSec)</h3>
            </div>
            <p className="text-xs text-slate-600">
              <strong>Priorité :</strong> Traquer les injections SQL/XSS, les secrets exposés en clair dans le code, les failles CORS, l&apos;absence de validation avec Zod et les failles de JWT.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-slate-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center">4</span>
              <h3 className="font-extrabold text-sm text-slate-900">L&apos;Expert UI / Accessibilité</h3>
            </div>
            <p className="text-xs text-slate-600">
              <strong>Priorité :</strong> Vérifier la navigation au clavier, les contrastes WCAG, les balises ARIA, la réactivité mobile et la fluidité des micro-interactions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Démonstration : 1 Même Code, 2 Analyses Radicalement Différentes */}
      <section className="space-y-5">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          3. Démonstration : Un même composant vu par 2 rôles différents
        </h2>

        {/* Le Code source analysé */}
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 sm:p-5 space-y-2 shadow-sm min-w-0">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="font-bold text-sm text-slate-900">Le code React soumis à l&apos;analyse :</span>
            <span className="text-xs text-slate-500 font-mono">Composant bouton</span>
          </div>

          <div className="font-mono text-xs bg-slate-900 text-slate-100 p-3.5 rounded-xl shadow-inner space-y-1 break-words leading-relaxed">
            <div>
              &lt;<span className="text-rose-400">button</span>
            </div>
            <div className="pl-4">
              <span className="text-purple-400">onClick</span>=&#123;() =&gt; <span className="text-blue-300">deleteUser</span>(user.id)&#125;
            </div>
            <div className="pl-4">
              <span className="text-purple-400">className</span>=<span className="text-amber-300">&quot;bg-red-500 text-white p-2&quot;</span>
            </div>
            <div>
              &gt;
            </div>
            <div className="pl-4 text-emerald-300">
              &lt;<span className="text-rose-400">TrashIcon</span> /&gt;
            </div>
            <div>
              &lt;/<span className="text-rose-400">button</span>&gt;
            </div>
          </div>
        </div>

        {/* Le match des 2 regards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-purple-200 bg-purple-50/50 space-y-2 min-w-0">
            <span className="text-xs font-black uppercase text-purple-900">Regard Rôle : Expert Accessibilité (a11y)</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Ce qu&apos;il repère immédiatement :</strong><br />
              &bull; Le bouton n&apos;a aucun texte visible ni <code>aria-label=&quot;Supprimer l&apos;utilisateur&quot;</code> : un aveugle utilisant un lecteur d&apos;écran entend juste <em>« Bouton vide »</em>.<br />
              &bull; Pas d&apos;état <code>:focus-visible</code> pour la navigation au clavier.
            </p>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 space-y-2 min-w-0">
            <span className="text-xs font-black uppercase text-emerald-900">Regard Rôle : Testeur QA & Robustesse</span>
            <p className="text-xs text-slate-700 leading-relaxed">
              <strong>Ce qu&apos;il repère immédiatement :</strong><br />
              &bull; Aucune modal de confirmation avant suppression irréversible.<br />
              &bull; Pas de désactivation <code>disabled=&#123;isDeleting&#125;</code> : si l&apos;utilisateur clique frénétiquement 5 fois, l&apos;API reçoit 5 requêtes simultanées de suppression !
            </p>
          </div>
        </div>
      </section>

      {/* 4. La Recette des 4 Ingrédients d'un Rôle Professionnel */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          4. Comment formuler un rôle percutant (La structure éprouvée)
        </h2>

        <div className="rounded-2xl border-2 border-slate-800 bg-slate-900 text-slate-100 p-4 sm:p-6 font-mono text-xs sm:text-sm space-y-3 shadow-inner break-words min-w-0 max-w-full">
          <p className="text-xs uppercase font-extrabold text-indigo-400 tracking-wider">[GABARIT DE ROLE PROMPTING]</p>
          <div className="space-y-2.5 text-slate-200">
            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-indigo-400 font-bold block text-[11px] uppercase">RÔLE :</span>
              <span className="text-slate-200">Tu es un ingénieur QA senior spécialisé en React et Vitest.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800">
              <span className="text-purple-400 font-bold block text-[11px] uppercase">MISSION :</span>
              <span className="text-slate-200">Relire le composant ci-dessous et identifier tous les cas où il pourrait planter.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 space-y-1">
              <span className="text-amber-400 font-bold block text-[11px] uppercase">ATTITUDE ATTENDUE :</span>
              <ul className="text-slate-300 list-disc list-inside space-y-0.5 pl-1">
                <li>Sois sceptique et pessimiste : cherche ce que l&apos;utilisateur pourrait faire de travers.</li>
                <li>Analyse les valeurs nulles, le chargement lent du réseau et les doubles clics.</li>
              </ul>
            </div>
            <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-900/60">
              <span className="text-rose-400 font-bold block text-[11px] uppercase">INTERDICTION :</span>
              <span className="text-rose-200">Ne modifie pas le style graphique, concentre-toi sur la robustesse.</span>
            </div>
          </div>
        </div>

        <Callout type="note" title="Lien avec Antigravity et les Agents">
          Dans Antigravity, vous pouvez enregistrer ces rôles directement dans des fichiers permanents (comme ceux que nous avons créés dans <code>.agents/agents/backend-developer.md</code> ou <code>qa-reviewer.md</code>). L&apos;IDE applique alors automatiquement le rôle à chaque interaction !
        </Callout>
      </section>

      {/* 5. Checklist interactive */}
      <section className="space-y-4">
        <InteractiveChecklist
          title="Auto-évaluation : Vos acquis sur le Role Prompting"
          items={[
            "Je comprends que le rôle sert à filtrer les priorités de l'IA et à éviter les réponses trop généralistes.",
            "J'évite la flatterie vide ('tu es le meilleur') et je précise le métier, les critères et les interdictions.",
            "Je sais alterner les rôles selon la phase de travail : Architecte -> Développeur -> QA -> Sécurité.",
            "Je sais qu'attribuer un rôle n'accorde aucun pouvoir d'accès magique (les permissions restent sécurisées dans l'IDE).",
            "Je peux réutiliser des rôles prédéfinis via les fichiers de configuration .agents/agents/."
          ]}
        />
      </section>

      {/* 6. Quiz de Validation */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2">
          Validation des connaissances — Quiz Express
        </h2>

        <div className="space-y-4">
          <QuickQuiz
            title="Question 1 — Quel est l'impact réel du rôle ?"
            question="Pourquoi écrire 'Tu es un auditeur de sécurité OWASP' produit-il une meilleure relecture de code qu'une demande sans rôle ?"
            options={[
              "Parce que l'IA active le mode turbo de son processeur",
              "Parce que cela force l'IA à analyser le code sous l'angle spécifique des failles, injections et fuites de données au lieu d'une relecture cosmétique",
              "Parce que le modèle télécharge la base de données de la police"
            ]}
            correctIndex={1}
            explanation="Exactement ! Le rôle donne à l'IA une grille d'évaluation ciblée et spécialisée, évitant qu'elle ne se perde dans des détails superficiels de mise en page."
          />

          <QuickQuiz
            title="Question 2 — Rôle vs Permissions réelles"
            question="Si vous donnez le rôle 'Tu es l'administrateur système Root suprême' à l'IA, peut-elle exécuter des commandes destructrices sur votre PC sans votre accord ?"
            options={[
              "Oui, car le rôle Root outrepasse les règles de l'IDE",
              "Non, le rôle n'est qu'un filtre textuel de conversation ; la sécurité de l'IDE contrôle et bloque toujours les actions sensibles",
              "Oui, si la phrase est écrite en majuscules"
            ]}
            correctIndex={1}
            explanation="Bravo ! Ne confondez jamais le rôle conversationnel et les permissions système. Même avec un rôle de super-administrateur, l'agent reste bridé par le bac à sable (sandbox) et les autorisations de votre IDE."
          />
        </div>
      </section>
    </div>
  );
};
