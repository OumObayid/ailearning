export interface BackendIaChapterMeta {
  slug: string;
  number: number;
  title: string;
  duration: string;
  description: string;
}

export const BACKEND_IA_MODULE_3_CHAPTERS: BackendIaChapterMeta[] = [
  {
    slug: 'chapitre-1',
    number: 1,
    title: 'Fonctionnement du HTTP et cycle requête/réponse',
    duration: '2 h à 2 h 30',
    description: 'Comprendre le protocole HTTP, les méthodes REST, les codes de statut, le chiffrement HTTPS/TLS et la communication React, Express et MySQL.',
  },
  {
    slug: 'chapitre-2',
    number: 2,
    title: 'Le Polling — Interroger régulièrement un serveur',
    duration: '2 h à 2 h 30',
    description: 'Techniques de Short Polling et Long Polling, statut 202 Accepted, orchestration asynchrone avec setTimeout récursif et limites de scalabilité.',
  },
  {
    slug: 'chapitre-3',
    number: 3,
    title: 'WebSocket — Communication bidirectionnelle en temps réel',
    duration: '2 h 30 à 3 h',
    description: 'Architecture bidirectionnelle full-duplex, Handshake HTTP 101, protocole ws:// et wss://, diffusion Broadcast multi-clients et comparaison avec Socket.IO.',
  },
  {
    slug: 'chapitre-4',
    number: 4,
    title: 'SSE (Server-Sent Events) — Communication en flux continu',
    duration: '2 h 30 à 3 h',
    description: 'Streaming unidirectionnel text/event-stream, res.write() vs res.end(), écoute avec EventSource et lecture progressive de flux HTTP avec fetch().',
  },
  {
    slug: 'chapitre-5',
    number: 5,
    title: 'Streaming des réponses IA vers React avec Gemini',
    duration: '3 h',
    description: 'Connexion du SDK @google/genai en mode stream: true, boucle for await...of, retransmission SSE vers React, décodeur TextDecoder et annulation avec AbortController.',
  },
];

