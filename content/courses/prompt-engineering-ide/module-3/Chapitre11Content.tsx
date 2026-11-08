'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre11Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 11 — Gestion des erreurs et des incertitudes
        </h1>
      </div>

      {/* 1. Distinction fondamentale */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Distinguer Erreur, Incertitude et Limitation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 bg-white border-2 border-rose-200 rounded-2xl">
            <div className="text-rose-700 font-black text-base flex items-center gap-2 mb-2">
              <Icon name="x-circle" className="w-5 h-5" />
              <span>Erreur (Faute)</span>
            </div>
            <p className="text-xs text-slate-700">
              Une affirmation fausse ou en contradiction avec les faits réels du code (ex: affirmer qu&apos;une fonction utilise bcrypt alors qu&apos;elle utilise sha256).
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-amber-200 rounded-2xl">
            <div className="text-amber-700 font-black text-base flex items-center gap-2 mb-2">
              <Icon name="question-mark-circle" className="w-5 h-5" />
              <span>Incertitude (Doute légitime)</span>
            </div>
            <p className="text-xs text-slate-700">
              Une situation où les données fournies sont incomplètes, équivoques ou contradictoires, empêchant d&apos;aboutir à une certitude absolue.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-indigo-200 rounded-2xl">
            <div className="text-indigo-700 font-black text-base flex items-center gap-2 mb-2">
              <Icon name="shield-exclamation" className="w-5 h-5" />
              <span>Limitation (Frontière du modèle)</span>
            </div>
            <p className="text-xs text-slate-700">
              Une borne inhérente au système (fenêtre de contexte limitée, absence d&apos;accès au réseau temps réel, modèle déconnecté).
            </p>
          </div>
        </div>

        <Callout type="danger">
          <strong>Le danger suprême : l&apos;hallucination masquée.</strong> Le pire comportement d&apos;un agent IA dans un IDE consiste à transformer une incertitude (information manquante) en une certitude inventée de toutes pièces, entraînant des bugs ou des failles silencieuses.
        </Callout>
      </section>

      {/* 2. Les 7 types d'incertitudes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les 7 formes d&apos;incertitudes rencontrées dans l&apos;IDE
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Type d&apos;incertitude</th>
                <th className="p-3 border border-slate-200">Exemple concret</th>
                <th className="p-3 border border-slate-200">Comportement professionnel attendu</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-bold">1. Information manquante</td>
                <td className="p-3 border border-slate-200">Le code fait appel à une fonction externe non fournie.</td>
                <td className="p-3 border border-slate-200">Signaler explicitement l&apos;absence de la signature et refuser de deviner son comportement interne.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">2. Ambiguïté d&apos;instruction</td>
                <td className="p-3 border border-slate-200">« Corrige le bug dans le contrôleur » (alors qu&apos;il y a 4 contrôleurs).</td>
                <td className="p-3 border border-slate-200">Demander une clarification ciblée ou lister les options possibles sans appliquer de modification aveugle.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">3. Contradiction documentaire</td>
                <td className="p-3 border border-slate-200">Le README annonce PostgreSQL 15 mais le docker-compose monte MySQL 8.</td>
                <td className="p-3 border border-slate-200">Mettre en évidence le conflit textuellement et demander l&apos;arbitrage de l&apos;utilisateur.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">4. Obsolescence technique</td>
                <td className="p-3 border border-slate-200">Utilisation d&apos;une bibliothèque dépréciée ou d&apos;un format de hachage obsolète.</td>
                <td className="p-3 border border-slate-200">Préciser la date de dépréciation et suggérer une alternative moderne avec précaution.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">5. Limitation de contexte</td>
                <td className="p-3 border border-slate-200">Un projet de 20 000 lignes de code ne rentre pas dans le prompt.</td>
                <td className="p-3 border border-slate-200">Segmenter l&apos;analyse par modules et indiquer que la vue globale est partielle.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">6. Ressource indisponible</td>
                <td className="p-3 border border-slate-200">Une URL d&apos;API externe ou une base de données locale inaccessible.</td>
                <td className="p-3 border border-slate-200">Fournir un mock ou un plan de contournement sans faire comme si la ressource avait répondu.</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">7. Échec technique d&apos;exécution</td>
                <td className="p-3 border border-slate-200">Erreur 429 (Rate limit) ou timeout de l&apos;API du LLM.</td>
                <td className="p-3 border border-slate-200">Activer le retry exponentiel et dégrader gracieusement le service.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. La méthode en 5 étapes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. La méthode de gestion en 5 étapes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 1</span>
            <div className="font-bold text-slate-950 text-sm">Détecter</div>
            <p className="text-xs text-slate-600 mt-1">Repérer les zones d&apos;ombre et les éléments non prouvés.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 2</span>
            <div className="font-bold text-slate-950 text-sm">Classer</div>
            <p className="text-xs text-slate-600 mt-1">Qualifier la nature du doute selon les 7 catégories.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 3</span>
            <div className="font-bold text-slate-950 text-sm">Évaluer</div>
            <p className="text-xs text-slate-600 mt-1">Mesurer l&apos;impact : bloquant ou secondaire ?</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 4</span>
            <div className="font-bold text-slate-950 text-sm">Choisir</div>
            <p className="text-xs text-slate-600 mt-1">Poser une question, formuler une hypothèse explicite ou refuser l&apos;action.</p>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
            <span className="font-mono text-indigo-700 font-black text-xs block mb-1">ÉTAPE 5</span>
            <div className="font-bold text-slate-950 text-sm">Restituer</div>
            <p className="text-xs text-slate-600 mt-1">Indiquer le niveau de certitude dans le rapport final.</p>
          </div>
        </div>
      </section>

      {/* 4. Prompt professionnel anti-hallucination */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Prompt professionnel : Directive stricte d&apos;intégrité
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`[DIRECTIVE_STRICTE_INTEGRITE]
1. INTERDICTION FORMELLE D'INVENTER :
   Si une information technique n'apparaît pas expressément dans le code ou le document source,
   tu as l'interdiction de la déduire ou de supposer son contenu sans le signaler.

2. CLASSIFICATION DES CONSTATS :
   Pour chaque observation, assigne un niveau de certitude :
   - [CERTITUDE_ELEVEE] : Vérifié directement par une ligne de code visible.
   - [HYPOTHESE_PROBABLE] : Forte probabilité mais dépend d'un composant non inspecté.
   - [INCERTITUDE] : Manque d'information ou contradiction évidente.

3. CONDUITE EN CAS DE DONNEES MANQUANTES :
   N'invente pas de fausses signatures de fonctions. Déclare explicitement :
   "Donnée manquante : Le fichier <nom> est requis pour valider ce point."

4. FORMAT DE RESTITUTION JSON :
{
  "statut": "SUCCES" | "INCOMPLET" | "BLOCAGE",
  "certitude_globale": "ELEVEE" | "MOYENNE" | "FAIBLE",
  "points_verifies": [...],
  "incertitudes_et_manques": [
    {
      "element_douteux": "string",
      "nature": "MANQUE" | "CONTRADICTION" | "AMBIGUITE",
      "impact": "BLOQUANT" | "MINEUR",
      "action_recommandee": "string"
    }
  ]
}`}</pre>
        </div>
      </section>

      {/* 5. Gestion des erreurs en backend Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Implémentation : Retry exponentiel et validation Zod
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`import { GoogleGenAI } from '@google/genai';
import { z } from 'zod';

const ai = new GoogleGenAI();

// Schéma avec niveaux d'incertitude obligatoires
const RapportSchema = z.object({
  certitude: z.enum(['ELEVEE', 'MOYENNE', 'FAIBLE']),
  constats: z.array(z.string()),
  incertitudes: z.array(z.object({
    nature: z.string(),
    description: z.string(),
    bloquant: z.boolean(),
  })),
});

// Fonction d'appel résiliente avec Retry et Exponential Backoff
async function appelerGeminiAvecRetry(prompt, maxRetries = 3) {
  let tentative = 0;
  let delai = 1000; // 1 seconde

  while (tentative < maxRetries) {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });

      // Validation Zod de la réponse générée
      const donnees = RapportSchema.parse(JSON.parse(response.text));
      return donnees;
    } catch (err) {
      tentative++;
      console.warn(\`Tentative \${tentative}/\${maxRetries} échouée : \${err.message}\`);
      if (tentative >= maxRetries) throw new Error('Échec définitif du service IA.');
      await new Promise(resolve => setTimeout(resolve, delai));
      delai *= 2; // Double le délai (Backoff exponentiel)
    }
  }
}`}</pre>
        </div>
      </section>

      {/* TP */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Travaux pratiques (TP 3.41 à 3.44)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.41</span>
            <h4 className="font-bold text-slate-950">Détecteur de manques</h4>
            <p className="text-xs text-slate-700">
              Fournissez une spécification logicielle volontairement trouée (absence de gestion des timeouts) et exigez de l&apos;IA qu&apos;elle dresse la liste des prérequis manquants sans les inventer.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.42</span>
            <h4 className="font-bold text-slate-950">Arbitrage de contradictions</h4>
            <p className="text-xs text-slate-700">
              Soumettez deux extraits de code contradictoires (un contrôleur qui attend un token JWT dans l&apos;en-tête et un middleware qui le cherche dans un cookie) et faites formuler l&apos;incompatibilité.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.43</span>
            <h4 className="font-bold text-slate-950">Règle de sécurité dans Antigravity</h4>
            <p className="text-xs text-slate-700">
              Ajoutez une directive interdisant à l&apos;agent d&apos;exécuter des commandes de terminal destructrices (<code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-xs">rm -rf</code>, <code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-700 font-mono text-xs">git reset --hard</code>) sans confirmation humaine expresse.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.44</span>
            <h4 className="font-bold text-slate-950">Agent résilient complet</h4>
            <p className="text-xs text-slate-700">
              Montez un script Node.js encapsulant la validation Zod, la gestion des erreurs 429 et la restitution structurée des certitudes.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Gestion des incertitudes
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 11"
          questions={[
            {
              id: 1,
              question: 'Quelle est la réaction appropriée d\'un agent professionnel lorsqu\'un fichier d\'entrée est incomplet pour conclure ?',
              options: [
                'Deviner la partie manquante en s\'appuyant sur les conventions les plus fréquentes du web sans rien dire.',
                'Signaler formellement l\'information manquante, qualifier le niveau de certitude comme partiel et demander le document nécessaire.',
                'Refuser immédiatement de démarrer toute analyse, y compris sur les parties parfaitement exploitables.',
                'Affirmer avec certitude que le code est exempt de tout bug.'
              ],
              correctIndex: 1,
              explanation: 'La transparence professionnelle exige de séparer ce qui est validé de ce qui reste inconnu, sans jamais combler les vides par de l\'hallucination non annoncée.'
            },
            {
              id: 2,
              question: 'Pourquoi associer un schéma Zod à la sortie d\'un modèle de langage pour gérer les erreurs ?',
              options: [
                'Zod permet de forcer le typage runtime de la réponse et de rejeter immédiatement toute réponse IA mal formée avant qu\'elle ne pollue l\'application.',
                'Zod remplace l\'utilisation de l\'API Gemini.',
                'Zod garantit que le modèle ne fera jamais d\'erreur logique.',
                'Zod accélère la vitesse de calcul du GPU du modèle.'
              ],
              correctIndex: 0,
              explanation: 'Zod valide la forme et les types au moment de l\'exécution. Si l\'IA omet un champ requis ou renvoie un format invalide, l\'erreur est interceptée proprement par le code backend.'
            }
          ]}
        />
      </section>
    </div>
  );
};

