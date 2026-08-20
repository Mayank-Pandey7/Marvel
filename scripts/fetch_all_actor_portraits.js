const https = require('https');
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

function fetchProfileImage(actor) {
  return new Promise((resolve) => {
    const url = `https://www.themoviedb.org/person/${actor.id}`;
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    https.get(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const ogMatch = data.match(/<meta property="og:image" content="([^"]+)"/);
        if (ogMatch) {
          console.log(`Found ${actor.file}: ${ogMatch[1]}`);
          resolve({ file: actor.file, imgUrl: ogMatch[1] });
        } else {
          console.error(`No og:image for ${actor.file}`);
          resolve(null);
        }
      });
    }).on('error', (err) => {
      console.error(`Error fetching ${actor.id}: ${err.message}`);
      resolve(null);
    });
  });
}

function downloadImage(file, imgUrl) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, file);
    const writeStream = fs.createWriteStream(dest);
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    };
    https.get(imgUrl, options, (res) => {
      if (res.statusCode === 200) {
        res.pipe(writeStream);
        writeStream.on('finish', () => {
          writeStream.close();
          console.log(`✓ Saved portrait for ${file} (${fs.statSync(dest).size} bytes)`);
          resolve(true);
        });
      } else {
        console.error(`✗ Status ${res.statusCode} downloading ${file}`);
        writeStream.close();
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`✗ Error downloading ${file}: ${err.message}`);
      writeStream.close();
      resolve(false);
    });
  });
}

async function run() {
  for (const actor of actors) {
    const result = await fetchProfileImage(actor);
    if (result && result.imgUrl) {
      await downloadImage(result.file, result.imgUrl);
    }
  }
  console.log('All character portraits updated successfully!');
}

run();
