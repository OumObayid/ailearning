'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { Icon } from '@/components/common/Icon';

export const Chapitre2Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 2 — Initialisation et organisation du projet Node.js / Express
        </h1>
      </div>

      {/* 1. Objectifs du chapitre */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs du chapitre
        </h2>
        <p className="text-base text-slate-900 font-medium">
          Nous allons créer l&apos;environnement technique du backend qui accueillera les fonctionnalités de notre application.
        </p>
        <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-5 space-y-3">
          <p className="text-sm font-black text-amber-950 uppercase tracking-wide">
            À la fin de ce chapitre, vous serez capable de :
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Initialiser un projet Node.js avec TypeScript.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Installer et configurer Express avec CORS.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Organiser le code selon une architecture modulaire.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Configurer les variables d&apos;environnement.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Créer un serveur HTTP et gérer le cycle de vie.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Tester les premières routes API avec Postman.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Création du projet */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Création du projet
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Créons le dossier principal et initialisons le sous-dossier backend avec Node.js :
        </p>
        <CodeBlock
          filename="Terminal (PowerShell / Bash)"
          language="bash"
          code={`mkdir intelligent-analysis
cd intelligent-analysis
mkdir backend
cd backend
npm init -y`}
        />
        <p className="text-sm text-slate-700">
          Cette commande génère le fichier <code className="font-mono font-bold text-amber-900">package.json</code>, qui contient les informations du projet et ses dépendances.
        </p>
      </section>

      {/* 3. Installation des dépendances */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Installation des dépendances
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Installons Express, les outils d&apos;environnement et les types stricts TypeScript :
        </p>
        <CodeBlock
          filename="Installation npm"
          language="bash"
          code={`npm install express dotenv cors
npm install -D typescript tsx @types/node @types/express @types/cors`}
        />
        <div className="overflow-x-auto rounded-xl border border-slate-200 mt-3">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-4">Dépendance</th>
                <th className="py-2.5 px-4">Rôle dans le projet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-slate-950">express</td>
                <td className="py-2 px-4">Création du serveur et des routes HTTP.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-slate-950">dotenv</td>
                <td className="py-2 px-4">Chargement des variables d&apos;environnement (.env).</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-slate-950">cors</td>
                <td className="py-2 px-4">Gestion des autorisations d&apos;accès entre origines (Cross-Origin).</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-slate-950">typescript</td>
                <td className="py-2 px-4">Compilateur et vérificateur de typage statique.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-slate-950">tsx</td>
                <td className="py-2 px-4">Exécution directe ultra-rapide des fichiers TypeScript avec rechargement.</td>
              </tr>
              <tr>
                <td className="py-2 px-4 font-mono font-bold text-slate-950">@types/*</td>
                <td className="py-2 px-4">Déclarations de types pour l&apos;autocomplétion et la robustesse de l&apos;IDE.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. Configuration de TypeScript */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Configuration de TypeScript
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Initialisez le fichier de configuration avec <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded">npx tsc --init</code> et appliquez cette configuration moderne :
        </p>
        <CodeBlock
          filename="backend/tsconfig.json"
          language="json"
          code={`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "sourceMap": true
  },
  "include": ["src"]
}`}
        />
      </section>

      {/* 5. Organisation des dossiers */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Organisation des dossiers
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Créons l&apos;architecture cible dans <code className="font-mono font-bold text-amber-900">backend/</code> :
        </p>
        <CodeBlock
          filename="Arborescence du backend"
          language="text"
          code={`backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── database/
│   ├── cache/
│   ├── workers/
│   ├── middlewares/
│   └── app.ts
├── .env
├── .gitignore
├── package.json
└── tsconfig.json`}
        />
        <p className="text-sm text-slate-700">
          Ces dossiers seront alimentés au fil des chapitres selon une séparation des responsabilités stricte.
        </p>
      </section>

      {/* 6. Variables d'environnement */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Configuration des variables d&apos;environnement
        </h2>
        <CodeBlock
          filename="backend/.env"
          language="env"
          code={`PORT=3000
NODE_ENV=development`}
        />
        <CodeBlock
          filename="backend/.gitignore"
          language="text"
          code={`node_modules/
dist/
.env`}
        />
        <Callout type="warning" title="Règle d'or de sécurité">
          <p className="text-sm leading-relaxed text-amber-950">
            Les variables d&apos;environnement permettent de dissocier les secrets du code source. Ne commitez <strong>jamais</strong> vos clés d&apos;API ou mots de passe sur GitHub ou Git.
          </p>
        </Callout>
      </section>

      {/* 7. Création du serveur Express */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Création du serveur Express
        </h2>
        <CodeBlock
          filename="backend/src/app.ts"
          language="typescript"
          code={`import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend IA opérationnel"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Serveur démarré sur le port \${PORT}\`);
});`}
        />
      </section>

      {/* 8. Scripts npm */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Configuration des scripts npm
        </h2>
        <CodeBlock
          filename="backend/package.json (section scripts)"
          language="json"
          code={`{
  "scripts": {
    "dev": "tsx watch src/app.ts",
    "build": "tsc",
    "start": "node dist/app.js"
  }
}`}
        />
      </section>

      {/* 9. Tester le serveur */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Tester le serveur
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Lancez le backend avec <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded font-bold">npm run dev</code>. Ouvrez Postman ou votre navigateur à l&apos;adresse :
        </p>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-sm space-y-1">
          <p className="text-emerald-400">GET http://localhost:3000/api/health</p>
          <p className="text-slate-400">{'// Réponse JSON :'}</p>
          <pre className="text-amber-300">{"{\n  \"status\": \"OK\",\n  \"message\": \"Backend IA opérationnel\"\n}"}</pre>
        </div>
      </section>

      {/* 10. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Travaux pratiques
        </h2>
        <PracticalWork
          title="Mise en place de l'API socle"
          objective="Créer et tester le serveur Express modulaire avec TypeScript."
          duration="30 min"
          steps={[
            "Créez le projet intelligent-analysis et le sous-dossier backend.",
            "Initialisez Node.js, installez les dépendances et configurez tsconfig.json.",
            "Créez la structure des dossiers et le fichier app.ts.",
            "Testez la route GET /api/health dans Postman.",
            "Exercice supplémentaire : Ajoutez une route GET /api/info qui retourne le nom de l'application, sa version (ex: 1.0.0) et son environnement d'exécution (process.env.NODE_ENV)."
          ]}
        />
      </section>

      {/* 11. Synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          11. Synthèse
        </h2>
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 space-y-2 text-sm text-slate-900 font-medium">
          <p>⬢ <code className="font-mono font-bold">npm init</code> initialise un projet Node.js.</p>
          <p>⬢ TypeScript apporte un typage statique prévenant les erreurs d&apos;exécution.</p>
          <p>⬢ Express gère facilement les routes HTTP et les corps JSON.</p>
          <p>⬢ <code className="font-mono font-bold">dotenv</code> encapsule la configuration dans des variables d&apos;environnement.</p>
          <p>⬢ Postman valide immédiatement le contrat de chaque endpoint.</p>
        </div>
      </section>
    </div>
  );
};

