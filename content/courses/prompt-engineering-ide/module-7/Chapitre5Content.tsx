'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-purple-700" />
          <span>Module 7 — Débogage &amp; Optimisation de Prompts</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 5 — Éviter les instructions redondantes
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-2">
          Pourquoi entasser les interdictions affaiblit votre agent IA au lieu de le protéger, et comment épurer un prompt grâce à la factorisation thématique et au calcul du ratio de concision.
        </p>
      </div>

      {/* Analogie intuitive : Le régime sans gras et le tri des cartons */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>1. L&apos;analogie du déménagement : Le piège de l&apos;empilement compulsif</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Imaginez que vous préparez un déménagement. Sur un carton de vaisselle fragile, vous collez un autocollant <em>&quot;Fragile&quot;</em>. Puis, pris d&apos;angoisse, vous rajoutez : <em>&quot;Attention aux assiettes&quot;</em>, <em>&quot;Ne pas secouer&quot;</em>, <em>&quot;Interdit de jeter ce carton&quot;</em>, <em>&quot;Céramique délicate à l&apos;intérieur&quot;</em> et <em>&quot;Sois très doux avec ce paquet&quot;</em>.
        </p>
        <p className="text-slate-700 text-xs sm:text-sm">
          Le déménageur se retrouve face à six phrases hétéroclites qui recouvrent entièrement le carton. Au lieu de lire la consigne essentielle, il est distrait par le fouillis et risque de passer à côté de la mention critique : <strong>&quot;CE CÔTÉ VERS LE HAUT&quot;</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-rose-50/80 border border-rose-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-rose-800">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              <span>L&apos;empilement compulsif (À bannir)</span>
            </div>
            <div className="bg-slate-900 text-rose-300 p-3 rounded-xl font-mono text-xs space-y-1 break-words min-w-0 max-w-full">
              <p>- Tu ne dois pas modifier les fichiers.</p>
              <p>- Il est interdit de changer le contenu des fichiers.</p>
              <p>- Ne réalise aucune modification dans le projet.</p>
              <p>- Tu ne dois jamais écrire dans les fichiers.</p>
              <p>- Garde les fichiers intacts en toutes circonstances.</p>
            </div>
            <p className="text-slate-600 text-xs">
              Ces 5 phrases disent la même chose avec des mots différents. Elles gaspillent 75 tokens et créent un bruit mental qui dilue l&apos;attention du modèle.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
            <div className="flex items-center gap-2 font-bold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>La factorisation rigoureuse (Recommandé)</span>
            </div>
            <div className="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-xs space-y-1 break-words min-w-0 max-w-full">
              <p className="text-amber-400 font-bold"># RÈGLE D&apos;INTÉGRITÉ DU DISQUE</p>
              <p>MODE LECTURE SEULE STRICT :</p>
              <p>Tu peux inspecter uniquement les fichiers autorisés.</p>
              <p>Toute écriture, édition, renommage ou suppression de fichier sur le disque est formellement interdite sans présentation préalable d&apos;un diff et validation humaine explicite.</p>
            </div>
            <p className="text-slate-600 text-xs">
              Une seule règle englobante, claire, exhaustive et juridiquement opposable qui protège l&apos;intégralité du cycle de modification.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Répétition stérile vs Rappel stratégique */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>2. Répétition stérile vs Rappel stratégique just-in-time</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Faut-il éliminer toute redite ? <strong>Non.</strong> Il existe une différence capitale entre le bruit stérile (qui fatigue le contexte) et le rappel stratégique (qui resserre la vigilance de l&apos;agent juste avant une action à risque) :
        </p>

        {/* Table Desktop / Tablet */}
        <div className="hidden sm:block overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
              <tr>
                <th className="p-3 w-1/2">Répétition stérile (Nuisible)</th>
                <th className="p-3 w-1/2">Rappel stratégique (Bénéfique)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-3">Répéter 4 fois la même interdiction dans différents paragraphes du prompt initial.</td>
                <td className="p-3 font-semibold text-emerald-800">Énoncer la règle une fois dans les permissions, et la rappeler comme précondition dans l&apos;étape de proposition de diff.</td>
              </tr>
              <tr>
                <td className="p-3">Ajouter des adjectifs flatteurs (&quot;sois très intelligent, très prudent, ultra-rigoureux&quot;).</td>
                <td className="p-3 font-semibold text-emerald-800">Définir un critère binaire d&apos;arrêt : &quot;Si aucun diff n&apos;est approuvé, suspendre l&apos;exécution.&quot;</td>
              </tr>
              <tr>
                <td className="p-3">Rajouter une interdiction au bas du prompt chaque fois que l&apos;agent fait une erreur sans nettoyer le reste.</td>
                <td className="p-3 font-semibold text-emerald-800">Fusionner la nouvelle exigence dans la section thématique existante pour préserver l&apos;arborescence logique.</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile Card Stack */}
        <div className="sm:hidden space-y-3">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <div className="flex items-center justify-between border-b pb-2">
              <span className="font-bold text-slate-900 text-xs">Répétition stérile (Nuisible)</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800">À éliminer</span>
            </div>
            <p className="text-slate-600 text-xs">Répéter 4 fois la même interdiction dans différents paragraphes ou entasser des adjectifs sans méthode.</p>
            <div className="flex items-center justify-between border-b pt-2 pb-1">
              <span className="font-bold text-slate-900 text-xs">Rappel stratégique (Bénéfique)</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">Recommandé</span>
            </div>
            <p className="text-slate-600 text-xs">Énoncer la règle une fois dans les permissions, et la réactiver comme point de contrôle obligatoire juste avant l&apos;appel de l&apos;outil d&apos;écriture.</p>
          </div>
        </div>
      </section>

      {/* 3. Les 5 techniques de factorisation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>3. Les 5 techniques de factorisation thématique</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour transformer un prompt boursouflé de 300 lignes en un document d&apos;ingénierie limpide de 80 lignes, appliquez ces cinq leviers :
        </p>

        <div className="grid gap-3 text-xs grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-purple-900">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs">1</span>
              <span>Regroupement par domaine</span>
            </div>
            <p className="text-slate-600">
              Rassemblez toutes les règles éparses concernant les fichiers sous une section unique <code>## Gestion du Disque</code>.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-purple-900">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs">2</span>
              <span>Règle par défaut + Exception</span>
            </div>
            <p className="text-slate-600">
              Posez le principe : <em>&quot;Lecture seule par défaut&quot;</em>. L&apos;écriture n&apos;est plus qu&apos;une exception soumise à validation formelle.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-purple-900">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs">3</span>
              <span>Séparer règles et procédures</span>
            </div>
            <p className="text-slate-600">
              La règle dit ce qui est formellement interdit ; la procédure séquentielle décrit comment préparer le diff avant de solliciter l&apos;accord.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-purple-900">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs">4</span>
              <span>Suppression du bruit flatteur</span>
            </div>
            <p className="text-slate-600">
              Éradiquez les <em>&quot;Tu es le meilleur codeur au monde&quot;</em> ou <em>&quot;Fais de ton mieux s&apos;il te plaît&quot;</em> pour exiger des critères binaires mesurables.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-2xl space-y-1.5 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-purple-900">
              <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-800 flex items-center justify-center text-xs">5</span>
              <span>Architecture modulaire en 8 sections</span>
            </div>
            <p className="text-slate-600">
              Structurez chaque prompt d&apos;agent selon les 8 compartiments standardisés pour rendre le comportement prévisible et facilement maintenable.
            </p>
          </div>

          <div className="p-4 bg-purple-50/60 border border-purple-200 rounded-2xl space-y-1.5 shadow-xs">
            <div className="flex items-center gap-2 font-bold text-purple-950">
              <span className="w-5 h-5 rounded-full bg-purple-200 text-purple-900 flex items-center justify-center text-xs">%</span>
              <span>Ratio de Concision</span>
            </div>
            <p className="text-slate-600">
              Mesurez vos gains : <code>Tokens Utiles / Tokens Totaux</code>. Visez un ratio supérieur à 85% d&apos;informations actives et vérifiables.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Architecture en 8 sections */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <span>4. L&apos;architecture standardisée en 8 sections modulaires</span>
        </h2>
        <p className="text-slate-700 text-xs sm:text-sm">
          Pour éviter que les nouvelles consignes ne soient jetées en vrac, utilisez ce canevas universel. Chaque consigne a une adresse précise :
        </p>

        <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-xs shadow-inner space-y-1.5 break-words min-w-0 max-w-full">
          <div className="text-amber-400 font-bold border-b border-slate-800 pb-1">
            # ARCHITECTURE MODULAIRE UNIVERSELLE (CANEVAS 8 SECTIONS)
          </div>
          <p className="text-emerald-400">1. IDENTITÉ &amp; RÔLE : Titre exact, niveau de séniorité et domaine technique ciblé.</p>
          <p className="text-emerald-400">2. MISSION PRINCIPALE : Valeur finale concrète à livrer à l&apos;utilisateur.</p>
          <p className="text-emerald-400">3. PÉRIMÈTRE AUTORISÉ : Dossiers et extensions accessibles, sanctuarisation de la racine.</p>
          <p className="text-emerald-400">4. PERMISSIONS &amp; SÉCURITÉ : Mode lecture seule, interdiction du .env, garde-fous terminaux.</p>
          <p className="text-emerald-400">5. MÉTHODE DE TRAVAIL : Séquence obligatoire (Cadrage → Analyse → Diff → Validation humaine).</p>
          <p className="text-emerald-400">6. FIABILITÉ FACTUELLE : Obligation de citer le fichier et la ligne, zéro invention.</p>
          <p className="text-emerald-400">7. GESTION DES BLOCAGES : Déclaration explicite des manques et suspension en cas de doute.</p>
          <p className="text-emerald-400">8. FORMAT DE SORTIE : Canevas imposé pour les réponses et critères Definition of Done.</p>
        </div>

        <Callout type="tip" title="La règle d'or de concision">
          Épurer un prompt ne signifie pas l&apos;amputer. Ne supprimez jamais une règle de sécurité critique sous prétexte d&apos;économiser 15 tokens. La concision intelligente élimine le bavardage et renforce l&apos;autorité des consignes essentielles.
        </Callout>
      </section>

      {/* QuickQuiz */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <h2 className="text-[19px] font-bold text-slate-900 flex items-center gap-2">
          <Icon name="academic-cap" className="w-5 h-5 text-purple-700" />
          <span>Validation des acquis : Éviter les redondances</span>
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Pourquoi l'accumulation désordonnée de cinq phrases interdisant l'écriture est-elle néfaste pour le comportement d'un agent IA ?",
              options: [
                "Elle dilue l'attention du modèle, gaspille du contexte et risque de créer des incohérences lors des mises à jour futures",
                "Elle désactive automatiquement la connexion Internet de l'IDE",
                "Elle oblige le modèle à répondre uniquement en langage binaire",
                "Elle fait planter le compilateur TypeScript"
              ],
              correctIndex: 0,
              explanation: "Des règles empilées sans structure saturent la fenêtre de contexte, créent du bruit sémantique et augmentent considérablement le risque d'oubli lors d'une modification ultérieure."
            },
            {
              id: 2,
              question: "Qu'est-ce qui distingue fondamentalement un rappel stratégique d'une répétition stérile ?",
              options: [
                "Le rappel stratégique est rédigé en lettres majuscules avec des points d'exclamation",
                "Le rappel stratégique réactive la règle générale au moment précis d'une étape opérationnelle sensible pour sécuriser l'action immédiate",
                "Le rappel stratégique est généré par un modèle de langage concurrent",
                "Le rappel stratégique coûte dix fois plus de tokens"
              ],
              correctIndex: 1,
              explanation: "Un rappel stratégique ('Just-in-Time reminder') est positionné là où le risque survient (par exemple, rappeler l'approbation obligatoire juste avant l'appel d'un outil d'édition)."
            },
            {
              id: 3,
              question: "Dans la factorisation de prompt, quelle approche permet de remplacer 10 règles d'interdiction de modification de fichiers dispersées ?",
              options: [
                "Poser le mode lecture seule par défaut, en stipulant que l'écriture est l'unique exception soumise à validation humaine",
                "Ajouter une phrase disant 'Sois un bon garçon et ne casse rien'",
                "Augmenter la température du modèle à 1.5",
                "Supprimer toutes les consignes de sécurité pour aller plus vite"
              ],
              correctIndex: 0,
              explanation: "Le paradigme 'Default Deny' (interdiction par défaut + exceptions explicites) factorise des dizaines de règles négatives en une seule clause d'ingénierie robuste et simple à auditer."
            }
          ]}
        />
      </section>
    </div>
  );
};
