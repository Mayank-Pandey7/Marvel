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
      execSync(`curl.exe -sL -A "Mozilla/5.0" "${directUrl}" -o "${dest}"`);
      const size = fs.statSync(dest).size;
      console.log(`✓ Saved ${destFileName} (${size} bytes)`);
      return true;
    }
  } catch (err) {
    console.error(`Error on ${wikiFileName}:`, err.message);
  }
  return false;
}

// Search for candidate files for High Evolutionary and Beast
const searchHe = JSON.parse(execSync('curl.exe -sL -A "Mozilla/5.0" "https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=High_Evolutionary&srnamespace=6&format=json"', { encoding: 'utf8' }));
console.log('HE search:', searchHe.query.search.map(s => s.title));

const searchBeast = JSON.parse(execSync('curl.exe -sL -A "Mozilla/5.0" "https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=Hank_McCoy&srnamespace=6&format=json"', { encoding: 'utf8' }));
console.log('Beast search:', searchBeast.query.search.map(s => s.title));

if (searchHe.query.search.length > 0) {
  getDirectFile(searchHe.query.search[0].title.replace('File:', ''), 'high-evolutionary.jpg');
}

if (searchBeast.query.search.length > 0) {
  getDirectFile(searchBeast.query.search[0].title.replace('File:', ''), 'beast.jpg');
}
