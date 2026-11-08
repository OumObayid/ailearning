'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { WasmWebGpuLab } from '@/components/interactive/WasmWebGpuLab';
import { Icon } from '@/components/common/Icon';

export const Chapitre1Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 1 — Comprendre WebAssembly (WASM) et son exécution binaire
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
            <span>Comprendre les origines et les motivations ayant conduit à la création de WebAssembly par le W3C.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Déchiffrer la structure binaire d&apos;un fichier <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">.wasm</code> et sa représentation textuelle (WAT).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Charger, compiler et instancier un module binaire dans Node.js avec <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">WebAssembly.instantiate</code>.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Identifier le modèle de sécurité en bac à sable (Sandbox) et l&apos;absence d&apos;accès direct au DOM ou au système.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Articuler la collaboration entre JavaScript (orchestration) et WebAssembly (calcul intensif).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre les applications réelles de WASM dans les pipelines d&apos;IA (prétraitement, tokenisation locale, inférence).</span>
          </li>
        </ul>
      </section>

      {/* 2. Pourquoi WebAssembly existe-t-il ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Pourquoi WebAssembly existe-t-il ?
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Imaginez une application web React moderne qui doit accomplir des traitements lourds : redimensionner plusieurs centaines de photos haute définition, décompresser une archive volumineuse, traiter des spectrogrammes audio ou effectuer des calculs matriciels pour l&apos;IA.
        </p>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          JavaScript peut théoriquement réaliser ces calculs. Mais en tant que langage à typage dynamique interprété puis compilé à la volée (JIT), les calculs mathématiques intensifs peuvent entraîner une forte consommation CPU, des latences imprévisibles et des ralentissements sensibles de l&apos;interface utilisateur.
        </p>

        <Callout type="note" title="Définition officielle de WebAssembly (WASM)">
          <p className="text-sm leading-relaxed text-slate-900">
            <strong>WebAssembly (WASM)</strong> est un standard ouvert du W3C définissant un format de code binaire compact et portable, conçu pour s&apos;exécuter à vitesse proche du natif dans les environnements hôtes comme les navigateurs web et le runtime Node.js.
          </p>
        </Callout>

        <Callout type="warning" title="WASM ne remplace pas JavaScript !">
          <p className="text-sm leading-relaxed text-amber-950">
            Une idée fausse très répandue consiste à croire que WebAssembly a été créé pour éliminer JavaScript. C&apos;est inexact : <strong>JavaScript et WebAssembly collaborent main dans la main</strong>. JavaScript gère l&apos;interface graphique, les événements utilisateurs et les requêtes réseau, tandis que WebAssembly intervient comme un accélérateur ponctuel pour les calculs intensifs.
          </p>
        </Callout>
      </section>

      {/* 3. Le parcours de compilation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Le cycle de vie d&apos;un programme WebAssembly
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Contrairement à JavaScript, WebAssembly n&apos;est que très rarement rédigé à la main sous forme binaire. Il est le produit de compilation de langages fortement typés tels que C, C++, Rust, Zig ou Go :
        </p>

        <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-6 space-y-4">
          <div className="text-sm font-bold text-slate-950 uppercase tracking-wider">
            Chaîne de transformation d&apos;un module WASM
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
            <div className="rounded-xl border border-slate-300 bg-white p-4 space-y-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-white font-bold text-xs">1</span>
              <h3 className="font-bold text-slate-950">Code Source C / Rust</h3>
              <p className="text-xs text-slate-700">Le développeur écrit son algorithme optimisé avec types stricts (int32, float64).</p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-white p-4 space-y-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-white font-bold text-xs">2</span>
              <h3 className="font-bold text-slate-950">Compilation AOT</h3>
              <p className="text-xs text-slate-700">Le compilateur (Emscripten, clang, rustc) transforme le code en bytecode <code className="font-mono">.wasm</code>.</p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-white p-4 space-y-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-white font-bold text-xs">3</span>
              <h3 className="font-bold text-slate-950">Moteur V8 / Hôte</h3>
              <p className="text-xs text-slate-700">Le navigateur ou Node.js charge les octets et vérifie l&apos;intégrité binaire en sandbox.</p>
            </div>
            <div className="rounded-xl border border-slate-300 bg-white p-4 space-y-1">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-700 text-white font-bold text-xs">4</span>
              <h3 className="font-bold text-slate-950">Appel JavaScript</h3>
              <p className="text-xs text-slate-700">JavaScript appelle les fonctions exportées via <code className="font-mono">instance.exports</code> en toute transparence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Le format textuel WAT (WebAssembly Text Format) */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Le format textuel WAT (WebAssembly Text Format)
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Pour permettre aux humains de lire et de déboguer le bytecode binaire, il existe une syntaxe textuelle appelée <strong>WAT</strong> basée sur des S-expressions (similaires à Lisp) :
        </p>

        <CodeBlock
          filename="addition.wat"
          language="clike"
          code={`(module
  ;; Déclaration d'une fonction d'addition prenant 2 entiers 32-bit et renvoyant un entier 32-bit
  (func $addition (param $a i32) (param $b i32) (result i32)
    local.get $a    ;; Empile le premier paramètre
    local.get $b    ;; Empile le second paramètre
    i32.add         ;; Dépile les 2 valeurs, effectue l'addition machine, empile la somme
  )
  ;; Exporte la fonction pour qu'elle devienne appelable depuis JavaScript
  (export "addition" (func $addition))
)`}
        />

        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Ce code est une machine à pile (stack machine). Les instructions déposent et retirent des valeurs directement sur la pile de calcul, garantissant une exécution déterministe et ultra-rapide.
        </p>
      </section>

      {/* 5. Exécution pratique dans Node.js */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Exécution pratique d&apos;un module WASM dans Node.js
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Voici le code Node.js complet permettant de charger directement en mémoire les octets binaires correspondants et d&apos;appeler la fonction native <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">addition(10, 20)</code> :
        </p>

        <CodeBlock
          filename="server.js"
          language="javascript"
          code={`// Représentation binaire Uint8Array du module WASM compilé
const wasmCode = new Uint8Array([
  // En-tête magique WebAssembly (\0asm) et version 1
  0x00, 0x61, 0x73, 0x6d,
  0x01, 0x00, 0x00, 0x00,

  // Section Type : signature de fonction (i32, i32) -> i32
  0x01, 0x07, 0x01, 0x60,
  0x02, 0x7f, 0x7f, 0x01, 0x7f,

  // Section Function : déclare 1 fonction utilisant le type 0
  0x03, 0x02, 0x01, 0x00,

  // Section Export : exporte le nom public "addition"
  0x07, 0x0c, 0x01, 0x08,
  0x61, 0x64, 0x64, 0x69,
  0x74, 0x69, 0x6f, 0x6e,
  0x00, 0x00,

  // Section Code : instructions machine (local.get 0, local.get 1, i32.add, end)
  0x0a, 0x09, 0x01, 0x07,
  0x00, 0x20, 0x00, 0x20,
  0x01, 0x6a, 0x0b
]);

async function main() {
  // 1. Compilation des octets binaires dans le moteur V8
  const module = await WebAssembly.compile(wasmCode);

  // 2. Instanciation avec son espace mémoire isolé
  const instance = await WebAssembly.instantiate(module);

  // 3. Appel direct de la fonction compilée depuis JavaScript
  const resultat = instance.exports.addition(10, 20);

  console.log("Résultat calculé par le moteur WebAssembly :", resultat);
  // Sortie attendue : Résultat calculé par le moteur WebAssembly : 30
}

main().catch(console.error);`}
        />

        <div className="rounded-xl border border-slate-300 bg-slate-900 text-slate-100 p-4 font-mono text-xs space-y-1">
          <div className="text-emerald-400 font-bold">{'// Anatomie de l\'appel :'}</div>
          <p>1. JavaScript transmet les valeurs 10 et 20 à la frontière FFI.</p>
          <p>2. Le moteur WASM place 10 et 20 dans ses registres CPU.</p>
          <p>3. L&apos;instruction machine i32.add s&apos;exécute en 1 cycle d&apos;horloge.</p>
          <p>4. La valeur 30 est retournée à la variable JavaScript resultat.</p>
        </div>
      </section>

      {/* 6. Où s'exécute WebAssembly ? */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Où WebAssembly s&apos;exécute-t-il ?
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm text-slate-900 border-collapse">
            <thead className="bg-slate-100 text-slate-950 font-black border-b border-slate-300">
              <tr>
                <th className="p-3">Environnement</th>
                <th className="p-3">Rôle &amp; Avantage</th>
                <th className="p-3">Cas d&apos;usage typique</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              <tr className="bg-white">
                <td className="p-3 font-bold text-slate-950">Navigateur Web</td>
                <td className="p-3">Exécute du code C/Rust directement sur le poste client sans plugin</td>
                <td className="p-3">Figma, compression d&apos;images, jeux vidéo, Photoshop Web</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-3 font-bold text-slate-950">Node.js (Backend)</td>
                <td className="p-3">Module universel sans recompilation native dépendante de l&apos;OS (C++ Addons)</td>
                <td className="p-3">Cryptographie, parsing de formats binaires, tokenisation IA</td>
              </tr>
              <tr className="bg-white">
                <td className="p-3 font-bold text-slate-950">Runtimes Dédiés (Wasmtime, Wasmer)</td>
                <td className="p-3">Micro-serveurs serverless ultra-légers avec démarrage en &lt; 1 milliseconde</td>
                <td className="p-3">Edge Computing, Cloudflare Workers, Fastly Compute@Edge</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Simulateur Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Simulateur interactif : Benchmark WASM vs JavaScript
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Explorez le simulateur ci-dessous pour tester l&apos;impact de l&apos;accélération WASM sur des millions d&apos;itérations mathématiques :
        </p>
        <WasmWebGpuLab initialTab="wasmVsJs" />
      </section>

      {/* 8. Travaux Pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Travaux Pratiques � Exercices d&apos;application
        </h2>

        <PracticalWork
          title="TP 1 : Inspection et chargement d'un module binaire"
          objective="Créer un script Node.js qui instancie le module binaire d'addition et teste des additions avec des entiers 32-bit positifs et négatifs."
          duration="30 min"
          steps={[
            "Créez un fichier wasm-test.js et collez la déclaration Uint8Array du module d'addition.",
            "Ajoutez une fonction asynchrone appelant instance.exports.addition(50, -20).",
            "Vérifiez que le résultat retourné est exactement 30.",
            "Inspectez l'objet instance.exports avec console.log(Object.keys(instance.exports)) pour observer les symboles exportés."
          ]}
        />

        <PracticalWork
          title="TP 2 : Architecture de compression d'images pour l'IA"
          objective="Concevoir la répartition des responsabilités d'une application React d'analyse d'images par Gemini intégrant une bibliothèque WASM."
          duration="45 min"
          steps={[
            "Définissez le rôle de React : sélection du fichier via <input type='file'> et affichage de la prévisualisation.",
            "Définissez le rôle de WebAssembly : compression de l'image cliente de 12 Mo à 400 Ko en mémoire vive sans bloquer le thread.",
            "Définissez le rôle de Node.js : réception du payload allégé et transmission au modèle Gemini.",
            "Calculez le gain en bande passante et en latence réseau lors de l'envoi."
          ]}
        />
      </section>

      {/* 9. Quiz de validation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Quiz de validation des acquis
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Qu'est-ce que WebAssembly (WASM) ?",
              options: [
                "Un framework frontend concurrent de React",
                "Un format de code binaire compact conçu pour être exécuté par des moteurs compatibles comme V8",
                "Un outil de gestion de base de données relationnelle",
                "Un protocole réseau remplaçant HTTP/3"
              ],
              correctIndex: 1,
              explanation: "WASM est un standard ouvert du W3C spécifiant un format d'instructions binaires de bas niveau exécuté de façon sécurisée et rapide."
            },
            {
              id: 2,
              question: "Quels langages de programmation peuvent être compilés en WebAssembly ?",
              options: [
                "Uniquement le C",
                "Uniquement Rust",
                "C, C++, Rust, Zig, Go et d'autres langages via LLVM",
                "Uniquement JavaScript"
              ],
              correctIndex: 2,
              explanation: "Tout langage disposant d'un backend LLVM ou d'un compilateur dédié peut cibler l'architecture WASM."
            },
            {
              id: 3,
              question: "ì quoi sert la propriété instance.exports lors de l'instanciation WebAssembly en JavaScript ?",
              options: [
                "ì exporter le code JavaScript vers GitHub",
                "ì accéder aux fonctions et mémoires partagées exposées par le module binaire compilé",
                "ì démarrer le serveur Express",
                "ì initialiser Docker"
              ],
              correctIndex: 1,
              explanation: "L'objet instance.exports regroupe l'ensemble des symboles (fonctions, variables globales, buffers mémoire) rendus accessibles par le module WASM."
            },
            {
              id: 4,
              question: "Un module WebAssembly a-t-il un accès direct illimité au système de fichiers ou au DOM du navigateur ?",
              options: [
                "Oui, il possède les mêmes droits qu'un processus administrateur natif",
                "Non, il s'exécute dans un bac à sable (sandbox) hermétique et doit passer par les API exposées par l'hôte",
                "Oui, uniquement sous Windows",
                "Oui, uniquement sous Google Chrome"
              ],
              correctIndex: 1,
              explanation: "Par conception de sécurité, WASM s'exécute dans un bac à sable strict sans accès au réseau, au disque ou au DOM sans médiation de JavaScript ou du runtime."
            },
            {
              id: 5,
              question: "Dans quel scénario WebAssembly apporte-t-il le plus grand gain de performance ?",
              options: [
                "Pour changer la couleur d'un bouton au clic",
                "Pour faire un console.log",
                "Pour des calculs mathématiques, de la compression, de la cryptographie ou du traitement multimédia lourd",
                "Pour envoyer une requête fetch() basique"
              ],
              correctIndex: 2,
              explanation: "WASM brille sur les calculs CPU intensifs où le temps de calcul pur dépasse largement le coût de transition FFI entre JavaScript et le module binaire."
            }
          ]}
        />
      </section>

      {/* 10. Checklist */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Checklist de fin de chapitre
        </h2>
        <InteractiveChecklist
          items={[
            "J'ai compris que WebAssembly ne remplace pas JavaScript mais le complète pour les calculs lourds.",
            "Je sais que le format WAT est la représentation textuelle lisible du bytecode binaire .wasm.",
            "J'ai réussi à instancier un module binaire dans Node.js avec WebAssembly.instantiate.",
            "J'ai compris que WASM fonctionne aussi bien dans le navigateur qu'au sein de Node.js.",
            "J'ai assimilé le modèle de sécurité en bac à sable (sandbox) sans accès direct au système hôte."
          ]}
        />
      </section>
    </div>
  );
};

