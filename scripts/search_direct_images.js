const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

function searchImage(query, destFile) {
  try {
    const searchUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&srnamespace=6&format=json`;
    const res = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${searchUrl}"`, { encoding: 'utf8' }));
    
    console.log(`Query: ${query}, matches:`, res.query.search.map(s => s.title));
    if (res.query.search.length > 0) {
      const fileTitle = res.query.search[0].title;
      // Get direct image info
      const infoUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&titles=${encodeURIComponent(fileTitle)}&prop=imageinfo&iiprop=url&format=json`;
      const infoRes = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${infoUrl}"`, { encoding: 'utf8' }));
      const pages = infoRes.query.pages;
      const pageId = Object.keys(pages)[0];
      const directUrl = pages[pageId].imageinfo[0].url;
      console.log(`Found direct URL: ${directUrl}`);

      const dest = path.join(targetDir, destFile);
      execSync(`curl.exe -sL -A "Mozilla/5.0" "${directUrl}" -o "${dest}"`);
      const size = fs.statSync(dest).size;
      console.log(`✓ Saved ${destFile} (${size} bytes)`);
      return true;
    }
  } catch (err) {
    console.error(`Error on ${query}:`, err.message);
  }
  return false;
}

searchImage('Wolverine Deadpool & Wolverine Profile', 'wolverine.jpg');
searchImage('Gorr Profile Thor Love and Thunder', 'gorr.jpg');
searchImage('Doctor Strange in the Multiverse of Madness Profile', 'doctor-strange.jpg');
searchImage('Hulk Avengers Endgame Infobox', 'hulk.jpg');
