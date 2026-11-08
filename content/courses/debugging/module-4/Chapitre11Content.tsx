import React from "react";
import Image from "next/image";
import { Icon } from "@/components/common/Icon";

export const Chapitre11Content: React.FC = () => {
  return (
    <div className="space-y-8 text-slate-300">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 11 — Utilisation de Postman pour isoler les problèmes
        </h1>
      </div>

      {/* Interface Postman Image 5 */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-white flex items-center gap-2">
            <Icon name="search" className="w-5 h-5 text-emerald-400" />
            Environnement de travail et diagnostic sous Postman
          </h3>
          <span className="text-xs bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full">
            Figure 4.11
          </span>
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-slate-800 bg-slate-900 flex justify-center p-4">
          <Image
            src="/images/cours/debugging/module-4/image5.jpeg"
            alt="Interface de test et débogage d'une API avec Postman"
            width={850}
            height={480}
            className="rounded-lg object-contain max-h-[460px] w-auto shadow-2xl"
          />
        </div>
        <p className="text-xs text-slate-400 italic text-center">
          Inspection ciblée dans Postman : choix de la méthode HTTP, onglet Headers, body JSON brut et examen du statut de retour, de la latence et du payload.
        </p>
      </div>

      {/* 1. Logique d'isolation binaire */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="layout" className="w-5 h-5 text-emerald-400" />
          1. L&apos;arbre de décision d&apos;isolation Front / Back
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
            <span className="font-bold text-amber-400 block mb-1">Postman ✅ / React ❌</span>
            <p className="text-slate-400 leading-relaxed">
              Le Backend fonctionne parfaitement. L&apos;erreur est sur le frontend : politique <strong>CORS</strong>, URL erronée (<code className="text-slate-200">http://localhost:5173/api...</code> au lieu de 3000), ou en-tête <code className="text-slate-200">Content-Type</code> omis.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
            <span className="font-bold text-red-400 block mb-1">Postman ❌ / React ❌</span>
            <p className="text-slate-400 leading-relaxed">
              L&apos;erreur provient de l&apos;infrastructure serveur : serveur Express arrêté, port en conflit (EADDRINUSE), crash de contrôleur ou base MySQL injoignable.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950">
            <span className="font-bold text-sky-400 block mb-1">Statut 200 mais Données ❌</span>
            <p className="text-slate-400 leading-relaxed">
              Bug de logique applicative : clause SQL <code className="text-slate-200">WHERE</code> incorrecte, mauvaise jointure de tables ou filtre inattendu dans le contrôleur.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Bonnes pratiques de requêtage dans Postman */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-400" />
          2. Les 3 vérifications indispensables lors d&apos;une requête POST/PUT
        </h3>

        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
            <span className="font-semibold text-emerald-400 text-sm">1. En-tête Content-Type</span>
            <p className="text-slate-400">
              Dans l&apos;onglet <strong>Headers</strong>, assurez-vous que <code className="text-slate-200 font-mono">Content-Type: application/json</code> est présent. Sans cet en-tête, Express ne déclenchera pas son décodeur et <code className="text-slate-200 font-mono">req.body</code> sera vide.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
            <span className="font-semibold text-emerald-400 text-sm">2. Format du Body</span>
            <p className="text-slate-400">
              Dans l&apos;onglet <strong>Body</strong>, activez le bouton radio <code className="text-slate-200 font-mono">raw</code> et sélectionnez <code className="text-slate-200 font-mono">JSON</code> dans la liste déroulante à droite. Un JSON mal formaté (guillemets simples, virgule orpheline) provoquera une erreur 400.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
            <span className="font-semibold text-emerald-400 text-sm">3. Authentification Bearer</span>
            <p className="text-slate-400">
              Dans l&apos;onglet <strong>Authorization</strong>, choisissez le type <code className="text-slate-200 font-mono">Bearer Token</code> ou renseignez directement l&apos;en-tête <code className="text-slate-200 font-mono">Authorization: Bearer &#123;&#123;token&#125;&#125;</code>.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Tests automatisés Postman */}
      <div className="space-y-4">
        <h3 className="text-[19px] font-bold text-white flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-emerald-400" />
          3. Automatiser les assertions avec l&apos;onglet Tests
        </h3>
        <p className="leading-relaxed">
          Postman intègre un moteur JavaScript complet capable de valider le comportement de vos routes immédiatement après réception de la réponse via l&apos;objet <code className="text-emerald-300 font-mono">pm</code> :
        </p>

        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
          <div className="text-slate-400 font-sans font-bold text-sm mb-2">Script d&apos;assertion pour une création de ressource (POST /tasks) :</div>
          <pre className="text-emerald-300 overflow-x-auto">
{`// 1. Valider le code HTTP 201 Created
pm.test("Statut HTTP valide", () => {
  pm.response.to.have.status(201);
});

// 2. Vérifier que la latence de traitement reste sous 300ms
pm.test("Performance serveur acceptable", () => {
  pm.expect(pm.response.responseTime).to.be.below(300);
});

// 3. Valider la structure du JSON retourné
pm.test("Payload conforme aux spécifications", () => {
  const jsonData = pm.response.json();
  pm.expect(jsonData).to.have.property("id");
  pm.expect(jsonData.title).to.eql("Rédiger les tests API");
  
  // Sauvegarder automatiquement l'ID généré pour les requêtes suivantes
  pm.environment.set("currentTaskId", jsonData.id);
});`}
          </pre>
        </div>
      </div>
    </div>
  );
};
export default Chapitre11Content;
