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

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Introduction à WebGPU —— Architecture matérielle et premier shader WGSL
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
            <span>Distinguer les architectures matérielles : cœurs séquentiels rapides du CPU vs milliers de cœurs parallèles du GPU.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Comprendre pourquoi WebGPU succède à WebGL pour le calcul général (GPGPU) et l&apos;intelligence artificielle.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Vérifier la compatibilité matérielle avec <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">navigator.gpu.requestAdapter()</code> et <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">requestDevice()</code>.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Écrire, compiler et exécuter un Compute Shader en langage <strong>WGSL</strong>.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Transférer les données de la RAM vers la VRAM (<code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">GPUBuffer</code>) et lire les résultats avec <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">mapAsync()</code>.</span>
          </li>
        </ul>
      </section>

      {/* 2. Matériel : CPU vs GPU */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Fondements matériels : CPU séquentiel vs GPU parallèle
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Pour comprendre la puissance de WebGPU, il faut observer l&apos;architecture physique des deux puces principales qui équipent votre machine :
        </p>

        {/* Original Document Images: CPU & GPU */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-6/cpu-hardware-architecture.jpg"
                alt="Architecture matérielle d'un processeur CPU"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <h3 className="mt-3 font-bold text-slate-950 text-base">Le processeur central (CPU)</h3>
            <p className="text-xs text-slate-700 mt-1">
              Composé de quelques cœurs très puissants (4 à 16 cœurs) optimisés pour exécuter des instructions complexes en série avec prédiction de branchement et mémoire cache L1/L2/L3 massive.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-6/gpu-nvidia-parallel-architecture.jpg"
                alt="Architecture matérielle d'un processeur graphique GPU NVIDIA"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <h3 className="mt-3 font-bold text-slate-950 text-base">Le processeur graphique (GPU)</h3>
            <p className="text-xs text-slate-700 mt-1">
              Composé de milliers de cœurs plus simples (2 000 à 16 000 unités ALU) conçus pour exécuter la même opération mathématique simultanément sur d&apos;immenses tableaux de données (SIMD/SIMT).
            </p>
          </div>
        </div>

        <Callout type="tip" title="L'analogie de l'équipe de calcul">
          <p className="text-sm leading-relaxed text-emerald-950">
            Le <strong>CPU</strong> ressemble à une équipe de 8 mathématiciens de génie capables de résoudre n&apos;importe quelle équation complexe à toute allure. Le <strong>GPU</strong> ressemble à un régiment de 10 000 ouvriers qui effectuent chacun une simple addition en même temps au signal sonore. Pour calculer 10 millions d&apos;additions, les 10 000 ouvriers finissent des dizaines de fois plus vite !
          </p>
        </Callout>
      </section>

      {/* 3. Schéma Architectural WebGPU */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Pipeline d&apos;exécution WebGPU : De l&apos;Hôte vers la VRAM
        </h2>
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative w-full h-80 sm:h-96 md:h-[460px] rounded-xl overflow-hidden bg-slate-950">
            <Image
              src="/images/cours/backend-ia/module-6/webgpu-compute-pipeline-architecture.svg"
              alt="Architecture WebGPU : Du code JavaScript au Compute Shader"
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 1000px"
            />
          </div>
          <p className="mt-3 text-xs sm:text-sm text-center text-slate-700 font-semibold">
            Figure 6.2 — Cycle complet : Allocation de buffers en VRAM, encodage des commandes de calcul et lecture asynchrone sécurisée par le CPU.
          </p>
        </div>
      </section>

      {/* 4. Le langage WGSL */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Programmer le GPU avec WGSL (WebGPU Shading Language)
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Pour donner des ordres au GPU, WebGPU utilise son propre langage standardisé : <strong>WGSL</strong>. Contrairement à WebGL qui utilisait GLSL, WGSL a été spécialement conçu dès le départ pour la programmation générale de calculs (GPGPU) :
        </p>

        <CodeBlock
          filename="shader.wgsl"
          language="rust"
          code={`// Déclaration des liaisons de buffers (Bindings)
@group(0) @binding(0)
var<storage, read> tableauA: array<f32>;

@group(0) @binding(1)
var<storage, read> tableauB: array<f32>;

@group(0) @binding(2)
var<storage, read_write> resultat: array<f32>;

// Définition de la fonction de calcul (Compute Shader)
// Chaque groupe de travail traite 64 éléments en parallèle
@compute @workgroup_size(64)
fn main(
  @builtin(global_invocation_id) id: vec3u
) {
  let index = id.x;

  // Sécurité mémoire : évite tout débordement de tampon
  if (index >= arrayLength(&resultat)) {
    return;
  }

  // Chaque thread calcule sa propre position de manière autonome
  resultat[index] = tableauA[index] + tableauB[index];
}`}
        />
      </section>

      {/* 5. Code Complet WebGPU dans le navigateur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Script complet : Exécuter un calcul GPU depuis JavaScript
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Voici le code complet permettant d&apos;additionner 4 nombres en parallèle sur le GPU et de récupérer le résultat :
        </p>

        <CodeBlock
          filename="webgpu-demo.js"
          language="javascript"
          code={`async function runGpuCompute() {
  // 1. Vérification de la compatibilité
  if (!navigator.gpu) {
    throw new Error("WebGPU n'est pas supporté par ce navigateur.");
  }

  // 2. Obtention de l'adaptateur physique et du périphérique logique
  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) throw new Error("Aucun GPU disponible.");
  const device = await adapter.requestDevice();

  // 3. Préparation des données dans des Float32Array (CPU)
  const dataA = new Float32Array([10, 20, 30, 40]);
  const dataB = new Float32Array([1, 2, 3, 4]);
  const byteSize = dataA.byteLength;

  // 4. Allocation des buffers en mémoire vidéo (VRAM GPU)
  const bufferA = device.createBuffer({
    size: byteSize,
    usage: GPUBufferUsage.STORAGE,
    mappedAtCreation: true
  });
  new Float32Array(bufferA.getMappedRange()).set(dataA);
  bufferA.unmap();

  const bufferB = device.createBuffer({
    size: byteSize,
    usage: GPUBufferUsage.STORAGE,
    mappedAtCreation: true
  });
  new Float32Array(bufferB.getMappedRange()).set(dataB);
  bufferB.unmap();

  const bufferResultat = device.createBuffer({
    size: byteSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
  });

  // 5. Création du pipeline de calcul avec le shader WGSL
  const shaderModule = device.createShaderModule({
    code: \`
      @group(0) @binding(0) var<storage, read> tableauA: array<f32>;
      @group(0) @binding(1) var<storage, read> tableauB: array<f32>;
      @group(0) @binding(2) var<storage, read_write> resultat: array<f32>;

      @compute @workgroup_size(64)
      fn main(@builtin(global_invocation_id) id: vec3u) {
        let index = id.x;
        if (index >= arrayLength(&resultat)) { return; }
        resultat[index] = tableauA[index] + tableauB[index];
      }
    \`
  });

  const pipeline = device.createComputePipeline({
    layout: "auto",
    compute: { module: shaderModule, entryPoint: "main" }
  });

  // 6. Association des ressources (BindGroup)
  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: bufferA } },
      { binding: 1, resource: { buffer: bufferB } },
      { binding: 2, resource: { buffer: bufferResultat } }
    ]
  });

  // 7. Encodage et soumission des commandes au GPU
  const encoder = device.createCommandEncoder();
  const pass = encoder.beginComputePass();
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, bindGroup);
  pass.dispatchWorkgroups(1); // 1 groupe de 64 invocations
  pass.end();

  // 8. Buffer de lecture pour rapatrier les résultats vers le CPU
  const bufferLecture = device.createBuffer({
    size: byteSize,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
  });
  encoder.copyBufferToBuffer(bufferResultat, 0, bufferLecture, 0, byteSize);
  device.queue.submit([encoder.finish()]);

  // 9. Attente asynchrone et lecture
  await bufferLecture.mapAsync(GPUMapMode.READ);
  const resultat = new Float32Array(bufferLecture.getMappedRange().slice(0));
  bufferLecture.unmap();

  console.log("Résultat issu du GPU :", Array.from(resultat));
  // Sortie : [11, 22, 33, 44]
}

runGpuCompute().catch(console.error);`}
        />
      </section>

      {/* 6. Simulateur Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Simulateur interactif : Grille de Workgroups WebGPU
        </h2>
        <WasmWebGpuLab initialTab="workgroups" />
      </section>

      {/* 7. Travaux Pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Travaux Pratiques — Exercices d&apos;application
        </h2>

        <PracticalWork
          title="TP 1 : Détecteur de support WebGPU dans votre navigateur"
          objective="Créer un fichier HTML autonome qui teste la présence de navigator.gpu et affiche les caractéristiques matérielles du GPU détecté."
          duration="30 min"
          steps={[
            "Créez un fichier index.html avec une balise <script> moderne.",
            "Vérifiez if (!navigator.gpu) et affichez un message clair si le navigateur est incompatible.",
            "Demandez l'adaptateur avec const adapter = await navigator.gpu.requestAdapter();",
            "Affichez dans la page les limites matérielles du GPU : adapter.limits.maxBufferSize et adapter.limits.maxComputeWorkgroupSizeX."
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
              question: "Quelle est la caractéristique architecturale principale d'un GPU par rapport à un CPU ?",
              options: [
                "Le GPU possède une vitesse d'horloge beaucoup plus rapide",
                "Le GPU possède des milliers de cœurs simples conçus pour exécuter la même instruction en parallèle",
                "Le GPU ne peut fonctionner qu'avec des chaînes de caractères",
                "Le GPU remplace obligatoirement la carte réseau"
              ],
              correctIndex: 1,
              explanation: "Le GPU est un processeur massivement parallèle, optimisé pour appliquer une opération mathématique simultanément sur de volumineux ensembles de données."
            },
            {
              id: 2,
              question: "Quel langage de shaders officiel est utilisé par la spécification WebGPU ?",
              options: [
                "GLSL",
                "HLSL",
                "WGSL (WebGPU Shading Language)",
                "JavaScript pur"
              ],
              correctIndex: 2,
              explanation: "WGSL est le langage de programmation standardisé du W3C conçu exclusivement pour écrire les shaders WebGPU."
            },
            {
              id: 3,
              question: "Pourquoi JavaScript ne peut-il pas lire directement dans le buffer où le GPU écrit ses calculs ?",
              options: [
                "Parce que le GPU est physiquement situé dans la VRAM et nécessite un buffer mappable (MAP_READ) pour être lu par le CPU",
                "Parce qu'il faut redémarrer l'ordinateur",
                "Parce que JavaScript n'a pas le droit d'utiliser des tableaux",
                "Parce que Google Gemini bloque la lecture"
              ],
              correctIndex: 0,
              explanation: "Les buffers de calcul GPU haute performance résident en VRAM non mappable directement ; il faut copier le résultat vers un buffer créé avec l'indicateur MAP_READ et appeler mapAsync()."
            },
            {
              id: 4,
              question: "Que signifie @workgroup_size(64) dans un Compute Shader WGSL ?",
              options: [
                "Que le shader doit tourner pendant 64 secondes",
                "Que le calcul est découpé en groupes de 64 invocations parallèles exécutées simultanément",
                "Que la mémoire est limitée à 64 octets",
                "Que 64 fenêtres de navigateur s'ouvrent"
              ],
              correctIndex: 1,
              explanation: "Cela configure la dimension matérielle du groupe de travail : 64 threads exécutent le corps du shader en parallèle pour chaque workgroup dispatche."
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
            "J'ai compris la différence entre un cœur séquentiel CPU et les milliers d'ALU parallèles d'un GPU.",
            "Je sais initialiser l'adaptateur et le périphérique avec navigator.gpu.requestDevice().",
            "Je sais écrire un shader de calcul basique en langage WGSL avec @compute.",
            "J'ai compris le mécanisme de copie vers un buffer mappable (MAP_READ) pour récupérer le résultat dans JavaScript."
          ]}
        />
      </section>
    </div>
  );
};

