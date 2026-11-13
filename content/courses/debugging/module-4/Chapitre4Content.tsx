'use client';

import React, { useState } from 'react';
import { QuickQuiz } from '@/components/interactive/QuickQuiz';
import { Callout } from '@/components/courses/Callout';
import { CodeBlock } from '@/components/courses/CodeBlock';
import { Icon } from '@/components/common/Icon';

type JsonIncidentKey =
  | 'missing_content_type'
  | 'trailing_comma_syntax'
  | 'response_envelope_mismatch'
  | 'bigint_precision_loss'
  | 'payload_too_large';

interface JsonIncident {
  title: string;
  badge: string;
  badgeColor: string;
  clientContext: string;
  serverObservation: string;
  clientSymptom: string;
  rootCause: string;
  fixSnippet: string;
  remedyRule: string;
}

const JSON_INCIDENTS: Record<JsonIncidentKey, JsonIncident> = {
  missing_content_type: {
    title: '1. Oubli de l\'en-tête Content-Type: application/json',
    badge: 'req.body === undefined',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    clientContext: `// Frontend : envoi de JSON sans préciser Content-Type
await fetch('/api/v1/users', {
  method: 'POST',
  body: JSON.stringify({ name: 'Samira', role: 'admin' })
  // 💥 MANQUE : headers: { 'Content-Type': 'application/json' }
});`,
    serverObservation: `app.post('/api/v1/users', (req, res) => {
  console.log('Corps reçu :', req.body); // -> undefined !
  const { name } = req.body; // 💥 TypeError: Cannot destructure property 'name' of undefined !
});`,
    clientSymptom: 'Le client reçoit une erreur HTTP 500 ou les champs sont enregistrés comme null en base.',
    rootCause: 'Le middleware express.json() inspecte l\'en-tête Content-Type. Si l\'en-tête est text/plain ou absent, le parser ignore le flux binaire. req.body reste undefined.',
    fixSnippet: `// 1. Côté client : toujours déclarer le MIME-type
await fetch('/api/v1/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({ name: 'Samira', role: 'admin' })
});`,
    remedyRule: 'Sans Content-Type: application/json, express.json() ne touche jamais à la requête.'
  },
  trailing_comma_syntax: {
    title: '2. Virgule traînante (Trailing comma) ou guillemets simples',
    badge: 'SyntaxError 400',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    clientContext: `// Requête émise manuellement via Postman ou cURL :
POST /api/v1/orders HTTP/1.1
Content-Type: application/json

{
  "product": "Ecran 4K",
  "quantity": 1, // 💥 Virgule en trop interdite par la RFC 8259 !
}`,
    serverObservation: `SyntaxError: Unexpected token } in JSON at position 45
    at JSON.parse (<anonymous>)
    at parse (/node_modules/body-parser/lib/types/json.js:89:19)`,
    clientSymptom: 'Le serveur répond HTTP 400 Bad Request avec une page HTML générique ou plante.',
    rootCause: 'JavaScript tolère les trailing commas et guillemets simples, mais la grammaire stricte JSON (RFC 8259) les interdit sous peine d\'invalidation immédiate.',
    fixSnippet: `// Intercepteur Express pour renvoyer une erreur propre au lieu d'un crash :
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && 'status' in err && (err as { status: number }).status === 400) {
    return res.status(400).json({
      type: 'https://api.eshop.fr/errors/malformed-json',
      title: 'JSON invalide',
      detail: 'Le corps de la requête contient une erreur de syntaxe JSON.'
    });
  }
  next(err);
});`,
    remedyRule: 'Toujours produire le JSON via JSON.stringify() et jamais par concaténation de chaînes manuelles.'
  },
  response_envelope_mismatch: {
    title: '3. Discordance d\'enveloppe : { data: [...] } vs [...]',
    badge: 'TypeError: .map()',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
    clientContext: `// Frontend React s'attend à un tableau :
const response = await fetch('/api/v1/products');
const data = await response.json();

// 💥 CRASH : TypeError: data.map is not a function !
return data.map((item) => <ProductCard key={item.id} product={item} />);`,
    serverObservation: `// Le backend a encapsulé la réponse dans une enveloppe d'API moderne :
res.status(200).json({
  success: true,
  count: 12,
  data: [ { id: 1, name: 'Clavier' }, { id: 2, name: 'Souris' } ]
});`,
    clientSymptom: 'Écran blanc dans React avec l\'erreur "data.map is not a function" dans la console navigateur.',
    rootCause: 'Le frontend traite la variable data comme un Array brut, alors qu\'il s\'agit d\'un objet enveloppant contenant la propriété .data.',
    fixSnippet: `// Solution 1 côté frontend (déstructuration défensive) :
const json = await response.json();
const products = Array.isArray(json) ? json : (json.data ?? []);

// Solution 2 : Contrat d'interface TypeScript partagé :
interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
}
const res: ApiResponse<Product[]> = await response.json();
return res.data.map((item) => <ProductCard key={item.id} product={item} />);`,
    remedyRule: 'Documentez vos enveloppes d\'API et protégez toujours vos itérations avec Array.isArray().'
  },
  bigint_precision_loss: {
    title: '4. Perte de précision sur les identifiants Snowflake 64-bit',
    badge: 'Data Corruption',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    clientContext: `// Le serveur SQL renvoie un ID 64-bit (ex: Twitter Snowflake, Stripe) :
{
  "id": 9007199254740993, // Supérieur à Number.MAX_SAFE_INTEGER
  "title": "Commande Urgente"
}`,
    serverObservation: `// Lorsque le navigateur exécute JSON.parse() :
const order = JSON.parse(responseText);
console.log(order.id); 
// 💥 Affiche 9007199254740992 au lieu de 9007199254740993 ! (+1 bit tronqué)`,
    clientSymptom: 'Lors de la mise à jour PUT /api/orders/9007199254740992, le serveur répond 404 car l\'ID a été corrompu par le cast flottant IEEE-754 !',
    rootCause: 'En JavaScript, les nombres sont des flottants double précision (IEEE-754) limités à 2^53 - 1 (9 007 199 254 740 991). Tout entier au-delà perd ses bits de poids faible.',
    fixSnippet: `// Solution universelle en base et en API :
// Toujours sérialiser les ID 64-bit en chaînes de caractères (string) !
{
  "id": "9007199254740993", // 100% sûr, zéro troncature
  "title": "Commande Urgente"
}`,
    remedyRule: 'Dans MySQL / PostgreSQL, sérialisez les BIGINT en String dans vos réponses JSON pour ne jamais corrompre les ID.'
  },
  payload_too_large: {
    title: '5. Dépassement de quota de taille de charge utile (HTTP 413)',
    badge: 'HTTP 413 Payload',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    clientContext: `// Le client envoie une image en base64 de 3 Mo dans un JSON :
POST /api/v1/avatar HTTP/1.1
Content-Type: application/json

{
  "avatarBase64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABA..." // 3 Mo de texte
}`,
    serverObservation: `PayloadTooLargeError: request entity too large
    at readStream (/node_modules/raw-body/index.js:156:17)
    at getRawBody (/node_modules/raw-body/index.js:109:12)`,
    clientSymptom: 'Le client reçoit HTTP 413 Payload Too Large et la requête est avortée immédiatement.',
    rootCause: 'Par défaut, Express limite la taille du corps JSON à 100 Ko pour se prémunir des attaques par déni de service (DoS).',
    fixSnippet: `// 1. Augmenter la limite de manière contrôlée sur les routes spécifiques :
app.use('/api/v1/avatar', express.json({ limit: '5mb' }));

// 2. Meilleure pratique industrielle :
// Ne pas faire transiter de gros fichiers en Base64 dans du JSON !
// Utiliser multipart/form-data (Multer) ou des URLs présignées AWS S3 / Cloud Storage.`,
    remedyRule: 'Évitez le Base64 dans les payloads JSON : cela alourdit le contenu de 33% et sature le garbage collector V8.'
  }
};

export const Chapitre4Content: React.FC = () => {
  const [activeKey, setActiveKey] = useState<JsonIncidentKey>('missing_content_type');
  const incident = JSON_INCIDENTS[activeKey];

  return (
    <div className="space-y-12 text-slate-900 leading-relaxed font-sans">
      {/* Header Title Card */}
      <div className="rounded-3xl border-2 border-lime-300 bg-gradient-to-br from-lime-50 via-emerald-50/40 to-teal-50/30 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-black tracking-wide uppercase bg-lime-200 text-lime-900 border border-lime-400">
            Module 4 • Chapitre 4 / 13
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/80 text-slate-700 border border-slate-200">
            JSON Payload &amp; Serialization
          </span>
        </div>
        <h1 className="text-[24px] leading-tight font-black text-slate-950 tracking-tight break-words [overflow-wrap:anywhere]">
          Analyse des requêtes et réponses JSON : Sérialisation, Content-Type et anomalies de charge utile
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
          Le JSON (JavaScript Object Notation) est la langue véhiculaire des architectures web. Pourtant,
          <strong>ce n&apos;est pas un objet JavaScript</strong> : c&apos;est une spécification textuelle stricte (RFC 8259).
          La moindre virgule en trop, l&apos;omission d&apos;un en-tête <code>Content-Type</code> ou une discordance d&apos;enveloppe
          engendre des bogues déroutants : <code>req.body undefined</code>, plantages 400 ou l&apos;inévitable{' '}
          <code>TypeError: data.map is not a function</code> côté React.
        </p>
      </div>

      {/* 1. Grammaire stricte RFC 8259 vs Objets JS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            1
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            La grammaire stricte JSON (RFC 8259) vs la permissivité de JavaScript
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Beaucoup de développeurs écrivent du JSON comme ils écriraient un objet littéral JS.
          Cette confusion est la cause numéro 1 des rejets <code>400 Bad Request</code> :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl border-2 border-rose-200 bg-rose-50/40 space-y-3">
            <div className="flex items-center gap-2 text-rose-700 font-bold text-sm">
              <Icon name="bug" className="w-4 h-4 text-rose-600" />
              <span>Les 5 interdits absolus de la norme JSON</span>
            </div>
            <ul className="text-xs text-rose-950 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-black text-rose-600">✗</span>
                <span><strong>Virgules traînantes (trailing commas) :</strong> <code>{'{ "a": 1, }'}</code> fait crasher <code>JSON.parse()</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-black text-rose-600">✗</span>
                <span><strong>Guillemets simples :</strong> <code>{`{ 'name': 'Sam' }`}</code> est invalide. Seuls les doubles guillemets <code>&quot;</code> sont admis.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-black text-rose-600">✗</span>
                <span><strong>Types non sérialisables :</strong> <code>undefined</code>, <code>Function</code> et <code>Symbol</code> sont ignorés ou bannis.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-black text-rose-600">✗</span>
                <span><strong>Nombres spéciaux :</strong> <code>NaN</code> et <code>Infinity</code> sont convertis en <code>null</code>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-black text-rose-600">✗</span>
                <span><strong>Commentaires :</strong> <code>{'//'}</code> ou <code>{'/* */'}</code> sont strictement interdits dans un fichier JSON.</span>
              </li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <Icon name="check-circle" className="w-4 h-4 text-emerald-600" />
              <span>Ce que fait réellement JSON.stringify() en coulisses</span>
            </div>
            <div className="rounded-xl bg-slate-950 p-3 text-xs font-mono text-slate-200 space-y-1">
              <div className="text-slate-400">{`// Propriété undefined dans un objet -> OMISE !`}</div>
              <div>JSON.stringify({`{ a: 1, b: undefined }`});</div>
              <div className="text-emerald-400">{`// -> '{"a":1}'`}</div>
              <div className="pt-2 text-slate-400">{`// undefined dans un tableau -> REMPLACÉ PAR NULL !`}</div>
              <div>JSON.stringify([10, undefined, 30]);</div>
              <div className="text-emerald-400">{`// -> '[10,null,30]'`}</div>
              <div className="pt-2 text-slate-400">{`// BigInt non supporté par défaut -> CRASH !`}</div>
              <div>JSON.stringify({`{ id: 42n }`});</div>
              <div className="text-rose-400">{`// -> TypeError: Do not know how to serialize a BigInt`}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Les 3 conditions pour que req.body existe dans Express */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            2
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Le mystère du &quot;req.body === undefined&quot; : Le triptyque obligatoire
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Pour qu&apos;un contrôleur Express reçoive les données dans <code>req.body</code>,{' '}
          <strong>trois conditions indépendantes</strong> doivent être satisfaites simultanément :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl border border-slate-300 bg-white shadow-sm space-y-2">
            <div className="text-xs font-black uppercase text-indigo-700">Condition 1</div>
            <div className="font-bold text-slate-950 text-sm">Présence du middleware</div>
            <p className="text-xs text-slate-600">
              <code>app.use(express.json())</code> doit être instancié. Par défaut, Express n&apos;embarque aucun décodeur de corps de message.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-300 bg-white shadow-sm space-y-2">
            <div className="text-xs font-black uppercase text-indigo-700">Condition 2</div>
            <div className="font-bold text-slate-950 text-sm">Ordre de déclaration</div>
            <p className="text-xs text-slate-600">
              <code>app.use(express.json())</code> doit se trouver <strong>AVANT</strong> la définition des routes <code>app.post()</code> dans le fichier serveur.
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-300 bg-white shadow-sm space-y-2">
            <div className="text-xs font-black uppercase text-indigo-700">Condition 3</div>
            <div className="font-bold text-slate-950 text-sm">En-tête client conforme</div>
            <p className="text-xs text-slate-600">
              La requête HTTP doit impérativement porter l&apos;en-tête{' '}
              <code>Content-Type: application/json</code>. Sinon, le middleware ignore le flux.
            </p>
          </div>
        </div>

        <Callout type="danger" title="Le piège mortel de l'ordre d'enregistrement dans Express">
          <p className="text-xs sm:text-sm">
            Si vous écrivez :
          </p>
          <div className="my-2 p-2 rounded bg-slate-900 text-rose-300 font-mono text-xs">
            {`app.post('/api/users', (req, res) => console.log(req.body)); // undefined !`}
            <br />
            {`app.use(express.json()); // TROP TARD : placé APRÈS la route !`}
          </div>
          <p className="text-xs sm:text-sm">
            La requête correspond à la route <code>/api/users</code> et exécute son gestionnaire{' '}
            <strong>avant</strong> d&apos;avoir traversé le parser JSON. Le corps n&apos;est jamais désérialisé.
          </p>
        </Callout>
      </section>

      {/* 3. Laboratoire Interactif des 5 incidents JSON */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            3
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Laboratoire Interactif : Diagnostic des 5 pannes de charge utile JSON
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Explorez chaque cas d&apos;incident pour identifier la rupture de contrat entre le client et le serveur :
        </p>

        {/* Boutons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {(Object.keys(JSON_INCIDENTS) as JsonIncidentKey[]).map((key) => {
            const item = JSON_INCIDENTS[key];
            const isSelected = activeKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveKey(key)}
                className={`p-3 text-left rounded-xl border text-xs font-bold transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-slate-950 bg-slate-950 text-white shadow-md'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800'
                }`}
              >
                <span className={`text-[10px] px-1.5 py-0.5 rounded w-fit mb-1.5 ${
                  isSelected ? 'bg-lime-400 text-slate-950 font-black' : 'bg-slate-100 text-slate-700 font-bold'
                }`}>
                  {item.badge}
                </span>
                <span className="truncate text-xs font-semibold leading-snug">{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Panneau de détail */}
        <div className="rounded-3xl border-2 border-slate-300 bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-slate-950">{incident.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${incident.badgeColor}`}>
                  {incident.badge}
                </span>
              </div>
            </div>
            <div className="text-xs text-rose-700 font-bold bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
              Symptôme : {incident.clientSymptom}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1.5">
                Contexte d&apos;émission côté Client
              </div>
              <CodeBlock language="typescript" code={incident.clientContext} />
            </div>

            <div>
              <div className="text-xs font-black uppercase tracking-wider text-rose-700 mb-1.5">
                Observation &amp; Plantage Serveur
              </div>
              <CodeBlock language="typescript" code={incident.serverObservation} />
            </div>
          </div>

          <div>
            <div className="text-xs font-black uppercase tracking-wider text-emerald-700 mb-1.5">
              Code de Résolution Recommandé
            </div>
            <CodeBlock language="typescript" code={incident.fixSnippet} />
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Icon name="info" className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-slate-800">
              <span className="font-bold text-slate-950">Explication de la cause racine : </span>
              {incident.rootCause}
            </div>
          </div>
        </div>
      </section>

      {/* 4. TP Architecture : Typage fort et enveloppe défensive */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            4
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Travaux Pratiques : Implémenter le couple Client/Serveur résilient
          </h2>
        </div>

        <p className="text-sm sm:text-base text-slate-800">
          Voici le pattern professionnel pour éliminer définitivement les erreurs de mapping et les désynchronisations de charge utile :
        </p>

        <CodeBlock
          language="typescript"
          code={`// 1. Définition du contrat partagé (Shared Contract)
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface UserDTO {
  id: string; // Toujours string pour préserver les ID 64 bits !
  email: string;
  name: string;
}

// 2. Client Fetch universel avec gestion stricte des erreurs JSON
export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  
  // Garantir l'en-tête de contenu
  if (!headers.has('Content-Type') && options.body) {
    headers.set('Content-Type', 'application/json');
  }
  headers.set('Accept', 'application/json');

  const response = await fetch(endpoint, { ...options, headers });

  // Gestion du cas où le serveur répond du HTML au lieu de JSON (ex: crash 502 Nginx)
  const contentType = response.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    throw new Error(\`Réponse inattendue non-JSON reçue (\${response.status}) : \${await response.text()}\`);
  }

  const payload: ApiResponse<T> = await response.json();

  if (!response.ok || !payload.success) {
    throw new Error(payload.error?.message || \`Échec de la requête (\${response.status})\`);
  }

  return payload.data;
}`}
        />
      </section>

      {/* 5. Quiz de Validation Approfondi (6 questions) */}
      <section className="space-y-4 pt-6 border-t-2 border-slate-200">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime-500 text-slate-950 flex items-center justify-center font-black text-sm">
            5
          </div>
          <h2 className="text-xl font-bold text-slate-950 tracking-tight">
            Quiz de validation des acquis — Chapitre 4.4
          </h2>
        </div>
        <p className="text-sm text-slate-700">
          Évaluez votre compréhension de la manipulation des données JSON et de leur débogage :
        </p>

        <QuickQuiz
          questions={[
            {
              id: 1,
              question: "Quelle est la raison pour laquelle req.body vaut 'undefined' dans un contrôleur Express alors que le client a bien envoyé des données ?",
              options: [
                "Le serveur a atteint son quota de RAM.",
                "app.use(express.json()) n'a pas été appelé, ou a été placé après la route, ou le client n'a pas envoyé Content-Type: application/json.",
                "Le client a utilisé la méthode POST au lieu de GET.",
                "La base de données MySQL est saturée."
              ],
              correctIndex: 1,
              explanation: "Express ne lit pas nativement le corps de requête. Si le middleware express.json() est absent, placé après la route dans le code, ou si le Content-Type n'est pas application/json, req.body reste indéterminé (undefined)."
            },
            {
              id: 2,
              question: "Pourquoi l'envoi d'un payload JSON comportant une virgule traînante {\"id\": 1, \"name\": \"Ali\",} provoque-t-il une erreur HTTP 400 ?",
              options: [
                "Parce qu'Express interdit les noms en 3 lettres.",
                "Parce que la spécification officielle RFC 8259 interdit strictement les virgules après le dernier élément d'un objet ou tableau JSON.",
                "Parce que les virgules doivent obligatoirement être doublées.",
                "Ce n'est pas interdit, c'est un bogue du navigateur."
              ],
              correctIndex: 1,
              explanation: "Contrairement au langage JavaScript qui tolère les virgules de fin, la grammaire stricte JSON les rejette catégoriquement. JSON.parse() lève immédiatement un SyntaxError."
            },
            {
              id: 3,
              question: "Pourquoi un identifiant numérique 64-bit comme 9007199254740993 doit-il TOUJOURS être sérialisé sous forme de chaîne (\"9007199254740993\") dans vos réponses JSON ?",
              options: [
                "Pour réduire la taille du fichier transféré.",
                "Parce que JavaScript utilise des nombres flottants IEEE-754 limités à Number.MAX_SAFE_INTEGER (2^53 - 1) : tout entier au-delà perd ses bits de poids faible lors du JSON.parse().",
                "Pour empêcher les attaques SQL Injection.",
                "Parce que le format JSON ne supporte pas les entiers supérieurs à 1000."
              ],
              correctIndex: 1,
              explanation: "En JavaScript standard, 9007199254740993 est arrondi à 9007199254740992 par le moteur V8 lors du parsing flottant double précision. Transmettre l'identifiant en string protège l'intégrité exacte du bit."
            },
            {
              id: 4,
              question: "Votre composant React affiche l'erreur 'data.map is not a function'. Quel est le diagnostic immédiat ?",
              options: [
                "La boucle map a été supprimée de JavaScript.",
                "La variable data contient un objet (ex: { data: [...] } ou { error: ... }) et non un tableau Array natif.",
                "Le composant React n'a pas été compilé avec TypeScript.",
                "Le port réseau est bloqué par le pare-feu."
              ],
              correctIndex: 1,
              explanation: "Array.prototype.map ne fonctionne que sur les tableaux. Si l'API retourne un objet enveloppe { users: [...] } ou une réponse d'erreur { message: '...' }, data.map lève instantanément un TypeError."
            },
            {
              id: 5,
              question: "Que fait JSON.stringify({ name: 'Bob', age: undefined }) lors de la sérialisation ?",
              options: [
                "Il génère '{\"name\":\"Bob\",\"age\":undefined}'",
                "Il omet purement et simplement la propriété age, produisant '{\"name\":\"Bob\"}'",
                "Il lève une exception TypeError fatale",
                "Il transforme undefined en la chaîne \"undefined\""
              ],
              correctIndex: 1,
              explanation: "Dans les objets, JSON.stringify omet silencieusement toute clé ayant la valeur undefined. Dans un tableau en revanche ([1, undefined, 2]), la valeur est remplacée par null ([1, null, 2])."
            },
            {
              id: 6,
              question: "Si un client tente d'envoyer un fichier de 5 Mo dans un body JSON sans configuration particulière d'Express, que se passe-t-il ?",
              options: [
                "Express compresse automatiquement le payload en gzip.",
                "Le middleware express.json() rejette la requête avec une erreur HTTP 413 Payload Too Large (limite par défaut de 100 Ko).",
                "Le serveur redémarre instantanément.",
                "La requête est mise en attente indéfiniment."
              ],
              correctIndex: 1,
              explanation: "Par mesure de sécurité contre les attaques DoS par saturation mémoire, la taille maximale par défaut de express.json() est de 100kb. Tout dépassement lève une exception 413 PayloadTooLargeError."
            }
          ]}
        />
      </section>
    </div>
  );
};
