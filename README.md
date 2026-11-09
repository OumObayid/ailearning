# AiLearning — Plateforme d'Ingénierie d'Intelligence Artificielle

<p align="center">
  <strong>Formation complète et professionnalisante en ingénierie d'IA, architectures backend haute performance et prompt engineering avancé.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4.5-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MySQL-8.x-4479A1?style=for-the-badge&logo=mysql" alt="MySQL" />
  <img src="https://img.shields.io/badge/Vitest-5.x-729B1B?style=for-the-badge&logo=vitest" alt="Vitest" />
</p>

---

## Sommaire

1. [À propos du Projet](#-à-propos-du-projet)
2. [Les 4 Cursus de Formation](#-les-4-cursus-de-formation)
3. [Fonctionnalités Clés](#-fonctionnalités-clés)
4. [Stack Technique](#-stack-technique)
5. [Structure du Projet](#-structure-du-projet)
6. [Installation & Démarrage Local](#-installation--démarrage-local)
7. [Scripts Disponibles](#-scripts-disponibles)
8. [Base de Données](#-base-de-données)
9. [Déploiement en Production (cPanel & Cloud)](#-déploiement-en-production)
10. [Sécurité & Conformité](#-sécurité--conformité)

---

## 🌟 À propos du Projet

**AiLearning** est une application web d'apprentissage conçue pour former les développeurs aux enjeux actuels de l'intelligence artificielle en production. 

Elle combine des cours théoriques rigoureux, des bacs à sable interactifs, des simulateurs en direct, un suivi de progression précis et des examens certifiants minutés.

---

## 📚 Les 4 Cursus de Formation

| Cursus | Modules | Focus Pédagogique | Thème |
| :--- | :---: | :--- | :---: |
| **AI Engineering** | 8 | Modèles multimodaux Google Gemini, streaming temps réel, RAG vectoriel avec Qdrant, flux n8n et orchestration d'agents autonomes. | 🔵 Bleu |
| **Backend IA** | 7 | Internals V8 et Node.js, Event Loop, gestion mémoire (Heap/Stack), streaming WebSockets/SSE, indexation SQL et cache distribué Redis. | 🟠 Ambre |
| **Prompt Engineering IDE** | 8 | Conception d'instructions professionnelles, context windows, tokens, architecture d'agents IDE, défenses anti-injection de prompts. | 🟣 Violet |
| **Ingénierie du Débogage** | 8 | Diagnostic causal d'anomalies, reproduction de bugs, analyse de call stacks, inspection réseau, profilage mémoire et pilotage d'agents IA. | 🟢 Citron vert |

---

## ⚡ Fonctionnalités Clés

* **Accès public & SEO friendly (Option A)** :
  * Le catalogue des cours, la présentation des cursus et la liste des modules sont publiquement indexables.
  * La lecture des leçons et l'accès aux simulateurs sont protégés par un écran d'accès incitant à la création d'un compte gratuit.
  * Connexion ou inscription intégrée sans rechargement de page via modale avec déverrouillage immédiat du chapitre consulté.
* **Moteur d'Examens & Certifications** :
  * QCM chronométrés avec calcul automatisé du score, correction détaillée et enregistrement des tentatives.
  * Gestion du temps restant et détection des seuils de réussite.
* **Suivi de Progression en Temps Réel** :
  * Marquage des chapitres complétés avec bouton interactif et sauvegarde MySQL.
  * Barres de progression dynamiques par module et globale au cursus.
* **Espace Membre & Administration (RBAC)** :
  * Tableaux de bord différenciés pour les apprenants (`/profil`) et les administrateurs (`/admin`).
  * Gestion des utilisateurs, des scores aux examens et des paramètres de la plateforme.
* **Ergonomie Avancée** :
  * Mode lecture plein écran avec bascule en un clic et raccourci touche <kbd>Échap</kbd>.
  * Palette graphique cohérente s'adaptant dynamiquement au thème du cursus.

---

## 🛠 Stack Technique

* **Framework :** [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components)
* **Bibliothèque UI :** [React 19](https://react.dev/)
* **Langage :** [TypeScript 5](https://www.typescriptlang.org/)
* **Design & Styles :** [Tailwind CSS v4](https://tailwindcss.com/) & PostCSS
* **Base de données :** MySQL 8+ via [`mysql2`](https://github.com/sidorares/node-mysql2)
* **Sécurité & Auth :** JWT signés via [`jose`](https://github.com/panva/jose) & Hachage des mots de passe avec [`bcryptjs`](https://github.com/dcodeIO/bcrypt.js)
* **Contenu & Labs :** MDX avec [`@next/mdx`](https://nextjs.org/docs/app/building-your-application/configuring/mdx) et composants React sur-mesure
* **Tests Automatisés :** [Vitest 5](https://vitest.dev/), [@testing-library/react](https://testing-library.com/), JSDOM
* **Linter & Qualité :** [ESLint 9](https://eslint.org/) (Flat config)

---

## 📂 Structure du Projet

```text
AiLearning/
├── app/                        # Next.js App Router (Pages, Layouts & API Routes)
│   ├── admin/                  # Dashboard & Administration
│   ├── api/                    # Routes REST API (/auth, /exams, /chapters, etc.)
│   ├── cours/                  # Catalogue & parcours des 4 cursus
│   ├── examens/                # Moteur d'examens et certifications
│   ├── profil/                 # Espace apprenant (profil & progression)
│   ├── layout.tsx              # Layout racine (Sidebar, Header, AuthProvider)
│   └── page.tsx                # Page d'accueil / Tableau de bord principal
├── components/                 # Composants React modulaires
│   ├── auth/                   # Modale de connexion / inscription
│   ├── common/                 # Icônes SVG, boutons, badges, modales
│   ├── courses/                # Layouts de chapitre, barres de lecture, cartes
│   ├── exam/                   # Composants du moteur d'examen
│   ├── interactive/            # Simulateurs interactifs et labs visuels
│   └── layout/                 # Sidebar rétractable, Header dynamique, PageHeader
├── content/                    # Contenu textuel et technique des chapitres (TSX & MDX)
├── context/                    # Contextes React (Auth, CourseDisplay, ChapterProgress)
├── lib/                        # Utilitaires, constantes, mapping et données de navigation
├── public/                     # Images, illustrations des cours, bannières et favicons
├── scripts/                    # Scripts utilitaires (schéma SQL, packaging cPanel)
│   ├── schema.sql              # Schéma de la base de données MySQL
│   └── create-cpanel-package.mjs # Générateur automatique d'archive de déploiement
├── services/                   # Services métier (CourseService, UserService, etc.)
├── types/                      # Interfaces et définitions TypeScript
├── next.config.ts              # Configuration Next.js (MDX, standalone, etc.)
├── postcss.config.mjs          # Configuration PostCSS pour Tailwind CSS v4
├── vitest.config.ts            # Configuration des tests automatisés Vitest
└── server.js                   # Point d'entrée serveur de production (Passenger / cPanel)
```

---

## 🚀 Installation & Démarrage Local

### Prérequis
* [Node.js](https://nodejs.org/) v20.x, v22.x ou v24.x
* [MySQL](https://www.mysql.com/) 8.x ou MariaDB équivalent
* [npm](https://www.npmjs.com/) (fourni avec Node.js)

### 1. Cloner le projet
```bash
git clone https://github.com/votre-compte/AiLearning.git
cd AiLearning
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer l'environnement
Copiez le fichier d'exemple et renseignez vos paramètres locaux :
```bash
cp .env.example .env.local
```
Exemple de configuration :
```env
PORT=3000
NODE_ENV=development

# Base de données MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=secret
DB_NAME=ailearning

# Sécurité JWT (minimum 32 caractères aléatoires)
JWT_SECRET=cle_secrete_ultra_robuste_de_developpement_123456
```

### 4. Initialiser la base de données
Importez le schéma SQL dans votre serveur MySQL :
```bash
mysql -u root -p ailearning < scripts/schema.sql
```

### 5. Lancer l'application en développement
```bash
npm run dev
```
Ouvrez ensuite [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## ⚙️ Scripts Disponibles

| Commande | Rôle |
| :--- | :--- |
| `npm run dev` | Démarre le serveur de développement local avec Webpack. |
| `npm run build` | Compile l'application en mode **Standalone** ultra-optimisé pour la production. |
| `npm run start` | Démarre le serveur Next.js compilé en production. |
| `npm run lint` | Exécute l'analyse statique du code avec ESLint. |
| `npm run test` | Exécute l'ensemble de la suite de tests unitaires via Vitest. |
| `npm run test:watch` | Exécute les tests en continu lors des modifications de code. |
| `npm run typecheck` | Vérifie la stricte conformité des types TypeScript sans générer de bundle. |

---

## 🗄️ Base de Données

Le schéma relationnel initialisé par [`scripts/schema.sql`](file:///D:/cours/ai/projets/AiLearning/scripts/schema.sql) gère :
* **`users`** : Comptes apprenants et administrateurs (identifiants, hash `bcrypt`, rôles `student` / `admin`).
* **`user_exams`** : Historique et résultats des évaluations certifiantes (scores, temps passé, réponses détaillées au format JSON).
* **`user_chapter_progress`** : Suivi fin de la validation des chapitres par étudiant.
* **`system_settings`** : Clés de configuration dynamiques du système.

---

## 🌐 Déploiement en Production

Le projet est configuré avec l'option **`output: "standalone"`** dans `next.config.ts`, produisant un ensemble autonome ne pesant que **~40 Mo** (au lieu de plus d'1 Go), sans nécessiter le dossier `node_modules` complet sur le serveur.

### Déploiement cPanel en 3 étapes :
1. **Générer l'archive de production :**
   ```bash
   npm run build
   node scripts/create-cpanel-package.mjs
   ```
   *Ce script génère automatiquement `ailearning-standalone.zip` et `ailearning-standalone.rar` prêts au téléversement.*
2. **Importer la base :**
   Dans **phpMyAdmin** sur cPanel, importez `scripts/schema.sql` dans votre base MySQL.
3. **Configurer l'application Node.js :**
   * Dans cPanel ➔ **Setup Node.js App** :
     * **Node.js version :** `20.x` ou supérieure.
     * **Application startup file :** `server.js`.
     * **Fichier .env :** Renseignez vos identifiants MySQL cPanel et votre `JWT_SECRET`.
   * Cliquez sur **Start / Restart Application**.

---

## 🔒 Sécurité & Bonnes Pratiques

* **Mots de passe :** Hachage unidirectionnel irréversible avec sel dynamique (`bcryptjs`, cost factor 10).
* **Sessions stateless :** Jetons JSON Web Token (JWT) signés cryptographiquement (`HS256`) via la bibliothèque moderne `jose`.
* **Cookies HttpOnly :** Protection contre les failles XSS en interdisant l'accès direct aux tokens via JavaScript dans le navigateur.
* **Validation stricte :** Toutes les routes API vérifient et assainissent les entrées utilisateur avant toute requête SQL paramétrée (protection native contre les injections SQL).

---

<p align="center">
  Développé avec passion pour l'excellence pédagogique en Intelligence Artificielle.
</p>
