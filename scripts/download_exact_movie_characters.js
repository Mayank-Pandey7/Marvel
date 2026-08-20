const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const targetChars = [
  { file: 'hulk.jpg', pages: ['Hulk', 'Bruce_Banner', 'Smart_Hulk'] },
  { file: 'bruce-banner.jpg', pages: ['Hulk', 'Bruce_Banner'] },
  { file: 'loki.jpg', pages: ['Loki', 'Loki_Laufeyson'] },
  { file: 'doctor-strange.jpg', pages: ['Doctor_Strange', 'Stephen_Strange'] },
  { file: 'wolverine.jpg', pages: ['Wolverine_(Earth-10005)', 'James_Howlett_(Earth-10005)', 'Wolverine'] },
  { file: 'beast.jpg', pages: ['Hank_McCoy_(Earth-10005)', 'Hank_McCoy', 'Beast'] },
  { file: 'thanos.jpg', pages: ['Thanos'] },
  { file: 'gorr.jpg', pages: ['Gorr', 'Gorr_the_God_Butcher'] },
  { file: 'high-evolutionary.jpg', pages: ['High_Evolutionary'] }
];

function findLiveActionImage(char) {
  for (const page of char.pages) {
    try {
      const url = `https://marvelcinematicuniverse.fandom.com/wiki/${encodeURIComponent(page)}`;
      console.log(`Checking ${page}...`);
      const html = execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${url}"`, { encoding: 'utf8', maxBuffer: 25 * 1024 * 1024 });

      // Find all Wikia images in the HTML
      const allMatches = [...html.matchAll(/https:\/\/static\.wikia\.nocookie\.net\/marvelcinematicuniverse\/images\/[a-z0-9\/]+([^"'\s\?]+\.(?:jpg|png|jpeg))/gi)];
      
      for (const m of allMatches) {
        const fullUrl = m[0];
        const imgName = m[1];
        
        // Prioritize Infobox live action photos
        if (imgName.includes('Infobox') || imgName.includes('Profile') || imgName.includes('Poster') || imgName.includes('D%26W') || imgName.includes('IW') || imgName.includes('Endgame')) {
          if (!imgName.includes('What_If') && !imgName.includes('Zombie') && !imgName.includes('Site-') && !imgName.includes('Assassinated')) {
            console.log(`Found candidate for ${char.file}: ${imgName}`);
            const dest = path.join(targetDir, char.file);
            const downloadUrl = `${fullUrl.split('/revision')[0]}/revision/latest/scale-to-width-down/600`;
            execSync(`curl.exe -sL -A "Mozilla/5.0" "${downloadUrl}" -o "${dest}"`);
            const size = fs.statSync(dest).size;
            if (size > 5000) {
              console.log(`✓ SAVED ${char.file} (${size} bytes) from ${imgName}`);
              return true;
            }
          }
        }
      }
    } catch (err) {
      console.error(`Error on ${page}:`, err.message);
    }
  }
  return false;
}

for (const char of targetChars) {
  findLiveActionImage(char);
}
console.log('Finished updating 8 movie characters!');
