const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const portraits = [
  { file: 'zemo.jpg', url: 'https://image.tmdb.org/t/p/w500/rVoKnrrzWEFsOsNGV43MxAFY3wr.jpg' },
  { file: 'ronan.jpg', url: 'https://image.tmdb.org/t/p/w500/6Be5iZxrrZHoADiOdmdDk85Xdgt.jpg' },
  { file: 'ultron.jpg', url: 'https://image.tmdb.org/t/p/w500/1Oc3XSLyb8hxmjmlgFENu582Kqw.jpg' },
  { file: 'the-watcher.jpg', url: 'https://image.tmdb.org/t/p/w500/4FC7IZr1CZCFOo5tjeBaXnnU5Bf.jpg' },
  { file: 'vulture.jpg', url: 'https://image.tmdb.org/t/p/w500/tYSja1KByFnZ4Hkp3stPqkKHnNL.jpg' },
  { file: 'high-evolutionary.jpg', url: 'https://image.tmdb.org/t/p/w500/apZNhSmx2EeJyN6sXAttvKQYOzy.jpg' },
  { file: 'moon-knight.jpg', url: 'https://image.tmdb.org/t/p/w500/1uegR4uAxRxiMyX4nQnpzbXhrTw.jpg' },
  { file: 'cassandra-nova.jpg', url: 'https://image.tmdb.org/t/p/w500/fR9nBqG3f92Wz9p7E8bK1w4o9tN.jpg' },
  { file: 'red-hulk.jpg', url: 'https://image.tmdb.org/t/p/w500/5qHNjhtjMD4YWH3ag0F3BQte9Yr.jpg' },
  { file: 'beast.jpg', url: 'https://image.tmdb.org/t/p/w500/bRDAc4GogyS9ci3ow7UnInOcriN.jpg' },
  { file: 'galactus.jpg', url: 'https://image.tmdb.org/t/p/w500/snk6JiXqQauAmsbB01gswbH3Zp7.jpg' },
  { file: 'ms-marvel.jpg', url: 'https://image.tmdb.org/t/p/w500/mfcLUWASJghU8MTNK38eYktfE83.jpg' }
];

for (const p of portraits) {
  try {
    const dest = path.join(targetDir, p.file);
    console.log(`Downloading ${p.file} from ${p.url}...`);
    execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${p.url}" -o "${dest}"`);
    const size = fs.statSync(dest).size;
    if (size > 5000) {
      console.log(`✓ Successfully saved ${p.file} (${size} bytes)`);
    } else {
      console.log(`✗ File too small for ${p.file} (${size} bytes)`);
    }
  } catch (err) {
    console.error(`✗ Error downloading ${p.file}:`, err.message);
  }
}
console.log('All remaining character portraits processed.');
