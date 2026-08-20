const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const finalThree = [
  { file: 'cassandra-nova.jpg', id: '2324569-emma-corrin' },
  { file: 'red-hulk.jpg', id: '3-harrison-ford' },
  { file: 'galactus.jpg', id: '1372-ralph-ineson' }
];

for (const p of finalThree) {
  try {
    const url = `https://www.themoviedb.org/person/${p.id}`;
    console.log(`Fetching ${p.id}...`);
    const cmd = `curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${url}"`;
    const html = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const match = html.match(/<meta property="og:image" content="([^"]+)"/);
    if (match && match[1]) {
      const imgUrl = match[1].replace('media.themoviedb.org', 'image.tmdb.org');
      const dest = path.join(targetDir, p.file);
      console.log(`  -> Downloading ${imgUrl}`);
      execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${imgUrl}" -o "${dest}"`);
      const size = fs.statSync(dest).size;
      console.log(`  ✓ Saved ${p.file} (${size} bytes)`);
    } else {
      console.log(`  ✗ No og:image found for ${p.id}`);
    }
  } catch (err) {
    console.error(`  ✗ Error for ${p.id}:`, err.message);
  }
}
console.log('Finished 3 final characters.');
