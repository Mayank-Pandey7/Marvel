const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'posters');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const posterSources = [
  {
    filename: 'x-men-2000.jpg',
    url: 'https://image.tmdb.org/t/p/w500/2LqaLgk4Z226KkgPJuiOQ58wvrm.jpg'
  },
  {
    filename: 'x2-2003.jpg',
    url: 'https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg' // fallback or tmdb
  },
  {
    filename: 'captain-america-first-avenger.jpg',
    url: 'https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYpOjqDZXUK.jpg'
  },
  {
    filename: 'the-avengers.jpg',
    url: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg'
  },
  {
    filename: 'avengers-infinity-war.jpg',
    url: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg'
  },
  {
    filename: 'avengers-endgame.jpg',
    url: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg'
  },
  {
    filename: 'loki.jpg',
    url: 'https://image.tmdb.org/t/p/w500/kEl2t3OhXc3Zb9FBh1AuYzRTgZp.jpg'
  },
  {
    filename: 'shang-chi.jpg',
    url: 'https://image.tmdb.org/t/p/w500/9f2Q0U3IOsLgrI2HkvldwSABZy5.jpg'
  },
  {
    filename: 'spider-man-no-way-home.jpg',
    url: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg'
  },
  {
    filename: 'doctor-strange-multiverse.jpg',
    url: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1hKAhiwbBKS.jpg'
  },
  {
    filename: 'black-panther-wakanda-forever.jpg',
    url: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg'
  },
  {
    filename: 'deadpool-and-wolverine.jpg',
    url: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg'
  },
  {
    filename: 'captain-america-brave-new-world.jpg',
    url: 'https://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg'
  },
  {
    filename: 'thunderbolts.jpg',
    url: 'https://image.tmdb.org/t/p/w500/hqcexYHbiTBfDIdDWxrxPtVndBX.jpg'
  },
  {
    filename: 'the-fantastic-four-first-steps.jpg',
    url: 'https://image.tmdb.org/t/p/w500/nf5qaSEvyYSNeFH0YhSs5EsBLX9.jpg'
  }
];

function download(item) {
  return new Promise((resolve) => {
    const dest = path.join(targetDir, item.filename);
    const file = fs.createWriteStream(dest);
    https.get(item.url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          console.log(`✓ Downloaded ${item.filename} (${fs.statSync(dest).size} bytes)`);
          resolve(true);
        });
      } else {
        console.error(`✗ Failed ${item.filename} with status ${response.statusCode}`);
        file.close();
        resolve(false);
      }
    }).on('error', (err) => {
      console.error(`✗ Error downloading ${item.filename}: ${err.message}`);
      file.close();
      resolve(false);
    });
  });
}

async function run() {
  for (const item of posterSources) {
    await download(item);
  }
  console.log('Finished downloading all posters.');
}

run();
