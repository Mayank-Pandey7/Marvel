const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const portraits = [
  { file: 'steve-rogers.jpg', url: 'https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg' },
  { file: 'thor.jpg', url: 'https://image.tmdb.org/t/p/w500/prSfAi1xGrhLQNxVSUFh61xQ4Qy.jpg' },
  { file: 'loki.jpg', url: 'https://image.tmdb.org/t/p/w500/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg' },
  { file: 'bruce-banner.jpg', url: 'https://image.tmdb.org/t/p/w500/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg' },
  { file: 'hulk.jpg', url: 'https://image.tmdb.org/t/p/w500/gKzYx79y0AQTL4UAk1cBQJ3nvrm.jpg' },
  { file: 'hawkeye.jpg', url: 'https://image.tmdb.org/t/p/w500/ct5pNE5dDHryHLDnxyZPYcqO1sz.jpg' },
  { file: 'wanda-maximoff.jpg', url: 'https://image.tmdb.org/t/p/w500/ijWWwINc8h71NQ8j1LTJMFSj5wr.jpg' }
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
          console.log(`✓ Updated ${item.file} (${fs.statSync(dest).size} bytes)`);
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
  for (const item of portraits) {
    await download(item);
  }
  console.log('Finished updating face-centered portraits.');
}

run();
