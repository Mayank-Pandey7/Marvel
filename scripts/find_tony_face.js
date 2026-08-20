const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const searchUrl = 'https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=Tony_Stark&srnamespace=6&srlimit=50&format=json';
const res = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${searchUrl}"`, { encoding: 'utf8' }));
console.log('Search matches:', res.query.search.map(s => s.title));

// Find high quality unmasked face portraits
const files = res.query.search.map(s => s.title);
const faceMatches = files.filter(f => 
  (f.includes('Tony Stark') || f.includes('Tony_Stark')) &&
  !f.includes('Audiobook') && !f.includes('What_If') && !f.includes('Assassinated') && !f.includes('Zombie')
);

console.log('Filtered face matches:', faceMatches);

for (const wikiFile of faceMatches) {
  try {
    const infoUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&titles=${encodeURIComponent(wikiFile)}&prop=imageinfo&iiprop=url&format=json`;
    const infoRes = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${infoUrl}"`, { encoding: 'utf8' }));
    const p = Object.values(infoRes.query.pages)[0];
    if (p.imageinfo && p.imageinfo[0]) {
      const directUrl = p.imageinfo[0].url;
      console.log(`Downloading: ${wikiFile} -> ${directUrl}`);
      const dest = path.join(targetDir, 'tony-stark.jpg');
      const dest2 = path.join(targetDir, 'iron-man.jpg');
      execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${directUrl}" -o "${dest}"`);
      fs.copyFileSync(dest, dest2);
      const size = fs.statSync(dest).size;
      if (size > 10000) {
        console.log(`✓ Saved ${dest} (${size} bytes) from ${wikiFile}`);
        break;
      }
    }
  } catch (err) {
    console.error(`Error on ${wikiFile}:`, err.message);
  }
}
