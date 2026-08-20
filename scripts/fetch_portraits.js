const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const actors = [
  { file: 'hawkeye.jpg', id: '17604-jeremy-renner' },
  { file: 'bruce-banner.jpg', id: '103-mark-ruffalo' },
  { file: 'hulk.jpg', id: '103-mark-ruffalo' },
  { file: 'captain-marvel.jpg', id: '60073-brie-larson' },
  { file: 'moon-knight.jpg', id: '25063-oscar-isaac' },
  { file: 'gorr.jpg', id: '3894-christian-bale' },
  { file: 'mysterio.jpg', id: '131-jake-gyllenhaal' },
  { file: 'zemo.jpg', id: '1129-daniel-bruhl' },
  { file: 'ronan.jpg', id: '12984-lee-pace' },
  { file: 'cassandra-nova.jpg', id: '2100140-emma-corrin' },
  { file: 'ultron.jpg', id: '13240-james-spader' },
  { file: 'the-watcher.jpg', id: '2054-jeffrey-wright' },
  { file: 'vulture.jpg', id: '2232-michael-keaton' },
  { file: 'high-evolutionary.jpg', id: '1260846-chukwudi-iwuji' },
  { file: 'beast.jpg', id: '12073-kelsey-grammer' },
  { file: 'red-hulk.jpg', id: '3-harrison-ford' },
  { file: 'galactus.jpg', id: '43883-ralph-ineson' },
  { file: 'ms-marvel.jpg', id: '2534241-iman-vellani' }
];

for (const actor of actors) {
  try {
    const url = `https://www.themoviedb.org/person/${actor.id}`;
    console.log(`Fetching ${actor.id}...`);
    const cmd = `curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${url}"`;
    const html = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const match = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (match && match[1]) {
      const imgUrl = match[1];
      const dest = path.join(targetDir, actor.file);
      console.log(`  -> Downloading ${imgUrl}`);
      execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${imgUrl}" -o "${dest}"`);
      const size = fs.statSync(dest).size;
      console.log(`  ✓ Saved ${actor.file} (${size} bytes)`);
    } else {
      console.log(`  ✗ No image for ${actor.id}`);
    }
  } catch (err) {
    console.error(`  ✗ Error for ${actor.id}:`, err.message);
  }
}
console.log('Finished updating actor portraits!');
