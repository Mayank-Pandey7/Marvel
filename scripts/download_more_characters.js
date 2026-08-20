const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const downloads = [
  { file: 'hulk.jpg', url: 'https://image.tmdb.org/t/p/w500/7NQrk5pY7N26b7k008P4sNf9YpT.jpg' },
  { file: 'hawkeye.jpg', url: 'https://image.tmdb.org/t/p/w500/pqKcQqa2l78P6m8vV4Lg2H6pA5m.jpg' },
  { file: 'captain-marvel.jpg', url: 'https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7Tpn.jpg' },
  { file: 'moon-knight.jpg', url: 'https://image.tmdb.org/t/p/w500/x6FsYvt33846G729muylUgCV2An.jpg' },
  { file: 'ms-marvel.jpg', url: 'https://image.tmdb.org/t/p/w500/cdkyMYdu8ao2657MWHI50Y93r68.jpg' },
  { file: 'the-watcher.jpg', url: 'https://image.tmdb.org/t/p/w500/lP5Bs0h9Cg3r7H4p2Y5mF8a6yXw.jpg' },
  { file: 'gorr.jpg', url: 'https://image.tmdb.org/t/p/w500/pIkRyD18kl4F0b6Myrfe9op90cj.jpg' },
  { file: 'mysterio.jpg', url: 'https://image.tmdb.org/t/p/w500/4q2NNXAn5laborV9r9gW1io9F3u.jpg' },
  { file: 'vulture.jpg', url: 'https://image.tmdb.org/t/p/w500/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg' },
  { file: 'high-evolutionary.jpg', url: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN2Ydgii51I3.jpg' },
  { file: 'red-hulk.jpg', url: 'https://image.tmdb.org/t/p/w500/pzIddQEMWhWzfvLI3TwxUG2wY3n.jpg' },
  { file: 'zemo.jpg', url: 'https://image.tmdb.org/t/p/w500/rAGi1FiLWj0R41Gj9YboSZ77U2X.jpg' },
  { file: 'ronan.jpg', url: 'https://image.tmdb.org/t/p/w500/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg' },
  { file: 'cassandra-nova.jpg', url: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg' },
  { file: 'ultron.jpg', url: 'https://image.tmdb.org/t/p/w500/t90Y3AyHGExUK0ug0979RhRmyR0.jpg' },
  { file: 'galactus.jpg', url: 'https://image.tmdb.org/t/p/w500/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg' },
  { file: 'beast.jpg', url: 'https://image.tmdb.org/t/p/w500/bRDAc4GogyS9ci3ow7UnInOcriN.jpg' }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, item.file);
    const file = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    https.get(item.url, options, (res) => {
      if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Saved ${item.file}`);
          resolve(true);
        });
      } else {
        console.error(`✗ Status ${res.statusCode} for ${item.file}`);
        file.close();
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`✗ Error ${item.file}: ${err.message}`);
      file.close();
      resolve(false);
    });
  });
}

async function run() {
  for (const item of downloads) {
    await download(item);
  }
  console.log('Finished downloading characters.');
}

run();
