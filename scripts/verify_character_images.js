const fs = require('fs');
const path = require('path');

const charFile = fs.readFileSync('data/characterBackdrops.ts', 'utf8');
const mapMatches = charFile.match(/"([^"]+)":\s*"\/images\/characters\/([^"]+)"/g) || [];

let allValid = true;
for (const m of mapMatches) {
  const [_, key, file] = m.match(/"([^"]+)":\s*"\/images\/characters\/([^"]+)"/);
  const fullPath = path.join(__dirname, '..', 'public', 'images', 'characters', file);
  if (!fs.existsSync(fullPath)) {
    console.error(`Missing file: ${file} for key: ${key}`);
    allValid = false;
  }
}

if (allValid) {
  console.log(`✓ ALL ${mapMatches.length} character portrait mappings are 100% verified and present on disk!`);
}
