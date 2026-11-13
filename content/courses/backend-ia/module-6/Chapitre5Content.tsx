'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { WasmWebGpuLab } from '@/components/interactive/WasmWebGpuLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre5Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 w-full max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8 break-words [overflow-wrap:anywhere] min-w-0">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="academic-cap" className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Backend IA — WebAssembly &amp; Accélération Matérielle</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 5 — Exécution locale de modèles d&apos;IA dans le navigateur (Transformers.js &amp; ONNX)
        </h1>
      </div>

      {/* 1. Objectifs */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs pédagogiques du chapitre
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-base font-semibold text-slate-950">
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre la différence fondamentale entre entraînement (apprentissage de poids) et inférence (prédiction en production).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Maîtriser l&apos;écosystème d&apos;inférence client : <strong>Transformers.js</strong> (Hugging Face), <strong>ONNX Runtime Web</strong> et <strong>TensorFlow.js</strong>.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Construire un composant React autonome réalisant une analyse de sentiment en local avec <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">pipeline(&quot;sentiment-analysis&quot;)</code>.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Analyser les arbitrages clés : latence, confidentialité RGPD/Zero-Knowledge, mode hors-ligne vs taille de modèle et consommation mémoire.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Architecturer un système hybride : pré-classification locale ultra-rapide sur WebGPU et escalade vers Google Gemini pour les tâches complexes.</span>
          </li>
        </ul>
      </section>

      {/* 2. Les Deux Paradigmes d'Inférence IA */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Les deux modes d&apos;exécution de l&apos;intelligence artificielle
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 p-5 space-y-3">
            <div className="flex items-center gap-2 text-indigo-900 font-black text-sm uppercase">
              <Icon name="sparkles" className="w-5 h-5 text-indigo-700" />
              <span>A. IA Distante (Google Gemini Cloud)</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed">
              Le navigateur envoie la requête à votre serveur Node.js, qui appelle l&apos;API Google Gemini. L&apos;inférence s&apos;exécute sur les clusters de serveurs TPU/GPU de Google.
            </p>
            <ul className="text-xs text-slate-700 space-y-1 font-semibold">
              <li>⬢ Nécessite une connexion Internet permanente.</li>
              <li>⬢ Puissance de calcul illimitée (1M+ tokens de contexte).</li>
              <li>⬢ Facturation au million de tokens traités.</li>
              <li>⬢ Données transitant par des serveurs tiers.</li>
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 p-5 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-black text-sm uppercase">
              <Icon name="cpu" className="w-5 h-5 text-emerald-700" />
              <span>B. IA Locale (Navigateur WebGPU / WASM)</span>
            </div>
            <p className="text-sm text-slate-800 leading-relaxed">
              Le navigateur télécharge les poids d&apos;un modèle compact (ONNX) et exécute les calculs de prédiction directement sur le processeur (CPU WASM) ou la carte graphique (WebGPU) de l&apos;utilisateur.
            </p>
            <ul className="text-xs text-slate-700 space-y-1 font-semibold">
              <li>⬢ Fonctionne 100% hors-ligne après téléchargement.</li>
              <li>⬢ 0 ⚡ de coût de tokens d&apos;API pour votre backend.</li>
              <li>⬢ Confidentialité absolue (les données ne quittent pas la machine).</li>
              <li>⬢ Modèles limités en taille (souvent &lt; 2 Go pour la RAM client).</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. L'Écosystème des Runtimes IA Côté Client */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. L&apos;écosystème d&apos;outils IA pour le navigateur
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Trois bibliothèques majeures permettent aujourd&apos;hui d&apos;embarquer des modèles d&apos;IA directement dans une application web :
        </p>

        {/* 3 Original Document Logos Stacked Vertically */}
        <div className="space-y-4 min-w-0 max-w-full">
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm space-y-3 break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-6/transformers-js-browser-ai.jpg"
                alt="Logo Transformers.js de Hugging Face"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <h3 className="font-bold text-slate-950 text-base">Transformers.js (Hugging Face)</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Portage officiel de la célèbre bibliothèque Python Transformers. Permet d&apos;exécuter des pipelines complets (sentiment, classification, reconnaissance vocale Whisper, embeddings) en 3 lignes de JavaScript.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm space-y-3 break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-6/onnx-runtime-web-engine.jpg"
                alt="Logo ONNX Runtime de Microsoft"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <h3 className="font-bold text-slate-950 text-base">ONNX Runtime Web (Microsoft)</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Moteur d&apos;inférence multiplateforme ultra-optimisé exécutant le format universel ONNX. Tire parti de WebGPU pour l&apos;accélération graphique et de WebAssembly SIMD pour le processeur.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm space-y-3 break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            <div className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-6/tensorflow-js-browser-ml.jpg"
                alt="Logo TensorFlow.js de Google"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 800px"
              />
            </div>
            <h3 className="font-bold text-slate-950 text-base">TensorFlow.js (Google)</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Bibliothèque historique permettant l&apos;entraînement et l&apos;inférence de modèles TensorFlow dans le navigateur et sous Node.js, exploitant WebGL, WebGPU et WebAssembly.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Matrice Décisionnelle Haute Résolution */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Matrice comparative et architecture hybride
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-80 sm:h-96 md:h-[460px] rounded-xl overflow-hidden bg-slate-950">
            <Image
              src="/images/cours/backend-ia/module-6/browser-ai-vs-cloud-ai-analysis.svg"
              alt="Matrice décisionnelle : IA Distante (Cloud) vs IA Locale (WebGPU)"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
          </div>
          <p className="mt-3 text-xs sm:text-sm text-center text-slate-700 font-semibold">
            Figure 6.3 — Matrice décisionnelle : Pourquoi l&apos;architecture hybride (filtrage local WebGPU + escalade vers Gemini) représente le compromis industriel idéal.
          </p>
        </div>
      </section>

      {/* 5. Démonstration Pratique : Composant React Analyse de Sentiment */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Implémentation React : Analyse de sentiment locale avec Transformers.js
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Voici comment intégrer un pipeline d&apos;IA autonome dans votre frontend React avec la bibliothèque officielle <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">@huggingface/transformers</code> :
        </p>

        <CodeBlock
          filename="AnalyseSentiment.jsx"
          language="jsx"
          code={`import { useState } from "react";
import { pipeline } from "@huggingface/transformers";

export default function AnalyseSentiment() {
  const [texte, setTexte] = useState("");
  const [resultat, setResultat] = useState(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  async function analyser() {
    if (!texte.trim()) return;

    try {
      setChargement(true);
      setErreur("");
      setResultat(null);

      // 1. Initialise le pipeline et télécharge le modèle au premier appel
      // Utilise WebGPU ou WebAssembly en tâche de fond de façon transparente
      const classifier = await pipeline("sentiment-analysis");

      // 2. Exécute l'inférence directement dans le navigateur
      const prediction = await classifier(texte);

      // Résultat : [{ label: 'POSITIVE', score: 0.9998 }]
      setResultat(prediction[0]);
    } catch (err) {
      console.error("[IA Locale Erreur]", err);
      setErreur("Échec du chargement ou de l'exécution du modèle local.");
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white space-y-4">
      <h3 className="text-lg font-bold text-slate-950">
        Analyse de sentiment 100% locale (Zero-Knowledge)
      </h3>

      <textarea
        rows={3}
        value={texte}
        onChange={(e) => setTexte(e.target.value)}
        placeholder="Écrivez une phrase (ex: I love this amazing software)..."
        className="w-full rounded-xl border border-slate-300 p-3 font-medium text-slate-950"
      />

      <button
        onClick={analyser}
        disabled={chargement || !texte.trim()}
        className="rounded-xl bg-indigo-700 px-5 py-2.5 font-bold text-white hover:bg-indigo-600 disabled:opacity-50"
      >
        {chargement ? "Téléchargement / Inférence en cours..." : "Analyser sans serveur"}
      </button>

      {resultat && (
        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
          <p className="font-bold text-slate-950">
            Résultat prédit : <span className="text-indigo-700">{resultat.label}</span>
          </p>
          <p className="text-sm text-slate-700 font-semibold mt-1">
            Indice de confiance : {(resultat.score * 100).toFixed(2)} %
          </p>
        </div>
      )}

      {erreur && <p className="text-sm font-bold text-rose-600">{erreur}</p>}
    </div>
  );
}`}
        />

        <Callout type="note" title="Premier chargement vs Inférences suivantes">
          <p className="text-sm leading-relaxed text-slate-900">
            Lors du tout premier appel, le navigateur télécharge les fichiers du modèle (poids binaires ONNX et tokenizer) et les met en cache dans le stockage <strong>Cache API</strong> du navigateur. Les inférences suivantes s&apos;exécutent instantanément en quelques millisecondes, même si l&apos;utilisateur coupe sa connexion Internet !
          </p>
        </Callout>
      </section>

      {/* 6. Simulateur Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Laboratoire interactif : Inférence Locale vs Inférence Cloud
        </h2>
        <WasmWebGpuLab initialTab="localAi" />
      </section>

      {/* 7. Travaux Pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Travaux Pratiques — Exercices d&apos;application
        </h2>

        <PracticalWork
          title="TP 1 : Conception d'un système hybride en cascade"
          objective="Concevoir une architecture logicielle qui utilise Transformers.js pour détecter le spam ou les demandes hors-sujet dans le navigateur avant d'appeler l'API Google Gemini."
          duration="1 h"
          steps={[
            "Rédigez l'algorithme : l'utilisateur saisit son prompt dans React.",
            "L'IA locale WebGPU exécute un modèle compact de détection de toxicité en 20 ms.",
            "Si le texte est toxique ou vide, rejet immédiat dans l'interface sans aucun coût de serveur.",
            "Si le texte est pertinent, envoi de la requête au backend Node.js qui transmet au modèle Google Gemini 2.5 Flash pour générer la réponse argumentée.",
            "Estimez le pourcentage d'économies de tokens pour une application recevant 100 000 requêtes par jour."
          ]}
        />
      </section>

      {/* 8. Quiz de validation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Quiz de validation des acquis
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Dans une architecture où le modèle s'exécute avec Google Gemini, où a lieu l'inférence ?",
              options: [
                "Dans le navigateur de l'utilisateur",
                "Sur les serveurs et TPU de Google Cloud",
                "Dans le fichier package.json",
                "Sur la carte graphique locale de l'internaute"
              ],
              correctIndex: 1,
              explanation: "Avec Gemini, l'inférence est 100% distante, opérée sur les centres de calcul cloud de Google."
            },
            {
              id: 2,
              question: "Quelle bibliothèque permet d'utiliser les modèles Hugging Face directement en JavaScript dans le navigateur ?",
              options: [
                "Express.js",
                "Transformers.js",
                "Redis",
                "Axios"
              ],
              correctIndex: 1,
              explanation: "Transformers.js est la bibliothèque officielle de Hugging Face permettant d'exécuter des modèles state-of-the-art dans le navigateur."
            },
            {
              id: 3,
              question: "Une application utilisant une IA locale dans le navigateur peut-elle fonctionner sans aucune connexion Internet ?",
              options: [
                "Oui, dès lors que les fichiers du modèle ont été téléchargés et mis en cache",
                "Non, une IA a obligatoirement besoin d'appeler Google à chaque seconde",
                "Uniquement si l'ordinateur possède 64 Go de RAM",
                "Non, WebGPU est un protocole réseau"
              ],
              correctIndex: 0,
              explanation: "Une fois les poids du modèle téléchargés et stockés dans le Cache API du navigateur, l'inférence se déroule intégralement en local hors-ligne."
            },
            {
              id: 4,
              question: "Quel est le principal compromis (trade-off) d'une IA exécutée côté navigateur par rapport à Gemini Cloud ?",
              options: [
                "L'IA locale ne peut pas traiter de texte",
                "Les modèles locaux sont limités en taille (ex: &lt; 2 Go) pour préserver la mémoire et le temps de téléchargement du client",
                "L'IA locale coûte plus cher en abonnements Google",
                "WebGPU est interdit par le W3C"
              ],
              correctIndex: 1,
              explanation: "Un modèle exécuté dans le navigateur doit être compact pour être téléchargé rapidement et tenir dans la RAM disponible sur l'appareil de l'utilisateur."
            }
          ]}
        />
      </section>

      {/* 9. Checklist */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Checklist de fin de chapitre
        </h2>
        <InteractiveChecklist
          items={[
            "J'ai compris la différence entre entraînement (lourd) et inférence (prédiction).",
            "Je sais utiliser pipeline() de Transformers.js pour instancier un modèle dans le navigateur.",
            "J'ai compris comment WebGPU accélère l'exécution des tenseurs matriciels de ces modèles locaux.",
            "Je maîtrise les avantages de l'architecture hybride combinant filtrage local et inférence approfondie Gemini."
          ]}
        />
      </section>

      {/* 10. Bilan Final du Module 6 */}
      <section className="rounded-3xl border-2 border-slate-900 bg-slate-950 text-white p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center gap-2 text-emerald-400 font-extrabold text-sm uppercase tracking-wider">
          <Icon name="check" className="w-5 h-5 text-emerald-400" />
          <span>Félicitations ⬢ Module 6 achevé</span>
        </div>
        <h2 className="text-[19px] font-bold tracking-tight text-white">
          Bilan du Module 6 : WebAssembly, WebGPU &amp; Inférence Côté Client
        </h2>
        <p className="text-slate-300 text-base leading-relaxed">
          Vous maîtrisez désormais les technologies d&apos;exécution les plus avancées du web moderne :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm pt-2 min-w-0">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 break-words [overflow-wrap:anywhere] min-w-0">
            <span className="text-indigo-400 font-bold">Chapitre 1 :</span> Format binaire WebAssembly, syntaxe WAT, instanciation sécurisée dans Node.js et React.
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 break-words [overflow-wrap:anywhere] min-w-0">
            <span className="text-indigo-400 font-bold">Chapitre 2 :</span> Benchmarks scientifiques V8 JIT vs WASM, boucle d&apos;échauffement, gestion de la frontière FFI.
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 break-words [overflow-wrap:anywhere] min-w-0">
            <span className="text-emerald-400 font-bold">Chapitre 3 :</span> Architecture GPU massivement parallèle, API WebGPU, premier Compute Shader WGSL.
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 break-words [overflow-wrap:anywhere] min-w-0">
            <span className="text-emerald-400 font-bold">Chapitre 4 :</span> Grille de Workgroups (<code className="font-mono text-xs">@workgroup_size(64)</code>), dispatch de 1M d&apos;éléments, amortissement du bus PCIe.
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-3 sm:col-span-2 break-words [overflow-wrap:anywhere] min-w-0">
            <span className="text-emerald-400 font-bold">Chapitre 5 :</span> Déploiement de modèles locaux avec Transformers.js &amp; ONNX, confidentialité Zero-Knowledge et architecture hybride avec Gemini.
          </div>
        </div>
      </section>
    </div>
  );
};

