const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

function searchAndDownload(charName, fileName) {
  try {
    const searchUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(charName)}&format=json`;
    const searchJsonStr = execSync(`curl.exe -sL -A "Mozilla/5.0" "${searchUrl}"`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const searchRes = JSON.parse(searchJsonStr);
    
    if (!searchRes.query || !searchRes.query.search || searchRes.query.search.length === 0) {
      console.log(`✗ No search results for ${charName}`);
      return false;
    }

    const bestPage = searchRes.query.search[0].title;
    console.log(`[${charName}] found page: "${bestPage}"`);

    const pageUrl = `https://marvelcinematicuniverse.fandom.com/wiki/${encodeURIComponent(bestPage.replace(/ /g, '_'))}`;
    const html = execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${pageUrl}"`, { encoding: 'utf8', maxBuffer: 25 * 1024 * 1024 });

    // Look for Infobox image
    let imgUrl = null;
    const infoboxMatch = html.match(/https:\/\/static\.wikia\.nocookie\.net\/marvelcinematicuniverse\/images\/[a-z0-9\/]+[a-zA-Z0-9_\-]+_Infobox\.(?:jpg|png|jpeg)/i);
    if (infoboxMatch) {
      imgUrl = infoboxMatch[0];
    } else {
      const piMatch = html.match(/<aside[^>]*class="[^"]*portable-infobox[^"]*"[\s\S]*?https:\/\/(static\.wikia\.nocookie\.net\/marvelcinematicuniverse\/images\/[^"\s\?]+)/i);
      if (piMatch) {
        imgUrl = 'https://' + piMatch[1].split('/revision')[0];
      }
    }

    if (imgUrl) {
      const dest = path.join(targetDir, fileName);
      const downloadUrl = `${imgUrl}/revision/latest/scale-to-width-down/600`;
      execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${downloadUrl}" -o "${dest}"`);
      const size = fs.statSync(dest).size;
      if (size > 3000) {
        console.log(`  ✓ Saved ${fileName} (${size} bytes)`);
        return true;
      }
    }
    console.log(`  ✗ Could not extract infobox image from "${bestPage}"`);
    return false;
  } catch (err) {
    console.error(`  ✗ Error for ${charName}:`, err.message);
    return false;
  }
}

// Test on characters that missed direct names
const testList = [
  { name: 'Sam Wilson', file: 'sam-wilson.jpg' },
  { name: 'Pietro Maximoff', file: 'pietro-maximoff.jpg' },
  { name: 'America Chavez', file: 'america-chavez.jpg' },
  { name: 'Clea', file: 'clea.jpg' },
  { name: 'Spider-Man Tobey Maguire', file: 'spider-man-tobey.jpg' },
  { name: 'Spider-Man Andrew Garfield', file: 'spider-man-andrew.jpg' },
  { name: 'Green Goblin', file: 'green-goblin.jpg' },
  { name: 'Doctor Octopus', file: 'doc-ock.jpg' },
  { name: 'Baron Zemo', file: 'zemo.jpg' },
  { name: 'Red Hulk', file: 'red-hulk.jpg' },
  { name: 'Cassandra Nova', file: 'cassandra-nova.jpg' },
  { name: 'Mister Fantastic', file: 'reed-richards.jpg' },
  { name: 'Invisible Woman', file: 'sue-storm.jpg' },
  { name: 'Human Torch', file: 'johnny-storm.jpg' },
  { name: 'The Thing', file: 'ben-grimm.jpg' },
  { name: 'Galactus', file: 'galactus.jpg' },
  { name: 'Doctor Doom', file: 'doctor-doom.jpg' },
  { name: 'Wolverine', file: 'wolverine.jpg' },
  { name: 'Deadpool', file: 'deadpool.jpg' },
  { name: 'X-23 Laura', file: 'x-23.jpg' },
  { name: 'Gambit', file: 'gambit.jpg' },
  { name: 'Beast Hank McCoy', file: 'beast.jpg' }
];

for (const item of testList) {
  searchAndDownload(item.name, item.file);
}
console.log('Finished search-based Fandom download test!');
