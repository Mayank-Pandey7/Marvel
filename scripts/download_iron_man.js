const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const searchUrl = 'https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=Iron_Man_Profile_Disney_Infobox&srnamespace=6&format=json';
const res = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${searchUrl}"`, { encoding: 'utf8' }));
console.log('Iron Man search matches:', res.query.search.map(s => s.title));

function downloadFile(wikiFileName, targetFileNames) {
  const infoUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(wikiFileName)}&prop=imageinfo&iiprop=url&format=json`;
  const infoRes = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${infoUrl}"`, { encoding: 'utf8' }));
  const pages = infoRes.query.pages;
  const pageId = Object.keys(pages)[0];
  const directUrl = pages[pageId].imageinfo[0].url;
  console.log(`Direct URL for ${wikiFileName}: ${directUrl}`);

  for (const f of targetFileNames) {
    const dest = path.join(targetDir, f);
    execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${directUrl}" -o "${dest}"`);
    const size = fs.statSync(dest).size;
    console.log(`✓ Saved ${f} (${size} bytes)`);
  }
}

// Check candidate files
const candidates = [
  'Iron Man Disney+ Profile Icon.png',
  'Iron Man Infobox.jpg',
  'Iron Man Endgame Profile.jpg',
  'Iron Man AIW Profile.jpg'
];

for (const c of candidates) {
  try {
    downloadFile(c, ['iron-man.jpg', 'tony-stark.jpg']);
    break;
  } catch (err) {
    console.log(`Trying next, failed on ${c}: ${err.message}`);
  }
}
