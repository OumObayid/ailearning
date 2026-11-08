const fs = require('fs');
const path = require('path');

function scan(dir) {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...scan(full));
    else if (e.name.endsWith('.ts')) files.push(full);
  }
  return files;
}

const files = scan('content/courses').concat(scan('lib'));
let matched = 0;

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  // Match any title line
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('title:')) {
      const trimmed = line.trim();
      // Check if title has chapitre or partie anywhere
      if (/title:\s*['"`].*?(chapitre|partie)/i.test(trimmed)) {
        console.log(`${f}:${idx+1} -> ${trimmed}`);
        matched++;
      }
    }
  });
});

console.log(`Total titles containing chapitre or partie: ${matched}`);

