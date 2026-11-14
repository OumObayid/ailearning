'use client';

import React, { useState } from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  // Simulateur interactif : Matrice des Privilèges & Détection de Secrets
  const [selectedRole, setSelectedRole] = useState<'backend' | 'qa' | 'reviewer' | 'team_leader'>('backend');
  const [secretAuditInput, setSecretAuditInput] = useState<string>('DATABASE_URL=postgres://user:supersecret123@localhost:5432/taskflow');

  const rolePermissions = {
    backend: {
      role: 'Agent Backend',
      scope: 'backend/src/**, backend/tests/**',
      fileRead: 'Fichiers du dépôt (sauf secrets .env)',
      fileWrite: 'Fichiers backend autorisés par sa mission',
      terminal: 'Commandes npm (typecheck, lint, test, build)',
      gitActions: 'git status, git add, git commit sur sa branche dédiée',
      forbiddenActions: 'git merge, git rebase, git push, modification de backend/.env ou packages racine',
      verdict: 'Moindre privilège strict : confiné au sous-dossier backend.'
    },
    qa: {
      role: 'Agent QA',
      scope: 'backend/tests/**, frontend/tests/**',
      fileRead: 'Code source et spécifications en lecture seule',
      fileWrite: 'Strictement restreint aux fichiers de tests (*.test.ts)',
      terminal: 'Exécution des suites de tests (vitest, supertest)',
      gitActions: 'Commits limités aux dossiers de test',
      forbiddenActions: 'Interdiction absolue de modifier le code de production (backend/src, frontend/src)',
      verdict: 'Indépendance de vérification : ne modifie jamais ce qu\'il teste.'
    },
    reviewer: {
      role: 'Agent Reviewer',
      scope: 'Audit statique global',
      fileRead: 'Accès en lecture intégrale à tout le dépôt et diffs',
      fileWrite: 'AUCUN accès en écriture sur le code source',
      terminal: 'Commandes de linting et d\'inspection en lecture',
      gitActions: 'Consultation de l\'historique (git log, git diff)',
      forbiddenActions: 'Ne commite aucun code, ne merge aucune PR',
      verdict: 'Audit pur et impartial sans droit d\'écriture.'
    },
    team_leader: {
      role: 'Team Leader IA',
      scope: 'Coordination et consolidation',
      fileRead: 'Accès en lecture à toutes les branches et rapports',
      fileWrite: 'Rapports de synthèse, fiches de recette',
      terminal: 'Lancement des scripts globaux de test et de build',
      gitActions: 'Préparation des PR et proposition de résolution de conflits',
      forbiddenActions: 'Ne peut pas exécuter git merge, git rebase ou git push sans accord explicite du PM',
      verdict: 'Coordonnateur sans pouvoir de validation finale souveraine.'
    }
  };

  const currentRole = rolePermissions[selectedRole];

  const hasSecretLeak = secretAuditInput.includes('supersecret') || secretAuditInput.includes('password') || secretAuditInput.includes('sk_live');

  return (
    <div className="flex flex-col gap-8 w-full min-w-0 max-w-full">
      {/* En-tête du chapitre */}
      <div className="flex flex-col gap-3 w-full min-w-0 max-w-full">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-indigo-500/10 text-indigo-500 dark:bg-indigo-400/10 dark:text-indigo-400 shrink-0">
            Module 9 • Chapitre 6
          </span>
          <span className="text-xs text-muted-foreground">50 min de lecture & pratique</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full">
          Contrôler les accès et les autorisations
        </h1>
        <p className="text-base text-muted-foreground whitespace-normal break-words [overflow-wrap:anywhere] min-w-0 max-w-full leading-relaxed">
          Donner les pleins pouvoirs à une équipe d'agents d'IA dans un environnement de développement expose le projet à des risques majeurs : fuite de secrets d'API, suppression accidentelle de fichiers ou fusions intempestives. Maîtrisez le principe du moindre privilège, la protection des branches maîtresses et la sanctuarisation des informations sensibles.
        </p>
      </div>

      {/* Règle d'or de gouvernance */}
      <Callout type="warning">
        <p className="font-semibold text-foreground mb-1">Règle de sécurité & autorisations sensibles</p>
        <p className="text-sm leading-relaxed">
          Une consigne verbale écrite dans un prompt (ex: « ne touche pas à main ») <strong>ne remplace jamais une protection technique</strong>. Les opérations sensibles (<code>git merge</code>, <code>git push</code>, déploiement, gestion des secrets) doivent être verrouillées par les mécanismes de la plateforme et réservées au <strong>Project Manager humain</strong>.
        </p>
      </Callout>

      {/* Section 1 : Authentification vs Autorisation & Moindre Privilège */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="lock" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>1. Authentification vs Autorisation et Moindre Privilège</span>
        </h2>
        <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
          <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3">
            <h3 className="text-base font-semibold text-foreground">
              La distinction cardinale de la sécurité informatique
            </h3>
            <div className="grid grid-cols-1 gap-3 mt-1 text-xs">
              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 flex flex-col gap-1">
                <span className="font-bold text-blue-400">Authentification (Qui est-ce ?)</span>
                <p className="text-muted-foreground leading-relaxed">
                  Vérification formelle de l'identité de l'agent ou de la clé technique qui se connecte au dépôt ou à l'IDE.
                </p>
              </div>

              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex flex-col gap-1">
                <span className="font-bold text-indigo-400">Autorisation (Que peut-il faire ?)</span>
                <p className="text-muted-foreground leading-relaxed">
                  L'ensemble précis des actions autorisées. Ce n'est pas parce qu'un agent est authentifié qu'il doit pouvoir modifier les permissions ou fusionner une branche.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-muted/40 border border-border text-xs text-muted-foreground leading-relaxed mt-1">
              <strong className="text-foreground">Principe du Moindre Privilège (Principle of Least Privilege) :</strong> N'accorder à chaque agent que les droits <em>strictement indispensables</em> à l'exécution de sa mission courante. Tout privilège superflu est une faille de sécurité potentielle.
            </div>
          </div>
        </div>
      </div>

      {/* Section 2 : Sanctuariser les secrets */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="shield" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>2. Protection des secrets et des informations sensibles</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-3 text-xs leading-relaxed">
          <p className="text-muted-foreground">
            Les clés d'API, mots de passe de base de données et tokens JWT ne doivent <strong>jamais figurer en clair dans le code source</strong> ni dans les fichiers commités :
          </p>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
            <li>Exclure systématiquement <code>.env</code>, <code>.env.local</code> et <code>.env.production</code> via le fichier <code>.gitignore</code>.</li>
            <li><strong>Attention critique :</strong> <code>.gitignore</code> n'efface pas un secret qui a déjà été commité dans l'historique !</li>
            <li>En cas de leak dans un commit : <strong>révoquer et renouveler immédiatement le secret</strong> auprès du fournisseur d'API plutôt que de simplement faire un nouveau commit correctif.</li>
          </ul>
        </div>
      </div>

      {/* Section 3 : Simulateur interactif */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="cpu" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>3. Atelier Interactif — Matrice des Permissions & Détection de Fuite</span>
        </h2>
        <div className="p-5 rounded-xl border border-border bg-card flex flex-col gap-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sélectionnez un rôle pour inspecter sa matrice d'autorisations appliquée au projet TaskFlow, puis testez le détecteur de secrets.
          </p>

          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setSelectedRole('backend')}
              className={`py-1.5 px-3 rounded-lg font-semibold transition-all ${
                selectedRole === 'backend' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Agent Backend
            </button>
            <button
              onClick={() => setSelectedRole('qa')}
              className={`py-1.5 px-3 rounded-lg font-semibold transition-all ${
                selectedRole === 'qa' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Agent QA
            </button>
            <button
              onClick={() => setSelectedRole('reviewer')}
              className={`py-1.5 px-3 rounded-lg font-semibold transition-all ${
                selectedRole === 'reviewer' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Agent Reviewer
            </button>
            <button
              onClick={() => setSelectedRole('team_leader')}
              className={`py-1.5 px-3 rounded-lg font-semibold transition-all ${
                selectedRole === 'team_leader' ? 'bg-indigo-600 text-white shadow' : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Team Leader IA
            </button>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex flex-col gap-3 text-xs min-w-0 max-w-full">
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between border-b border-slate-800 pb-2.5 gap-2">
              <span className="font-bold text-white text-sm sm:text-base font-mono">{currentRole.role}</span>
              <span className="text-xs text-slate-400">Périmètre : <code className="text-emerald-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{currentRole.scope}</code></span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-1 min-w-0 max-w-full">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Droits en écriture de fichiers :</span>
                <p className="text-white mt-0.5 text-xs sm:text-sm break-words [overflow-wrap:anywhere]">{currentRole.fileWrite}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex flex-col gap-1 min-w-0 max-w-full">
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Commandes terminal autorisées :</span>
                <p className="text-white mt-0.5 font-mono text-xs sm:text-sm break-words [overflow-wrap:anywhere]">{currentRole.terminal}</p>
              </div>

              <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 flex flex-col gap-1 min-w-0 max-w-full">
                <span className="text-[10px] text-rose-300 font-semibold uppercase tracking-wider">Actions strictement interdites :</span>
                <p className="text-rose-200 mt-0.5 text-xs sm:text-sm break-words [overflow-wrap:anywhere] font-medium">{currentRole.forbiddenActions}</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 font-sans whitespace-normal break-words [overflow-wrap:anywhere]">
              <strong className="text-white font-semibold">Politique appliquée : </strong>{currentRole.verdict}
            </div>
          </div>

          {/* Détecteur de secret interactif */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900 flex flex-col gap-3 text-xs min-w-0 max-w-full">
            <span className="font-bold text-white text-sm flex items-center gap-2">
              <Icon name="search" className="w-4 h-4 text-indigo-400 shrink-0" />
              Scanner de Sécurité : Détection de Secrets dans les Fichiers Proposés
            </span>
            <input
              type="text"
              value={secretAuditInput}
              onChange={(e) => setSecretAuditInput(e.target.value)}
              className="p-3 rounded-lg border border-slate-800 bg-black font-mono text-xs w-full text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="Entrez une ligne de configuration ou code pour analyse..."
            />
            {hasSecretLeak ? (
              <div className="p-3 rounded-lg bg-rose-950/80 border border-rose-700/80 text-rose-200 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
                🛑 ALERTE SÉCURITÉ : Un secret ou identifiant en clair a été détecté dans la chaîne ! Bloquer immédiatement le commit et placer la valeur dans .env (hors dépôt).
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-700/80 text-emerald-200 font-medium leading-relaxed whitespace-normal break-words [overflow-wrap:anywhere]">
                ✅ Aucun secret critique identifié dans la chaîne analysée.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quiz officiel de fin de chapitre */}
      <div className="flex flex-col gap-4 w-full min-w-0 max-w-full pt-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-indigo-500 shrink-0" />
          <span>Quiz de vérification des connaissances</span>
        </h2>
        <QuickQuiz
          title="Évaluation des connaissances — Chapitre 6 : Contrôler les accès et autorisations"
          questions={[
            {
              id: 1,
              question: "Quelle est la différence entre authentification et autorisation ?",
              options: [
                "L'authentification vérifie l'identité ; l'autorisation définit les actions permises.",
                "L'authentification définit les rôles ; l'autorisation vérifie les mots de passe.",
                "L'authentification protège uniquement Git ; l'autorisation protège uniquement le terminal.",
                "Les deux notions désignent exactement le même mécanisme."
              ],
              correctIndex: 0,
              explanation: "L'authentification répond à 'Qui êtes-vous ?' et l'autorisation répond à 'Qu'avez-vous le droit de faire ?'."
            },
            {
              id: 2,
              question: "Quel principe consiste à accorder uniquement les permissions nécessaires à une mission ?",
              options: [
                "Le principe de disponibilité maximale.",
                "Le principe de duplication des accès.",
                "Le principe du moindre privilège.",
                "Le principe de permission permanente."
              ],
              correctIndex: 2,
              explanation: "Le principe du moindre privilège limite strictement les permissions aux besoins immédiats de la tâche."
            },
            {
              id: 3,
              question: "Un agent QA doit exécuter des tests et produire un rapport. Quelle permission est la moins justifiée par cette mission ?",
              options: [
                "Consulter les fichiers nécessaires aux tests.",
                "Modifier les paramètres administrateur du dépôt.",
                "Exécuter les commandes de test autorisées.",
                "Consulter les résultats d'exécution."
              ],
              correctIndex: 1,
              explanation: "La modification des paramètres d'administration du dépôt est totalement étrangère aux besoins d'une mission de test QA."
            },
            {
              id: 4,
              question: "Quel mécanisme contribue à protéger la branche principale d'un dépôt Git ?",
              options: [
                "Autoriser toutes les modifications directes sans contrôle.",
                "Supprimer systématiquement les demandes de fusion.",
                "Donner les droits administrateur à tous les agents.",
                "Configurer des protections adaptées, comme des approbations et des contrôles obligatoires."
              ],
              correctIndex: 3,
              explanation: "Les règles de protection interdisent les push directs et imposent la réussite des tests et l'approbation humaine."
            },
            {
              id: 5,
              question: "Quel est le principal risque lié à un secret inscrit directement dans le code source ?",
              options: [
                "Le code devient automatiquement plus lent.",
                "Les tests unitaires sont désactivés.",
                "Les personnes ayant accès au contenu peuvent récupérer l'information sensible.",
                "Git empêche systématiquement la création de commits."
              ],
              correctIndex: 2,
              explanation: "Un secret présent dans l'historique Git est exposé à quiconque clone le dépôt ou consulte les commits."
            },
            {
              id: 6,
              question: "Quelles pratiques contribuent à la protection des accès ?",
              options: [
                "Accorder uniquement les permissions nécessaires, révoquer les accès devenus inutiles et assurer la traçabilité.",
                "Conserver indéfiniment tous les accès temporaires.",
                "Partager le même token d'accès entre tous les agents.",
                "Désactiver la protection des branches pour aller plus vite."
              ],
              correctIndex: 0,
              explanation: "Le moindre privilège, la révocation post-mission et la traçabilité continue forment le socle d'une gestion saine."
            },
            {
              id: 7,
              question: "Un agent propose de fusionner une branche après une revue favorable. Quelle est la bonne décision dans l'organisation TaskFlow ?",
              options: [
                "Considérer la proposition comme une autorisation automatique.",
                "Attendre l'autorisation explicite du Project Manager humain.",
                "Autoriser systématiquement le Team Leader à fusionner.",
                "Demander à l'agent de fusionner sans vérifier les résultats."
              ],
              correctIndex: 1,
              explanation: "Dans TaskFlow, aucune opération de fusion sensible ne peut être exécutée sans l'aval explicite du PM humain."
            },
            {
              id: 8,
              question: "Pourquoi faut-il réexaminer les permissions lorsqu'une mission se termine ?",
              options: [
                "Pour conserver les permissions de toutes les missions précédentes.",
                "Pour supprimer automatiquement le dépôt Git.",
                "Pour empêcher l'agent de consulter son ancien travail dans tous les cas.",
                "Pour retirer les accès qui ne sont plus nécessaires."
              ],
              correctIndex: 3,
              explanation: "Les autorisations accordées pour un besoin ponctuel doivent être révoquées dès la clôture de la mission pour réduire la surface d'attaque."
            },
            {
              id: 9,
              question: "Une consigne demandant à un agent de ne pas fusionner une branche constitue à elle seule une protection technique empêchant cette opération.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 1,
              explanation: "Faux : une consigne dans un prompt est une règle textuelle, pas un verrou technique. Si l'agent a les droits Git en écriture, il peut techniquement transgresser."
            },
            {
              id: 10,
              question: "Un journal de suivi des actions peut aider à identifier l'acteur, l'opération et la ressource concernés lors de l'analyse d'un incident.",
              options: [
                "Vrai.",
                "Faux."
              ],
              correctIndex: 0,
              explanation: "Vrai : la traçabilité factuelle permet de reconstituer avec certitude la chaîne d'événements lors d'un audit de sécurité."
            }
          ]}
        />
      </div>
    </div>
  );
};
