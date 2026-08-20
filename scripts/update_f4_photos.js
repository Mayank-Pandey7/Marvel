const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const updates = [
  { file: 'johnny-storm.jpg', url: 'https://image.tmdb.org/t/p/w500/zshhuioZaH8S5ZKdMcojzWi1ntl.jpg' },
  { file: 'sue-storm.jpg', url: 'https://image.tmdb.org/t/p/w500/tViEEsjvbhrJxWsOipUqIYjdHEb.jpg' }
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
  for (const item of updates) {
    await download(item);
  }
  console.log('Finished updating character photos.');
}

run();
