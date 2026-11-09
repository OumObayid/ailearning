import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const rootDir = process.cwd();
const stagingDir = path.join(rootDir, '_cpanel_deploy');

// Ensure clean staging directory
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

function copyRecursive(src, dest, ignoreNames = ['node_modules', 'cache', '.git', '.next']) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    const baseName = path.basename(src);
    if (ignoreNames.includes(baseName)) {
      return;
    }
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      if (ignoreNames.includes(child)) continue;
      copyRecursive(path.join(src, child), path.join(dest, child), ignoreNames);
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

console.log('=== Préparation du paquet cPanel (SANS AUCUN node_modules) ===');

// 1. Copie de .next en excluant STRICTEMENT cache, dev, diagnostics, standalone et node_modules
console.log('1. Copie du build .next (sans cache, dev ni node_modules)...');
const nextSrc = path.join(rootDir, '.next');
const nextDest = path.join(stagingDir, '.next');
fs.mkdirSync(nextDest, { recursive: true });

for (const item of fs.readdirSync(nextSrc)) {
  if (item === 'cache' || item === 'standalone' || item === 'dev' || item === 'diagnostics') {
    continue;
  }
  const itemPath = path.join(nextSrc, item);
  copyRecursive(itemPath, path.join(nextDest, item), ['node_modules', 'cache', 'dev', 'diagnostics']);
}

// 2. Copie des assets statiques publics
console.log('2. Copie du dossier public/...');
copyRecursive(path.join(rootDir, 'public'), path.join(stagingDir, 'public'), ['node_modules']);

// 3. Copie du schéma de base de données
console.log('3. Copie de scripts/schema.sql...');
const scriptsDest = path.join(stagingDir, 'scripts');
fs.mkdirSync(scriptsDest, { recursive: true });
if (fs.existsSync(path.join(rootDir, 'scripts', 'schema.sql'))) {
  fs.copyFileSync(
    path.join(rootDir, 'scripts', 'schema.sql'),
    path.join(scriptsDest, 'schema.sql')
  );
}

// 4. Copie des fichiers de configuration indispensables
console.log('4. Copie des fichiers racine (server.js, package.json, etc.)...');
const rootFiles = [
  'server.js',
  'package.json',
  'package-lock.json',
  'next.config.ts',
  'postcss.config.mjs',
  'README-CPANEL.md',
  '.env.example',
  'tsconfig.json',
];

for (const file of rootFiles) {
  const src = path.join(rootDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(stagingDir, file));
  }
}

// 5. Copie du code applicatif pour Next.js (sans node_modules)
console.log('5. Copie des dossiers applicatifs...');
const appFolders = ['app', 'components', 'content', 'context', 'data', 'lib', 'services', 'types'];
for (const folder of appFolders) {
  const src = path.join(rootDir, folder);
  if (fs.existsSync(src)) {
    copyRecursive(src, path.join(stagingDir, folder), ['node_modules']);
  }
}

// 6. VERIFICATION STRICTE : S'assurer qu'aucun node_modules n'a été copié
function scanForNodeModules(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules') {
      throw new Error(`ERREUR CRITIQUE : node_modules détecté dans ${path.join(dir, entry.name)}`);
    }
    if (entry.isDirectory()) {
      scanForNodeModules(path.join(dir, entry.name));
    }
  }
}
scanForNodeModules(stagingDir);
console.log('✅ Vérification réussie : ZÉRO node_modules dans le paquet.');

// 7. Compression prioritaire en format ZIP avec 7-Zip
const sevenZipExe = 'C:\\Program Files\\7-Zip\\7z.exe';
const zipFile = path.join(rootDir, 'ailearning-prod.zip');
if (fs.existsSync(zipFile)) fs.unlinkSync(zipFile);

console.log('6. Compression dans ailearning-prod.zip...');
if (fs.existsSync(sevenZipExe)) {
  execSync(`"${sevenZipExe}" a -tzip -mx=5 "${zipFile}" "${stagingDir}\\*"`, { stdio: 'inherit' });
} else {
  execSync(`powershell -Command "Compress-Archive -Path '${stagingDir}\\*' -DestinationPath '${zipFile}' -Force"`, { stdio: 'inherit' });
}

// 8. Compression optionnelle en format RAR si WinRAR est présent
const rarExe = 'C:\\Program Files\\WinRAR\\Rar.exe';
const rarFile = path.join(rootDir, 'ailearning-prod.rar');
if (fs.existsSync(rarFile)) fs.unlinkSync(rarFile);

let rarSize = null;
if (fs.existsSync(rarExe)) {
  try {
    console.log('7. Compression dans ailearning-prod.rar...');
    execSync(`"${rarExe}" a -r -ep1 -m3 "${rarFile}" "${stagingDir}\\*"`, { stdio: 'inherit' });
    rarSize = (fs.statSync(rarFile).size / (1024 * 1024)).toFixed(2);
  } catch (err) {
    console.warn('WinRAR non exécuté ou ignoré :', err.message);
  }
}

// Nettoyage du dossier temporaire
fs.rmSync(stagingDir, { recursive: true, force: true });

const zipSize = (fs.statSync(zipFile).size / (1024 * 1024)).toFixed(2);

console.log('\n============================================================');
console.log('Archive de production cPanel prête (SANS node_modules) :');
console.log(`- ZIP : ${zipFile} (${zipSize} Mo)`);
if (rarSize) {
  console.log(`- RAR : ${rarFile} (${rarSize} Mo)`);
}
console.log('============================================================\n');
