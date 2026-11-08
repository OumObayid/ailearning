'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { Icon } from '@/components/common/Icon';

export const Chapitre8Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Hero Banner */}
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Identifier les vulnérabilités liées aux erreurs de programmation
        </h1>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Chapitre 6.8 — Identifier les vulnérabilités liées aux erreurs de programmation
      </p>
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs du chapitre
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        À la fin de ce chapitre, vous devez être capable de :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Distinguer une erreur de programmation d&apos;une vulnérabilité de sécurité.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier les failles courantes dans une application Web.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Repérer les problèmes de validation, d&apos;authentification et d&apos;autorisation.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Diagnostiquer une vulnérabilité dans une application React / Node.js / Express.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Corriger une faille et vérifier que le problème ne peut plus être reproduit.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Erreur de programmation et vulnérabilité : quelle différence ?
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une erreur de programmation est un défaut dans le code qui provoque un comportement inattendu.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une vulnérabilité est une faiblesse qui peut être exploitée pour compromettre la sécurité d&apos;une application.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`app.get("/api/users/:id", async (req, res) =&gt; {
const user = await getUserById(req.params.id);
res.json(user);
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cette route peut fonctionner correctement sur le plan technique. Pourtant, elle présente une vulnérabilité si n&apos;importe quel utilisateur connecté peut consulter les informations privées d&apos;un autre utilisateur.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Il faut donc distinguer :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Bug fonctionnel : le programme ne fonctionne pas comme prévu.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Faille de sécurité : un comportement peut être exploité pour accéder à des données ou effectuer une action non autorisée.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Les principales vulnérabilités à connaître
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        L&apos;OWASP Top 10 est un référentiel qui présente les principaux risques de sécurité des applications Web. Il constitue une bonne base pour analyser les erreurs de programmation.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Voici les vulnérabilités particulièrement importantes dans les applications Web modernes.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.1. Validation insuffisante des entrées
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une application ne doit jamais faire confiance aux données envoyées par le navigateur.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`app.post("/api/users", async (req, res) =&gt; {
const { email, age } = req.body;

// Données utilisées sans validation
await createUser(email, age);

res.json({ message: "Utilisateur créé" });
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un utilisateur malveillant pourrait envoyer :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Un email invalide.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Un âge négatif.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Une valeur inattendue à la place d&apos;un nombre.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Des propriétés supplémentaires non prévues.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Correction avec Zod :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`npm install zod
import { z } from "zod";

const userSchema = z.object({
email: z.string().email(),
age: z.number().int().min(18).max(120)
});

app.post("/api/users", async (req, res) =&gt; {
const result = userSchema.safeParse(req.body);

if (!result.success) {
return res.status(400).json({
message: "Données invalides"
});
}

await createUser(result.data.email, result.data.age);

res.status(201).json({
message: "Utilisateur créé"
});
});`}</code></pre>
      </div>
      <Callout type="tip" title="À retenir ">
        <p className="text-xs sm:text-sm">la validation côté React améliore l&apos;expérience utilisateur, mais la validation côté serveur est indispensable pour la sécurité.</p>
      </Callout>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.2. Contrôle d&apos;accès défaillant (IDOR / BOLA)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        C&apos;est une vulnérabilité très fréquente dans les API.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        IDOR (Insecure Direct Object Reference) désigne l&apos;accès non autorisé à une ressource en manipulant son identifiant.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        BOLA (Broken Object Level Authorization) est le terme utilisé dans le contexte des API pour désigner un contrôle d&apos;autorisation insuffisant au niveau des objets.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple d&apos;exploitation
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Utilisateur A
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Connecté avec l&apos;identifiant 15
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        L&apos;utilisateur demande :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`GET /api/users/20`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Problème : le serveur retourne les données de l&apos;utilisateur 20 sans vérifier que l&apos;utilisateur A est autorisé à les consulter.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Correction
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vérifier côté serveur que l&apos;utilisateur connecté possède les droits nécessaires.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Code vulnérable :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`app.get("/api/users/:id", async (req, res) =&gt; {
const user = await getUserById(req.params.id);

if (!user) {
return res.status(404).json({ message: "Introuvable" });
}

res.json(user);
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Code corrigé pour un utilisateur qui ne peut consulter que son propre profil :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`app.get("/api/users/:id", authenticateToken, async (req, res) =&gt; {
const requestedId = Number(req.params.id);
const authenticatedUserId = req.user.id;

if (requestedId !== authenticatedUserId) {
return res.status(403).json({
message: "Accès interdit"
});
}

const user = await getUserById(authenticatedUserId);

if (!user) {
return res.status(404).json({
message: "Utilisateur introuvable"
});
}

res.json(user);
});
Ici, authenticateToken représente un middleware qui vérifie le token et place l'identité authentifiée dans req.user.`}</code></pre>
      </div>
      <Callout type="warning" title="Attention ">
        <p className="text-xs sm:text-sm">comparer les identifiants suffit uniquement pour une règle d&apos;accès à son propre profil. Pour un administrateur ou un responsable, il faut appliquer les règles de rôle et de propriété appropriées.</p>
      </Callout>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.3. Authentification et gestion des sessions incorrectes
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une mauvaise gestion de l&apos;authentification peut permettre à un attaquant d&apos;usurper une identité.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemples de mauvaises pratiques :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser des mots de passe faibles ou stockés en clair.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Accepter un JWT sans vérifier sa signature.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas vérifier l&apos;expiration du token.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Stocker des tokens sensibles dans un emplacement accessible au JavaScript sans évaluer le risque XSS.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas invalider les sessions après une déconnexion ou une modification de mot de passe.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Bonnes pratiques :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Hacher les mots de passe avec Argon2id ou bcrypt.</span>
          </li>
        </ul>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Vérifier la signature, l'expiration (exp) et les claims nécessaires des JWT.`}</code></pre>
      </div>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utiliser HTTPS.</span>
          </li>
        </ul>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Protéger les cookies de session avec HttpOnly, Secure et une politique SameSite adaptée.`}</code></pre>
      </div>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Prévoir une expiration et une révocation des sessions.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.4. Exposition de données sensibles
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une application peut exposer des informations confidentielles sans même avoir de bug fonctionnel.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemples :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`console.log(process.env.API_KEY);`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ou encore :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`res.status(500).json({
error: error.stack
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ces pratiques peuvent révéler des clés API, des chemins internes, des requêtes SQL ou des détails techniques.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Bonnes pratiques :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Placer les secrets dans des variables d&apos;environnement.</span>
          </li>
        </ul>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Ajouter .env au fichier .gitignore.`}</code></pre>
      </div>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne jamais envoyer les secrets au frontend.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas afficher les stack traces aux utilisateurs en production.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Masquer les données sensibles dans les logs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>En cas de fuite d&apos;une clé, la révoquer et la remplacer.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.5. Cross-Site Scripting (XSS)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une attaque XSS consiste à injecter du code JavaScript dans une page Web afin qu&apos;il soit exécuté dans le navigateur d&apos;une victime.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Il existe trois formes classiques :
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Explication</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Stored XSS</td>
              <td className="px-4 py-2.5 font-medium">Le contenu malveillant est enregistré en base de données.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Reflected XSS</td>
              <td className="px-4 py-2.5 font-medium">Le contenu malveillant est renvoyé directement dans une réponse.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">DOM- based XSS</td>
              <td className="px-4 py-2.5 font-medium">Le JavaScript du navigateur manipule dangereusement des données non fiables.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple dangereux avec React :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`function Comment({ content }) {
return (
&lt;div
dangerouslySetInnerHTML={{ __html: content }}
/&gt;
);
}
Si content contient du HTML malveillant non nettoyé, il peut être exécuté dans la page.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Correction :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`function Comment({ content }) {
return &lt;div&gt;{content}&lt;/div&gt;;
}`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        React échappe automatiquement le texte affiché de cette manière.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Si l&apos;application doit réellement afficher du HTML fourni par un utilisateur, utilisez une bibliothèque de nettoyage adaptée, comme DOMPurify, avant l&apos;insertion.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.6. Cross-Site Request Forgery (CSRF)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une attaque CSRF pousse le navigateur d&apos;un utilisateur authentifié à envoyer une requête non désirée vers une application.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Elle concerne particulièrement les applications qui utilisent des cookies automatiquement envoyés par le navigateur.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un utilisateur est connecté à un site bancaire. Il visite ensuite une page malveillante qui tente de déclencher une opération bancaire à son insu.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Protections :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Utiliser des cookies SameSite adaptés.`}</code></pre>
      </div>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mettre en place des tokens CSRF lorsque nécessaire.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier l&apos;origine des requêtes sensibles.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas utiliser une simple requête GET pour modifier des données.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.7. Mauvaise configuration de sécurité
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une application peut être vulnérable à cause de sa configuration, même si son code métier est correct.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemples :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>CORS autorisant toutes les origines sans justification.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mode debug activé en production.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Headers de sécurité absents.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Dépendances Node.js vulnérables.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Messages d&apos;erreur trop détaillés.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Outils et protections :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`npm audit`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour examiner les dépendances présentant des vulnérabilités connues.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Installer Helmet :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`npm install helmet`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Puis dans Express :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`import helmet from "helmet";

app.use(helmet());`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Configurer CORS uniquement pour les origines autorisées :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`import cors from "cors";

app.use(cors({
origin: ["https://mon-site.com"]
}));`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La configuration doit être adaptée aux besoins réels de l&apos;application, notamment si elle utilise des cookies ou des credentials.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.8. SSRF : Server-Side Request Forgery
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une SSRF apparaît lorsqu&apos;un serveur effectue une requête vers une adresse contrôlée par un utilisateur sans vérification suffisante.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`app.get("/api/fetch", async (req, res) =&gt; {
const response = await fetch(req.query.url);
const data = await response.text();

res.send(data);
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un attaquant pourrait tenter de faire accéder le serveur à des ressources internes qui ne sont pas accessibles depuis Internet.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Protection :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Autoriser uniquement les domaines nécessaires.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Bloquer les adresses IP privées et locales.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Contrôler les redirections.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Appliquer des restrictions réseau côté serveur.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le contrôle doit aussi prendre en compte les changements DNS et les adresses IP obtenues après résolution du nom de domaine.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Méthode de diagnostic d&apos;une vulnérabilité
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour diagnostiquer une faille, il ne suffit pas de lire le code. Il faut comprendre comment une donnée circule dans l&apos;application.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Démarche de diagnostic
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier le point d&apos;entrée</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Paramètre URL, formulaire, fichier, cookie ou requête API.
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Suivre la donnée</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Observer son passage du frontend au backend, puis vers la base de données ou un service externe.
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier les contrôles</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Validation, authentification, autorisation et nettoyage des données.
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Reproduire le problème</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans un environnement de test autorisé, avec un scénario précis.
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier la cause racine</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Déterminer quelle vérification manque ou quelle règle est incorrecte.
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Corriger et tester</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ajouter le contrôle manquant et vérifier qu&apos;il bloque le scénario initial.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Outils de détection et d&apos;analyse
        </h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Outil</th>
              <th className="px-4 py-3">Utilisation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Chrome DevTools</td>
              <td className="px-4 py-2.5 font-medium">Examiner les requêtes, cookies et réponses HTTP.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">OWASP ZAP</td>
              <td className="px-4 py-2.5 font-medium">Scanner une application Web et identifier des failles potentielles.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">npm audit</td>
              <td className="px-4 py-2.5 font-medium">Identifier des dépendances vulnérables.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Snyk</td>
              <td className="px-4 py-2.5 font-medium">Analyser les dépendances et le code.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Logs serveur</td>
              <td className="px-4 py-2.5 font-medium">Repérer les comportements suspects et les erreurs.</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Postman</td>
              <td className="px-4 py-2.5 font-medium">Reproduire et tester les requêtes API.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Un résultat de scanner est une piste d&apos;investigation, pas une preuve définitive. Il faut vérifier chaque vulnérabilité détectée.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. TP pratique — Détecter et corriger une faille IDOR/BOLA
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        TP pratique
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Difficulté : intermédiaire
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Objectif : comprendre comment un utilisateur peut accéder aux données privées d&apos;un autre utilisateur en modifiant simplement un identifiant dans une requête API.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 1 — Créer le serveur Express
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Installation :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`npm init -y
npm install express
Créer server.js :
import express from "express";

const app = express();

app.use(express.json());

const users = [
{ id: 1, name: "Alice", email: "alice@test.com" },
{ id: 2, name: "Bob", email: "bob@test.com" }
];

// Simulation pédagogique de l'authentification
function authenticateToken(req, res, next) {
req.user = { id: 1 };
next();
}

// Route vulnérable
app.get("/api/users/:id", (req, res) =&gt; {
const user = users.find(
u =&gt; u.id === Number(req.params.id)
);

if (!user) {
return res.status(404).json({
message: "Utilisateur introuvable"
});
}

res.json(user);
});

app.listen(3000, () =&gt; {
console.log("Serveur démarré sur http://localhost:3000");
});
Pour utiliser les imports ES Modules, ajoutez "type": "module" dans package.json.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 2 — Reproduire la vulnérabilité
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Démarrer le serveur :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`node server.js`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans Postman, envoyer :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`GET http://localhost:3000/api/users/2`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Résultat vulnérable
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`{
"id": 2,
"name": "Bob",
"email": "bob@test.com"
}`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le problème : le serveur retourne les données de Bob alors que notre simulation indique que l&apos;utilisateur connecté est Alice (ID 1).
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 3 — Corriger la vulnérabilité
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Remplacer la route vulnérable par :
      </p>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`app.get("/api/users/:id", authenticateToken, (req, res) =&gt; {
const requestedId = Number(req.params.id);
const authenticatedUserId = req.user.id;

if (!Number.isInteger(requestedId)) {
return res.status(400).json({
message: "Identifiant invalide"
});
}

if (requestedId !== authenticatedUserId) {
return res.status(403).json({
message: "Accès interdit"
});
}

const user = users.find(
u =&gt; u.id === authenticatedUserId
);

if (!user) {
return res.status(404).json({
message: "Utilisateur introuvable"
});
}

res.json(user);
});`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 4 — Vérifier la correction
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Requête</th>
              <th className="px-4 py-3">Résultat attendu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">GET /api/ users /1</td>
              <td className="px-4 py-2.5 font-medium">200 — Alice</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">GET /api/ users /2</td>
              <td className="px-4 py-2.5 font-medium">403 — Accès interdit</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">GET /api/ users /abc</td>
              <td className="px-4 py-2.5 font-medium">400 — Identifiant invalide</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">GET /api/ users /99</td>
              <td className="px-4 py-2.5 font-medium">403 — Accès interdit</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Attention : ce middleware d'authentification est simulé pour le TP. Dans une vraie application, il doit vérifier un token ou une session et obtenir l'identité depuis une source fiable. Il ne faut jamais laisser le client choisir librement req.user.id.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Étape 5 — Tests de non-régression
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Après correction, vérifier que :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Un utilisateur peut consulter son propre profil.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Un utilisateur ne peut pas consulter le profil d&apos;un autre.</span>
          </li>
        </ul>
      <div className="my-4 rounded-2xl overflow-hidden border border-slate-800 shadow-md">
        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-xs font-mono text-slate-300">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
            <span className="ml-2 text-slate-400">code</span>
          </span>
        </div>
        <pre className="bg-slate-900 text-slate-100 p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed"><code>{`Un utilisateur non authentifié reçoit une réponse 401.
Un utilisateur sans permission reçoit une réponse 403.`}</code></pre>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le but du débogage de sécurité est de s&apos;assurer que la faille ne réapparaît pas après une modification du code.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Bonnes pratiques à retenir
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne jamais faire confiance aux données envoyées par le navigateur.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Valider toutes les entrées côté serveur.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifier les permissions pour chaque ressource sensible.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne jamais considérer qu&apos;un utilisateur connecté est automatiquement autorisé à tout faire.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ne pas exposer les secrets et les détails techniques.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Maintenir les dépendances à jour.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Tester les routes API avec différents profils utilisateurs.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ajouter des tests de sécurité aux tests de régression.</span>
          </li>
        </ul>
      </section>

      {/* Quiz de révision */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de révision — Chapitre 6.8"
          questions={[
            {
              id: 1,
              question: "Quelle est la différence entre un bug et une vulnérabilité ?",
              options: ["Une vulnérabilité peut être exploitée pour compromettre la sécurité.", "Un bug concerne uniquement le frontend."],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 2,
              question: "Où faut-il valider les données reçues par une API ?",
              options: ["Uniquement dans React.", "Uniquement dans le navigateur."],
              correctIndex: 2,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 3,
              question: "Que signifie IDOR ?",
              options: ["Erreur de connexion SQL.", "Problème de mémoire Node.js."],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 4,
              question: "Quelle commande permet d'identifier des dépendances vulnérables dans un projet Node.js ?",
              options: ["npm start", "npm audit", "npm init"],
              correctIndex: 1,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
          ]}
        />
      </div>
    </div>
  );
};
