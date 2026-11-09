'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';
import { PerformanceSecurityAuditLab } from '@/components/interactive/PerformanceSecurityAuditLab';

export const Chapitre13Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="award" className="w-4 h-4 text-lime-700" />
          <span>Module 5 — Projet Final de Synthèse (Capstone)</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 13 — TP Final : Audit d&apos;Ingénierie & Diagnostic de l&apos;Application ShopDebug
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Mise en pratique intégrale des compétences du Module 5 sur un cas d&apos;entreprise concret : traque de fuite mémoire V8, déblocage de l&apos;Event Loop, éradication du N+1 SQL, neutralisation des surventes concurrentes et colmatage des failles IDOR/SQLi.
        </p>
      </div>

      {/* Objectifs du TP Final */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-circle" className="w-5 h-5 text-emerald-600" />
          Mission & Livrables de l&apos;Ingénieur Auditeur
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm font-semibold text-slate-900">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">1</span>
            <span>Auditer la consommation mémoire et localiser la fuite dans le cache des produits.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">2</span>
            <span>Détecter la saturation CPU bloquant l&apos;Event Loop lors du calcul des remises.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">3</span>
            <span>Analyser le plan d&apos;exécution EXPLAIN et corriger le syndrome N+1 des commandes.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">4</span>
            <span>Sécuriser le stock contre les surventes avec une mise à jour atomique conditionnelle.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">5</span>
            <span>Colmater la faille IDOR sur les profils et l&apos;injection SQL sur la recherche.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">6</span>
            <span>Sécuriser l&apos;accès aux fichiers (Path Traversal) et structurer les logs de sécurité.</span>
          </div>
        </div>
      </section>

      {/* 1. Contexte du Système ShopDebug */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="server" className="w-5 h-5 text-indigo-600" />
          1. Contexte Opérationnel : La Plateforme ShopDebug en Détresse
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          <strong>ShopDebug</strong> est une application e-commerce (Node.js, Express, MySQL 8.0 et React) qui héberge un catalogue de 150 000 références et gère environ 10 000 commandes par jour. 
          À l&apos;approche de la période des soldes, les équipes d&apos;exploitation signalent des anomalies critiques en cascade :
        </p>

        <div className="border-2 border-rose-200 bg-rose-50/70 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-200 px-2.5 py-1 rounded-md">
              Rapport d&apos;Alertes Exploitation (NOC)
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Gravité : Critique P0</span>
          </div>
          <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800 font-medium">
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-black">⚠</span>
              <span><strong>Crash OOMKilled :</strong> Le processus Node.js redémarre toutes les 4 heures avec un message <em>&quot;JavaScript heap out of memory&quot;</em>.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-black">⚠</span>
              <span><strong>Latence P99 à 8 400 ms :</strong> La route de consultation des commandes ralentit l&apos;ensemble du site jusqu&apos;à provoquer des timeouts Nginx (504).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-black">⚠</span>
              <span><strong>Litiges Clients :</strong> Plusieurs acheteurs ont pu payer pour le même exemplaire unique d&apos;un article rare (survente avec stock négatif -3).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-rose-600 font-black">⚠</span>
              <span><strong>Alerte Fuite de Données :</strong> Un utilisateur a réussi à afficher les factures d&apos;autres clients en modifiant l&apos;ID dans l&apos;URL.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Matrice d'Audit des 6 Anomalies */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="search" className="w-5 h-5 text-lime-600" />
          2. Matrice d&apos;Audit : Diagnostic des 6 Vulnérabilités & Correctifs
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Voici la cartographie exhaustive établie par l&apos;audit technique des fichiers source de ShopDebug :
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Fichier</th>
                <th className="px-4 py-3">Symptôme observé</th>
                <th className="px-4 py-3">Cause racine d&apos;ingénierie</th>
                <th className="px-4 py-3">Remédiation appliquée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-indigo-700">routes/products.js</td>
                <td className="px-4 py-2.5 font-medium">Heap V8 croissant jusqu&apos;au crash OOM</td>
                <td className="px-4 py-2.5 font-medium">Tableau global <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">searchCache = []</code> sans limite de taille ni TTL</td>
                <td className="px-4 py-2.5 font-medium">Remplacement par un cache borné LRU (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">lru-cache</code>) avec expiration de 5 min</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-rose-700">routes/discounts.js</td>
                <td className="px-4 py-2.5 font-medium">Event Loop figée pendant 2,2 secondes</td>
                <td className="px-4 py-2.5 font-medium">Boucle for synchrone de 40M d&apos;itérations pour calculer le score de fidélité</td>
                <td className="px-4 py-2.5 font-medium">Déportation du calcul dans un Worker Thread séparé (<code className="text-xs bg-slate-100 px-1 py-0.5 rounded">piscina</code>)</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-amber-700">routes/orders.js</td>
                <td className="px-4 py-2.5 font-medium">TTFB de 4 800 ms sur la liste des commandes</td>
                <td className="px-4 py-2.5 font-medium">Syndrome N+1 Queries (50 requêtes séparées pour récupérer chaque client)</td>
                <td className="px-4 py-2.5 font-medium">Refactorisation en un seul <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">INNER JOIN</code> avec index composite sur <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">(user_id, date)</code></td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-purple-700">routes/checkout.js</td>
                <td className="px-4 py-2.5 font-medium">Survente : 3 clients ont acheté le dernier article</td>
                <td className="px-4 py-2.5 font-medium">Check-then-act naïf : vérification du stock en mémoire avant paiement asynchrone</td>
                <td className="px-4 py-2.5 font-medium">Mise à jour atomique : <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">UPDATE products SET stock = stock - 1 WHERE id = ? AND stock &gt; 0</code></td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-rose-700">routes/users.js</td>
                <td className="px-4 py-2.5 font-medium">Faille IDOR / BOLA sur les profils clients</td>
                <td className="px-4 py-2.5 font-medium">La route <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">GET /api/users/:id</code> ne vérifiait pas si <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">req.user.id === id</code></td>
                <td className="px-4 py-2.5 font-medium">Ownership Check strict + rejet 403 Forbidden immédiat en cas de non-concordance</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold font-mono text-emerald-700">routes/files.js</td>
                <td className="px-4 py-2.5 font-medium">Téléchargement arbitraire de fichiers système</td>
                <td className="px-4 py-2.5 font-medium">Path Traversal avec <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">path.join()</code> autorisant les séquences <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">../../</code></td>
                <td className="px-4 py-2.5 font-medium">Confinement canonique : <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">path.resolve()</code> et validation <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">startsWith(UPLOADS_ROOT + path.sep)</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. Laboratoire Interactif de Remédiation ShopDebug */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-700" />
          3. Laboratoire Interactif ShopDebug : Audit &amp; Remédiation en Direct
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Utilisez ce banc de test interactif pour simuler les comportements défaillants de ShopDebug et vérifier l&apos;efficacité des correctifs appliqués :
        </p>

        <PerformanceSecurityAuditLab />
      </section>

      {/* 4. Extraits de Code de Remédiation Officiels */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-indigo-600" />
          4. Le Code Source Officiel Corrigé de ShopDebug
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Voici les implémentations définitives validées pour le passage en production sécurisée :
        </p>

        <div className="space-y-4">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-600 inline-block" />
              Correction de la Commande Concurrente (Atomic Stock Update) :
            </h3>
            <CodeBlock
              code={`// routes/checkout.js — Solution Atomique Inviolable
import express from 'express';
import { pool } from '../db.js';
import { authenticateJwt } from '../middleware/auth.js';

export const checkoutRouter = express.Router();

checkoutRouter.post('/order', authenticateJwt, async (req, res) => {
  const { productId, quantity } = req.body;
  
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return res.status(400).json({ error: 'Quantité invalide' });
  }

  // UPDATE atomique conditionnel sous verrou interne InnoDB
  const [result] = await pool.query(
    'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
    [quantity, productId, quantity]
  );

  // Si affectedRows === 0, cela prouve que le stock était insuffisant
  if (result.affectedRows === 0) {
    return res.status(409).json({ error: 'Rupture de stock : article non disponible' });
  }

  // Création de la commande garantie sans survente
  const [order] = await pool.query(
    'INSERT INTO orders (user_id, product_id, quantity, status) VALUES (?, ?, ?, "CONFIRMED")',
    [req.user.id, productId, quantity]
  );

  res.status(201).json({ success: true, orderId: order.insertId });
});`}
              language="typescript"
            />
          </div>

          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 mb-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
              Correction de la Faille IDOR et Exposition Sécurisée :
            </h3>
            <CodeBlock
              code={`// routes/users.js — Protection IDOR / BOLA avec Ownership Check
import express from 'express';
import { pool } from '../db.js';
import { authenticateJwt } from '../middleware/auth.js';

export const usersRouter = express.Router();

usersRouter.get('/profile/:id', authenticateJwt, async (req, res) => {
  const targetUserId = parseInt(req.params.id, 10);

  // 🛡️ RÈGLE D'AUTORISATION : Seul l'utilisateur lui-même ou un ADMIN peut consulter
  if (req.user.role !== 'ADMIN' && req.user.id !== targetUserId) {
    return res.status(403).json({ error: 'Accès interdit : vous ne pouvez consulter que votre propre profil' });
  }

  const [users] = await pool.query(
    'SELECT id, email, first_name, last_name, created_at FROM users WHERE id = ?',
    [targetUserId]
  );

  if (!users[0]) {
    return res.status(404).json({ error: 'Utilisateur introuvable' });
  }

  res.json({ user: users[0] });
});`}
              language="typescript"
            />
          </div>
        </div>

        <Callout type="tip" title="Validation de Non-Régression">
          <p className="text-xs sm:text-sm">
            Après chaque correction, lancez un tir de test avec <strong>Autocannon</strong> (<code className="font-mono text-xs">npx autocannon -c 50 -d 10 http://localhost:3000/api/checkout/order</code>) 
            pour valider que le taux d&apos;erreurs 5xx reste à <strong>0%</strong> et que le stock final en base ne descend jamais en-dessous de 0.
          </p>
        </Callout>
      </section>

      {/* 5. Grille d'Évaluation sur 100 Points */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="check-square" className="w-5 h-5 text-indigo-600" />
          5. Grille d&apos;Évaluation Professionnelle (Barème sur 100 Points)
        </h2>
        <div className="overflow-x-auto my-4">
          <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Compétence Évaluée</th>
                <th className="px-4 py-3">Critères d&apos;Excellence</th>
                <th className="px-4 py-3">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900">Diagnostic Mémoire & CPU</td>
                <td className="px-4 py-2.5 font-medium">Localisation précise de la fuite V8 et déportation du calcul lourd en Worker Thread</td>
                <td className="px-4 py-2.5 font-bold font-mono text-emerald-600">20 pts</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900">Optimisation Requêtes SQL</td>
                <td className="px-4 py-2.5 font-medium">Éradication du problème N+1, création d&apos;index composite et suppression des tables scans ALL</td>
                <td className="px-4 py-2.5 font-bold font-mono text-emerald-600">15 pts</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900">Résolution Concurrence & Verrous</td>
                <td className="px-4 py-2.5 font-medium">Élimination garantie des surventes via UPDATE atomique conditionnel ou SELECT FOR UPDATE</td>
                <td className="px-4 py-2.5 font-bold font-mono text-emerald-600">15 pts</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900">Correction Sécurité (IDOR & SQLi)</td>
                <td className="px-4 py-2.5 font-medium">Application stricte des Ownership checks, validation Zod et Requêtes Préparées invariables</td>
                <td className="px-4 py-2.5 font-bold font-mono text-emerald-600">20 pts</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900">Confinement Fichiers & Path Traversal</td>
                <td className="px-4 py-2.5 font-medium">Vérification mathématique du préfixe canonique et gestion saine des erreurs POSIX</td>
                <td className="px-4 py-2.5 font-bold font-mono text-emerald-600">15 pts</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-2.5 font-bold text-slate-900">Observabilité & Logs Structurés</td>
                <td className="px-4 py-2.5 font-medium">Mise en place de Winston JSON avec masquage PII et endpoint de Readiness Prometheus</td>
                <td className="px-4 py-2.5 font-bold font-mono text-emerald-600">15 pts</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 6. Quiz de Validation Finale de Synthèse */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Examen Final de Synthèse — Audit & Ingénierie du Débogage (Module 5)"
          questions={[
            {
              id: 1,
              question: "Lors d'un audit de fuite mémoire sur ShopDebug, quel outil permet de prouver mathématiquement qu'un objet est retenu par une variable globale ?",
              options: [
                "L'onglet Network de Chrome DevTools.",
                "La comparaison de 3 Heap Snapshots (Trois Instantanés) avec l'inspection de l'arbre des 'Retainers' dans l'onglet Memory.",
                "Un simple test de ping sur le port 3000.",
                "La lecture du fichier package-lock.json."
              ],
              correctIndex: 1,
              explanation: "La méthode des 3 Heap Snapshots identifie les objets alloués entre l'instantané 1 et 2 qui survivent toujours dans l'instantané 3. L'arbre des Retainers révèle le chemin de références qui empêche le ramasse-miettes de les libérer.",
            },
            {
              id: 2,
              question: "Pourquoi une boucle for synchrone de calcul de remise fait-elle chuter le débit de requêtes (RPS) de toutes les autres routes de l'API ?",
              options: [
                "Parce qu'elle consomme toute la bande passante du fournisseur d'accès Internet.",
                "Parce que le thread unique V8 de Node.js est monopolisé par le calcul : l'Event Loop ne peut traiter aucun callback I/O tant que la boucle n'est pas terminée.",
                "Parce que MySQL bloque l'écriture des fichiers journaux.",
                "Parce que le navigateur client ferme automatiquement les onglets inactifs."
              ],
              correctIndex: 1,
              explanation: "Node.js exécute le code JavaScript sur un thread principal unique. Un calcul lourd synchrone provoque une famine d'Event Loop, suspendant toutes les autres requêtes réseau.",
            },
            {
              id: 3,
              question: "Dans le résultat d'un MySQL EXPLAIN, quelle combinaison indique que la requête est parfaitement optimisée ?",
              options: [
                "type: ALL | key: NULL | rows: 150 000 | Extra: Using filesort",
                "type: ref ou range | key: idx_orders_user | rows: 20 | Extra: Using index (Covering)",
                "type: index | key: PRIMARY | rows: 5 000 000",
                "type: NULL | key: none | rows: 0"
              ],
              correctIndex: 1,
              explanation: "Le type 'ref' ou 'range' prouve que MySQL utilise un index B-Tree pour cibler directement les 20 lignes recherchées sans scanner la table entière, et 'Using index' indique un index couvrant sans accès disque superflu.",
            },
            {
              id: 4,
              question: "Quelle instruction SQL protège définitivement ShopDebug contre les surventes lors d'achats simultanés du dernier article ?",
              options: [
                "SELECT stock FROM products WHERE id = 1;",
                "UPDATE products SET stock = stock - 1 WHERE id = 1 AND stock >= 1;",
                "DROP TABLE orders;",
                "INSERT INTO orders VALUES (1, 1);"
              ],
              correctIndex: 1,
              explanation: "Cette instruction est atomique : la condition et la mise à jour s'exécutent sous le verrou interne de ligne InnoDB. Si affectedRows vaut 0, l'achat est rejeté sans risque de solde négatif.",
            },
            {
              id: 5,
              question: "Comment corriger de manière infaillible une vulnérabilité IDOR sur l'endpoint GET /api/users/:id ?",
              options: [
                "En supprimant le mot de passe de la réponse JSON.",
                "En vérifiant côté serveur que l'utilisateur authentifié (req.user.id) correspond bien à l'identifiant demandé dans l'URL ou qu'il possède un rôle ADMIN légitime.",
                "En chiffrant l'URL avec Base64.",
                "En ajoutant un bouton 'Confirmer' dans l'interface React."
              ],
              correctIndex: 1,
              explanation: "La correction de l'IDOR exige une vérification d'autorisation (Ownership Check) stricte côté serveur : l'utilisateur ne doit pouvoir accéder qu'aux ressources dont il est le propriétaire avéré.",
            },
            {
              id: 6,
              question: "Pourquoi l'utilisation de path.resolve() suivie de startsWith(safeRoot + path.sep) est-elle l'unique rempart contre le Path Traversal ?",
              options: [
                "Parce qu'elle accélère la vitesse de téléchargement du disque dur SSD.",
                "Parce qu'elle résout mathématiquement tous les '..' et vérifie formellement que le chemin canonique absolu reste confiné à l'intérieur du répertoire racine désigné sans pouvoir en sortir.",
                "Parce qu'elle convertit les fichiers PDF en texte brut.",
                "Parce qu'elle remplace le système de fichiers Linux par un système virtuel."
              ],
              correctIndex: 1,
              explanation: "Le confinement canonique résout le chemin absolu final en éliminant les artifices de traversée, puis s'assure par préfixe strict qu'aucun fichier système extérieur au dossier d'uploads ne peut être lu.",
            },
          ]}
        />
      </div>
    </div>
  );
};
