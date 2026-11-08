'use client';

import React from 'react';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { PracticalWork } from '@/components/courses/PracticalWork';
import { Icon } from '@/components/common/Icon';

export const Chapitre3Content: React.FC = () => {
  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-amber-200 bg-amber-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <span>Backend IA</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 3 — Conception et intégration de la base de données MySQL
        </h1>
      </div>

      {/* 1. Objectifs du chapitre */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          1. Objectifs du chapitre
        </h2>
        <p className="text-base text-slate-900 font-medium">
          Notre application doit conserver les demandes des utilisateurs et les réponses générées par Gemini. Nous allons mettre en place une base de données MySQL pour stocker les analyses.
        </p>
        <div className="rounded-2xl bg-amber-50/50 border border-amber-200 p-5 space-y-3">
          <p className="text-sm font-black text-amber-950 uppercase tracking-wide">
            À la fin de ce chapitre, vous serez capable de :
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-semibold text-slate-900">
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Concevoir une structure relationnelle adaptée.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Créer les tables avec contraintes et clés étrangères.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Connecter Node.js à MySQL avec mysql2/promise.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Utiliser et dimensionner un pool de connexions.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Exécuter des requêtes préparées anti-injections SQL.</span>
            </li>
            <li className="flex items-start gap-2 bg-white p-3 rounded-xl border border-amber-200/60 shadow-sm">
              <Icon name="check" className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Enregistrer et récupérer l&apos;historique des analyses.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* 2. Pourquoi MySQL */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          2. Pourquoi utiliser MySQL ?
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Gemini génère des réponses éphémères, mais ne constitue en aucun cas un système de stockage. Nous avons besoin de persister :
        </p>
        <ul className="text-sm text-slate-800 space-y-1 list-disc list-inside">
          <li>Les demandes (prompts) envoyées au modèle.</li>
          <li>Les réponses complètes générées.</li>
          <li>Les horodatages précis des analyses.</li>
          <li>Les métadonnées nécessaires à leur consultation et filtrage.</li>
        </ul>
      </section>

      {/* 3. Conception de la base de données */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          3. Conception de la base de données
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Pour la première version, nous modélisons deux tables reliées par une relation <strong>1:N</strong> (un utilisateur possède plusieurs analyses) :
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
            <h3 className="font-bold text-slate-950 text-sm">Table users</h3>
            <ul className="text-xs text-slate-700 space-y-1 font-mono">
              <li>id : INT (PK, Auto-increment)</li>
              <li>name : VARCHAR(100)</li>
              <li>email : VARCHAR(150) UNIQUE</li>
              <li>created_at : TIMESTAMP</li>
            </ul>
          </div>
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 space-y-2">
            <h3 className="font-bold text-slate-950 text-sm">Table analyses</h3>
            <ul className="text-xs text-slate-700 space-y-1 font-mono">
              <li>id : INT (PK, Auto-increment)</li>
              <li>user_id : INT (FK -&gt; users.id)</li>
              <li>prompt : TEXT</li>
              <li>response : LONGTEXT</li>
              <li>status : VARCHAR(30)</li>
              <li>created_at : TIMESTAMP</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Création SQL */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          4. Création de la base de données
        </h2>
        <CodeBlock
          filename="schema.sql"
          language="sql"
          code={`CREATE DATABASE intelligent_analysis;
USE intelligent_analysis;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE analyses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    prompt TEXT NOT NULL,
    response LONGTEXT,
    status VARCHAR(30) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_analysis_user
    FOREIGN KEY (user_id)
    REFERENCES users(id)
    ON DELETE CASCADE
);`}
        />
      </section>

      {/* 5. Pilote mysql2 */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          5. Installer le pilote MySQL
        </h2>
        <CodeBlock
          filename="Installation npm"
          language="bash"
          code={`npm install mysql2`}
        />
        <p className="text-sm text-slate-700">
          Nous utilisons <code className="font-mono font-bold text-amber-900">mysql2</code> pour son support natif des Promises et des requêtes préparées performantes.
        </p>
      </section>

      {/* 6. Connexion et Pool */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          6. Configurer la connexion et le Pool MySQL
        </h2>
        <CodeBlock
          filename="backend/.env"
          language="env"
          code={`DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=intelligent_analysis`}
        />
        <CodeBlock
          filename="backend/src/database/connection.ts"
          language="typescript"
          code={`import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});`}
        />
      </section>

      {/* 7. Comprendre le Pool de connexions */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          7. Comprendre le Pool de connexions
        </h2>
        <p className="text-base text-slate-900 leading-relaxed">
          Sans pool, l&apos;application devrait négocier une nouvelle connexion TCP et authentification pour chaque requête HTTP. Avec un pool, les connexions sont réutilisées instantanément :
        </p>
        <div className="p-4 rounded-xl bg-slate-900 text-slate-200 font-mono text-xs overflow-x-auto space-y-1">
          <p className="text-amber-400">{'// Fonctionnement d\'un Pool MySQL :'}</p>
          <p>           Backend Node.js</p>
          <p>                  |</p>
          <p>                  v</p>
          <p>           Pool MySQL (10 connexions)</p>
          <p>            /     |     \\</p>
          <p>           v      v      v</p>
          <p>      Conn. 1  Conn. 2  Conn. 3</p>
          <p>           \\      |      /</p>
          <p>                  v</p>
          <p>             Serveur MySQL</p>
        </div>
      </section>

      {/* 8. Tester la connexion */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          8. Tester la connexion MySQL
        </h2>
        <CodeBlock
          filename="backend/src/database/testConnection.ts"
          language="typescript"
          code={`import { pool } from "./connection.js";

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("Connexion MySQL réussie !");
    connection.release();
  } catch (error) {
    console.error("Erreur de connexion MySQL :", error);
  }
}

testConnection();`}
        />
      </section>

      {/* 9. Services CRUD */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          9. Service d&apos;enregistrement et consultation des analyses
        </h2>
        <CodeBlock
          filename="backend/src/services/analysis.service.ts"
          language="typescript"
          code={`import { pool } from "../database/connection.js";

export async function createAnalysis(userId: number, prompt: string) {
  const [result] = await pool.execute(
    \`INSERT INTO analyses (user_id, prompt, status) VALUES (?, ?, ?)\`,
    [userId, prompt, "pending"]
  );
  return result;
}

export async function getUserAnalyses(userId: number) {
  const [rows] = await pool.execute(
    \`SELECT id, prompt, response, status, created_at
     FROM analyses
     WHERE user_id = ?
     ORDER BY created_at DESC\`,
    [userId]
  );
  return rows;
}`}
        />
        <Callout type="tip" title="Protection anti-injections SQL">
          <p className="text-sm leading-relaxed text-slate-800">
            L&apos;utilisation des marqueurs de position <code className="font-mono font-bold">?</code> transmet les paramètres séparément de la structure SQL, garantissant une étanchéité totale contre les injections de code malveillant.
          </p>
        </Callout>
      </section>

      {/* 10. Travaux pratiques */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          10. Travaux pratiques
        </h2>
        <PracticalWork
          title="Persistance relationnelle avec MySQL"
          objective="Mettre en place la base, le pool et tester l'enregistrement d'analyses."
          duration="45 min"
          steps={[
            "Créez la base de données intelligent_analysis et exécutez le script SQL.",
            "Installez mysql2 et configurez les variables d'environnement dans .env.",
            "Créez le pool de connexions et validez avec testConnection.ts.",
            "Développez les fonctions createAnalysis et getUserAnalyses.",
            "Exercice supplémentaire : Créez une route GET /api/analyses pour exposer l'historique sous forme de réponse JSON."
          ]}
        />
      </section>

      {/* 11. Synthèse */}
      <section className="space-y-4">
        <h2 className="text-[19px] font-bold text-slate-900 border-b-2 border-slate-200 pb-1.5">
          11. Synthèse
        </h2>
        <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/60 p-5 space-y-2 text-sm text-slate-900 font-medium">
          <p>⬢ MySQL assure la pérennité des analyses et des comptes utilisateurs.</p>
          <p>⬢ <code className="font-mono font-bold">mysql2/promise</code> apporte les API asynchrones modernes.</p>
          <p>⬢ Le pool de connexions optimise drastiquement le débit de requêtes.</p>
          <p>⬢ Les requêtes préparées avec <code className="font-mono font-bold">?</code> protègent contre les failles SQL.</p>
        </div>
      </section>
    </div>
  );
};

