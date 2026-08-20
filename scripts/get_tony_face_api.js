const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const imagesUrl = 'https://marvelcinematicuniverse.fandom.com/api.php?action=query&prop=images&titles=Tony_Stark&redirects=1&imlimit=500&format=json';
const res = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${imagesUrl}"`, { encoding: 'utf8' }));
const pages = res.query.pages;
const page = Object.values(pages)[0];
console.log('Page Title:', page.title);
console.log('Total images:', page.images ? page.images.length : 0);

if (page.images) {
  const images = page.images.map(img => img.title);
  const tonyFaces = images.filter(t => 
    t.toLowerCase().includes('tony') || 
    t.toLowerCase().includes('stark') ||
    t.toLowerCase().includes('endgame') ||
    t.toLowerCase().includes('profile')
  );
  console.log('Tony face candidates:', tonyFaces);

  for (const wikiFile of tonyFaces) {
    try {
      const infoUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&titles=${encodeURIComponent(wikiFile)}&prop=imageinfo&iiprop=url&format=json`;
      const infoRes = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${infoUrl}"`, { encoding: 'utf8' }));
      const p = Object.values(infoRes.query.pages)[0];
      if (p.imageinfo && p.imageinfo[0]) {
        const directUrl = p.imageinfo[0].url;
        console.log(`Found direct URL: ${wikiFile} -> ${directUrl}`);
        
        if (wikiFile.includes('Infobox') || wikiFile.includes('Profile') || wikiFile.includes('Endgame')) {
          const dest = path.join(targetDir, 'tony-stark.jpg');
          const dest2 = path.join(targetDir, 'iron-man.jpg');
          const downloadUrl = `${directUrl.split('/revision')[0]}/revision/latest/scale-to-width-down/600`;
          execSync(`curl.exe -sL -A "Mozilla/5.0" "${downloadUrl}" -o "${dest}"`);
          fs.copyFileSync(dest, dest2);
          const size = fs.statSync(dest).size;
          console.log(`✓ SAVED ${wikiFile} (${size} bytes)`);
          if (size > 15000 && !wikiFile.includes('Audiobook') && !wikiFile.includes('What_If')) {
            console.log('🎉 Selected best Tony Stark face!');
            break;
          }
        }
      }
    } catch (err) {
      console.error(`Error on ${wikiFile}:`, err.message);
    }
  }
}
