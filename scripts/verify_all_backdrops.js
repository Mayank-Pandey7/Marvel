const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const deepDetail = fs.readFileSync('components/map/DeepMovieDetail.tsx', 'utf8');
const mapBlockMatch = deepDetail.match(/export const MCU_BACKDROP_MAP: Record<string, string> = {([\s\S]*?)};/);
const backdropMap = {};
if (mapBlockMatch) {
  const lines = mapBlockMatch[1].split('\n');
  for (const l of lines) {
    const m = l.match(/"([^"]+)":\s*"([^"]+)"/);
    if (m) {
      backdropMap[m[1]] = m[2];
    }
  }
}

console.log(`Checking ${Object.keys(backdropMap).length} backdrop entries...`);

const broken = [];
const working = [];

for (const [id, url] of Object.entries(backdropMap)) {
  if (url.startsWith('/')) {
    const localFile = path.join(__dirname, '..', 'public', url.replace(/^\//, ''));
    if (fs.existsSync(localFile) && fs.statSync(localFile).size > 5000) {
      working.push({ id, url, size: fs.statSync(localFile).size, type: 'local' });
    } else {
      broken.push({ id, url, reason: 'Local file missing or too small' });
    }
  } else {
    try {
      const head = execSync(`curl.exe -sI -A "Mozilla/5.0" "${url}"`, { encoding: 'utf8' });
      if (head.includes('200 OK') || head.includes('HTTP/2 200')) {
        working.push({ id, url, type: 'remote' });
      } else {
        broken.push({ id, url, reason: head.split('\n')[0] });
      }
    } catch (err) {
      broken.push({ id, url, reason: err.message });
    }
  }
}

console.log(`\nWorking backdrops: ${working.length}`);
console.log(`Broken backdrops: ${broken.length}`);
broken.forEach(b => console.log(`✗ [${b.id}] ${b.url} -> ${b.reason}`));
