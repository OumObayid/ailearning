'use client';

import React, { useState } from 'react';

export const MarkdownSanitizerLab: React.FC = () => {
  const [activePayload, setActivePayload] = useState<'safe' | 'xss_script' | 'xss_iframe'>('safe');
  const [sanitizeEnabled, setSanitizeEnabled] = useState<boolean>(true);

  const payloads = {
    safe: {
      title: 'Contenu Markdown standard conforme',
      rawText: `### Guide des bonnes pratiques React

Voici les **trois règles** recommandées :
1. Découper les composants en éléments atomiques.
2. Éviter les calculs lourds dans le rendu principal.
3. Utiliser \`React.memo\` avec discernement.

| Concept | Utilité |
| :--- | :--- |
| **Hooks** | Gestion d'état locale |
| **Context** | Partage d'état global |`,
    },
    xss_script: {
      title: 'Attaque XSS par injection de balise <script>',
      rawText: `Voici votre résumé documentaire :
<script>
  // Simulation d'extraction de token de session ou de cookie
  alert("ALERTE DE SÉCURITÉ : Exécution de code JavaScript arbitraire (XSS) !");
</script>
Le reste du texte semble normal mais du code malveillant a été injecté.`,
    },
    xss_iframe: {
      title: 'Attaque par détournement visuel <iframe>',
      rawText: `Consultez les informations ci-dessous :
<iframe src="https://phishing-site-fake.internal/login" width="100%" height="150" style="border: 2px solid red;">
</iframe>
Cette iframe tente d'afficher un faux formulaire de connexion pour dérober des identifiants.`,
    },
  };

  const currentPayload = payloads[activePayload];

  return (
    <div className="my-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-md bg-rose-50 px-2.5 py-0.5 text-sm font-bold text-rose-700">
              Lab Sécurité Frontend
            </span>
            <span className="inline-flex items-center rounded-md bg-indigo-50 px-2.5 py-0.5 text-sm font-bold text-indigo-700">
              Rendu Markdown & Anti-XSS
            </span>
          </div>
          <h4 className="text-lg font-extrabold text-slate-900 mt-1">
            Simulateur de Rendu Markdown Sécurisé & Neutralisation XSS
          </h4>
        </div>

        {/* Bouton de bascule de la sanitisation */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm font-bold text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={sanitizeEnabled}
              onChange={(e) => setSanitizeEnabled(e.target.checked)}
              className="accent-emerald-600 rounded w-4 h-4"
            />
            Filtrage Anti-XSS Actif
          </label>
        </div>
      </div>

      {/* Sélecteur de charge utile */}
      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() => setActivePayload('safe')}
          className={`px-3.5 py-1.5 text-sm font-bold rounded-xl transition-all ${
            activePayload === 'safe'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          ✅ Markdown Sain (Tableaux & Code)
        </button>
        <button
          onClick={() => setActivePayload('xss_script')}
          className={`px-3.5 py-1.5 text-sm font-bold rounded-xl transition-all ${
            activePayload === 'xss_script'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          ⚠️ Injection &lt;script&gt;
        </button>
        <button
          onClick={() => setActivePayload('xss_iframe')}
          className={`px-3.5 py-1.5 text-sm font-bold rounded-xl transition-all ${
            activePayload === 'xss_iframe'
              ? 'bg-rose-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          ⚠️ Détournement &lt;iframe&gt;
        </button>
      </div>

      {/* Comparatif Code Brut versus Rendu DOM */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Code brut reçu du LLM */}
        <div className="rounded-2xl border border-slate-200 p-5 bg-slate-900 text-slate-100 space-y-3 shadow-inner">
          <div className="flex justify-between items-center border-b border-slate-800 pb-2">
            <span className="text-sm font-bold text-slate-300">Flux brut reçu du modèle IA :</span>
            <span className="text-sm font-mono text-amber-400">raw_string</span>
          </div>
          <pre className="text-sm font-mono whitespace-pre-wrap leading-relaxed text-slate-300 max-h-60 overflow-y-auto">
            {currentPayload.rawText}
          </pre>
        </div>

        {/* Rendu dans le navigateur */}
        <div className="rounded-2xl border border-slate-200 p-5 bg-white shadow-sm space-y-3">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <span className="text-sm font-bold text-slate-900">Rendu visuel dans le DOM :</span>
            <span className={`text-sm font-bold px-2 py-0.5 rounded ${
              sanitizeEnabled ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {sanitizeEnabled ? 'Protégé par ReactMarkdown' : 'dangerouslySetInnerHTML (Vulnérable)'}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 min-h-[160px] text-sm leading-relaxed text-slate-800">
            {sanitizeEnabled ? (
              // Mode Sécurisé : Les balises script et iframe sont neutralisées et traitées comme texte inoffensif
              <div className="space-y-3">
                {activePayload === 'safe' && (
                  <div>
                    <h5 className="font-bold text-base text-slate-900 mb-2">Guide des bonnes pratiques React</h5>
                    <p className="text-slate-700 mb-2">Voici les <strong>trois règles</strong> recommandées :</p>
                    <ul className="list-disc pl-5 space-y-1 mb-3">
                      <li>Découper les composants en éléments atomiques.</li>
                      <li>Éviter les calculs lourds dans le rendu principal.</li>
                      <li>Utiliser <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">React.memo</code> avec discernement.</li>
                    </ul>
                  </div>
                )}

                {activePayload === 'xss_script' && (
                  <div className="space-y-2">
                    <p>Voici votre résumé documentaire :</p>
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-sm">
                      🛡️ <strong>Neutralisation active :</strong> La balise <code>&lt;script&gt;</code> a été désarmée et n&apos;est pas exécutée par le moteur JavaScript du navigateur.
                    </div>
                    <p className="text-slate-600">Le reste du texte s&apos;affiche sans aucun risque d&apos;injection de code.</p>
                  </div>
                )}

                {activePayload === 'xss_iframe' && (
                  <div className="space-y-2">
                    <p>Consultez les informations ci-dessous :</p>
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-sm">
                      🛡️ <strong>Blocage d&apos;iframe :</strong> Les balises HTML arbitraires sont ignorées par le composant de rendu sécurisé. Aucun site tiers ne peut être encapsulé dans la vue.
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Mode Non Sécurisé : danger simulé
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-950 space-y-2">
                <span className="font-extrabold text-rose-900 block">💥 ALERTE CRITIQUE : VULNÉRABILITÉ XSS EXPLOITÉE</span>
                <p>
                  Si vous aviez utilisé <code>dangerouslySetInnerHTML</code>, le script de l&apos;attaquant aurait volé les cookies de session ou ouvert un faux formulaire de phishing dans le contexte de votre domaine.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

