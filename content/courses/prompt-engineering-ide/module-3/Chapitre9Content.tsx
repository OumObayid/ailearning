'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre9Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 9 — Self-critique et vérification
        </h1>
      </div>

      {/* 1. Définitions et Principes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Qu&apos;est-ce que la Self-Critique et la Self-Verification ?
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans un contexte d&apos;ingénierie logicielle ou d&apos;audit de code, un modèle IA génère souvent une réponse plausible au premier coup d&apos;œil, mais qui peut contenir des hallucinations partielles, des affirmations non prouvées ou des incohérences avec le code réel. La <strong>Self-Critique</strong> et la <strong>Self-Verification</strong> constituent la ligne de défense méthodique contre ces dérives.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-indigo-700 font-black text-lg mb-2">
              <Icon name="magnifying-glass" className="w-5 h-5" />
              <span>Self-Critique</span>
            </div>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              Capacité d&apos;un système à <strong>analyser son propre travail</strong> pour y déceler les faiblesses, manques, hypothèses infondées ou contradictions avant de valider la livraison.
            </p>
          </div>

          <div className="p-5 bg-white border-2 border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-2 text-emerald-700 font-black text-lg mb-2">
              <Icon name="check-circle" className="w-5 h-5" />
              <span>Self-Verification</span>
            </div>
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              Vérification systématique de la conformité du travail produit par rapport à <strong>des critères précis, des contraintes mesurables et des preuves concrètes</strong> issues du document source.
            </p>
          </div>
        </div>

        <Callout type="warning">
          <strong>Règle fondamentale d&apos;indépendance :</strong> La vérification ne doit <em>jamais</em> se baser uniquement sur le texte généré par l&apos;IA lors de l&apos;étape précédente. Elle doit systématiquement <strong>repartir du fichier source ou du code original</strong> pour vérifier si les affirmations y trouvent une justification tangible.
        </Callout>
      </section>

      {/* 2. Comparaison des 3 concepts */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Comparaison : Self-Critique vs Self-Verification vs Self-Correction
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3.5 border border-slate-200">Concept</th>
                <th className="p-3.5 border border-slate-200">Question principale</th>
                <th className="p-3.5 border border-slate-200">Action principale</th>
                <th className="p-3.5 border border-slate-200">Résultat attendu</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-indigo-700">Self-Critique</td>
                <td className="p-3.5 border border-slate-200">« Quelles sont les faiblesses de cette réponse ? »</td>
                <td className="p-3.5 border border-slate-200">Rechercher les manques, biais et affirmations sans preuve</td>
                <td className="p-3.5 border border-slate-200">Liste des constats critiques et points fragiles</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-emerald-700">Self-Verification</td>
                <td className="p-3.5 border border-slate-200">« Cette affirmation est-elle formellement prouvée ? »</td>
                <td className="p-3.5 border border-slate-200">Contrôler les faits, contraintes et critères objectifs</td>
                <td className="p-3.5 border border-slate-200">Score de validation ou verdict conforme/non-conforme</td>
              </tr>
              <tr>
                <td className="p-3.5 border border-slate-200 font-bold text-amber-700">Self-Correction</td>
                <td className="p-3.5 border border-slate-200">« Comment corriger les défauts identifiés ? »</td>
                <td className="p-3.5 border border-slate-200">Réécrire la réponse en éliminant les erreurs relevées</td>
                <td className="p-3.5 border border-slate-200">Version finale épurée, vérifiée et conforme</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Les 5 mécanismes de vérification */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les 5 mécanismes de vérification essentiels
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
              <span>Cohérence interne</span>
            </div>
            <p className="text-xs text-slate-700">
              Vérifier que la conclusion ne contredit pas une étape d&apos;analyse précédente. Les arguments doivent converger logiquement.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
              <span>Conformité factuelle</span>
            </div>
            <p className="text-xs text-slate-700">
              Vérifier que chaque affirmation technique repose sur une ligne de code visible ou une citation textuelle réelle du document.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">3</span>
              <span>Respect des contraintes</span>
            </div>
            <p className="text-xs text-slate-700">
              Valider le format de sortie demandé (JSON strict, Markdown, structure de sections, interdiction de modifier certains fichiers).
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">4</span>
              <span>Complétude de traitement</span>
            </div>
            <p className="text-xs text-slate-700">
              Vérifier qu&apos;aucune question ou consigne de l&apos;utilisateur n&apos;a été oubliée ou éludée dans le rendu final.
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 md:col-span-2 lg:col-span-1">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">5</span>
              <span>Limites et incertitudes</span>
            </div>
            <p className="text-xs text-slate-700">
              S&apos;assurer que les doutes ou informations absentes sont clairement étiquetés comme hypothèses ou incertitudes, et non affirmés comme des vérités absolues.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Le Processus en 4 Étapes */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le cycle opérationnel en 4 étapes
        </h2>
        <div className="flex flex-col md:flex-row gap-3 items-stretch">
          <div className="flex-1 p-4 bg-white border-2 border-indigo-200 rounded-xl text-center">
            <div className="w-8 h-8 mx-auto rounded-full bg-indigo-100 text-indigo-700 font-black flex items-center justify-center mb-2">1</div>
            <h4 className="font-bold text-slate-950">Production</h4>
            <p className="text-xs text-slate-600 mt-1">Génération de la première version de l&apos;analyse ou du code.</p>
          </div>
          <div className="hidden md:flex items-center text-indigo-400 font-bold">→</div>
          <div className="flex-1 p-4 bg-white border-2 border-amber-200 rounded-xl text-center">
            <div className="w-8 h-8 mx-auto rounded-full bg-amber-100 text-amber-700 font-black flex items-center justify-center mb-2">2</div>
            <h4 className="font-bold text-slate-950">Self-Critique</h4>
            <p className="text-xs text-slate-600 mt-1">Examen critique et détection des faiblesses, biais ou imprécisions.</p>
          </div>
          <div className="hidden md:flex items-center text-amber-400 font-bold">→</div>
          <div className="flex-1 p-4 bg-white border-2 border-emerald-200 rounded-xl text-center">
            <div className="w-8 h-8 mx-auto rounded-full bg-emerald-100 text-emerald-700 font-black flex items-center justify-center mb-2">3</div>
            <h4 className="font-bold text-slate-950">Self-Verification</h4>
            <p className="text-xs text-slate-600 mt-1">Contrôle formel basé sur les preuves du document source et grille mesurable.</p>
          </div>
          <div className="hidden md:flex items-center text-emerald-400 font-bold">→</div>
          <div className="flex-1 p-4 bg-white border-2 border-blue-200 rounded-xl text-center">
            <div className="w-8 h-8 mx-auto rounded-full bg-blue-100 text-blue-700 font-black flex items-center justify-center mb-2">4</div>
            <h4 className="font-bold text-slate-950">Self-Correction</h4>
            <p className="text-xs text-slate-600 mt-1">Réécriture intégrant les corrections sans régression.</p>
          </div>
        </div>
      </section>

      {/* 5. Prompt de Self-Critique professionnel */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Prompt professionnel de Self-Critique pour l&apos;IDE
        </h2>
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`[ROLE]
Tu es un auditeur de qualité et de vérification logicielle.

[MISSION]
Examine l'analyse préliminaire fournie ci-dessous à la lumière du code source original. Ton rôle est de traquer toute hallucination, affirmation sans preuve ou incohérence technique.

[CODE_SOURCE_ORIGINAL]
{{code_source}}

[ANALYSE_A_EXAMINER]
{{analyse_preliminaire}}

[METHODE_DE_VERIFICATION]
Pour chaque point soulevé dans l'analyse préliminaire :
1. Vérifie si le fichier et la ligne cités existent réellement.
2. Vérifie si l'affirmation correspond fidèlement au comportement effectif du code.
3. Classe le constat selon l'échelle suivante :
   - VALIDE : Prouvé formellement par le code.
   - PARTIEL : Vrai mais incomplet ou imprécis.
   - NON_PROUVE : Hypothèse plausible mais sans preuve directe dans le code.
   - INVALIDE : Affirmation fausse ou contradictoire avec le code.

[FORMAT_DE_SORTIE_OBLIGATOIRE]
Produis un objet JSON strict :
{
  "statut_global": "CONFORME" | "A_CORRIGER" | "NON_CONFORME",
  "score_fiabilite": <note de 0 a 100>,
  "constats_critiques": [
    {
      "affirmation_analysee": "string",
      "verdict": "VALIDE" | "PARTIEL" | "NON_PROUVE" | "INVALIDE",
      "preuve_code": "string ou null",
      "correction_requise": "string ou null"
    }
  ],
  "analyse_corrigee": "string"
}`}</pre>
        </div>
      </section>

      {/* 6. Grille d'évaluation sur 100 points */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Grille d&apos;évaluation mesurable sur 100 points
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-900 text-sm font-black uppercase">
              <tr>
                <th className="p-3 border border-slate-200">Critère d&apos;évaluation</th>
                <th className="p-3 border border-slate-200">Barème</th>
                <th className="p-3 border border-slate-200">Question de validation</th>
              </tr>
            </thead>
            <tbody className="text-sm font-medium text-slate-800 divide-y divide-slate-200 bg-white">
              <tr>
                <td className="p-3 border border-slate-200 font-bold">1. Justification par le code</td>
                <td className="p-3 border border-slate-200 text-indigo-700 font-bold">25 points</td>
                <td className="p-3 border border-slate-200">Chaque affirmation technique est-elle étayée par un extrait de code exact ?</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">2. Absence d&apos;extrapolation / hallucination</td>
                <td className="p-3 border border-slate-200 text-indigo-700 font-bold">25 points</td>
                <td className="p-3 border border-slate-200">L&apos;agent s&apos;est-il abstenu de deviner des éléments absents du fichier ?</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">3. Exactitude technique de l&apos;explication</td>
                <td className="p-3 border border-slate-200 text-indigo-700 font-bold">20 points</td>
                <td className="p-3 border border-slate-200">L&apos;impact de la vulnérabilité ou du bug décrit est-il exact ?</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">4. Clarté et distinction faits vs doutes</td>
                <td className="p-3 border border-slate-200 text-indigo-700 font-bold">15 points</td>
                <td className="p-3 border border-slate-200">Les incertitudes et limites d&apos;analyse sont-elles signalées explicitement ?</td>
              </tr>
              <tr>
                <td className="p-3 border border-slate-200 font-bold">5. Respect du format imposé</td>
                <td className="p-3 border border-slate-200 text-indigo-700 font-bold">15 points</td>
                <td className="p-3 border border-slate-200">Le JSON ou la structure demandée est-elle scrupuleusement respectée ?</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Implémentation Node.js + Gemini */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Architecture technique : Double appel API dans Express
        </h2>
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans une application backend, la vérification ne doit pas être laissée au hasard d&apos;une seule passe. On effectue deux appels distincts vers l&apos;API Gemini : le premier pour produire l&apos;audit préliminaire, et le second, doté du rôle de vérificateur, pour auditer la première réponse face au code original.
        </p>

        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
          <pre>{`import express from 'express';
import { GoogleGenAI } from '@google/genai';

const app = express();
app.use(express.json());

const ai = new GoogleGenAI();

app.post('/api/audit-with-self-critique', async (req, res) => {
  try {
    const { sourceCode } = req.body;
    if (!sourceCode) {
      return res.status(400).json({ error: 'Code source manquant.' });
    }

    // PASSE 1 : Analyse initiale du code
    const prompt1 = \`
      Tu es un expert en sécurité logicielle.
      Analyse le code suivant et liste les vulnérabilités détectées :
      \${sourceCode}
    \`;
    const rep1 = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt1,
    });
    const premiereAnalyse = rep1.text;

    // PASSE 2 : Self-Critique et vérification indépendante
    const prompt2 = \`
      Tu es un auditeur qualité intransigeant.
      Voici un code source original et une première analyse effectuée.
      
      CODE SOURCE ORIGINAL :
      \${sourceCode}
      
      PREMIERE ANALYSE :
      \${premiereAnalyse}
      
      MISSION :
      1. Vérifie si chaque vulnérabilité listée existe réellement dans le code source.
      2. Si une vulnérabilité repose sur une supposition sans preuve, signale-la.
      3. Produis un rapport épuré sous format JSON strict avec score sur 100.
    \`;

    const rep2 = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt2,
      config: { responseMimeType: 'application/json' },
    });

    const resultatVerifie = JSON.parse(rep2.text);
    return res.json({
      premiereAnalyse,
      resultatVerifie,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});`}</pre>
        </div>
      </section>

      {/* Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Travaux pratiques guidés (TP 3.33 à 3.36)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.33</span>
            <h4 className="font-bold text-slate-950">Prompt de Self-Critique structuré</h4>
            <p className="text-xs text-slate-700">
              Concevez un prompt qui prend en entrée une explication d&apos;architecture générée par une IA et la compare à la documentation technique officielle.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.34</span>
            <h4 className="font-bold text-slate-950">Vérification d&apos;audit Node.js</h4>
            <p className="text-xs text-slate-700">
              Soumettez un faux rapport de sécurité contenant 2 vulnérabilités réelles et 2 fausses alertes à un agent vérificateur et observez son taux de rejet.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.35</span>
            <h4 className="font-bold text-slate-950">Grille de Self-Verification automatisée</h4>
            <p className="text-xs text-slate-700">
              Rédigez un prompt exigeant la notation chiffrée selon les 5 critères (25/25/20/15/15) avec justification obligatoire pour chaque point retranché.
            </p>
          </div>
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-700">TP 3.36</span>
            <h4 className="font-bold text-slate-950">Agent vérificateur dans Antigravity</h4>
            <p className="text-xs text-slate-700">
              Créez une consigne de règle locale dans l&apos;IDE forçant l&apos;agent à vérifier ses diffs Git avant de proposer une modification de code.
            </p>
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Maîtrise de la Self-Critique
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 9"
          questions={[
            {
              id: 1,
              question: 'Sur quelle source la Self-Verification doit-elle prioritairement appuyer son contrôle ?',
              options: [
                'Uniquement sur la première réponse textuelle générée par l\'IA.',
                'Sur le code source ou document original fourni en entrée.',
                'Sur les connaissances générales implicites du grand modèle de langage.',
                'Sur une note de confiance inventée par l\'agent.'
              ],
              correctIndex: 1,
              explanation: 'Pour éviter de valider des hallucinations en boucle, le prompt de vérification doit obligatoirement relire et confronter les affirmations au document original.'
            },
            {
              id: 2,
              question: 'Pourquoi est-il conseillé de séparer la génération et la vérification en deux prompts ou deux étapes ?',
              options: [
                'Parce que les modèles IA ne savent pas générer plus de 50 mots par prompt.',
                'Pour éviter que le modèle ne persiste dans son propre biais de complaisance envers sa production initiale.',
                'Parce que le format JSON ne peut pas être généré dans le premier prompt.',
                'Pour augmenter inutilement le coût en jetons.'
              ],
              correctIndex: 1,
              explanation: 'Séparer la production de la critique permet de confier à l\'étape 2 un rôle d\'auditeur neutre et intransigeant qui réduit l\'inertie cognitive du modèle.'
            }
          ]}
        />
      </section>
    </div>
  );
};

