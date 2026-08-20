const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

function fixImage(query, fileName) {
  const searchUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
  const res = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${searchUrl}"`, { encoding: 'utf8' }));
  for (const s of res.query.search) {
    const infoUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&titles=${encodeURIComponent(s.title)}&prop=imageinfo&iiprop=url&format=json`;
    const infoRes = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${infoUrl}"`, { encoding: 'utf8' }));
    const pages = infoRes.query.pages;
    const directUrl = pages[Object.keys(pages)[0]].imageinfo[0].url;
    console.log(`Found: ${s.title} -> ${directUrl}`);
    const dest = path.join(targetDir, fileName);
    execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${directUrl}" -o "${dest}"`);
    const size = fs.statSync(dest).size;
    if (size > 10000) {
      console.log(`✓ Saved ${fileName} (${size} bytes) from ${s.title}`);
      return true;
    }
  }
  return false;
}

fixImage('Beast The Marvels Profile', 'beast.jpg');
fixImage('High Evolutionary GotG Vol 3 Profile', 'high-evolutionary.jpg');
