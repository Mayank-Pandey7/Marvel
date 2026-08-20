const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'backdrops');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const backdrops = [
  { file: 'x-men-2000.jpg', url: 'https://image.tmdb.org/t/p/w1280/3QUVzbcNyfGe3ocWkYAT8emK8Co.jpg' },
  { file: 'x2-2003.jpg', url: 'https://image.tmdb.org/t/p/w1280/7TYITrR804tLITNur3b8VLCK6tw.jpg' },
  { file: 'captain-america-first-avenger.jpg', url: 'https://image.tmdb.org/t/p/w1280/yFuKvT4Vm3sKHdFY4eG6I4ldAnn.jpg' },
  { file: 'the-avengers.jpg', url: 'https://image.tmdb.org/t/p/w1280/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg' },
  { file: 'avengers-infinity-war.jpg', url: 'https://image.tmdb.org/t/p/w1280/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg' },
  { file: 'avengers-endgame.jpg', url: 'https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg' },
  { file: 'loki.jpg', url: 'https://image.tmdb.org/t/p/w1280/jBGjbSDRxOEudW9rmQbWDzJUKq9.jpg' },
  { file: 'shang-chi.jpg', url: 'https://image.tmdb.org/t/p/w1280/r7K6Xt0RX4Mw0cAbZVw5cyb1Tux.jpg' },
  { file: 'spider-man-no-way-home.jpg', url: 'https://image.tmdb.org/t/p/w1280/uyrOU4BDm2kbVxFsMiDFIHDhc4d.jpg' },
  { file: 'doctor-strange-multiverse.jpg', url: 'https://image.tmdb.org/t/p/w1280/lv3TXqhpaIxkclIHbhN2MRMOemQ.jpg' },
  { file: 'black-panther-wakanda-forever.jpg', url: 'https://image.tmdb.org/t/p/w1280/83H0C66AcvkwpG2738VCTHMY9uv.jpg' },
  { file: 'deadpool-and-wolverine.jpg', url: 'https://image.tmdb.org/t/p/w1280/by8z9Fe8y7p4jo2YlW2SZDnptyT.jpg' },
  { file: 'captain-america-brave-new-world.jpg', url: 'https://image.tmdb.org/t/p/w1280/ce3prrjh9ZehEl5JinNqr4jIeaB.jpg' },
  { file: 'thunderbolts.jpg', url: 'https://image.tmdb.org/t/p/w1280/rthMuZfFv4fqEU4JVbgSW9wQ8rs.jpg' },
  { file: 'the-fantastic-four-first-steps.jpg', url: 'https://image.tmdb.org/t/p/w1280/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg' }
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
    https.get(item.url, options, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded ${item.file} (${fs.statSync(dest).size} bytes)`);
          resolve(true);
        });
      } else {
        console.error(`✗ Failed ${item.file} with status ${response.statusCode}`);
        file.close();
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`✗ Error downloading ${item.file}: ${err.message}`);
      file.close();
      resolve(false);
    });
  });
}

async function run() {
  for (const item of backdrops) {
    await download(item);
  }
  console.log('Finished downloading all backdrops.');
}

run();
