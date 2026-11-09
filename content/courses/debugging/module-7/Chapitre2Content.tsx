'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';

interface CapstoneIncident {
  id: string;
  code: string;
  title: string;
  category: 'Sécurité' | 'Performance' | 'Technique' | 'Fonctionnel';
  severity: 'P1' | 'P2' | 'P3' | 'P4';
  slaHours: number;
  symptom: string;
  technicalImpact: string;
  investigationStartingPoint: string;
  codeSnippet: string;
}

const CAPSTONE_INCIDENTS: CapstoneIncident[] = [
  {
    id: 'inc-1',
    code: 'SEC-01',
    title: 'IDOR sur la consultation de facture (/api/orders/:id)',
    category: 'Sécurité',
    severity: 'P1',
    slaHours: 2,
    symptom: 'N\'importe quel utilisateur connecté peut consulter et télécharger les factures d\'autres clients en modifiant l\'identifiant numérique dans l\'URL.',
    technicalImpact: 'Violation RGPD majeure et fuite de données confidentielles. Le contrôleur extrait la commande sans vérifier que order.userId === req.user.id.',
    investigationStartingPoint: 'src/backend/controllers/order.controller.ts (getOrderById)',
    codeSnippet: `// ❌ Code vulnérable dans order.controller.ts :
export async function getOrderById(req: Request, res: Response) {
  const orderId = Number(req.params.id);
  const order = await orderRepository.findById(orderId);
  // Faille : aucune vérification que order.userId === req.user.id !
  return res.json(order);
}`
  },
  {
    id: 'inc-2',
    code: 'TECH-02',
    title: 'Crash HTTP 500 sur commande inexistante',
    category: 'Technique',
    severity: 'P2',
    slaHours: 8,
    symptom: 'GET /api/orders/999999 fait planter le processus ou renvoie une erreur 500 avec stack trace brute au client.',
    technicalImpact: 'Défaut de validation. Le contrôleur suppose que le repository renvoie toujours un objet non nul et tente d\'accéder à order.totalAmount.',
    investigationStartingPoint: 'src/backend/repositories/order.repository.ts & order.controller.ts',
    codeSnippet: `// ❌ Accès direct sans garde-fou :
export async function getOrderSummary(req: Request, res: Response) {
  const order = await orderRepository.findById(Number(req.params.id));
  // Si order est undefined -> TypeError: Cannot read properties of undefined
  return res.json({ total: order.totalAmount });
}`
  },
  {
    id: 'inc-3',
    code: 'PERF-03',
    title: 'Saturation du pool de connexions MySQL sous charge',
    category: 'Performance',
    severity: 'P1',
    slaHours: 4,
    symptom: 'Après 40 requêtes simultanées, l\'API ne répond plus et toutes les requêtes tombent en timeout (504 Gateway Timeout).',
    technicalImpact: 'Fuite de connexion (Connection Leak) dans la gestion des transactions SQL : conn.release() n\'est pas exécuté dans un bloc finally.',
    investigationStartingPoint: 'src/backend/config/database.ts & services/order.service.ts',
    codeSnippet: `// ❌ Fuite de connexion SQL :
const conn = await pool.getConnection();
await conn.beginTransaction();
// Si une exception survient ici, conn.release() n'est JAMAIS appelé !
await conn.query('UPDATE accounts SET ...');
await conn.commit();
conn.release();`
  },
  {
    id: 'inc-4',
    code: 'FUNC-04',
    title: 'Calcul de taxe erroné pour les commandes intracommunautaires',
    category: 'Fonctionnel',
    severity: 'P2',
    slaHours: 12,
    symptom: 'Les clients B2B avec numéro de TVA valide se voient facturer 20% de TVA au lieu de 0% (auto-liquidation).',
    technicalImpact: 'Incohérence comptable et risque de contentieux fiscal. La condition de validation du numéro VIES est ignorée si country !== "FR".',
    investigationStartingPoint: 'src/backend/services/taxCalculator.ts',
    codeSnippet: `// ❌ Règle métier erronée :
export function calculateTax(amount: number, isB2B: boolean, country: string) {
  if (country === 'FR') return amount * 0.20;
  // Omission du contrôle d'auto-liquidation intracommunautaire B2B
  return amount * 0.20;
}`
  },
  {
    id: 'inc-5',
    code: 'PERF-05',
    title: 'Blocage synchrone lors de l\'analyse de document par l\'IA',
    category: 'Performance',
    severity: 'P2',
    slaHours: 8,
    symptom: 'L\'envoi d\'un PDF volumineux à Gemini bloque le thread Express pendant 15 secondes, pénalisant tous les autres utilisateurs du site.',
    technicalImpact: 'Absence d\'architecture asynchrone (files d\'attente / worker) et absence de timeout sur l\'appel SDK Google GenAI.',
    investigationStartingPoint: 'src/backend/services/gemini.service.ts',
    codeSnippet: `// ❌ Appel sans timeout ni isolation asynchrone :
export async function analyzeInvoiceSync(buffer: Buffer) {
  // Pas d'AbortSignal -> bloque le thread si l'API externe ralentit
  const response = await geminiClient.generateContent({ ... });
  return response.text();
}`
  }
];

export const Chapitre2Content: React.FC = () => {
  const [selectedIncident, setSelectedIncident] = useState<CapstoneIncident>(CAPSTONE_INCIDENTS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const filtered = filterCategory === 'ALL'
    ? CAPSTONE_INCIDENTS
    : CAPSTONE_INCIDENTS.filter((i) => i.category === filterCategory);

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans pb-16">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-emerald-300 bg-linear-to-r from-emerald-50 via-teal-50 to-green-100/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-emerald-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>Module 7 — Grand Projet de Fin d&apos;Études (Capstone) • Section 7.2</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
          Identification, Typologie et Priorisation des Dysfonctionnements
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 max-w-4xl font-medium leading-relaxed">
          Sur un système d&apos;entreprise dégradé, toutes les anomalies ne se valent pas. Une faille de sécurité IDOR engage la responsabilité pénale de l&apos;entreprise sous 2 heures, tandis qu&apos;une erreur de libellé peut attendre le prochain sprint. Maîtrisez la <strong>taxonomie des défaillances</strong> et la matrice de priorité P1 à P4.
        </p>
      </div>

      {/* Section 1: La Taxonomie des 4 Familles d'Anomalies */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Cadre Taxonomique</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            1. Les quatre grandes familles de dysfonctionnements logiciels
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Face à une pile de tickets de bugs ou de retours clients, un Lead Engineer classe immédiatement chaque anomalie dans l&apos;une des quatre catégories fondamentales :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-6">
          <div className="p-5 rounded-2xl bg-white border border-rose-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-rose-800 bg-rose-100 px-2 py-0.5 rounded">Famille 1</span>
              <span className="text-xs font-mono text-rose-700 font-bold">Risque Majeur / Juridique</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Anomalies de Sécurité & Contrôle d&apos;Accès</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Bypass d&apos;authentification, élévation de privilèges, IDOR (consultation de ressources d&apos;autrui), injection SQL, fuite de tokens JWT dans les URLs ou injection de prompt dans les analyses IA.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-2 py-0.5 rounded">Famille 2</span>
              <span className="text-xs font-mono text-amber-700 font-bold">Disponibilité / Scalabilité</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Anomalies de Performance & Concurrence</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Fuites de mémoire V8 (Heap saturation), blocage de l&apos;Event Loop Node.js par des calculs CPU intensifs synchrones, saturation du pool de connexions MySQL et requêtes N+1 sans jointure.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-blue-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-blue-800 bg-blue-100 px-2 py-0.5 rounded">Famille 3</span>
              <span className="text-xs font-mono text-blue-700 font-bold">Stabilité Runtime</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Anomalies Techniques & Exceptions Non Gérées</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Crashes de routes Express renvoyant des HTTP 500, désynchronisation de contrats d&apos;interfaces TypeScript/JSON entre frontend et backend, et rejets de promesses non interceptés (unhandled rejections).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-emerald-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">Famille 4</span>
              <span className="text-xs font-mono text-emerald-700 font-bold">Conformité Métier</span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">Anomalies Fonctionnelles & Règles Métier</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Le code s&apos;exécute sans lever d&apos;exception technique, mais le résultat produit est faux au regard du cahier des charges (ex: calcul d&apos;arrondi bancaire faussé, statut de commande non mis à jour).
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: La Matrice de Gravité P1 à P4 */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Standard Opérationnel</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            2. La Matrice de Gravité Industrielle (P1 à P4) & Contrats de Service (SLA)
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Dans les organisations d&apos;ingénierie de haut niveau, le traitement des dysfonctionnements obéit à une échelle stricte dictée par l&apos;impact direct sur les utilisateurs finaux et l&apos;intégrité du business :
        </p>

        <div className="overflow-x-auto my-6">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Priorité</th>
                <th className="px-4 py-3">Niveau d&apos;impact</th>
                <th className="px-4 py-3">Délai maximal (SLA)</th>
                <th className="px-4 py-3">Exemple concret Capstone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-black text-rose-700 bg-rose-50/40">P1 (Bloquant / Sev-1)</td>
                <td className="px-4 py-3 font-semibold">Interruption totale de service ou fuite active de données</td>
                <td className="px-4 py-3 font-mono font-bold text-rose-800">&lt; 2 heures</td>
                <td className="px-4 py-3">IDOR sur les factures clients / Saturation totale de la DB</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-black text-amber-700 bg-amber-50/40">P2 (Critique / Sev-2)</td>
                <td className="px-4 py-3 font-semibold">Fonctionnalité clé indisponible sans contournement</td>
                <td className="px-4 py-3 font-mono font-bold text-amber-800">&lt; 8 heures</td>
                <td className="px-4 py-3">Crash 500 sur consultation de commande / Blocage SDK IA</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-black text-blue-700 bg-blue-50/40">P3 (Majeur / Sev-3)</td>
                <td className="px-4 py-3 font-semibold">Dégradation avec solution de contournement (workaround)</td>
                <td className="px-4 py-3 font-mono font-bold text-blue-800">&lt; 48 heures</td>
                <td className="px-4 py-3">Erreur d&apos;arrondi sur la prévisualisation dans le panier</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-black text-slate-700 bg-slate-50/40">P4 (Mineur / Sev-4)</td>
                <td className="px-4 py-3 font-semibold">Anomalie cosmétique ou warning sans impact utilisateur</td>
                <td className="px-4 py-3 font-mono font-bold text-slate-600">Sprint suivant</td>
                <td className="px-4 py-3">Warning de dépréciation de package dans la console</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="danger" title="La règle de non-négociation P1">
          Lorsqu&apos;une anomalie de niveau **P1** est avérée (ex: fuite de données IDOR ou déni de service complet), <strong>tous les développements en cours sont suspendus</strong>. L&apos;équipe se concentre exclusivement sur le confinement, la reproduction et le correctif chirurgical.
        </Callout>
      </section>

      {/* Section 3: Tableau de Bord Interactif des Incidents du Projet */}
      <section className="space-y-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Inventaire Opérationnel</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            3. Atelier : Triage et Diagnostic Préalable des Incidents du Capstone
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-700 font-medium">
          Voici le registre réel des 5 anomalies identifiées lors de l&apos;audit initial de notre application Capstone. Filtrez par catégorie et sélectionnez un incident pour examiner son point de départ d&apos;investigation :
        </p>

        {/* Filtres de catégorie */}
        <div className="flex flex-wrap gap-2">
          {['ALL', 'Sécurité', 'Performance', 'Technique', 'Fonctionnel'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterCategory === cat
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {cat === 'ALL' ? 'Tous les incidents' : cat}
            </button>
          ))}
        </div>

        {/* Grille des incidents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2.5">
            {filtered.map((inc) => {
              const isSelected = selectedIncident.id === inc.id;
              return (
                <button
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className={`w-full p-4 rounded-xl border text-left transition-all ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/70 text-slate-950 ring-2 ring-emerald-400'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-xs font-black text-slate-600">{inc.code}</span>
                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-black ${
                      inc.severity === 'P1'
                        ? 'bg-rose-100 text-rose-800'
                        : inc.severity === 'P2'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {inc.severity} — SLA {inc.slaHours}h
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">{inc.title}</div>
                  <div className="text-xs text-slate-500 mt-1">Catégorie : {inc.category}</div>
                </button>
              );
            })}
          </div>

          {/* Fiche de triage détaillée */}
          <div className="p-5 rounded-2xl bg-white border border-slate-300 shadow-xs flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                <div>
                  <span className="text-xs font-mono font-bold uppercase text-emerald-700">{selectedIncident.code}</span>
                  <h4 className="text-base font-bold text-slate-950">{selectedIncident.title}</h4>
                </div>
                <span className="text-xs font-mono font-black px-2.5 py-1 rounded bg-slate-900 text-white">
                  Priorité {selectedIncident.severity}
                </span>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Symptôme constaté :</div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">{selectedIncident.symptom}</p>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-rose-700 mb-1">Impact technique sous-jacent :</div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{selectedIncident.technicalImpact}</p>
              </div>

              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">Point d&apos;entrée pour l&apos;enquête :</div>
                <div className="p-2.5 bg-slate-100 rounded-lg text-xs font-mono text-slate-800 mb-2">
                  {selectedIncident.investigationStartingPoint}
                </div>
                <CodeBlock language="typescript">{selectedIncident.codeSnippet}</CodeBlock>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-slate-900 text-white font-mono text-xs">
              Action immédiate : Isoler le composant et rédiger le test de reproduction (Red Test).
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Quiz d'évaluation de 6 questions */}
      <section className="space-y-6 pt-6">
        <div className="border-b-2 border-slate-200 pb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-1">Validation des Connaissances</div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-950">
            4. Quiz : Identification des dysfonctionnements et priorisation
          </h2>
        </div>

        <QuickQuiz
          title="Quiz 7.2 — Typologie, Sévérité et Triage d'Incidents"
          questions={[
            {
              id: 1,
              question: "Quelle est la définition formelle d'une faille de sécurité de type IDOR (Insecure Direct Object Reference) constatée sur /api/orders/:id ?",
              options: [
                "Une erreur de syntaxe dans le fichier HTML de la page d'accueil.",
                "L'absence de vérification d'autorisation permettant à un utilisateur authentifié d'accéder aux données privées d'un autre utilisateur en modifiant simplement l'identifiant dans la requête.",
                "Une lenteur excessive lors de la transmission d'images en WiFi.",
                "La déconnexion automatique de l'utilisateur après 15 minutes d'inactivité."
              ],
              correctIndex: 1,
              explanation: "L'IDOR se produit lorsque l'API expose une référence directe à un objet de base de données (ex: l'id numérique de commande) sans vérifier que l'utilisateur émetteur détient les droits légitimes sur cette ressource."
            },
            {
              id: 2,
              question: "Pourquoi une anomalie causant un blocage complet du pool de connexions MySQL doit-elle être classée en priorité P1 (Bloquante) ?",
              options: [
                "Parce qu'elle empêche la couleur du bouton de changer au survol.",
                "Parce qu'elle prive l'ensemble des utilisateurs de l'accès à l'application en bloquant toutes les requêtes en timeout 504, provoquant un déni de service généralisé.",
                "Parce que MySQL supprime automatiquement la base si le pool est plein pendant plus de 30 secondes.",
                "Pour forcer l'hébergeur cloud à augmenter ses tarifs."
              ],
              correctIndex: 1,
              explanation: "Une fuite de connexions rend le serveur incapable de traiter la moindre requête entrante : c'est une indisponibilité totale de la production qui exige une remédiation d'urgence (P1)."
            },
            {
              id: 3,
              question: "Quelle est la différence fondamentale entre une anomalie technique (Runtime Exception) et une anomalie fonctionnelle ?",
              options: [
                "L'anomalie technique est écrite en Python et la fonctionnelle en Java.",
                "L'anomalie technique provoque une rupture d'exécution (crash, HTTP 500, unhandled promise), tandis que l'anomalie fonctionnelle s'exécute sans erreur apparente mais produit un résultat métier erroné.",
                "L'anomalie fonctionnelle ne se produit que le week-end.",
                "Il n'existe aucune différence, ce sont des synonymes parfaits."
              ],
              correctIndex: 1,
              explanation: "Une fonction qui calcule un taux de TVA à 20% au lieu de 0% s'exécute avec succès au niveau du CPU (code HTTP 200), mais constitue une anomalie fonctionnelle majeure."
            },
            {
              id: 4,
              question: "Dans le cadre d'un contrat de niveau de service (SLA), que représente le délai maximal associé à un incident de sévérité P1 ?",
              options: [
                "Le temps accordé au développeur pour partir en vacances.",
                "Le délai maximal strict imposé à l'équipe d'ingénierie pour mobiliser les ressources, isoler le problème et déployer une mitigation ou un correctif en production.",
                "La durée de validité du mot de passe de l'administrateur système.",
                "Le temps nécessaire pour réinstaller le système d'exploitation Windows."
              ],
              correctIndex: 1,
              explanation: "Le SLA P1 (généralement inférieur à 2 heures) fixe l'engagement contractuel de reprise d'activité pour protéger l'entreprise contre des pertes financières ou juridiques immédiates."
            },
            {
              id: 5,
              question: "Face à une liste de 10 anomalies recensées sur le projet Capstone, par laquelle devez-vous impérativement débuter l'investigation ?",
              options: [
                "Par la correction des fautes d'orthographe dans les commentaires de code.",
                "Par les anomalies de niveau P1 (failles de sécurité critiques et dénis de service affectant tous les utilisateurs).",
                "Par le renommage de toutes les variables pour respecter une convention personnelle.",
                "Par le bug le plus facile à résoudre pour faire monter les statistiques de fermeture de tickets."
              ],
              correctIndex: 1,
              explanation: "La priorisation d'ingénierie impose d'éteindre les incendies critiques (P1) menaçant la viabilité du service avant de s'intéresser aux améliorations cosmétiques ou de confort."
            },
            {
              id: 6,
              question: "Quel danger existe-t-il à demander à un agent IA de 'résoudre tous les bugs du projet d'un seul coup' ?",
              options: [
                "L'agent IA va consommer toute la mémoire RAM de l'ordinateur en 3 secondes.",
                "L'agent va mélanger les périmètres, introduire des régressions massives et masquer les causes profondes sous des patchs superficiels désordonnés.",
                "L'agent refusera de répondre en raison d'une clause syndicale.",
                "Les fichiers sources seront automatiquement traduits en assembleur."
              ],
              correctIndex: 1,
              explanation: "Traiter plusieurs anomalies de natures divergentes en une seule consigne disperse le contexte du modèle et engendre des régressions croisées incontrôlables. La règle est : un incident ciblé à la fois."
            }
          ]}
        />
      </section>
    </div>
  );
};
