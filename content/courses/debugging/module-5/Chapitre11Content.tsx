'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type SecurityLogPatternKey = 'brute_force' | 'recon_scanner' | 'idor_harvesting' | 'legit_traffic';

interface SecurityLogScenario {
  title: string;
  badge: string;
  badgeColor: string;
  alertLevel: 'CRITICAL_THREAT' | 'WARNING_SCAN' | 'SUSPICIOUS_IDOR' | 'NORMAL_SAFE';
  eventCount: number;
  sampleLogJson: string;
  threatDescription: string;
  siemCorrelationRule: string;
  automatedRemediation: string;
}

const SECURITY_LOG_SCENARIOS: Record<SecurityLogPatternKey, SecurityLogScenario> = {
  brute_force: {
    title: '1. Attaque par Force Brute / Credential Stuffing (Échecs 401 en Rafale)',
    badge: 'Attaque Force Brute',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    alertLevel: 'CRITICAL_THREAT',
    eventCount: 38,
    sampleLogJson: `{
  "timestamp": "2026-11-09T02:14:12.450Z",
  "level": "WARN",
  "event_type": "AUTH_LOGIN_FAILURE",
  "correlation_id": "req-9842a-f10",
  "actor": {
    "ip": "198.51.100.42",
    "user_agent": "python-requests/2.31.0",
    "attempted_identifier": "admin@fintech.io"
  },
  "security_context": {
    "failures_last_minute": 38,
    "response_code": 401,
    "reason": "INVALID_CREDENTIALS"
  }
}`,
    threatDescription: 'Une même adresse IP tente des dizaines de mots de passe différents sur le compte administrateur en quelques secondes. Le script utilise un User-Agent automatisé non-navigateur (python-requests).',
    siemCorrelationRule: 'ALERTE SI count(AUTH_LOGIN_FAILURE) > 5 EN 60s PAR target_user OU ip',
    automatedRemediation: 'Verrouillage temporaire du compte (Account Lockout), bannissement temporaire de l\'IP au niveau du pare-feu Cloudflare/Fail2ban et déclenchement d\'un challenge MFA obligatoire.',
  },
  recon_scanner: {
    title: '2. Balayage de Vulnérabilités & Fuzzing de Fichiers Cachés (Rafale 404)',
    badge: 'Reconnaissance & Scan',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    alertLevel: 'WARNING_SCAN',
    eventCount: 145,
    sampleLogJson: `{
  "timestamp": "2026-11-09T02:14:18.102Z",
  "level": "INFO",
  "event_type": "HTTP_ROUTE_NOT_FOUND",
  "correlation_id": "req-9842b-x01",
  "actor": {
    "ip": "203.0.113.88",
    "user_agent": "Mozilla/5.0 (compatible; Nmap Scripting Engine)"
  },
  "http_request": {
    "method": "GET",
    "path": "/.env",
    "status_code": 404,
    "probed_targets": ["/.git/config", "/wp-admin", "/phpmyadmin", "/aws/credentials"]
  }
}`,
    threatDescription: 'Un scanner automatisé (type Nmap, Nikto ou botnet Shodan) sonde systématiquement les chemins d\'accès sensibles pour trouver des sauvegardes ou des fichiers de configuration oubliés.',
    siemCorrelationRule: 'ALERTE SI count(HTTP_404) > 20 EN 30s AVEC patterns_sensibles(.env, .git, admin)',
    automatedRemediation: 'Inscription immédiate de l\'adresse IP dans la liste noire WAF (Rate-Limit à 0) pour 24 heures.',
  },
  idor_harvesting: {
    title: '3. Aspiration Énumérative IDOR (Série d\'Accès Refusés 403 Forbidden)',
    badge: 'Tentative d\'Extraction IDOR',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    alertLevel: 'SUSPICIOUS_IDOR',
    eventCount: 62,
    sampleLogJson: `{
  "timestamp": "2026-11-09T02:14:25.890Z",
  "level": "WARN",
  "event_type": "ACCESS_CONTROL_VIOLATION",
  "correlation_id": "req-9842c-m88",
  "actor": {
    "authenticated_user_id": 104,
    "ip": "192.0.2.15",
    "role": "CLIENT"
  },
  "access_attempt": {
    "resource": "INVOICE",
    "target_id": 105,
    "status_code": 403,
    "error": "OWNERSHIP_MISMATCH"
  }
}`,
    threatDescription: 'L\'utilisateur authentifié #104 tente séquentiellement d\'accéder aux factures 105, 106, 107... Le contrôle d\'accès sécurisé bloque chaque tentative (403), mais la répétition prouve une intention d\'exfiltration.',
    siemCorrelationRule: 'ALERTE SI count(ACCESS_CONTROL_VIOLATION) > 3 EN 5 min PAR authenticated_user_id',
    automatedRemediation: 'Révocation immédiate de la session JWT de l\'utilisateur, suspension préventive du compte et notification à l\'équipe de sécurité (SOC).',
  },
  legit_traffic: {
    title: '4. Flux d\'Utilisateurs Légitimes (Activité Normale en Production)',
    badge: 'Trafic Nominal Sain',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    alertLevel: 'NORMAL_SAFE',
    eventCount: 4,
    sampleLogJson: `{
  "timestamp": "2026-11-09T02:14:30.012Z",
  "level": "INFO",
  "event_type": "AUTH_LOGIN_SUCCESS",
  "correlation_id": "req-9842d-ok",
  "actor": {
    "authenticated_user_id": 482,
    "ip": "82.65.12.90",
    "auth_method": "PASSWORD_AND_TOTP"
  },
  "outcome": {
    "status_code": 200,
    "mfa_verified": true,
    "session_duration_sec": 3600
  }
}`,
    threatDescription: 'Connexion réussie avec double facteur d\'authentification (2FA/TOTP). Empreinte géographique cohérente avec l\'historique utilisateur.',
    siemCorrelationRule: 'Journalisation nominale (Rétention légale RGPD 1 an).',
    automatedRemediation: 'Aucune action requise. Mise à jour de l\'horodatage de dernière connexion réussie.',
  },
};

export const Chapitre11Content: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<SecurityLogPatternKey>('brute_force');
  const scenario = SECURITY_LOG_SCENARIOS[selectedKey];

  return (
    <div className="space-y-10 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-200 bg-lime-50/80 p-6 sm:p-8 mb-8">
        <div className="flex items-center gap-2 text-lime-900 font-extrabold text-xs uppercase tracking-wider mb-2">
          <Icon name="activity" className="w-4 h-4 text-lime-700" />
          <span>Module 5 — Optimisation & Diagnostic de Performance Avancé</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight">
          Chapitre 11 — Analyser les Logs de Sécurité & Détecter les Attaques
        </h1>
        <p className="text-sm sm:text-base text-slate-700 mt-2 font-medium">
          Pourquoi <code className="bg-lime-200/60 px-1.5 py-0.5 rounded text-xs font-mono font-bold text-slate-900">console.log</code> est proscrit en production, configurer un logger structuré haute performance avec Winston/Pino, masquage automatique des données sensibles (PII) et corrélation SIEM (Grafana Loki, ELK, Splunk).
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
            <span>Différencier les logs techniques de débogage des journaux d&apos;audit de sécurité (Security Audit Trails).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Générer des logs structurés JSON conformes aux standards ECS (Elastic Common Schema).</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Masquer automatiquement les données personnelles (RGPD / PII Redaction) avant écriture sur disque.</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
            <span className="text-emerald-600 font-black">✓</span>
            <span>Identifier les signatures d&apos;attaque dans les logs : Force brute, Fuzzing 404 et énumération IDOR.</span>
          </div>
        </div>
      </section>

      {/* 1. Pourquoi console.log est interdit en production */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="x-circle" className="w-5 h-5 text-rose-600" />
          1. Pourquoi console.log() est Formellement Interdit en Production
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Beaucoup de développeurs utilisent par habitude <code className="text-xs bg-slate-200 px-1 py-0.5 rounded font-mono font-bold">console.log(&apos;Erreur:&apos;, err)</code>. 
          En environnement de production à fort trafic, cette pratique engendre 3 catastrophes majeures :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
              1. Blocage Synchrone
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Sous Linux et Windows, lorsque la sortie standard (<code className="font-mono text-xs">stdout</code>) est redirigée vers un fichier ou un tube, <code className="font-mono text-xs">console.log()</code> devient <strong>synchrone et bloquant</strong>. Sous charge, il paralyse le thread principal Node.js.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
              2. Non-Indexable
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Une simple chaîne de texte brut comme <code className="font-mono text-xs">&quot;User 10 failed login&quot;</code> ne peut pas être filtrée efficacement par un moteur SIEM (Elasticsearch ou Loki). Impossible d&apos;agréger par IP, par utilisateur ou par code HTTP.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-purple-800 bg-purple-100 px-2 py-0.5 rounded">
              3. Violation RGPD
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              Un <code className="font-mono text-xs">console.log(req.body)</code> écrit en clair les mots de passe, numéros de cartes de crédit et jetons de session sur le disque dur, violant le RGPD et la norme bancaire PCI-DSS.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Implémentation Industrielle avec Winston */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="code" className="w-5 h-5 text-indigo-600" />
          2. Logger Industriel avec Winston & Rotation Quotidienne
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Voici l&apos;architecture de journalisation professionnelle avec masquage automatique des secrets et rotation des fichiers :
        </p>

        <CodeBlock
          code={`import winston from 'winston';
import 'winston-daily-rotate-file';

// Format personnalisé pour masquer automatiquement les données sensibles (PII Redaction)
const sanitizeFormat = winston.format((info) => {
  const sensitiveKeys = ['password', 'token', 'authorization', 'secret', 'creditCard'];
  const redact = (obj: any): any => {
    if (!obj || typeof obj !== 'object') return obj;
    for (const key of Object.keys(obj)) {
      if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
        obj[key] = '[REDACTED]';
      } else if (typeof obj[key] === 'object') {
        redact(obj[key]);
      }
    }
    return obj;
  };
  return redact(info);
});

export const securityLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    sanitizeFormat(),
    winston.format.timestamp(),
    winston.format.json() // Format JSON structuré pour Loki / Datadog
  ),
  transports: [
    // Fichier de logs de sécurité dédié avec rotation automatique (14 jours de rétention)
    new winston.transports.DailyRotateFile({
      filename: 'logs/security-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxSize: '20m',
      maxFiles: '14d',
      level: 'warn' // Uniquement les alertes de sécurité (WARN & ERROR)
    }),
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    })
  ]
});`}
          language="typescript"
        />

        <Callout type="tip" title="Immutabilité et Protection contre l'Effacement des Traces">
          <p className="text-xs sm:text-sm">
            Lorsqu&apos;un attaquant réussit à s&apos;introduire sur un serveur, son premier réflexe est d&apos;effacer les fichiers de logs (<code className="font-mono text-xs font-bold">rm -rf /var/log/*</code>). 
            En expédiant vos logs en continu vers un collecteur distant (Loki ou CloudWatch avec rétention WORM / Object Lock), les preuves restent <strong>immuables et inaltérables</strong> même si la machine hôte est détruite.
          </p>
        </Callout>
      </section>

      {/* 3. Centralisation & Tableaux de Bord SIEM */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="database" className="w-5 h-5 text-emerald-600" />
          3. Centralisation des Logs : Grafana Loki, ELK & Splunk
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Lorsque votre application tourne sur plusieurs conteneurs Kubernetes ou serveurs Load-Balancés, il est impensable de se connecter en SSH sur chaque serveur pour inspecter des fichiers de logs dispersés. 
          Les logs doivent être expédiés en continu vers un collecteur centralisé :
        </p>

        {/* Figures 6.11.A, B, C - Preserving image15, image16, image17 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="border border-slate-200 rounded-2xl bg-white p-3 shadow-xs flex flex-col justify-between">
            <div className="relative w-full h-48 sm:h-56">
              <Image
                src="/images/cours/debugging/module-5/image15.jpeg"
                alt="Tableau de bord de surveillance des logs de sécurité dans Grafana Loki (Figure 6.11.A)"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2 text-center text-xs font-bold text-slate-700">
              Figure 6.11.A — Grafana Loki : Visualisation des événements de sécurité en temps réel.
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl bg-white p-3 shadow-xs flex flex-col justify-between">
            <div className="relative w-full h-48 sm:h-56">
              <Image
                src="/images/cours/debugging/module-5/image16.jpeg"
                alt="Exploration des logs dans la suite Elastic Stack Kibana / ELK (Figure 6.11.B)"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2 text-center text-xs font-bold text-slate-700">
              Figure 6.11.B — Elastic Stack (ELK) : Filtrage des anomalies par IP et code HTTP.
            </div>
          </div>

          <div className="border border-slate-200 rounded-2xl bg-white p-3 shadow-xs flex flex-col justify-between">
            <div className="relative w-full h-48 sm:h-56">
              <Image
                src="/images/cours/debugging/module-5/image17.jpeg"
                alt="Analyse et corrélation d'incidents de sécurité dans Splunk Enterprise SIEM (Figure 6.11.C)"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2 text-center text-xs font-bold text-slate-700">
              Figure 6.11.C — Splunk SIEM : Détection automatique des règles de corrélation d&apos;attaques.
            </div>
          </div>
        </div>
      </section>

      {/* 4. Simulateur Interactif : SecurityLogAnalyzerSimulator */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="sliders" className="w-5 h-5 text-lime-600" />
          4. Simulateur Interactif : Analyseur de Télémétrie & Corrélation SIEM
        </h2>
        <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
          Sélectionnez un flux de logs entrants pour analyser la signature d&apos;attaque, la règle de corrélation SIEM et la réponse de remédiation automatisée :
        </p>

        {/* Boutons sélecteurs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {(Object.keys(SECURITY_LOG_SCENARIOS) as SecurityLogPatternKey[]).map((key) => {
            const sc = SECURITY_LOG_SCENARIOS[key];
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
                    {sc.title.split('(')[0]}
                  </div>
                </div>
                <div className="mt-2 text-[10px] font-mono text-slate-500">
                  Événements : {sc.eventCount} logs
                </div>
              </button>
            );
          })}
        </div>

        {/* Panneau de télémétrie */}
        <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Modèle de Détection SIEM</span>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">{scenario.title}</h3>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${scenario.badgeColor}`}>
              Niveau : {scenario.alertLevel}
            </span>
          </div>

          {/* Exemple de Log Structuré JSON */}
          <div>
            <div className="text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Icon name="terminal" className="w-3.5 h-3.5 text-indigo-600" />
              <span>Extrait du Journal Structuré JSON Émis par le Backend :</span>
            </div>
            <CodeBlock code={scenario.sampleLogJson} language="json" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block">Règle de Corrélation SIEM (Loki / Splunk) :</span>
              <div className="font-mono text-indigo-900 font-bold">{scenario.siemCorrelationRule}</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Action de Remédiation Automatisée (SOAR) :</span>
              <div className="text-emerald-950 font-medium">{scenario.automatedRemediation}</div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
            <strong>Analyse de la Menace : </strong> {scenario.threatDescription}
          </div>
        </div>
      </section>

      {/* 5. Cas Réel Entreprise : L'Infiltration Silencieuse */}
      <section className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 border-b-2 border-slate-200 pb-2 flex items-center gap-2">
          <Icon name="alert-triangle" className="w-5 h-5 text-rose-600" />
          5. Étude de Cas Réelle : L&apos;Infiltration Silencieuse chez MedData Hub
        </h2>
        <div className="border-2 border-rose-200 bg-rose-50/60 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-200/80 px-2.5 py-1 rounded-md">
              Fuite de Données Médicales
            </span>
            <span className="text-xs font-mono font-bold text-slate-600">Durée avant détection : 6 mois</span>
          </div>

          <div className="text-xs sm:text-sm text-slate-800 space-y-2 font-medium">
            <p>
              <strong>L&apos;Infiltration :</strong> Pendant 180 jours, un pirate a siphonné 80 000 dossiers médicaux chez MedData Hub en testant des identifiants au rythme très lent de <strong>1 requête toutes les 2 minutes</strong> pour passer sous les radars des rate limiters basiques.
            </p>
            <p>
              <strong>L&apos;Angle Mort :</strong> L&apos;application utilisait de simples fichiers texte générés avec <code className="bg-slate-800 text-slate-100 px-1 py-0.5 rounded font-mono text-xs">console.log</code>. Les fichiers grossissaient jusqu&apos;à saturer le disque dur et étaient supprimés à la main toutes les deux semaines par les administrateurs pour libérer de l&apos;espace !
            </p>
            <p>
              <strong>Le Déclic et la Solution :</strong> Migration vers <strong>Winston JSON + Grafana Loki</strong> avec une rétention immuable de 12 mois dans un bucket Amazon S3 en écriture seule (Object Lock / WORM). Dès la mise en place de règles de détection d&apos;énumération sur les statuts 403, le compte compromis a été identifié et neutralisé en 4 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Quiz de Validation des Acquis */}
      <div className="pt-6 border-t-2 border-slate-200">
        <QuickQuiz
          title="Validation des Connaissances — Logs de Sécurité & Détection d'Attaques (Chapitre 5.11)"
          questions={[
            {
              id: 1,
              question: "Pourquoi est-il crucial d'enregistrer les logs au format structuré JSON en production plutôt qu'en texte brut ?",
              options: [
                "Parce que le format JSON prend moins de place sur le disque dur qu'un fichier texte.",
                "Parce que le format JSON permet l'indexation automatique des champs clés (IP, code HTTP, userId) par des moteurs de recherche centralisés comme Loki ou Elasticsearch, facilitant les alertes de sécurité en temps réel.",
                "Parce que le texte brut est interdit par les lois européennes.",
                "Parce que Node.js ne sait pas écrire de chaînes de caractères sans JSON.stringify()."
              ],
              correctIndex: 1,
              explanation: "Les logs JSON structurés transforment des événements textuels confus en données interrogeables mathématiquement, permettant de créer des requêtes du type `count_over_time({status=401}[1m]) > 5`.",
            },
            {
              id: 2,
              question: "Quelle pratique de journalisation constitue une violation directe du RGPD et des normes de sécurité ?",
              options: [
                "Enregistrer l'adresse IP de l'utilisateur.",
                "Journaliser le mot de passe en clair ou le numéro de carte bancaire dans le champ 'body' d'un log sans masquage préalable (Redaction).",
                "Enregistrer la date et l'heure de la requête au format ISO 8601.",
                "Mesurer le temps d'exécution de la requête en millisecondes."
              ],
              correctIndex: 1,
              explanation: "Les données d'authentification (mots de passe, tokens) et les données personnelles critiques (PII) ne doivent JAMAIS apparaître en clair dans les logs, car ces fichiers sont souvent partagés entre plusieurs équipes ou outils d'analyse.",
            },
            {
              id: 3,
              question: "Quelle signature dans les logs indique typiquement une attaque par Force Brute ou Credential Stuffing ?",
              options: [
                "Une série de requêtes HTTP 200 OK espacées de 10 minutes.",
                "Une accumulation rapide de codes HTTP 401 (Unauthorized) ou d'événements AUTH_FAILED ciblant le même compte ou émis par la même adresse IP en quelques secondes.",
                "Une requête SQL trop lente sur une table indexée.",
                "Un pic d'utilisation du cache Redis."
              ],
              correctIndex: 1,
              explanation: "La force brute consiste à tester mécaniquement des milliers de combinaisons d'identifiants, générant une cascade d'erreurs 401 instantanées facilement repérables dans les logs.",
            },
            {
              id: 4,
              question: "À quoi sert un identifiant de corrélation (correlationId ou requestId) injecté dans chaque log HTTP ?",
              options: [
                "À générer un numéro de loterie pour l'utilisateur.",
                "À relier entre eux tous les logs générés par une même requête utilisateur à travers les différents microservices, middlewares et requêtes BDD.",
                "À accélérer le téléchargement des images du frontend.",
                "À supprimer automatiquement les cookies de session."
              ],
              correctIndex: 1,
              explanation: "Dans une architecture distribuée, le correlationId permet de retrouver d'un seul coup tous les événements techniques déclenchés par un clic spécifique d'un utilisateur.",
            },
            {
              id: 5,
              question: "Que signifie la politique de rotation de logs 'DailyRotateFile' avec un paramètre 'maxFiles: 14d' ?",
              options: [
                "Le serveur redémarre tous les 14 jours.",
                "Un nouveau fichier de log est créé chaque jour, et les fichiers vieux de plus de 14 jours sont automatiquement purgés pour éviter la saturation du disque dur.",
                "L'application ne peut pas avoir plus de 14 utilisateurs simultanés.",
                "Le mot de passe de l'administrateur expire après 14 jours."
              ],
              correctIndex: 1,
              explanation: "La rotation quotidienne segmente les logs par date et garantit que le stockage du serveur ne déborde pas en effaçant les fichiers dont l'ancienneté dépasse la politique de rétention.",
            },
            {
              id: 6,
              question: "Si vos logs révèlent 200 requêtes en 1 minute renvoyant le code HTTP 404 sur des chemins comme '/.env', '/.git/HEAD' et '/wp-admin', quelle est la conclusion ?",
              options: [
                "Il s'agit d'un bug de rendu dans le routeur Next.js.",
                "Le serveur fait l'objet d'un balayage automatisé (Reconnaissance / Fuzzing) par un botnet recherchant des failles de configuration pour s'introduire dans le système.",
                "Les utilisateurs ont oublié l'adresse de la page d'accueil.",
                "La base de données MySQL est éteinte."
              ],
              correctIndex: 1,
              explanation: "Les scanners automatisés explorent systématiquement les fichiers sensibles connus pour vérifier si l'administrateur a laissé traîner un dépôt Git ou des clés secrètes accessibles au public.",
            },
          ]}
        />
      </div>
    </div>
  );
};
