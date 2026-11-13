'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';

export const Chapitre6Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed min-w-0 max-w-full">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-purple-200 bg-purple-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-purple-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Prompt Engineering IDE • Module 6</span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Chapitre 6 — Protection des clés API (API Keys Security)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2">
          Comment protéger vos clés payantes (Gemini, Stripe), bâtir une architecture backend étanche et réagir immédiatement en cas de fuite accidentelle.
        </p>
      </div>

      {/* 1. L'erreur mortelle : Clé secrète dans le Frontend */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="shield-exclamation" className="w-5 h-5 text-indigo-600" />
          <span>1. L&apos;erreur critique : injecter une clé API secrète dans un frontend React</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Dans un projet React (Vite ou Next.js client), les variables d&apos;environnement préfixées par <code className="bg-rose-100 px-1 py-0.5 rounded font-mono text-xs text-rose-800 font-bold">VITE_</code> ou <code className="bg-rose-100 px-1 py-0.5 rounded font-mono text-xs text-rose-800 font-bold">NEXT_PUBLIC_</code> sont intégrées en <strong>texte clair</strong> dans les fichiers JavaScript téléchargés par le navigateur de n&apos;importe quel visiteur du monde entier !
        </p>

        {/* Danger Alert Box without pre */}
        <div className="p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl text-xs sm:text-sm text-rose-950 font-mono space-y-1">
          <div className="font-bold text-rose-800 uppercase">// DANGER ABSOLU DANS LE CODE SOURCE DU NAVIGATEUR :</div>
          <div className="break-words">const apiKey = import.meta.env.VITE_GEMINI_API_KEY;</div>
          <div className="text-slate-600 text-[11px] font-sans">
            En pressant <kbd className="bg-white border px-1 rounded">F12</kbd> (Inspecter l&apos;élément &gt; Onglet Sources), n&apos;importe qui peut extraire votre clé en 5 secondes et épuiser votre compte en banque.
          </div>
        </div>

        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-2xl text-sm text-indigo-950 space-y-2">
          <div className="font-bold flex items-center gap-2">
            <Icon name="light-bulb" className="w-4 h-4 text-indigo-700" />
            <span>L&apos;analogie de la cuisine de restaurant et du serveur :</span>
          </div>
          <p>
            Quand un client s&apos;assoit au restaurant, il commande un plat au serveur. Le serveur transmet la commande en cuisine. Le chef prépare le repas en utilisant les épices rares et coûteuses enfermées dans la réserve du restaurant. Le client reçoit son assiette fumante.
          </p>
          <p>
            Imaginez la folie si le restaurateur donnait les clés de sa réserve d&apos;épices et son portefeuille directement à chaque client en lui disant : <em>« Va te servir toi-même ! »</em>. C&apos;est exactement ce que vous faites quand vous mettez une clé secrète dans du code React client.
          </p>
        </div>
      </section>

      {/* 2. L'architecture de médiation backend */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="server-stack" className="w-5 h-5 text-indigo-600" />
          <span>2. L&apos;architecture de médiation étanche (Backend Proxy)</span>
        </h2>
        
        <p className="text-base sm:text-lg text-slate-900 font-medium">
          Une clé d&apos;API privée ne doit jamais quitter le serveur. Le client React communique uniquement avec votre propre backend sécurisé :
        </p>

        {/* Visual Pipeline without pre */}
        <div className="grid gap-3 font-mono text-xs grid-cols-1 sm:grid-cols-2">
          <div className="p-4 bg-white border-2 border-slate-300 rounded-xl space-y-2 text-center shadow-sm">
            <span className="font-bold text-slate-900 block text-sm">1. Frontend React (Client)</span>
            <div className="p-2 bg-slate-50 rounded border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
              Envoie la requête utilisateur :<br />
              <code className="text-indigo-700 font-bold">POST /api/chat</code><br />
              <strong className="text-emerald-700">Zéro clé secrète</strong>
            </div>
          </div>

          <div className="p-4 bg-indigo-50 border-2 border-indigo-300 rounded-xl space-y-2 text-center shadow-sm">
            <span className="font-bold text-indigo-950 block text-sm">2. Backend Node.js (Serveur)</span>
            <div className="p-2 bg-white rounded border border-indigo-200 text-indigo-900 text-[11px] leading-relaxed">
              Lit le fichier .env privé :<br />
              <code className="text-purple-700 font-bold">process.env.GEMINI_KEY</code><br />
              Vérifie l&apos;authentification
            </div>
          </div>

          <div className="p-4 bg-emerald-50 border-2 border-emerald-300 rounded-xl space-y-2 text-center shadow-sm">
            <span className="font-bold text-emerald-950 block text-sm">3. API Google Gemini</span>
            <div className="p-2 bg-white rounded border border-emerald-200 text-emerald-900 text-[11px] leading-relaxed">
              Reçoit l&apos;appel serveur-à-serveur,<br />
              génère la réponse IA<br />
              et renvoie le flux JSON
            </div>
          </div>
        </div>
      </section>

      {/* 3. Les 4 erreurs mortelles de manipulation des clés */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="exclamation-triangle" className="w-5 h-5 text-indigo-600" />
          <span>3. Les 4 erreurs majeures de manipulation des clés API</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">ERREUR 1</span>
            <h4 className="font-bold text-slate-950">Hardcoding en dur dans le code</h4>
            <p className="text-xs text-slate-700">
              Écrire <code className="font-mono text-xs">const apiKey = &quot;AIzaSy...&quot;</code> dans un composant. Lors du premier commit Git, des bots automatisés scannent GitHub et siphonnent votre clé en moins de 30 secondes.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">ERREUR 2</span>
            <h4 className="font-bold text-slate-950">Affichage dans console.log()</h4>
            <p className="text-xs text-slate-700">
              Imprimer la clé pour déboguer. Elle se retrouve persistée dans les fichiers de logs du serveur, dans les traces Antigravity ou visible sur vos partages d&apos;écran en visio.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">ERREUR 3</span>
            <h4 className="font-bold text-slate-950">Coller la clé dans le prompt de chat</h4>
            <p className="text-xs text-slate-700">
              Écrire à l&apos;agent : <em>« Tiens voici ma clé d&apos;API pour tester : AIzaSy... »</em>. Cette clé est alors transmise dans les métadonnées de requête et enregistrée dans l&apos;historique de discussion.
            </p>
          </div>

          <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5 shadow-sm">
            <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">ERREUR 4</span>
            <h4 className="font-bold text-slate-950">Suppression Git sans rotation</h4>
            <p className="text-xs text-slate-700">
              Constater une fuite et se contenter d&apos;effacer la ligne sur Git. L&apos;historique Git conserve l&apos;ancien commit et les attaquants continuent d&apos;utiliser la clé. <strong>Il faut impérativement révoquer la clé dans la console Cloud !</strong>
            </p>
          </div>
        </div>
      </section>

      {/* 4. Instructions de sanctuarisation */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5 flex items-center gap-2">
          <Icon name="document-text" className="w-5 h-5 text-indigo-600" />
          <span>4. Directive d&apos;instructions : Sécurité des clés API</span>
        </h2>

        {/* Prompt Box without pre */}
        <div className="bg-slate-950 text-slate-100 p-5 rounded-2xl font-mono text-xs leading-relaxed break-words space-y-2 border border-slate-800 min-w-0 max-w-full">
          <div className="text-indigo-400 font-bold border-b border-slate-800 pb-1">
            === DIRECTIVE DE SÉCURITÉ : CLÉS D&apos;API ET SECRETS ===
          </div>
          <div className="text-indigo-300 font-bold">[1. INTERDICTION DE DEMANDE DE CLÉ RÉELLE]</div>
          <div className="text-slate-200">
            Ne sollicite JAMAIS de l&apos;utilisateur qu&apos;il colle une clé d&apos;API valide dans la conversation. Utilise systématiquement des gabarits fictifs (&quot;EXEMPLE_CLE_GEMINI&quot;).
          </div>

          <div className="text-rose-400 font-bold pt-1">[2. DÉTECTION ET MASQUAGE IMMÉDIAT (REDACTION)]</div>
          <div className="pl-4 text-slate-200">
            Si une chaîne de caractères ressemblant à une clé d&apos;API (ex: format AIzaSy...) apparaît dans un fichier ou un log :<br />
            1. Ne la reproduis JAMAIS dans tes réponses textuelles.<br />
            2. Remplace-la systématiquement par &lt;REDACTED_API_KEY&gt;.<br />
            3. Alerte immédiatement l&apos;utilisateur : recommande la révocation et la régénération de la clé sans délai.
          </div>

          <div className="text-amber-300 font-bold pt-1">[3. ARCHITECTURE BACKEND STRICTE]</div>
          <div className="pl-4 text-slate-200">
            Refuse toute proposition de code visant à injecter une clé d&apos;API privée dans un composant React client ou dans une variable VITE_*. Propose systématiquement une route de médiation backend (ex: /api/chat).
          </div>
        </div>
      </section>

      {/* Quiz */}
      <section className="space-y-4 pt-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          Auto-évaluation : Sécurité des clés API
        </h2>
        <QuickQuiz
          title="Validation des acquis — Chapitre 6"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il dangereux d'écrire une clé API Gemini dans une variable VITE_GEMINI_API_KEY dans une application React ?",
              options: [
                "Parce que Vite incorpore toutes les variables VITE_* dans les fichiers JavaScript publics distribués au navigateur de n'importe quel internaute, exposant la clé en clair.",
                "Parce que Vite n'accepte que les fichiers rédigés en Python.",
                "Parce que cela provoque une erreur de compilation dans le terminal.",
                "Parce que React supprime les variables qui dépassent 10 caractères."
              ],
              correctIndex: 0,
              explanation: "Le code frontend s'exécute sur les machines des utilisateurs finaux : n'importe quel visiteur peut lire les variables VITE_* dans les outils de développement (F12)."
            },
            {
              id: 2,
              question: "Que devez-vous faire en urgence absolue si vous découvrez qu'une vraie clé d'API a été accidentellement poussée sur GitHub ?",
              options: [
                "Se rendre immédiatement sur la console Google Cloud ou Stripe pour révoquer (supprimer) la clé compromise et en générer une toute nouvelle.",
                "Faire un nouveau commit en effaçant la ligne du fichier sans toucher à la clé.",
                "Changer le nom du projet sur GitHub.",
                "Redémarrer votre box internet."
              ],
              correctIndex: 0,
              explanation: "Une clé fuitée reste active tant qu'elle n'est pas révoquée auprès du fournisseur. Même si vous supprimez le commit, les attaquants ont déjà sauvegardé l'ancienne version."
            },
            {
              id: 3,
              question: "Dans l'analogie du restaurant, que représente le fait de créer une route backend /api/chat ?",
              options: [
                "Le serveur qui prend la commande du client et va chercher lui-même le plat en cuisine, protégeant ainsi l'accès à la réserve d'épices confidentielle.",
                "Le menu écrit sur le tableau noir.",
                "L'addition payée par carte bancaire.",
                "Le balayage de la salle après la fermeture."
              ],
              correctIndex: 0,
              explanation: "Le backend agit comme un intermédiaire de confiance (le serveur du restaurant) : il détient le secret, contacte l'API Gemini et ne renvoie que le résultat au client React."
            }
          ]}
        />
      </section>
    </div>
  );
};
