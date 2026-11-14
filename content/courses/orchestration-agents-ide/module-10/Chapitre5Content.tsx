'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { Card, CardHeader, CardTitle, CardContent, Badge, Button } from './ui';

type ConfigTab = 'fe-pkg' | 'be-pkg' | 'be-tsconfig' | 'gitignore';

export function Chapitre5Content() {
  const [activeTab, setActiveTab] = useState<ConfigTab>('be-tsconfig');
  const [buildStatus, setBuildStatus] = useState<'idle' | 'building' | 'success'>('idle');

  const handleSimulateBuild = () => {
    setBuildStatus('building');
    setTimeout(() => {
      setBuildStatus('success');
    }, 700);
  };

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* Entête */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="text-xs font-semibold uppercase tracking-wider text-primary border-primary/30 shrink-0">
            Module 10 • Projet TaskFlow
          </Badge>
          <Badge variant="secondary" className="text-xs shrink-0">
            Chapitre 10.5
          </Badge>
        </div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-foreground tracking-tight whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Installer et configurer les dépendances de TaskFlow
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Mettre en place les environnements techniques : installation d&apos;Express, TypeScript (NodeNext), tsx, Vitest et Supertest, configuration des scripts npm et exclusion Git.
        </p>
      </div>

      {/* Rappel de gouvernance */}
      <Callout type="warning" title="Règle d'or de gouvernance Git & Dépendances">
        <p className="text-xs sm:text-sm whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Les répertoires <code>node_modules/</code> et <code>dist/</code> ne doivent <strong>jamais</strong> être commités dans le dépôt Git. Seuls les fichiers <code>package.json</code>, <code>package-lock.json</code> et <code>tsconfig.json</code> sont versionnés. <strong>Aucun agent ou Team Leader n&apos;est autorisé à exécuter un merge, un rebase ou un push sans validation formelle et écrite du Chef de Projet humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Production vs Développement */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="folder" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">1. Dépendances de Production vs Dépendances de Développement</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          <p className="whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Une gestion rigoureuse des dépendances évite d&apos;alourdir l&apos;image de production et garantit la reproductibilité des environnements :
          </p>

          <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="check-circle" className="h-4 w-4 text-emerald-500 shrink-0" />
                Dépendances de Production (<code>dependencies</code>)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Indispensables pour exécuter l&apos;application en production. Exemple côté backend : <code>express</code> (installé via <code>npm install express</code>). Côté frontend : <code>react</code>, <code>react-dom</code>.
              </p>
            </div>

            <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="settings" className="h-4 w-4 text-primary shrink-0" />
                Dépendances de Développement (<code>devDependencies</code> avec le flag <code>-D</code>)
              </span>
              <p className="text-xs whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
                Utilisées uniquement pour compiler, transcrire, exécuter localement ou tester le code. Exemples : <code>typescript</code>, <code>tsx</code>, <code>vitest</code>, <code>supertest</code>, <code>@types/node</code>, <code>@types/express</code>, <code>@types/supertest</code>.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 2 : Commandes d'installation pas à pas */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">2. Commandes d&apos;installation Frontend et Backend</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 text-xs sm:text-sm leading-relaxed text-muted-foreground">
          {/* Frontend */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                Installation Frontend (depuis <code>taskflow/frontend</code>)
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">React / Vite</Badge>
            </div>
            <div className="p-2.5 rounded bg-black border border-slate-800 text-xs font-mono text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`cd taskflow/frontend
npm install
npm install -D vitest
npm pkg set "scripts.test=vitest run"`}
            </div>
          </div>

          {/* Backend */}
          <div className="p-3 rounded-lg border border-border/50 bg-muted/20 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm">
                Installation Backend (depuis <code>taskflow/backend</code>)
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">Express / TypeScript</Badge>
            </div>
            <div className="p-2.5 rounded bg-black border border-slate-800 text-xs font-mono text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`cd taskflow/backend
# 1. Dépendance de production
npm install express

# 2. Compilateur et outillage TS
npm install -D typescript tsx @types/node @types/express

# 3. Moteur de tests et Supertest HTTP
npm install -D vitest supertest @types/supertest

# 4. Configuration des scripts npm & format ES Module
npm pkg set "type=module"
npm pkg set "scripts.dev=tsx watch src/server.ts"
npm pkg set "scripts.build=tsc -p tsconfig.json"
npm pkg set "scripts.start=node dist/server.js"
npm pkg set "scripts.test=vitest run"`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3 : Simulateur interactif de configurations */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="code" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">3. Simulateur interactif : Fichiers de Configuration & Pipeline Build</CardTitle>
          </div>
          <p className="text-xs text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
            Explorez les fichiers cruciaux de configuration et simulez la compilation TypeScript pour observer la transformation de <code>src/</code> vers <code>dist/</code>.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {/* Boutons d'onglets wrap */}
          <div className="flex flex-wrap gap-1.5 text-xs">
            <Button
              variant={activeTab === 'be-tsconfig' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('be-tsconfig')}
              className="h-8 text-xs shrink-0"
            >
              backend/tsconfig.json
            </Button>
            <Button
              variant={activeTab === 'be-pkg' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('be-pkg')}
              className="h-8 text-xs shrink-0"
            >
              backend/package.json
            </Button>
            <Button
              variant={activeTab === 'fe-pkg' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('fe-pkg')}
              className="h-8 text-xs shrink-0"
            >
              frontend/package.json
            </Button>
            <Button
              variant={activeTab === 'gitignore' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('gitignore')}
              className="h-8 text-xs shrink-0"
            >
              taskflow/.gitignore
            </Button>
          </div>

          {/* Affichage du contenu selon onglet */}
          <div className="p-3.5 rounded-lg border border-border/50 bg-background flex flex-col gap-2 w-full min-w-0 max-w-full">
            {activeTab === 'be-tsconfig' && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
                  <span className="font-semibold text-xs text-foreground font-mono">backend/tsconfig.json</span>
                  <Badge variant="outline" className="text-xs">NodeNext ES2022</Badge>
                </div>
                <div className="p-2.5 rounded bg-black border border-slate-800 text-xs font-mono text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}`}
                </div>
                <div className="text-xs text-muted-foreground flex flex-col gap-1 mt-1">
                  <p><strong>NodeNext :</strong> Les imports TypeScript relatifs doivent comporter l&apos;extension <code>.js</code> (ex: <code>import &#123; app &#125; from &quot;./app.js&quot;;</code>) même si le fichier source est <code>app.ts</code>.</p>
                  <p><strong>outDir : &quot;dist&quot; :</strong> Les fichiers JavaScript compilés sont isolés dans <code>dist/</code> sans polluer le dossier des sources.</p>
                </div>
              </div>
            )}

            {activeTab === 'be-pkg' && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
                  <span className="font-semibold text-xs text-foreground font-mono">backend/package.json</span>
                  <Badge variant="outline" className="text-xs">type: module</Badge>
                </div>
                <div className="p-2.5 rounded bg-black border border-slate-800 text-xs font-mono text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`{
  "name": "taskflow-backend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/server.js",
    "test": "vitest run"
  },
  "dependencies": {
    "express": "^4.21.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^22.0.0",
    "@types/supertest": "^6.0.2",
    "supertest": "^7.0.0",
    "tsx": "^4.19.0",
    "typescript": "^5.5.0",
    "vitest": "^2.0.0"
  }
}`}
                </div>
              </div>
            )}

            {activeTab === 'fe-pkg' && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
                  <span className="font-semibold text-xs text-foreground font-mono">frontend/package.json</span>
                  <Badge variant="outline" className="text-xs">Vite React TS</Badge>
                </div>
                <div className="p-2.5 rounded bg-black border border-slate-800 text-xs font-mono text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`{
  "name": "taskflow-frontend",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.5",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "typescript": "^5.5.3",
    "vite": "^5.4.2",
    "vitest": "^2.0.0"
  }
}`}
                </div>
              </div>
            )}

            {activeTab === 'gitignore' && (
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-2 border-b border-border/40 pb-2">
                  <span className="font-semibold text-xs text-foreground font-mono">taskflow/.gitignore</span>
                  <Badge variant="outline" className="text-xs">Sécurité & Propreté</Badge>
                </div>
                <div className="p-2.5 rounded bg-black border border-slate-800 text-xs font-mono text-white whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] leading-relaxed min-w-0 max-w-full font-mono">
{`# Dépendances (à ne jamais versionner)
node_modules/

# Résultats de compilation
dist/

# Fichiers d'environnement
.env
.env.*
!.env.example

# Journaux & caches
*.log
.DS_Store
Thumbs.db`}
                </div>
              </div>
            )}
          </div>

          {/* Banc d'essai simulation npm run build */}
          <div className="p-3.5 rounded-lg border border-primary/20 bg-primary/5 flex flex-col gap-3 w-full min-w-0 max-w-full">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-foreground text-xs sm:text-sm flex items-center gap-2">
                <Icon name="cpu" className="h-4 w-4 text-primary shrink-0" />
                Tester la compilation TypeScript du Backend
              </span>
              <Button
                size="sm"
                variant="default"
                onClick={handleSimulateBuild}
                disabled={buildStatus === 'building'}
                className="h-8 text-xs shrink-0 flex items-center gap-1.5"
              >
                {buildStatus === 'building' ? (
                  <>
                    <Icon name="refresh" className="h-3.5 w-3.5 animate-spin shrink-0" />
                    <span>Compilation en cours...</span>
                  </>
                ) : (
                  <>
                    <Icon name="arrow-right" className="h-3.5 w-3.5 shrink-0" />
                    <span>Lancer &quot;npm run build&quot;</span>
                  </>
                )}
              </Button>
            </div>

            {buildStatus === 'success' && (
              <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2 font-semibold">
                  <Icon name="check-circle" className="h-4 w-4 shrink-0 text-emerald-500" />
                  <span>Compilation réussie avec succès (0 erreurs TypeScript) !</span>
                </div>
                <div className="font-mono text-[11px] p-2 rounded bg-black border border-slate-800 text-white text-foreground whitespace-pre-wrap whitespace-pre-wrap break-words [overflow-wrap:anywhere] [word-break:break-word] min-w-0 max-w-full">
{`> taskflow-backend@1.0.0 build
> tsc -p tsconfig.json

[OK] src/app.ts -> dist/app.js
[OK] src/server.ts -> dist/server.js
Fichiers émis dans backend/dist/`}
                </div>
                <p className="text-[11px]">
                  Le backend est maintenant prêt pour un démarrage direct via <code>node dist/server.js</code> (production) ou <code>npm run dev</code> avec tsx (développement).
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Section 4 : Quiz */}
      <Card className="w-full min-w-0 max-w-full border-border/60">
        <CardHeader className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Icon name="shield-check" className="h-5 w-5 text-primary shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">4. Vérifier les connaissances — Quiz officiel</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <QuickQuiz
            questions={[
              {
                id: 1,
                question: "Quelle commande permet d'installer Express comme dépendance de production dans le backend ?",
                options: [
                  "npm install -D express",
                  "npm install express",
                  "npm init express",
                  "npm run express"
                ],
                correctIndex: 1,
                explanation: "La commande npm install express installe Express comme dépendance de production. L'option -D l'aurait placé dans les devDependencies, ce qui ne convient pas pour un serveur en production."
              },
              {
                id: 2,
                question: "Quel est le rôle principal de package-lock.json ?",
                options: [
                  "Décrire les composants React.",
                  "Enregistrer précisément l'arbre des dépendances et leurs versions installées.",
                  "Définir les routes HTTP du backend.",
                  "Remplacer le fichier tsconfig.json."
                ],
                correctIndex: 1,
                explanation: "Le fichier package-lock.json enregistre précisément les versions exactes et l'arbre des dépendances installées pour reproduire fidèlement l'installation sur toute machine."
              },
              {
                id: 3,
                question: "Quel outil permet d'exécuter le code TypeScript du backend pendant le développement, avec surveillance des modifications ?",
                options: [
                  "Supertest.",
                  "Express.",
                  "tsx.",
                  "npm."
                ],
                correctIndex: 2,
                explanation: "tsx permet d'exécuter directement les fichiers TypeScript sans étape manuelle de compilation, et avec le flag watch, il redémarre le serveur à chaque modification."
              },
              {
                id: 4,
                question: "Dans la configuration proposée, quel est le rôle de outDir dans tsconfig.json ?",
                options: [
                  "Définir le dossier de sortie de la compilation.",
                  "Définir le dossier des tests.",
                  "Définir le dossier des dépendances npm.",
                  "Définir le dossier des routes Express."
                ],
                correctIndex: 0,
                explanation: "L'option outDir indique à TypeScript dans quel répertoire générer les fichiers JavaScript compilés (ici dist/)."
              },
              {
                id: 5,
                question: "Quelles affirmations décrivent correctement les outils de test de TaskFlow ? (Sélectionnez la proposition exacte)",
                options: [
                  "Vitest est le moteur d'exécution des tests et Supertest facilite les tests d'intégration HTTP.",
                  "Supertest remplace le serveur Express et Vitest installe les paquets.",
                  "Vitest ne fonctionne qu'avec Vite en frontend et ne peut pas tester le backend.",
                  "Supertest est un compilateur TypeScript alternatif."
                ],
                correctIndex: 0,
                explanation: "Vitest est le moteur d'exécution de tests moderne (utilisé côté front et back), et Supertest permet d'envoyer des requêtes HTTP directes à l'application Express sans socket réseau réel."
              },
              {
                id: 6,
                question: "Pourquoi séparer app.ts et server.ts dans le backend ?",
                options: [
                  "Pour séparer la configuration de l'application Express du démarrage du serveur HTTP.",
                  "Pour créer deux serveurs indépendants obligatoires.",
                  "Pour remplacer TypeScript par JavaScript.",
                  "Pour placer les routes frontend dans le backend."
                ],
                correctIndex: 0,
                explanation: "app.ts configure Express (middlewares, routes) sans appeler listen(), ce qui permet de le tester avec Supertest. server.ts s'occupe uniquement du démarrage HTTP sur un port."
              },
              {
                id: 7,
                question: "Le dossier node_modules/ doit normalement être enregistré dans le dépôt Git pour permettre aux autres développeurs de récupérer les dépendances.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 1,
                explanation: "Faux. node_modules/ contient des dizaines de milliers de fichiers locaux spécifiques à l'OS. Il doit impérativement figurer dans .gitignore. Seuls package.json et package-lock.json sont commités."
              },
              {
                id: 8,
                question: "La commande npm run build, dans la configuration proposée pour le backend, exécute le compilateur TypeScript et produit les fichiers JavaScript dans dist/.",
                options: [
                  "Vrai",
                  "Faux"
                ],
                correctIndex: 0,
                explanation: "Vrai. Le script build exécute tsc -p tsconfig.json, vérifie les types stricts et émet les fichiers compilés dans le dossier dist/."
              }
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
