'use client';

import React from 'react';
import Image from 'next/image';
import { Callout } from '@/components/courses/Callout';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { InteractiveChecklist } from '@/components/courses/InteractiveChecklist';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Communication entre threads —— messages et données
        </h1>
      </div>

      {/* 1. Comprendre la communication */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Canaux de communication entre le Parent et le Worker
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Chaque thread dispose de son propre contexte d&apos;exécution. Pour échanger des données, ils s&apos;appuient sur un canal bidirectionnel symétrique :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl border-2 border-slate-300 bg-white p-5 space-y-2">
            <span className="text-xs font-black uppercase text-indigo-700">Du Parent vers le Worker</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">worker.postMessage(data)</h3>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              Le thread principal émet des données reçues côté Worker via <code className="font-mono font-bold bg-slate-100 px-1 py-0.5 rounded">parentPort.on(&apos;message&apos;, data =&gt; ...)</code>.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-indigo-300 bg-indigo-50/50 p-5 space-y-2">
            <span className="text-xs font-black uppercase text-indigo-950">Du Worker vers le Parent</span>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">parentPort.postMessage(result)</h3>
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              Le Worker renvoie son calcul, capté côté parent par <code className="font-mono font-bold bg-white px-1 py-0.5 rounded border border-indigo-200">worker.on(&apos;message&apos;, result =&gt; ...)</code>.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Structured Clone Algorithm */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. L&apos;algorithme de clonage structuré (Structured Clone)
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Par défaut, lorsque vous passez un objet JavaScript dans <code className="font-mono font-bold bg-slate-200 px-1.5 py-0.5 rounded text-indigo-950">postMessage()</code>, Node.js ne passe <strong>pas</strong> la référence de l&apos;objet original en mémoire : il en crée une copie profonde intégrale.
        </p>

        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
          <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} Démonstration de l&apos;indépendance des copies</span>
          <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`const utilisateur = { nom: "Ahmed", age: 25 };

worker.postMessage(utilisateur);

// Modifier l'âge immédiatement après l'envoi :
utilisateur.age = 40;

// Le Worker recevra quand même { nom: "Ahmed", age: 25 } !
// Car les deux objets vivent désormais dans des mémoires séparées.`}
          </pre>
        </div>

        <Callout type="warning" title="Ce qui est interdit au clonage structuré">
          <p>
            Vous ne pouvez <strong>pas transmettre de fonctions</strong>, de méthodes de classe ou d&apos;instances avec des prototypes personnalisés. L&apos;envoi d&apos;un objet contenant une fonction lèvera une erreur système <code className="font-bold">DOMException / DataCloneError</code>. Ne transmettez que des données pures (JSON, primitives, buffers).
          </p>
        </Callout>
      </section>

      {/* 3. Copier vs Transférer */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Copier ou transférer des données ? (ArrayBuffer Transfer)
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Pour des données de plusieurs dizaines de mégaoctets (ex: image haute définition, audio ou fichier vectoriel pour un modèle d&apos;IA), cloner la mémoire prend du temps et double la RAM consommée. La solution consiste à <strong>transférer la propriété du buffer</strong> :
        </p>

        {/* IMAGE 9 : Transfer ownership ArrayBuffer */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/transfer-ownership-arraybuffer.jpeg"
              alt="Transfert de propriété d'un ArrayBuffer entre Worker 1 et Worker 2 sans duplication mémoire"
              width={900}
              height={450}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.9 — Mécanisme de transfert : la propriété du bloc binaire est déplacée vers le Worker récepteur. L&apos;original dans le parent est immédiatement « détaché » (byteLength = 0).
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
          <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} Syntaxe du transfert (second argument sous forme de tableau)</span>
          <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`const buffer = new ArrayBuffer(1024); // 1 Ko de mémoire binaire
console.log("Taille avant transfert :", buffer.byteLength); // 1024

// On passe le buffer en second argument pour signaler le transfert :
worker.postMessage(buffer, [buffer]);

console.log("Taille après transfert :", buffer.byteLength); // 0 (Détaché !)`}
          </pre>
        </div>
      </section>

      {/* 4. Mémoire partagée (SharedArrayBuffer) */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. La mémoire partagée : SharedArrayBuffer
        </h2>

        <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
          Au lieu de copier ou de perdre l&apos;accès par transfert, <code className="font-mono font-bold text-indigo-700">SharedArrayBuffer</code> alloue une zone mémoire commune visible simultanément par le thread principal et tous les Workers :
        </p>

        {/* IMAGE 10 : SharedArrayBuffer Shared Memory */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-6 shadow-sm space-y-3">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-50">
            <Image
              src="/images/cours/backend-ia/module-2/shared-memory-sharedarraybuffer.jpeg"
              alt="Shared Memory Space avec SharedArrayBuffer entre Main Thread et Worker Thread"
              width={800}
              height={400}
              className="h-auto w-full object-contain"
            />
          </div>
          <p className="text-center text-sm font-bold text-slate-800">
            Figure 2.10 — SharedArrayBuffer : les deux threads lisent et écrivent directement sur la même zone physique sans aucun transfert de message.
          </p>
        </div>
      </section>

      {/* 5. TP Pratique : Microservice d'analyse de texte */}
      <PracticalWork
        title="5. TP Pratique : Microservice Express d'analyse textuelle par Worker"
        objective="Recevoir un texte en JSON, le transmettre à un Worker Thread et renvoyer les statistiques calculées"
        steps={[
          "Créer analyseWorker.js pour compter les mots et formater en majuscules",
          "Créer la route POST /api/analyser avec validation du payload",
          "Gérer proprement la fin du Worker et les erreurs potentielles"
        ]}
      >
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white">
            <span className="text-xs font-mono uppercase text-indigo-300 font-bold block mb-2">{'//'} analyseWorker.js</span>
            <pre className="font-mono text-sm leading-relaxed text-indigo-100 overflow-x-auto">
{`const { parentPort } = require("node:worker_threads");

parentPort.on("message", (texte) => {
  const nombreCaracteres = texte.length;
  const mots = texte.trim().split(/\\s+/);
  const nombreMots = texte.trim() === "" ? 0 : mots.length;

  parentPort.postMessage({
    nombreCaracteres,
    nombreMots,
    majuscules: texte.toUpperCase()
  });
});`}
            </pre>
          </div>
        </div>
      </PracticalWork>

      {/* 6. Exercices interactifs */}
      <section className="space-y-6">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Exercices de validation des acquis
        </h2>

        <QuickQuiz
          title="Question 1 — Envoi Parent vers Worker"
          question="Quelle instruction permet au thread principal d'envoyer une charge utile au Worker Thread ?"
          options={[
            "worker.postMessage(data)",
            "parentPort.postMessage(data)",
            "worker.send(data)"
          ]}
          correctIndex={0}
          explanation="Sur l'instance du Worker dans le thread principal, on appelle la méthode worker.postMessage(data)."
        />

        <QuickQuiz
          title="Question 2 — Conséquence du transfert d'un ArrayBuffer"
          question="Que devient l'ArrayBuffer dans le thread parent immédiatement après avoir été transféré avec worker.postMessage(buf, [buf]) ?"
          options={[
            "Il reste lisible et modifiable",
            "Il est détaché et sa propriété byteLength passe instantanément à 0",
            "Il est converti en chaîne de caractères JSON"
          ]}
          correctIndex={1}
          explanation="Le transfert déplace le pointeur mémoire vers le Worker. Pour éviter tout risque d'accès concurrent, le moteur détache le buffer du parent qui ne peut plus y accéder."
        />

        <QuickQuiz
          title="Question 3 — Événement en cas de crash du Worker"
          question="Quel écouteur d'événement doit impérativement être configuré sur le Worker pour éviter qu'une exception non gérée ne plante tout le serveur ?"
          options={[
            "worker.on('error', (err) => ...)",
            "worker.on('crash', ...)",
            "process.on('worker_fail', ...)"
          ]}
          correctIndex={0}
          explanation="L'événement 'error' capte toute exception non interceptée dans le Worker. Sans cet écouteur, l'erreur remonte et provoque l'arrêt brutal du processus Node.js tout entier."
        />
      </section>

      {/* 7. Checklist bilan */}
      <InteractiveChecklist
        title="7. Validation des acquis du Chapitre 3"
        items={[
          "Je comprends le fonctionnement symétrique de postMessage et parentPort.",
          "Je maîtrise le Structured Clone Algorithm et ses limites (interdiction des fonctions).",
          "Je sais transférer un ArrayBuffer pour économiser la mémoire sur les gros fichiers.",
          "Je sais écouter 'message', 'error' et 'exit' pour sécuriser le cycle de vie du Worker.",
          "J'ai compris l'utilité future de SharedArrayBuffer pour la mémoire partagée."
        ]}
      />
    </div>
  );
};

