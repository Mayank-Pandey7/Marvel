const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const searchUrl = 'https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=Tony_Stark_face_Robert_Downey_Jr_Infobox&srnamespace=6&format=json';
const res = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${searchUrl}"`, { encoding: 'utf8' }));
console.log('Tony Stark face matches:', res.query.search.map(s => s.title));

// Let's search Tony Stark Infobox
const search2 = JSON.parse(execSync('curl.exe -sL -A "Mozilla/5.0" "https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=Tony_Stark_Infobox&srnamespace=6&format=json"', { encoding: 'utf8' }));
console.log('Tony Stark Infobox matches:', search2.query.search.map(s => s.title));

function downloadFile(wikiFileName) {
  const infoUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(wikiFileName)}&prop=imageinfo&iiprop=url&format=json`;
  const infoRes = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${infoUrl}"`, { encoding: 'utf8' }));
  const pages = infoRes.query.pages;
  const pageId = Object.keys(pages)[0];
  const directUrl = pages[pageId].imageinfo[0].url;
  console.log(`Direct URL for ${wikiFileName}: ${directUrl}`);

  for (const f of ['tony-stark.jpg', 'iron-man.jpg']) {
    const dest = path.join(targetDir, f);
    execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${directUrl}" -o "${dest}"`);
    const size = fs.statSync(dest).size;
    console.log(`✓ Saved ${f} (${size} bytes)`);
  }
}

// Check candidate files
const candidates = [
  'Tony Stark Infobox.jpg',
  'Tony Stark - Avengers Endgame.png',
  'Tony Stark Profile.png',
  'Tony Stark (Earth-616).png'
];

for (const c of candidates) {
  try {
    downloadFile(c);
    break;
  } catch (err) {
    console.log(`Failed on ${c}: ${err.message}`);
  }
}
