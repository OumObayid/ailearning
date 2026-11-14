const fs = require('fs');
const path = require('path');

const baseDir = 'content/courses/orchestration-agents-ide';
const modules = fs.readdirSync(baseDir).filter(m => m.startsWith('module-'));

const report = {};

for (const mod of modules.sort((a,b) => parseInt(a.split('-')[1]) - parseInt(b.split('-')[1]))) {
  const modDir = path.join(baseDir, mod);
  const files = fs.readdirSync(modDir).filter(f => f.endsWith('Content.tsx'));
  report[mod] = [];
  
  for (const f of files.sort((a,b) => {
    const numA = parseInt(a.replace(/\D/g, '')) || 0;
    const numB = parseInt(b.replace(/\D/g, '')) || 0;
    return numA - numB;
  })) {
    const content = fs.readFileSync(path.join(modDir, f), 'utf8');
    const sections = [];
    
    // Look for H2 with or without badge
    const h2Regex = /<h2[^>]*>([\s\S]*?)<\/h2>/g;
    let match;
    while ((match = h2Regex.exec(content)) !== null) {
      const fullH2 = match[1].replace(/&apos;/g, "'").replace(/&quot;/g, '"');
      const textOnly = fullH2.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
      sections.push(textOnly);
    }
    report[mod].push({ file: f, sections });
  }
}

fs.writeFileSync('scripts/titles-report.json', JSON.stringify(report, null, 2), 'utf8');
console.log('Report generated with', Object.keys(report).length, 'modules');

