'use client';

import React from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Icon } from '@/components/common/Icon';
import { PerformanceSecurityAuditLab } from '@/components/interactive/PerformanceSecurityAuditLab';

export const Chapitre13Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Hero Banner */}
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Ingénierie du Débogage</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 13 — TP Final — Audit et diagnostic d&apos;une application e-commerce (ShopDebug)
        </h1>
      </div>

      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        TP final du Module 6 — Audit et diagnostic d&apos;une application
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Projet de synthèse
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Niveau intermédiaire à avancé
      </p>
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectif du TP
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vous allez intervenir comme un ingénieur chargé d&apos;auditer une application e-commerce développée avec Node.js, Express et MySQL.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        L&apos;application fonctionne, mais plusieurs anomalies ont été signalées :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Le serveur ralentit après plusieurs requêtes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>La mémoire consommée augmente progressivement.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Certaines routes deviennent très lentes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Deux clients peuvent acheter le dernier article en stock.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Un utilisateur peut consulter les données d&apos;un autre compte.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Certaines requêtes SQL sont vulnérables.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Des erreurs d&apos;accès aux fichiers apparaissent.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Les logs ne permettent pas de comprendre les incidents.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Aucune surveillance ni alerte n&apos;est configurée.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Votre mission est de détecter, expliquer, corriger et vérifier ces problèmes.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        L&apos;objectif n&apos;est pas simplement de modifier le code : vous devez suivre une véritable démarche professionnelle d&apos;audit.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Contexte de l&apos;application
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        L&apos;application s&apos;appelle ShopDebug. Elle permet aux clients de consulter des produits, de gérer leur compte et de passer des commandes.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Architecture technique
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Frontend
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        React — Interface utilisateur
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Backend
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Node.js — Express — API REST
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Base de données
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        MySQL — Produits, utilisateurs, commandes
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Outils d&apos;audit
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Chrome DevTools
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Node Inspector
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        MySQL EXPLAIN
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Autocannon
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Postman
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        OWASP ZAP
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Préparation du projet
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.1. Arborescence
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créez le projet suivant :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        shopdebug/
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ├── backend/
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   ├── server.js
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   ├── db.js
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   ├── routes/
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   │   ├── products.js
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   │   ├── users.js
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   │   ├── orders.js
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   │   └── files.js
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   ├── middleware/
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   │   └── auth.js
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   ├── logs/
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   └── uploads/
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ├── frontend/
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │   └── (application React)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        │
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        └── database/
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        └── shopdebug.sql
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.2. Installation du backend
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans le dossier backend :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm init -y
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm install express mysql2 dotenv cors helmet zod
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm install express-rate-limit winston prom-client
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm install --save-dev nodemon autocannon
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans package.json, ajoutez :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;scripts&quot;: &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;dev&quot;: &quot;nodemon server.js&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;start&quot;: &quot;node server.js&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.3. Base de données
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créez database/shopdebug.sql :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        CREATE DATABASE shopdebug;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        USE shopdebug;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        CREATE TABLE users (
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        id INT AUTO_INCREMENT PRIMARY KEY,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        name VARCHAR(100),
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        email VARCHAR(150) UNIQUE,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        password VARCHAR(255),
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        role VARCHAR(30) DEFAULT &apos;customer&apos;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        CREATE TABLE products (
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        id INT AUTO_INCREMENT PRIMARY KEY,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        name VARCHAR(150),
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        price DECIMAL(10,2),
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        stock INT DEFAULT 0
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        CREATE TABLE orders (
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        id INT AUTO_INCREMENT PRIMARY KEY,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        user_id INT,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        product_id INT,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        quantity INT,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        INSERT INTO users (name, email, password, role) VALUES
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        (&apos;Alice&apos;, &apos;alice@example.com&apos;, &apos;hash_alice&apos;, &apos;customer&apos;),
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        (&apos;Bob&apos;, &apos;bob@example.com&apos;, &apos;hash_bob&apos;, &apos;customer&apos;),
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        (&apos;Admin&apos;, &apos;admin@example.com&apos;, &apos;hash_admin&apos;, &apos;admin&apos;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        INSERT INTO products (name, price, stock) VALUES
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        (&apos;Laptop&apos;, 850.00, 10),
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        (&apos;Keyboard&apos;, 45.00, 5),
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        (&apos;Mouse&apos;, 20.00, 1),
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        (&apos;Monitor&apos;, 220.00, 20);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les valeurs de mot de passe ci-dessus sont des données fictives pour le TP. Dans une vraie application, utilisez des mots de passe hachés avec Argon2id ou bcrypt.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        3.4. Connexion MySQL
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créez backend/.env :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        PORT=3000
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        DB_HOST=localhost
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        DB_USER=root
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        DB_PASSWORD=VOTRE_MOT_DE_PASSE
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        DB_NAME=shopdebug
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créez backend/db.js :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const mysql = require(&quot;mysql2/promise&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        require(&quot;dotenv&quot;).config();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const pool = mysql.createPool(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        host: process.env.DB_HOST,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        user: process.env.DB_USER,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        password: process.env.DB_PASSWORD,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        database: process.env.DB_NAME,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        waitForConnections: true,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        connectionLimit: 5
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        module.exports = pool;
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Les missions d&apos;audit
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Vous allez travailler sur neuf missions. Pour chacune, suivez cette démarche :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Reproduire le problème.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Observer le symptôme.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Formuler une hypothèse.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifier la cause racine.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Corriger le code.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Refaire le test pour vérifier la correction.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Mission 1 — Détecter une fuite mémoire
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Symptôme : après plusieurs appels à l&apos;API, la consommation mémoire augmente progressivement.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans backend/routes/products.js, ajoutez temporairement cette route défectueuse :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const express = require(&quot;express&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const router = express.Router();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        let cache = [];
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/memory&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        for (let i = 0; i &amp;lt; 10000; i++) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        cache.push(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        id: i,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        data: &quot;Donnée conservée inutilement&quot;.repeat(20)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        cacheSize: cache.length,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        memory: process.memoryUsage()
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        module.exports = router;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Travail demandé :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Appelez plusieurs fois GET /api/products/memory.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Observez heapUsed et rss.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Expliquez pourquoi les objets restent en mémoire.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Corrigez la fuite.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Correction attendue :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/memory&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const temporaryData = [];
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        for (let i = 0; i &amp;lt; 10000; i++) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        temporaryData.push(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        id: i,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        data: &quot;Donnée temporaire&quot;.repeat(20)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        count: temporaryData.length,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        memory: process.memoryUsage()
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ici, les données ne sont plus conservées dans une variable globale. Elles pourront être récupérées par le Garbage Collector lorsqu&apos;elles ne seront plus référencées.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Validation : répétez les appels et observez la mémoire sur plusieurs cycles. Une hausse ponctuelle ne suffit pas à conclure à une fuite.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Mission 2 — Détecter un blocage de l&apos;Event Loop
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Symptôme : une route de calcul ralentit toutes les autres routes.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ajoutez :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/cpu&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        let result = 0;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        for (let i = 0; i &amp;lt; 500000000; i++) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        result += Math.sqrt(i);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123; result &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/fast&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123; message: &quot;Réponse rapide&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Travail demandé :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Lancez /api/products/cpu.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Pendant le calcul, appelez /api/products/fast.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Mesurez le temps de réponse.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Expliquez pourquoi la route rapide est également ralentie.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Cause racine : la boucle CPU synchrone monopolise le thread principal de Node.js et bloque l&apos;Event Loop.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Correction attendue : déplacer le calcul intensif dans un Worker Thread, puis transmettre le résultat au thread principal.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple simplifié du fichier backend/worker.js :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const &#123; parentPort &#125; = require(&quot;node:worker_threads&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        let result = 0;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        for (let i = 0; i &amp;lt; 500000000; i++) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        result += Math.sqrt(i);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        parentPort.postMessage(result);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans la route Express :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const &#123; Worker &#125; = require(&quot;node:worker_threads&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const path = require(&quot;path&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/cpu-fixed&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const worker = new Worker(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        path.join(__dirname, &quot;../worker.js&quot;)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        worker.once(&quot;message&quot;, result =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123; result &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        worker.once(&quot;error&quot;, error =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.status(500).json(&#123; error: &quot;Erreur de calcul&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour une application réelle, utilisez un pool de workers plutôt que de créer un nouveau worker à chaque requête. Prévoyez aussi la gestion des sorties et des délais d&apos;exécution.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Validation : pendant le calcul, /fast doit rester réactive.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Mission 3 — Identifier une requête SQL lente
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Symptôme : la consultation des produits prend plusieurs secondes lorsque la table contient beaucoup de données.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Route initiale :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/slow&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const [rows] = await db.query(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;SELECT * FROM products&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(rows);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Travail demandé :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Analysez la requête avec EXPLAIN.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifiez les données inutiles récupérées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ajoutez une pagination.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Comparez les résultats.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Correction attendue :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        try &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const page = Math.max(1, Number(req.query.page) || 1);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const limit = 20;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const offset = (page - 1) * limit;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const [products] = await db.execute(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        `SELECT id, name, price, stock
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        FROM products
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ORDER BY id
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        LIMIT ? OFFSET ?`,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        [limit, offset]
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123; page, limit, products &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125; catch (error) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.status(500).json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        message: &quot;Erreur lors du chargement des produits&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Validation : comparez les durées, le volume de données retournées et le plan d&apos;exécution. Pour cette petite table, la différence de temps peut être faible : le test devient réellement significatif avec un volume important de données.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Mission 4 — Détecter une condition de concurrence
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Symptôme : deux clients achètent simultanément le dernier produit disponible.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Route vulnérable :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.post(&quot;/buy&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const &#123; productId, quantity &#125; = req.body;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const [products] = await db.execute(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;SELECT stock FROM products WHERE id = ?&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        [productId]
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        if (products[0].stock &amp;gt;= quantity) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        await db.execute(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;UPDATE products SET stock = stock - ? WHERE id = ?&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        [quantity, productId]
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        return res.json(&#123; message: &quot;Achat accepté&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.status(400).json(&#123; message: &quot;Stock insuffisant&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Travail demandé :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Repérez le moment où les deux requêtes peuvent lire le même stock.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Simulez deux achats simultanés du produit Mouse, dont le stock est de 1.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Corrigez le problème.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Correction attendue :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.post(&quot;/buy&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const &#123; productId, quantity &#125; = req.body;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        if (
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        !Number.isInteger(productId) ||
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        !Number.isInteger(quantity) ||
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        quantity &amp;lt;= 0
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        return res.status(400).json(&#123; message: &quot;Données invalides&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        try &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const [result] = await db.execute(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        `UPDATE products
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        SET stock = stock - ?
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        WHERE id = ? AND stock &amp;gt;= ?`,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        [quantity, productId, quantity]
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        if (result.affectedRows === 0) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        return res.status(409).json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        message: &quot;Stock insuffisant ou produit inexistant&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123; message: &quot;Achat accepté&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125; catch (error) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.status(500).json(&#123; message: &quot;Erreur serveur&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        La vérification et la modification sont réalisées dans une seule instruction SQL atomique.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Validation : envoyez deux requêtes simultanées pour acheter le dernier article. Une seule doit réussir.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Mission 5 — Détecter une vulnérabilité IDOR
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Symptôme : un utilisateur peut consulter le compte d&apos;un autre utilisateur en modifiant simplement l&apos;identifiant dans l&apos;URL.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Route vulnérable :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/:id&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const [users] = await db.execute(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;SELECT id, name, email FROM users WHERE id = ?&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        [req.params.id]
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(users[0]);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Travail demandé :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Connectez-vous avec un compte utilisateur.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Consultez /api/users/1.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Essayez /api/users/2.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifiez si le serveur contrôle les droits d&apos;accès.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Correction attendue :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Le middleware d&apos;authentification doit identifier l&apos;utilisateur à partir d&apos;une session ou d&apos;un jeton vérifié. Il ne faut jamais faire confiance à un identifiant d&apos;utilisateur fourni librement par le client.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/:id&quot;, auth, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const requestedId = Number(req.params.id);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        if (!Number.isInteger(requestedId)) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        return res.status(400).json(&#123; message: &quot;Identifiant invalide&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        if (
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        req.user.role !== &quot;admin&quot; &amp;amp;&amp;amp;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        req.user.id !== requestedId
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        return res.status(403).json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        message: &quot;Accès interdit&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const [users] = await db.execute(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;SELECT id, name, email FROM users WHERE id = ?&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        [requestedId]
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        if (!users.length) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        return res.status(404).json(&#123; message: &quot;Utilisateur introuvable&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(users[0]);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Validation : un client ne peut accéder qu&apos;à ses propres données ; un administrateur autorisé peut consulter les autres comptes.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Mission 6 — Détecter une injection SQL
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Symptôme : une requête de recherche ou d&apos;authentification accepte des entrées qui modifient la structure de la requête SQL.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Route vulnérable :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/search&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const name = req.query.name;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const sql =
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        `SELECT * FROM products WHERE name = &apos;$&#123;name&#125;&apos;`;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const [rows] = await db.query(sql);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(rows);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Travail demandé :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifiez le risque lié à la concaténation SQL.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Testez la route uniquement sur votre environnement local.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Remplacez la requête par une requête paramétrée.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Correction attendue :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/search&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        try &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const name = String(req.query.name || &quot;&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const [rows] = await db.execute(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;SELECT id, name, price FROM products WHERE name LIKE ?&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        [`%$&#123;name&#125;%`]
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(rows);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125; catch (error) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.status(500).json(&#123; message: &quot;Erreur serveur&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Validation : les caractères spéciaux fournis par l&apos;utilisateur sont traités comme des données et non comme du code SQL.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          11. Mission 7 — Détecter un problème de permissions et de Path Traversal
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Symptôme : une route de téléchargement permet de demander des fichiers qui ne devraient pas être accessibles.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Route vulnérable :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const fs = require(&quot;fs&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const path = require(&quot;path&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/download&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const filename = req.query.file;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const filePath = path.join(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        __dirname,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;../uploads&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        filename
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.sendFile(filePath);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Travail demandé :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifiez les risques liés au paramètre file.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifiez les chemins utilisés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Contrôlez l&apos;accès aux fichiers.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Testez la correction.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Correction attendue :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Une approche plus sûre consiste à utiliser un identifiant de fichier associé à un chemin connu côté serveur, plutôt que d&apos;accepter directement un chemin utilisateur.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const files = &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;guide&quot;: &quot;guide.pdf&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;catalog&quot;: &quot;catalog.pdf&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.get(&quot;/download/:id&quot;, auth, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const filename = files[req.params.id];
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        if (!filename) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        return res.status(404).json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        message: &quot;Fichier introuvable&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const filePath = path.join(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        __dirname,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &quot;../uploads&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        filename
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        );
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.sendFile(filePath, error =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        if (error &amp;amp;&amp;amp; !res.headersSent) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.status(404).json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        message: &quot;Impossible de télécharger le fichier&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Il faut également vérifier les permissions du dossier uploads et s&apos;assurer que seuls les utilisateurs autorisés peuvent télécharger les fichiers concernés.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Validation : un identifiant inconnu ne permet pas de récupérer un fichier arbitraire.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          12. Mission 8 — Améliorer les logs de sécurité
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Symptôme : l&apos;équipe ne parvient pas à comprendre pourquoi certains utilisateurs échouent à se connecter.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Ajoutez une journalisation structurée avec Winston.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const winston = require(&quot;winston&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const logger = winston.createLogger(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        level: &quot;info&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        format: winston.format.combine(
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        winston.format.timestamp(),
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        winston.format.json()
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ),
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        transports: [
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        new winston.transports.File(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        filename: &quot;logs/security.log&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        ]
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        module.exports = logger;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Exemple dans une route de connexion :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const logger = require(&quot;../logger&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        router.post(&quot;/login&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const &#123; email &#125; = req.body;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        {"//"} Exemple pédagogique : remplacer par la vraie vérification.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const authenticated = false;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        if (!authenticated) &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        logger.warn(&quot;Échec authentification&quot;, &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        email,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        event: &quot;LOGIN_FAILED&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        return res.status(401).json(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        message: &quot;Identifiants incorrects&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        logger.info(&quot;Authentification réussie&quot;, &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        event: &quot;LOGIN_SUCCESS&quot;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123; message: &quot;Connexion réussie&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Travail demandé :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Enregistrez les connexions réussies et échouées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ajoutez un identifiant de requête pour faciliter la corrélation.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Identifiez les tentatives répétées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Vérifiez que les mots de passe, tokens et clés API ne figurent jamais dans les logs.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Validation : consultez logs/security.log et vérifiez que les événements sont exploitables sans exposer de données sensibles.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          13. Mission 9 — Mettre en place la surveillance
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Symptôme : les incidents ne sont détectés qu&apos;après les plaintes des utilisateurs.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Installez un suivi simple des requêtes HTTP avec prom-client.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans server.js :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const express = require(&quot;express&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const helmet = require(&quot;helmet&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const rateLimit = require(&quot;express-rate-limit&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const client = require(&quot;prom-client&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const app = express();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(helmet());
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(express.json());
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const register = new client.Registry();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        client.collectDefaultMetrics(&#123; register &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const requestDuration = new client.Histogram(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        name: &quot;http_request_duration_seconds&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        help: &quot;Durée des requêtes HTTP&quot;,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        labelNames: [&quot;method&quot;, &quot;route&quot;, &quot;status&quot;],
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        registers: [register]
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use((req, res, next) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const end = requestDuration.startTimer();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.on(&quot;finish&quot;, () =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        end(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        method: req.method,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        route: req.route?.path || req.path,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        status: String(res.statusCode)
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        next();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/health/live&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123; status: &quot;alive&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/metrics&quot;, async (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.set(&quot;Content-Type&quot;, register.contentType);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.end(await register.metrics());
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(rateLimit(&#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        windowMs: 15 * 60 * 1000,
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        limit: 100
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;));
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.listen(3000, () =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        console.log(&quot;Serveur démarré sur le port 3000&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Travail demandé :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Consultez /health/live.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Consultez /metrics.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Envoyez plusieurs requêtes à l&apos;application.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Observez les métriques de durée et de consommation du processus.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Expliquez comment Prometheus et Grafana pourraient exploiter ces informations.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Correction et précautions :
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>En production, protégez /metrics contre les accès non autorisés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Ajoutez un contrôle de disponibilité de MySQL dans un endpoint /health/ready.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Configurez des seuils d&apos;alerte adaptés.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Utilisez un stockage partagé pour le Rate Limiting si plusieurs instances du serveur sont déployées.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>Évitez les labels contenant des identifiants utilisateur ou des valeurs uniques : ils peuvent provoquer une cardinalité excessive.</span>
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          14. Intégration et lancement du projet
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Dans backend/server.js, montez les routes :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const express = require(&quot;express&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const cors = require(&quot;cors&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        require(&quot;dotenv&quot;).config();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        const app = express();
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(cors());
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(express.json());
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(&quot;/api/products&quot;, require(&quot;./routes/products&quot;));
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(&quot;/api/users&quot;, require(&quot;./routes/users&quot;));
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(&quot;/api/orders&quot;, require(&quot;./routes/orders&quot;));
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.use(&quot;/api/files&quot;, require(&quot;./routes/files&quot;));
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.get(&quot;/&quot;, (req, res) =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        res.json(&#123; message: &quot;ShopDebug API opérationnelle&quot; &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        app.listen(process.env.PORT || 3000, () =&amp;gt; &#123;
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        console.log(&quot;Serveur démarré&quot;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        &#125;);
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Créez les dossiers logs et uploads, vérifiez la configuration MySQL, puis lancez :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npm run dev
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Les extraits précédents sont des éléments de travail à intégrer : ajoutez les imports nécessaires dans chaque fichier, configurez le middleware auth avec une véritable authentification et vérifiez les chemins relatifs avant de lancer le projet.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          15. Campagne de tests finale
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Voici les tests à effectuer après les corrections.
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Test</th>
              <th className="px-4 py-3">Outil</th>
              <th className="px-4 py-3">Résultat attendu</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Fuite mémoire</td>
              <td className="px-4 py-2.5 font-medium">Node Inspector</td>
              <td className="px-4 py-2.5 font-medium">Pas de croissance persistante injustifiée</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Blocage CPU</td>
              <td className="px-4 py-2.5 font-medium">Chrome / Autocannon</td>
              <td className="px-4 py-2.5 font-medium">Route rapide toujours réactive</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">SQL lent</td>
              <td className="px-4 py-2.5 font-medium">MySQL EXPLAIN</td>
              <td className="px-4 py-2.5 font-medium">Plan d&apos;exécution analysé</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Concurrence</td>
              <td className="px-4 py-2.5 font-medium">Requêtes simultanées</td>
              <td className="px-4 py-2.5 font-medium">Une seule vente du dernier article</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">IDOR</td>
              <td className="px-4 py-2.5 font-medium">Postman</td>
              <td className="px-4 py-2.5 font-medium">Accès interdit aux données d&apos;autrui</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Injection SQL</td>
              <td className="px-4 py-2.5 font-medium">Postman / ZAP</td>
              <td className="px-4 py-2.5 font-medium">Entrées traitées comme des données</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Path Traversal</td>
              <td className="px-4 py-2.5 font-medium">Postman</td>
              <td className="px-4 py-2.5 font-medium">Aucun accès arbitraire</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Logs</td>
              <td className="px-4 py-2.5 font-medium">Fichier security.log</td>
              <td className="px-4 py-2.5 font-medium">Événements exploitables</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Monitoring</td>
              <td className="px-4 py-2.5 font-medium">Endpoint / metrics</td>
              <td className="px-4 py-2.5 font-medium">Métriques disponibles</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Pour tester la charge du serveur :
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        npx autocannon -c 50 -d 30 http://localhost:3000/
      </p>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-slate-900 my-3">
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>-c 50 : 50 connexions concurrentes.</span>
          </li>
          <li className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-50 border border-slate-200">
            <span className="text-emerald-700 font-black">✓</span>
            <span>-d 30 : test pendant 30 secondes.</span>
          </li>
        </ul>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Comparez les résultats avant et après correction : latence, débit, taux d&apos;erreur et comportement du serveur.
      </p>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Effectuez les tests de sécurité et de charge uniquement sur votre environnement local ou sur une infrastructure pour laquelle vous avez une autorisation.
      </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          16. Corrigé global — Causes racines et solutions
        </h2>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">N°</th>
              <th className="px-4 py-3">Problème</th>
              <th className="px-4 py-3">Cause racine</th>
              <th className="px-4 py-3">Solution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">1</td>
              <td className="px-4 py-2.5 font-medium">Memory Leak</td>
              <td className="px-4 py-2.5 font-medium">Référence globale conservée</td>
              <td className="px-4 py-2.5 font-medium">Supprimer les références inutiles, borner les caches</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">2</td>
              <td className="px-4 py-2.5 font-medium">Event Loop bloquée</td>
              <td className="px-4 py-2.5 font-medium">Calcul CPU synchrone</td>
              <td className="px-4 py-2.5 font-medium">Worker Threads</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">3</td>
              <td className="px-4 py-2.5 font-medium">SQL lent</td>
              <td className="px-4 py-2.5 font-medium">Requête non optimisée</td>
              <td className="px-4 py-2.5 font-medium">Pagination, index adaptés, EXPLAIN</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">4</td>
              <td className="px-4 py-2.5 font-medium">Race Condition</td>
              <td className="px-4 py-2.5 font-medium">Lecture puis modification non atomique</td>
              <td className="px-4 py-2.5 font-medium">UPDATE conditionnel ou transaction avec verrou</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">5</td>
              <td className="px-4 py-2.5 font-medium">IDOR</td>
              <td className="px-4 py-2.5 font-medium">Absence de contrôle d&apos;autorisation</td>
              <td className="px-4 py-2.5 font-medium">Vérifier l&apos;identité et les droits côté serveur</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">6</td>
              <td className="px-4 py-2.5 font-medium">SQL Injection</td>
              <td className="px-4 py-2.5 font-medium">Concaténation SQL</td>
              <td className="px-4 py-2.5 font-medium">Requêtes paramétrées</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">7</td>
              <td className="px-4 py-2.5 font-medium">Path Traversal</td>
              <td className="px-4 py-2.5 font-medium">Chemin contrôlé par le client</td>
              <td className="px-4 py-2.5 font-medium">Identifiants de fichiers et contrôle d&apos;accès</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">8</td>
              <td className="px-4 py-2.5 font-medium">Logs insuffisants</td>
              <td className="px-4 py-2.5 font-medium">Absence de journalisation structurée</td>
              <td className="px-4 py-2.5 font-medium">Winston et corrélation</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">9</td>
              <td className="px-4 py-2.5 font-medium">Absence de monitoring</td>
              <td className="px-4 py-2.5 font-medium">Pas de métriques ni d&apos;alertes</td>
              <td className="px-4 py-2.5 font-medium">Prometheus , Grafana et alerting</td>
            </tr>
          </tbody>
        </table>
      </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          17. Grille d&apos;évaluation
        </h2>
      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
        Barème sur 100 points
      </p>
      <div className="overflow-x-auto my-6">
        <table className="w-full text-left text-xs sm:text-sm border border-slate-200 rounded-xl overflow-hidden shadow-xs">
          <thead className="bg-slate-100 text-slate-900 font-extrabold border-b border-slate-200">
            <tr>
              <th className="px-4 py-3">Compétence évaluée</th>
              <th className="px-4 py-3">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-800">
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Diagnostic mémoire et CPU</td>
              <td className="px-4 py-2.5 font-medium">15</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Analyse des requêtes SQL</td>
              <td className="px-4 py-2.5 font-medium">10</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Résolution des problèmes de concurrence</td>
              <td className="px-4 py-2.5 font-medium">10</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Correction des vulnérabilités</td>
              <td className="px-4 py-2.5 font-medium">20</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Gestion des permissions fichiers</td>
              <td className="px-4 py-2.5 font-medium">10</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Logs et traçabilité</td>
              <td className="px-4 py-2.5 font-medium">10</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Monitoring et prévention</td>
              <td className="px-4 py-2.5 font-medium">15</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Tests de non-régression et documentation</td>
              <td className="px-4 py-2.5 font-medium">10</td>
            </tr>
            <tr className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-2.5 font-medium">Total</td>
              <td className="px-4 py-2.5 font-medium">100</td>
            </tr>
          </tbody>
        </table>
      </div>
      </section>

      {/* Laboratoire Interactif */}
      <div className="my-8">
        <h2 className="text-[19px] font-bold text-slate-900 mb-2.5 flex items-center gap-2">
          <Icon name="terminal" className="w-5 h-5 text-emerald-700" />
          <span>Laboratoire interactif ShopDebug : Audit &amp; Remédiation</span>
        </h2>
        <PerformanceSecurityAuditLab />
      </div>

      {/* Quiz de révision */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Quiz de révision — Chapitre 6.13"
          questions={[
            {
              id: 1,
              question: "Quel outil permet d'analyser les objets conservés dans le Heap de Node.js ?",
              options: ["Postman", "Heap Snapshot", "MySQL Workbench"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 2,
              question: "Quelle est la cause principale d'un blocage de l'Event Loop ?",
              options: ["Une boucle", "Une requête HTTP asynchrone", "Un fichier"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 3,
              question: "Quel outil permet d'examiner le plan d'exécution d'une requête MySQL ?",
              options: ["npm audit", "EXPL", "process.memoryUsage()"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 4,
              question: "Comment éviter une vente en double du dernier article ?",
              options: ["Utiliser un UP", "Rafraîchir la page"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 5,
              question: "Quelle vulnérabilité permet à un utilisateur d'accéder aux données d'un autre en modifiant un identifiant ?",
              options: ["I", "XSS", "Memory Leak"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
            {
              id: 6,
              question: "Pourquoi faut-il éviter d'enregistrer les tokens dans les logs ?",
              options: ["Ils ralentissent React", "Ils peuvent exposer des informations permettant un accès non autorisé", "Ils empêchent MySQL de fonctionner"],
              correctIndex: 0,
              explanation: "Vérifiez la logique et les principes exposés dans ce chapitre.",
            },
          ]}
        />
      </div>
    </div>
  );
};
