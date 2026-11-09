# Guide de Déploiement cPanel — AiLearning (Production)

> **Important :** Cette archive respecte la règle d'or du déploiement Node.js : **aucun dossier `node_modules` n'est transféré**.
> Cela évite les incompatibilités d'architectures entre Windows et Linux, réduit la taille de l'archive et préserve vos quotas de fichiers (*inodes*) sur votre hébergement.

---

## 1. Création de la Base de Données sur cPanel
1. Connectez-vous à votre interface **cPanel**.
2. Dans la section **Bases de données MySQL** :
   - Créez une nouvelle base (ex: `votrecompte_ailearning`).
   - Créez un utilisateur MySQL avec un mot de passe sécurisé.
   - Associez l'utilisateur à la base avec **Tous les privilèges**.
3. Ouvrez **phpMyAdmin** :
   - Sélectionnez votre base.
   - Cliquez sur l'onglet **Importer**.
   - Choisissez le fichier `scripts/schema.sql` (fourni dans l'archive) et validez l'importation.

---

## 2. Téléversement & Extraction des Fichiers
1. Dans le **Gestionnaire de fichiers** cPanel, téléversez `ailearning-prod.zip`.
2. Faites un clic droit sur l'archive puis cliquez sur **Extract** (Extraire) dans votre dossier cible (ex: `public_html` ou un sous-dossier comme `public_html/app`).
3. Vous pouvez supprimer l'archive `.zip` une fois extraite pour libérer de l'espace.

---

## 3. Configuration des Variables d'Environnement
Dans le dossier où sont extraits vos fichiers, créez un fichier `.env` (ou éditez `.env.production`) :
```env
NODE_ENV=production
PORT=3000

# Base de données MySQL cPanel
DB_HOST=localhost
DB_PORT=3306
DB_USER=votrecompte_dbuser
DB_PASSWORD=votremotdepasse
DB_NAME=votrecompte_ailearning

# Sécurité JWT (chaîne aléatoire secrète de minimum 32 caractères)
JWT_SECRET=votre_cle_secrete_ultra_robuste_minimum_32_caracteres_aleatoires
```

---

## 4. Configuration de l'Application Node.js & Installation des Paquets
1. Dans cPanel, cliquez sur **Setup Node.js App** (ou *Configurer une application Node.js*).
2. Cliquez sur **Create Application** :
   - **Node.js version** : Sélectionnez **20.x**, **22.x** ou supérieure.
   - **Application mode** : `Production`.
   - **Application root** : Le dossier où vous avez extrait les fichiers.
   - **Application startup file** : Indiquez `server.js`.
3. Cliquez sur **Create**.
4. Cliquez ensuite sur le bouton **Run NPM Install** (ou lancez `npm install --omit=dev` dans le terminal cPanel) :
   - *cPanel va télécharger et compiler automatiquement les paquets pour l'environnement Linux natif de votre serveur.*
5. Cliquez sur **Restart Application**.

🎉 Votre plateforme **AiLearning** est en ligne !
