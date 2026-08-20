const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

function getDirectFile(wikiFileName, destFileName) {
  try {
    const infoUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&titles=File:${encodeURIComponent(wikiFileName)}&prop=imageinfo&iiprop=url&format=json`;
    const infoRes = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${infoUrl}"`, { encoding: 'utf8' }));
    const pages = infoRes.query.pages;
    const pageId = Object.keys(pages)[0];
    if (pages[pageId].imageinfo && pages[pageId].imageinfo.length > 0) {
      const directUrl = pages[pageId].imageinfo[0].url;
      console.log(`Direct URL for ${wikiFileName}: ${directUrl}`);
      const dest = path.join(targetDir, destFileName);
      execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${directUrl}" -o "${dest}"`);
      const size = fs.statSync(dest).size;
      console.log(`✓ Saved ${destFileName} (${size} bytes)`);
      return true;
    }
  } catch (err) {
    console.error(`Error on ${wikiFileName}:`, err.message);
  }
  return false;
}

getDirectFile('High Evolutionary Infobox.png', 'high-evolutionary.jpg');
getDirectFile('Hank McCoy (Beast).png', 'beast.jpg');
