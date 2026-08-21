
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = 'public/images/characters';

const CHARACTERS_TO_FETCH = 2;

for (const c of CHARACTERS_TO_FETCH) {
  const dest = path.join(targetDir, `${c.id}.jpg`);
  if (fs.existsSync(dest) && fs.statSync(dest).size > 15000) {
    console.log(`✓ [Exists] ${c.id}.jpg (${fs.statSync(dest).size} bytes)`);
    continue;
  }

  console.log(`Searching Fandom for: ${c.query}...`);
  try {
    const apiUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(c.query)}&format=json`;
    const searchJson = execSync(`curl.exe -s -A "Mozilla/5.0" "${apiUrl}"`, { encoding: 'utf8' });
    const searchData = JSON.parse(searchJson);
    if (!searchData.query?.search?.length) {
      console.log(`✗ No search results for ${c.query}`);
      continue;
    }

    const pageTitle = searchData.query.search[0].title;
    const imgApiUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&titles=${encodeURIComponent(pageTitle)}&prop=pageimages&pithumbsize=1000&format=json`;
    const imgJson = execSync(`curl.exe -s -A "Mozilla/5.0" "${imgApiUrl}"`, { encoding: 'utf8' });
    const imgData = JSON.parse(imgJson);
    const pages = imgData.query?.pages || {};
    const pageId = Object.keys(pages)[0];
    const thumbUrl = pages[pageId]?.thumbnail?.source;

    if (thumbUrl) {
      const cleanUrl = thumbUrl.split('/revision/')[0];
      execSync(`curl.exe -sL -A "Mozilla/5.0" "${cleanUrl}" -o "${dest}"`);
      const size = fs.statSync(dest).size;
      if (size > 5000) {
        console.log(`✓ [Saved] ${c.id}.jpg (${size} bytes)`);
      } else {
        console.log(`✗ [Too small] ${c.id}.jpg`);
      }
    } else {
      console.log(`✗ No thumbnail found on page: ${pageTitle}`);
    }
  } catch (err) {
    console.error(`✗ Error fetching ${c.id}:`, err.message);
  }
}
