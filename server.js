/* eslint-disable @typescript-eslint/no-require-imports */
const http = require('http');
const next = require('next');

const dev = false;
// Indispensable sur cPanel pour que Next.js trouve le dossier .next
const app = next({ dev, dir: __dirname });
const handle = app.getRequestHandler();

// Sur cPanel Phusion Passenger, le port est soit un numéro soit un socket Unix
const port = process.env.PORT || 3000;

app.prepare()
  .then(() => {
    const server = http.createServer((req, res) => {
      handle(req, res);
    });

    server.listen(port, () => {
      console.log(`> AiLearning démarré sur le port / socket : ${port}`);
    });
  })
  .catch((err) => {
    console.error('Erreur au démarrage de Next.js :', err);
    process.exit(1);
  });
