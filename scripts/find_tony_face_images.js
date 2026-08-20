const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const pageUrl = 'https://marvelcinematicuniverse.fandom.com/wiki/Tony_Stark';
const html = execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" "${pageUrl}"`, { encoding: 'utf8', maxBuffer: 30 * 1024 * 1024 });

const matches = [...html.matchAll(/(https:\/\/static\.wikia\.nocookie\.net\/marvelcinematicuniverse\/images\/[a-z0-9\/]+[^"'\s\?]+\.(?:jpg|png|jpeg))/gi)].map(m => m[1]);
console.log('Total images found on Tony Stark page:', matches.length);

// Filter images with Tony / Stark in filename
const tonyImages = matches.filter(u => {
  const lower = u.toLowerCase();
  return (lower.includes('tony') || lower.includes('stark') || lower.includes('downey') || lower.includes('rdj')) &&
         !lower.includes('site-') && !lower.includes('what_if') && !lower.includes('comic') && !lower.includes('zombie');
});

const uniqueUrls = [...new Set(tonyImages)];
console.log('Unique Tony Stark image URLs:', uniqueUrls.slice(0, 10));

// Test downloading the top candidates
for (let i = 0; i < Math.min(uniqueUrls.length, 5); i++) {
  const url = uniqueUrls[i];
  const downloadUrl = `${url.split('/revision')[0]}/revision/latest/scale-to-width-down/600`;
  const dest = path.join(targetDir, `tony_candidate_${i}.jpg`);
  execSync(`curl.exe -sL -A "Mozilla/5.0" "${downloadUrl}" -o "${dest}"`);
  console.log(`Saved candidate ${i} from ${url} (${fs.statSync(dest).size} bytes)`);
}
