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

export const Chapitre4Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 4 — Calculs GPU dans le navigateur —— Workgroups &amp; Benchmarks
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
            <span>Calculer précisément le nombre de groupes de travail requis : <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">Math.ceil(N / 64)</code>.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Transmettre des métadonnées dynamiques au shader via un buffer de constantes (<code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">UNIFORM</code>).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Protéger les accès mémoires avec la garde conditionnelle <code className="font-mono text-emerald-800 bg-emerald-100 px-1 py-0.5 rounded">if (id.x &gt;= params.nombreElements) return;</code>.</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Mesurer le coût total réel (Transferts PCIe + Préparation + Calcul GPU + Rapatriement).</span>
          </li>
          <li className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
            <Icon name="check" className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <span>Identifier les 4 grands domaines d&apos;excellence du calcul GPU (Traitement d&apos;images, 3D, IA / Tenseurs, Simulation).</span>
          </li>
        </ul>
      </section>

      {/* 2. Les 4 Domaines Majeurs du GPU */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Panorama des domaines d&apos;excellence du calcul GPU
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Le GPU n&apos;est plus seulement réservé aux jeux vidéo : il est devenu le moteur incontournable de l&apos;informatique moderne et de l&apos;intelligence artificielle.
        </p>

        {/* 4 Original Document Images Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-6/webgpu-digital-image-matrix.jpg"
                alt="Matrice de pixels d'une image numérique"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <h3 className="mt-3 font-bold text-slate-950 text-base">1. Traitement d&apos;Images &amp; Vision</h3>
            <p className="text-xs text-slate-700 mt-1">
              Chaque pixel correspond à une cellule d&apos;une matrice 2D/3D. Les filtres de convolution, transformations de couleurs et convolutions de vision par ordinateur sont calculés en parallèle sur des millions de pixels.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-6/webgpu-3d-graphics-rendering.jpg"
                alt="Rendu graphique 3D en maillage fil de fer"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <h3 className="mt-3 font-bold text-slate-950 text-base">2. Graphismes 3D &amp; Rendu</h3>
            <p className="text-xs text-slate-700 mt-1">
              Calcul de millions de polygones, lancer de rayons (Ray Tracing), ombrage dynamique et éclairage réaliste exécutés à 60 ou 120 images par seconde directement dans le navigateur.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-6/webgpu-ai-matrix-tensors.jpg"
                alt="Intelligence artificielle : Tenseurs et réseaux de neurones sur GPU"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <h3 className="mt-3 font-bold text-slate-950 text-base">3. Intelligence Artificielle &amp; Tenseurs</h3>
            <p className="text-xs text-slate-700 mt-1">
              Les couches de réseaux de neurones (Transformers, CNN, MLP) reposent sur des multiplications de matrices massives (<code className="font-mono text-xs">GEMM</code>) où le GPU surclasse le CPU d&apos;un facteur 10x à 50x.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm">
            <div className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-950">
              <Image
                src="/images/cours/backend-ia/module-6/webgpu-scientific-simulation.jpg"
                alt="Simulation scientifique et dynamique des fluides"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
            <h3 className="mt-3 font-bold text-slate-950 text-base">4. Calcul Scientifique &amp; Fluides</h3>
            <p className="text-xs text-slate-700 mt-1">
              Résolution d&apos;équations différentielles aux dérivées partielles, dynamique des fluides, physique des particules et prévisions météorologiques simulées en temps réel.
            </p>
          </div>
        </div>
      </section>

      {/* 3. L'Application Complète de Benchmark */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Banc d&apos;essai complet : Addition de 1 million d&apos;éléments
        </h2>
        <p className="text-base text-slate-900 leading-relaxed font-normal">
          Voici le code de production d&apos;une application complète mesurant la performance sur 1 000 000 de valeurs, intégrant la création des buffers, le dispatching par groupes de 64 et la vérification d&apos;intégrité :
        </p>

        <CodeBlock
          filename="benchmark-webgpu.html"
          language="html"
          code={`<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Benchmark CPU vs WebGPU</title>
</head>
<body style="font-family: sans-serif; padding: 20px;">
  <h1>Comparaison CPU JavaScript vs WebGPU</h1>
  <button id="btn" style="padding: 10px 20px; font-weight: bold; cursor: pointer;">
    Lancer le calcul sur 1 000 000 d'éléments
  </button>
  <pre id="output" style="background: #0f172a; color: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 15px;"></pre>

  <script>
    const N = 1_000_000;
    const btn = document.getElementById("btn");
    const output = document.getElementById("output");

    // 1. Calcul CPU classique
    function additionCPU(A, B) {
      const C = new Float32Array(A.length);
      for (let i = 0; i < A.length; i++) {
        C[i] = A[i] + B[i];
      }
      return C;
    }

    // 2. Calcul WebGPU
    async function additionGPU(device, A, B) {
      const byteSize = A.byteLength;

      // Buffers d'entrée en VRAM
      const bufferA = device.createBuffer({ size: byteSize, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
      const bufferB = device.createBuffer({ size: byteSize, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST });
      device.queue.writeBuffer(bufferA, 0, A);
      device.queue.writeBuffer(bufferB, 0, B);

      // Buffer de sortie
      const bufferResultat = device.createBuffer({ size: byteSize, usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC });

      // Buffer de métadonnées (Uniform)
      const bufferParams = device.createBuffer({ size: 4, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
      device.queue.writeBuffer(bufferParams, 0, new Uint32Array([A.length]));

      // Shader WGSL avec garde de sécurité
      const shaderModule = device.createShaderModule({
        code: \`
          struct Parametres { nombreElements: u32, };
          @group(0) @binding(0) var<storage, read> tableauA: array<f32>;
          @group(0) @binding(1) var<storage, read> tableauB: array<f32>;
          @group(0) @binding(2) var<storage, read_write> resultat: array<f32>;
          @group(0) @binding(3) var<uniform> params: Parametres;

          @compute @workgroup_size(64)
          fn main(@builtin(global_invocation_id) id: vec3u) {
            let index = id.x;
            if (index >= params.nombreElements) { return; }
            resultat[index] = tableauA[index] + tableauB[index];
          }
        \`
      });

      const pipeline = device.createComputePipeline({
        layout: "auto",
        compute: { module: shaderModule, entryPoint: "main" }
      });

      const bindGroup = device.createBindGroup({
        layout: pipeline.getBindGroupLayout(0),
        entries: [
          { binding: 0, resource: { buffer: bufferA } },
          { binding: 1, resource: { buffer: bufferB } },
          { binding: 2, resource: { buffer: bufferResultat } },
          { binding: 3, resource: { buffer: bufferParams } }
        ]
      });

      // Buffer de rapatriement vers le CPU
      const bufferLecture = device.createBuffer({ size: byteSize, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ });

      const encoder = device.createCommandEncoder();
      const pass = encoder.beginComputePass();
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bindGroup);
      pass.dispatchWorkgroups(Math.ceil(A.length / 64));
      pass.end();

      encoder.copyBufferToBuffer(bufferResultat, 0, bufferLecture, 0, byteSize);
      device.queue.submit([encoder.finish()]);

      await bufferLecture.mapAsync(GPUMapMode.READ);
      const resultat = new Float32Array(bufferLecture.getMappedRange().slice(0));
      bufferLecture.unmap();

      // Nettoyage impératif de la VRAM
      bufferA.destroy();
      bufferB.destroy();
      bufferResultat.destroy();
      bufferParams.destroy();
      bufferLecture.destroy();

      return resultat;
    }

    btn.addEventListener("click", async () => {
      btn.disabled = true;
      output.textContent = "Calcul en cours...";

      try {
        const adapter = await navigator.gpu.requestAdapter();
        const device = await adapter.requestDevice();

        const A = new Float32Array(N);
        const B = new Float32Array(N);
        for (let i = 0; i < N; i++) { A[i] = i; B[i] = i * 2; }

        // Test CPU
        const t0 = performance.now();
        const resCPU = additionCPU(A, B);
        const tempsCPU = performance.now() - t0;

        // Test GPU (échauffement préalable puis mesure)
        await additionGPU(device, A, B);
        const t1 = performance.now();
        const resGPU = await additionGPU(device, A, B);
        const tempsGPU = performance.now() - t1;

        output.textContent =
          "�0léments traités : " + N.toLocaleString() + "\\n" +
          "Temps CPU JavaScript : " + tempsCPU.toFixed(2) + " ms\\n" +
          "Temps GPU (Transferts inclus) : " + tempsGPU.toFixed(2) + " ms\\n" +
          "Résultats conformes : " + (resCPU[0] === resGPU[0] && resCPU[N-1] === resGPU[N-1]);

        device.destroy();
      } catch (e) {
        output.textContent = "Erreur : " + e.message;
      } finally {
        btn.disabled = false;
      }
    });
  </script>
</body>
</html>`}
        />

        <Callout type="warning" title="La règle du coût de transfert PCIe">
          <p className="text-sm leading-relaxed text-amber-950">
            Sur une addition très simple, le temps CPU (8 à 15 ms) peut parfois rivaliser avec le GPU (10 à 18 ms) parce que vous payez le transfert des données à travers le bus PCIe. <strong>Le GPU écrase le CPU dès lors que vous enchaînez plusieurs calculs successifs sur les mêmes données</strong> (par exemple, 10 couches d&apos;un réseau de neurones) sans rapatrier les tableaux intermédiaires vers la RAM du CPU.
          </p>
        </Callout>
      </section>

      {/* 4. Simulateur Interactif */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Simulateur interactif
        </h2>
        <WasmWebGpuLab initialTab="workgroups" />
      </section>

      {/* 5. Travaux Pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Travaux Pratiques � Exercices d&apos;application
        </h2>

        <PracticalWork
          title="TP 1 : Calcul de produit scalaire sur GPU"
          objective="Modifier le shader WGSL pour calculer la multiplication de deux vecteurs terme à terme : C[i] = A[i] * B[i]."
          duration="45 min"
          steps={[
            "Ouvrez le shader WGSL et remplacez l'opérateur + par l'opérateur * : resultat[index] = tableauA[index] * tableauB[index];",
            "Initialisez A avec des valeurs flottantes aléatoires et B avec des coefficients d'atténuation.",
            "Exécutez le calcul sur 500 000 éléments.",
            "Vérifiez que le premier élément C[0] vaut bien A[0] * B[0]."
          ]}
        />
      </section>

      {/* 6. Quiz de validation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Quiz de validation des acquis
        </h2>
        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Si nous devons traiter 1 000 éléments avec des groupes de taille 64, combien de workgroups faut-il dispatcher ?",
              options: [
                "15 groupes",
                "16 groupes (car Math.ceil(1000 / 64) = 16)",
                "64 groupes",
                "1000 groupes"
              ],
              correctIndex: 1,
              explanation: "16 groupes de 64 représentent 1 024 invocations. Les 24 invocations au-delà de 1 000 sont ignorées grâce au contrôle if (index >= 1000)."
            },
            {
              id: 2,
              question: "Pourquoi est-il indispensable d'appeler buffer.destroy() sur les GPUBuffer inutilisés ?",
              options: [
                "Pour formater le disque dur",
                "Pour libérer immédiatement la mémoire vidéo VRAM du GPU et éviter les fuites de mémoire matérielle",
                "Pour fermer l'onglet du navigateur",
                "Pour redémarrer Windows"
              ],
              correctIndex: 1,
              explanation: "Contrairement à la RAM JavaScript gérée par le ramasse-miettes, la VRAM GPU est une ressource finie et précieuse qui doit être explicitement libérée."
            },
            {
              id: 3,
              question: "Pourquoi le GPU peut-il sembler plus lent que le CPU sur une petite addition isolée ?",
              options: [
                "Parce que le GPU est bridé",
                "Parce que le temps d'encodage des commandes et de transfert via le bus PCIe dépasse le temps de l'addition elle-même",
                "Parce qu'il faut utiliser Safari",
                "Parce que JavaScript est plus rapide que le C++"
              ],
              correctIndex: 1,
              explanation: "Le goulot d'étranglement initial est la bande passante et la latence du bus de transfert (PCIe) entre la RAM de la carte mère et la VRAM de la carte graphique."
            }
          ]}
        />
      </section>

      {/* 7. Checklist */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Checklist de fin de chapitre
        </h2>
        <InteractiveChecklist
          items={[
            "Je sais calculer le nombre de groupes de travail avec Math.ceil(N / workgroupSize).",
            "Je sais transmettre des paramètres de taille avec un buffer UNIFORM.",
            "J'ai compris l'importance de la clause if (index >= N) return; dans le shader WGSL.",
            "Je détruis systématiquement mes buffers avec buffer.destroy() pour préserver la VRAM."
          ]}
        />
      </section>
    </div>
  );
};

