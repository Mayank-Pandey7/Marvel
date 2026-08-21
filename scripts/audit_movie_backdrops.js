const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Read all movies from data/movies.ts
const moviesFile = fs.readFileSync('data/movies.ts', 'utf8');
const movieMatches = [...moviesFile.matchAll(/id:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g)];

// 2. Read all movies from data/mcu.ts
const mcuFile = fs.readFileSync('data/mcu.ts', 'utf8');
const mcuMatches = [...mcuFile.matchAll(/id:\s*"([^"]+)",\s*title:\s*"([^"]+)"/g)];

// 3. Read DeepMovieDetail.tsx BACKDROP_MAP
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

const allMovies = new Map();
for (const m of movieMatches) {
  allMovies.set(m[1], { id: m[1], title: m[2] });
}
for (const m of mcuMatches) {
  if (!allMovies.has(m[1])) {
    allMovies.set(m[1], { id: m[1], title: m[2] });
  }
}

console.log(`Total unique MCU movie IDs across codebase: ${allMovies.size}`);

const missing = [];
const existing = [];

for (const [id, m] of allMovies.entries()) {
  const backdropUrl = backdropMap[id];
  if (!backdropUrl) {
    missing.push({ id, title: m.title, reason: 'No entry in MCU_BACKDROP_MAP' });
  } else {
    // Check if local file exists or remote url
    if (backdropUrl.startsWith('/')) {
      const localPath = path.join(__dirname, '..', 'public', backdropUrl.replace(/^\//, ''));
      if (fs.existsSync(localPath) && fs.statSync(localPath).size > 5000) {
        existing.push({ id, title: m.title, url: backdropUrl, local: true });
      } else {
        missing.push({ id, title: m.title, reason: `Local file missing: ${localPath}` });
      }
    } else {
      existing.push({ id, title: m.title, url: backdropUrl, local: false });
    }
  }
}

console.log('\n--- MISSING BACKDROPS ---');
console.log(`Count: ${missing.length}`);
missing.forEach(m => console.log(`- [${m.id}] ${m.title} (${m.reason})`));

console.log('\n--- EXISTING BACKDROPS ---');
console.log(`Count: ${existing.length}`);
existing.slice(0, 10).forEach(m => console.log(`+ [${m.id}] ${m.title} => ${m.url}`));
