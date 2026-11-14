'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre7Content: React.FC = () => {
  // Simulateur de Profils de Permissions & Évaluation Sandbox
  const [selectedProfile, setSelectedProfile] = useState<'request_review' | 'default_sandbox' | 'auto' | 'turbo'>('default_sandbox');
  const [selectedAction, setSelectedAction] = useState<'test_run' | 'install_dep' | 'read_env' | 'git_push'>('test_run');

  const actionMatrix = {
    test_run: {
      label: "Exécuter 'npm test' dans backend/",
      request_review: {
        status: "ASK",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700",
        explanation: "Sous 'Request Review', chaque exécution de commande terminal nécessite une validation explicite de l'utilisateur."
      },
      default_sandbox: {
        status: "ALLOW (Sandbox)",
        badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-700",
        explanation: "Sous 'Default', les commandes de test s'exécutent de façon fluide dans le Terminal Sandbox sans perturber le système hôte."
      },
      auto: {
        status: "ALLOW (Auto)",
        badgeColor: "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-700",
        explanation: "Exécution autonome immédiate dans le terminal sandboxé."
      },
      turbo: {
        status: "ALLOW (Turbo)",
        badgeColor: "bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-700",
        explanation: "Exécution directe en tâche de fond continue."
      }
    },
    install_dep: {
      label: "Installer un nouveau package ('npm install axios')",
      request_review: {
        status: "ASK",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700",
        explanation: "L'utilisateur doit approuver l'ajout du package et l'exécution du script d'installation."
      },
      default_sandbox: {
        status: "ASK (Accès Réseau Externe)",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700",
        explanation: "Bien que dans le sandbox, le téléchargement de dépendances externes franchit la frontière réseau et réclame une validation."
      },
      auto: {
        status: "ASK (Politique Projet TaskFlow)",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700",
        explanation: "Même en mode Auto, la règle de gouvernance du projet impose l'accord de l'Architect/PM pour toute dépendance externe."
      },
      turbo: {
        status: "ALLOW (À risque élevé)",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-700",
        explanation: "Autorisation directe sans revue — déconseillé hors environnements éphémères jetables."
      }
    },
    read_env: {
      label: "Accéder au fichier sensible '.env.production'",
      request_review: {
        status: "DENY (Filtre Secret)",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-700",
        explanation: "Règle de sécurité absolue : accès aux clés d'API et secrets bloqué par configuration Deny."
      },
      default_sandbox: {
        status: "DENY (Priorité Deny)",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-700",
        explanation: "La priorité 'Deny > Ask > Allow' s'applique : l'interdiction de lecture des fichiers .env écrase toute permission."
      },
      auto: {
        status: "DENY (Verrouillage Secret)",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-700",
        explanation: "Le profil Auto n'outrepasse jamais une interdiction explicite configurée dans les filtres d'accès."
      },
      turbo: {
        status: "DENY (Infranchissable)",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-700",
        explanation: "La règle Deny reste souveraine même en mode Turbo."
      }
    },
    git_push: {
      label: "Exécuter 'git push origin main'",
      request_review: {
        status: "ASK / BLOQUÉ PM",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700",
        explanation: "Demande de confirmation impérative. La charte humaine refuse le push automatique."
      },
      default_sandbox: {
        status: "ASK / VALIDATION PM REQUISE",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700",
        explanation: "Les commandes Git affectant le dépôt distant sont bloquées jusqu'à signature explicite du Project Manager humain."
      },
      auto: {
        status: "ASK (Gouvernance Git)",
        badgeColor: "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700",
        explanation: "La gouvernance de TaskFlow interdit à tout agent d'envoyer du code vers le dépôt distant sans validation humaine."
      },
      turbo: {
        status: "DENY / ASK (Alerte Sécurité)",
        badgeColor: "bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-700",
        explanation: "Le profil Turbo ne doit jamais recevoir le jeton d'écriture Git sans restriction de branche."
      }
    }
  };

  const currentResult = actionMatrix[selectedAction][selectedProfile];

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 dark:bg-primary-950/60 dark:text-primary-300 shrink-0">
            Module 5 &bull; Chapitre 7
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Sécurité, Sandbox & Contrôle d'Accès
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-50 whitespace-normal break-words [overflow-wrap:anywhere]">
          5.7 — Comprendre les autorisations et les accès
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          L'efficacité d'une équipe d'agents IA repose sur une confiance maîtrisée. Sans permissions techniques adéquates, un agent peut accidentellement altérer l'environnement de travail, divulguer des secrets ou écraser des branches distantes. Apprenez à configurer les autorisations dans Google Antigravity, à exploiter le Terminal Sandbox et à appliquer la hiérarchie inviolable des règles de sécurité.
        </p>
      </div>

      <Callout type="warning">
        <p className="font-semibold mb-1">Règle d'or de la souveraineté humaine :</p>
        <p>
          Une capacité technique n'équivaut jamais à une autorisation opérationnelle. Aucun agent — pas même le Team Leader — n'est autorisé à exécuter un <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git merge</code>, <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git rebase</code> ou <code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">git push</code> sans la validation explicite et écrite du <strong>Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 7.1 : Accès, Permission, Autorisation */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="shield-check" className="w-5 h-5 text-primary-600 shrink-0" /> 1. Distinguer Accès, Permission et Autorisation</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Dans l'orchestration d'agents sous IDE, ces trois termes désignent des niveaux de contrôle complémentaires souvent confondus :
        </p>

        {/* Configuration 1 pure : 1 seule carte par rangée */}
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
                1
              </span>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base whitespace-normal break-words [overflow-wrap:anywhere]">
                L'Accès (Capacité matérielle / système)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'accès représente la possibilité technique ou physique d'atteindre une ressource : ouvrir un fichier sur le disque, ouvrir un port TCP, exécuter un binaire ou interroger un serveur externe. Si la ressource est hors d'atteinte physique ou masquée par le système d'exploitation, l'accès est impossible.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 flex items-center justify-center font-bold text-xs shrink-0">
                2
              </span>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base whitespace-normal break-words [overflow-wrap:anywhere]">
                La Permission (Règle formelle de l'IDE)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              La permission est la politique déclarée dans les paramètres de Google Antigravity (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Allow</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Ask</code>, ou <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Deny</code>). Elle dicte la façon dont l'IDE réagit lorsqu'un agent tente d'utiliser un outil (écrire un fichier, exécuter une commande bash, interroger un serveur MCP).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center justify-center font-bold text-xs shrink-0">
                3
              </span>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-sm sm:text-base whitespace-normal break-words [overflow-wrap:anywhere]">
                L'Autorisation (Décision opérationnelle et humaine)
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'autorisation est l'accord formel donné par le Project Manager humain pour exécuter une action précise. Même si l'environnement accorde la permission technique de commiter ou de modifier un fichier, l'agent ne doit agir que s'il a reçu l'ordre explicite et l'autorisation de son pilote humain.
            </p>
          </div>
        </div>
      </div>

      {/* Section 7.2 : Catégories d'accès */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="folder" className="w-5 h-5 text-indigo-600 shrink-0" /> 2. Les 5 Grandes Catégories d'Accès</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Dans un IDE moderne comme Google Antigravity, les interactions des agents sont classées en cinq familles de ressources :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. Système de fichiers</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-mono shrink-0">read / write</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Lecture des spécifications, création de composants, mise à jour des tests. Le périmètre doit être strictement circonscrit au dossier du projet (ex. <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">taskflow/</code>) avec interdiction absolue de remonter vers le répertoire racine utilisateur (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">~</code> ou <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">C:\Users\...</code>).
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. Terminal & Commandes système</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-mono shrink-0">exec / bash</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Lancement des compilateurs, linters et tests (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">npm test</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">tsc --noEmit</code>). Les commandes destructives (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">rm -rf</code>, formatage de disque) doivent être proscrites.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">3. Réseau & Requêtes sortantes</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-mono shrink-0">http / socket</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Téléchargement de packages npm, interrogation d'API de documentation ou communication entre services. Les flux réseau doivent être filtrés pour éviter les exfiltrations accidentelles de code.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">4. Outils externes & Serveurs MCP</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 font-mono shrink-0">mcp / plugins</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Connecteurs vers GitHub, Figma, bases de données ou navigateurs de test headless. Chaque outil MCP expose des méthodes spécifiques qui doivent être autorisées au cas par cas.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">5. Données sensibles & Secrets</span>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 font-mono shrink-0">secrets / .env</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Clés API, tokens OAuth, mots de passe de bases de données et certificats privés. Aucun agent ne doit pouvoir lire directement ou consigner ces secrets dans un rapport ou un commit.
            </p>
          </div>
        </div>
      </div>

      {/* Section 7.3 : Allow, Ask, Deny & Priorité */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="adjustments-horizontal" className="w-5 h-5 text-emerald-600 shrink-0" /> 3. Les 3 Décisions et la Priorité Inviolable</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Google Antigravity évalue chaque requête d'outil via trois états décisionnels :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/40 bg-emerald-50/50 dark:bg-emerald-950/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-emerald-800 dark:text-emerald-300 font-mono">ALLOW (Autoriser)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'action s'exécute immédiatement sans interrompre l'agent. Utilisé pour les lectures de code source et l'exécution de linters éprouvés.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-800/40 bg-amber-50/50 dark:bg-amber-950/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-amber-800 dark:text-amber-300 font-mono">ASK (Demander confirmation)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'agent met son exécution en pause et affiche une boîte de dialogue à l'attention de l'utilisateur avec la commande exacte et son contexte. L'action n'est jouée que si l'humain clique sur "Approuver".
            </p>
          </div>

          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-800/40 bg-rose-50/50 dark:bg-rose-950/20 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-rose-800 dark:text-rose-300 font-mono">DENY (Interdire formellement)</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
              L'action est rejetée sans aucune sollicitation utilisateur. L'agent reçoit une erreur d'autorisation lui indiquant que cette opération est prohibée par la politique de sécurité.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 flex flex-col gap-2 w-full min-w-0 max-w-full">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <Icon name="exclamation-triangle" className="w-5 h-5 shrink-0" />
            L'Ordre de Priorité du Moteur de Sécurité : Deny &gt; Ask &gt; Allow
          </div>
          <p className="text-xs sm:text-sm text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
            Lorsqu'une règle générale permet l'accès au terminal mais qu'une règle spécifique interdit d'accéder aux fichiers <code className="text-xs bg-slate-800 px-1 py-0.5 rounded">.env</code>, <strong>le DENY prévaut systématiquement</strong>. Une interdiction l'emporte toujours sur une demande de confirmation, qui l'emporte toujours sur une autorisation automatique.
          </p>
        </div>
      </div>

      {/* Section 7.4 : Profils de permissions Antigravity */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="cog-6-tooth" className="w-5 h-5 text-purple-600 shrink-0" /> 4. Les 4 Profils de Permissions dans Google Antigravity</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Google Antigravity propose quatre profils globaux prédéfinis pour doser l'autonomie des agents selon le contexte du projet :
        </p>

        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">1. Request Review (Contrôle total)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-medium shrink-0">Validation systématique</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Chaque écriture de fichier, chaque commande terminal et chaque requête externe déclenche une notification d'approbation. Idéal pour auditer un agent débutant ou effectuer des refactorisations critiques sur des dépôts sensibles.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">2. Default (Sandbox activé) — Recommandé TaskFlow</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-medium shrink-0">Équilibré & Sécurisé</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Les agents travaillent librement dans le périmètre du projet. Leurs commandes terminal s'exécutent dans un conteneur sandbox isolé. Dès qu'une opération tente de franchir les limites du sandbox (accès réseau extérieur, écriture hors racine, installation de binaires hôtes), l'IDE bascule en <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Ask</code>.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">3. Auto (Autonomie avancée)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 font-medium shrink-0">Haute productivité</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Permet l'enchaînement autonome de plusieurs étapes de refactorisation et tests sans interruption humaine constante. Réservé aux projets bien couverts par des tests automatisés et dont le dépôt est versionné.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">4. Turbo (Autonomie maximale sans pause)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 font-medium shrink-0">Environnements éphémères</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Exécute toutes les opérations permises sans sollicitation humaine. À proscrire formellement sur votre poste de travail principal ou sur un dépôt de production ; réservé aux conteneurs CI/CD isolés et jetables.
            </p>
          </div>
        </div>
      </div>

      {/* Section 7.5 : Le Terminal Sandbox */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="command-line" className="w-5 h-5 text-blue-600 shrink-0" /> 5. Le Rôle et les Limites du Terminal Sandbox</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Le Terminal Sandbox d'Antigravity crée une bulle d'exécution pour chaque commande shell lancée par un agent :
        </p>

        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-3 w-full min-w-0 max-w-full">
          <h3 className="font-semibold text-sm text-slate-900 dark:text-slate-100">Pourquoi utiliser le Sandbox ?</h3>
          <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-2 list-disc pl-5">
            <li><strong>Isolation du système hôte :</strong> les scripts n'ont pas accès aux clés SSH de l'utilisateur ni à ses dossiers personnels (<code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">~/.ssh</code>, <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Documents/</code>).</li>
            <li><strong>Protection contre les commandes destructives :</strong> une commande erronée comme une suppression involontaire est circonscrite au conteneur de travail.</li>
            <li><strong>Contrôle des flux sortants :</strong> le sandbox filtre les sockets réseau pour empêcher les scans de ports ou les connexions malveillantes.</li>
          </ul>

          <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
            <strong>Attention aux limites :</strong> Le sandbox protège votre machine hôte, mais <em>il ne protège pas votre projet contre des modifications logiques défectueuses</em>. Un agent travaillant dans le sandbox peut toujours corrompre un fichier TypeScript ou casser des tests s'il n'est pas convenablement encadré par des règles de révision !
          </div>
        </div>
      </div>

      {/* Simulateur Interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 bg-indigo-50/30 dark:bg-indigo-950/20">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Laboratoire Interactif &bull; Antigravity Engine
          </span>
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
            Simulateur de Profils de Permissions & Évaluation Sandbox
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Sélectionnez une action tentée par un agent et observez comment les quatre profils d'Antigravity traitent la requête selon la règle de priorité.
          </p>
        </div>

        {/* Sélection de l'Action */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Action tentée par l'agent :</span>
          <div className="flex flex-col gap-2 w-full">
            {(Object.keys(actionMatrix) as Array<keyof typeof actionMatrix>).map((key) => (
              <button
                key={key}
                onClick={() => setSelectedAction(key)}
                className={`text-left px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors border ${
                  selectedAction === key
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {actionMatrix[key].label}
              </button>
            ))}
          </div>
        </div>

        {/* Sélection du Profil */}
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">Profil Antigravity actif :</span>
          <div className="flex flex-col gap-2 w-full">
            <button
              onClick={() => setSelectedProfile('request_review')}
              className={`text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border ${
                selectedProfile === 'request_review'
                  ? 'bg-amber-600 text-white border-amber-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              1. Request Review (Supervision maximale)
            </button>
            <button
              onClick={() => setSelectedProfile('default_sandbox')}
              className={`text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border ${
                selectedProfile === 'default_sandbox'
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              2. Default Sandbox (Recommandé TaskFlow)
            </button>
            <button
              onClick={() => setSelectedProfile('auto')}
              className={`text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border ${
                selectedProfile === 'auto'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              3. Auto (Autonomie modérée)
            </button>
            <button
              onClick={() => setSelectedProfile('turbo')}
              className={`text-left px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border ${
                selectedProfile === 'turbo'
                  ? 'bg-purple-600 text-white border-purple-600'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
              }`}
            >
              4. Turbo (Sans confirmation - CI/CD uniquement)
            </button>
          </div>
        </div>

        {/* Résultat de la décision */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-2 w-full min-w-0 max-w-full">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase">Décision du moteur de sécurité :</span>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${currentResult.badgeColor} shrink-0`}>
              {currentResult.status}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
            {currentResult.explanation}
          </p>
        </div>
      </div>

      {/* Section 7.8 & 7.9 : Permissions de l'équipe TaskFlow et Opérations Sensibles */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2 whitespace-normal break-words [overflow-wrap:anywhere]">
          <Icon name="lock-closed" className="w-5 h-5 text-rose-600 shrink-0" /> 6. Permissions TaskFlow et Protection des Opérations Sensibles</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-normal break-words [overflow-wrap:anywhere]">
          Voici l'attribution des droits techniques par agent au sein de l'équipe TaskFlow :
        </p>

        <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Architect</span>
              <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 font-mono shrink-0">Docs & Specifications</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Lecture intégrale du projet. Écriture autorisée dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">docs/architecture/</code> et <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">taskflow/AGENTS.md</code>. Terminal en lecture seule ou désactivé.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Backend</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 font-mono shrink-0">backend/ & tests</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Lecture intégrale. Écriture confinée dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">backend/</code>. Terminal sandboxé pour les compilations et tests backend. Réseau externe restreint.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Frontend</span>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 font-mono shrink-0">frontend/ & tests</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Lecture intégrale. Écriture confinée dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">frontend/</code>. Terminal sandboxé pour les builds Vite et tests Vitest/React.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">QA (Quality Assurance)</span>
              <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-mono shrink-0">tests/ & reports/</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Lecture intégrale. Écriture autorisée uniquement dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">tests/</code> et <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">reports/</code>. Terminal sandboxé habilité à exécuter les suites de tests globales.
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col gap-1 w-full min-w-0 max-w-full">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-sm text-slate-900 dark:text-slate-100">Reviewer & Team Leader</span>
              <span className="text-xs px-2 py-0.5 rounded bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 font-mono shrink-0">Lecture seule / Rapports</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-normal break-words [overflow-wrap:anywhere]">
              Lecture intégrale. Écriture réservée aux rapports de revue dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">reports/reviews/</code> et documentation d'équipe dans <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">docs/team/</code>. Aucune modification de code source.
            </p>
          </div>
        </div>
      </div>

      {/* Exemple de configuration YAML / JSON */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <h3 className="font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100">
          Extrait de configuration de permissions Antigravity (<code className="text-xs bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded">.agents/permissions.json</code>)
        </h3>
        <div className="overflow-x-auto p-4 rounded-xl font-mono text-xs md:text-sm bg-slate-900 text-slate-100 max-w-full min-w-0">
          <pre>{`{
  "profile": "default",
  "sandbox": {
    "enabled": true,
    "isolatedNetwork": true
  },
  "rules": [
    { "pattern": "**/.env*", "decision": "deny" },
    { "pattern": "**/*.pem", "decision": "deny" },
    { "pattern": "git push*", "decision": "ask" },
    { "pattern": "git merge*", "decision": "ask" },
    { "pattern": "npm install*", "decision": "ask" },
    { "pattern": "npm test*", "decision": "allow" },
    { "pattern": "npx tsc*", "decision": "allow" }
  ]
}`}</pre>
        </div>
      </div>

      {/* Quiz officiel */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary-600 dark:text-primary-400">
            Évaluation des connaissances
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Quiz officiel de validation du Chapitre 7
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Testez votre maîtrise des concepts de permissions, de profils de sécurité et du Terminal Sandbox à travers 10 questions officielles.
          </p>
        </div>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle différence existe entre une permission et une autorisation ?",
              options: [
                "La permission définit une capacité d'action, tandis que l'autorisation correspond à l'accord nécessaire pour effectuer une opération.",
                "La permission définit le rôle de l'agent, tandis que l'autorisation définit son langage de programmation.",
                "Les deux termes désignent uniquement l'accès aux fichiers.",
                "Une autorisation permet toujours d'ignorer les règles de sécurité."
              ],
              correctIndex: 0,
              explanation: "Une permission définit les actions accessibles à l'agent dans l'IDE. Une autorisation correspond à l'accord nécessaire lorsqu'une opération doit être validée par le PM humain."
            },
            {
              id: 2,
              question: "Quel comportement correspond à une règle Ask dans Google Antigravity ?",
              options: [
                "L'action est automatiquement autorisée.",
                "L'action est définitivement interdite.",
                "L'agent doit attendre une validation avant de continuer.",
                "L'agent peut contourner la règle."
              ],
              correctIndex: 2,
              explanation: "Une règle Ask suspend l'opération et demande une validation explicite à l'utilisateur. L'agent reste en attente de sa décision."
            },
            {
              id: 3,
              question: "Quel est l'ordre de priorité des règles de permissions ?",
              options: [
                "Allow, Ask, Deny.",
                "Ask, Allow, Deny.",
                "Allow, Deny, Ask.",
                "Deny, Ask, Allow."
              ],
              correctIndex: 3,
              explanation: "L'ordre de priorité absolu est Deny, puis Ask, puis Allow. Une interdiction reste donc prioritaire sur une autorisation automatique."
            },
            {
              id: 4,
              question: "Quel est le rôle principal du Terminal Sandbox ?",
              options: [
                "Accélérer automatiquement toutes les commandes.",
                "Isoler l'exécution des commandes pour limiter les ressources accessibles.",
                "Autoriser l'accès à tous les fichiers du système.",
                "Remplacer les tests automatisés."
              ],
              correctIndex: 1,
              explanation: "Le Terminal Sandbox isole l'exécution des commandes et limite les ressources du système hôte auxquelles elles peuvent accéder."
            },
            {
              id: 5,
              question: "Quel profil demande une validation avant l'exécution des commandes du terminal dans le système de profils récents ?",
              options: [
                "Turbo.",
                "Auto.",
                "Request Review.",
                "Default."
              ],
              correctIndex: 2,
              explanation: "Request Review exige une validation systématique avant l'exécution des commandes terminal, sous réserve d'exceptions configurées."
            },
            {
              id: 6,
              question: "Quelle affirmation concernant les règles générales et les permissions techniques est correcte ?",
              options: [
                "Une instruction textuelle interdit toujours techniquement une action.",
                "Une permission technique remplace toutes les règles du projet.",
                "Les instructions encadrent le comportement attendu, tandis que les permissions contrôlent les capacités disponibles.",
                "Les permissions ne concernent que les opérations Git."
              ],
              correctIndex: 2,
              explanation: "Les instructions définissent le comportement attendu de l'agent. Les permissions contrôlent techniquement les capacités disponibles dans l'environnement."
            },
            {
              id: 7,
              question: "Un agent QA doit vérifier les tests du Backend. Quel accès est principalement nécessaire ?",
              options: [
                "Un accès complet au système de fichiers.",
                "Un accès en lecture aux fichiers concernés et la possibilité d'exécuter les tests nécessaires.",
                "Un accès administrateur au système.",
                "Une autorisation permanente de modifier tous les fichiers."
              ],
              correctIndex: 1,
              explanation: "L'agent QA doit pouvoir inspecter les fichiers sources en lecture et exécuter la suite de tests dans le sandbox."
            },
            {
              id: 8,
              question: "Pourquoi faut-il protéger les clés API et les mots de passe ?",
              options: [
                "Parce qu'ils peuvent permettre d'accéder à des services ou des ressources sensibles.",
                "Parce qu'ils empêchent les agents de compiler le projet.",
                "Parce qu'ils doivent obligatoirement être enregistrés dans AGENTS.md.",
                "Parce qu'ils sont nécessaires dans tous les comptes rendus."
              ],
              correctIndex: 0,
              explanation: "Les clés d'API et secrets donnent accès à des services et bases critiques. Ils doivent être confinés et masqués sous règle Deny."
            },
            {
              id: 9,
              question: "Le profil Default permet l'exécution de commandes dans le sandbox sans validation systématique. Une commande nécessite un accès en dehors du sandbox. Que peut-il se passer ?",
              options: [
                "La commande est toujours exécutée automatiquement.",
                "Le sandbox est automatiquement supprimé définitivement.",
                "L'agent peut demander une autorisation avant l'exécution, selon les règles configurées.",
                "La commande est automatiquement transformée en commande de lecture."
              ],
              correctIndex: 2,
              explanation: "Avec le profil Default, lorsqu'une commande requiert un accès hors sandbox (ex: réseau sortant), l'IDE sollicite l'approbation de l'utilisateur."
            },
            {
              id: 10,
              question: "Un agent dispose techniquement de la possibilité d'effectuer un push. Le Project Manager humain ne lui a pas donné son autorisation explicite. Que doit-il faire ?",
              options: [
                "Effectuer le push si les tests réussissent.",
                "Effectuer le push si le Reviewer donne son accord.",
                "Demander à un autre agent d'effectuer le push.",
                "Ne pas effectuer le push et demander l'autorisation nécessaire."
              ],
              correctIndex: 3,
              explanation: "Une permission technique ne confère pas une autorisation organisationnelle. Le push requiert l'accord formel du Project Manager humain."
            }
          ]}
        />
      </div>
    </div>
  );
};

