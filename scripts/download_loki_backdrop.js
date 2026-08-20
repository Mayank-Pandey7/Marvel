const fs = require('fs');
const path = require('path');
const https = require('https');

const target = path.join(__dirname, '..', 'public', 'images', 'backdrops', 'loki.jpg');
const file = fs.createWriteStream(target);

const options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
};

https.get('https://image.tmdb.org/t/p/w1280/q3jHCb4dMfYF6ojikKuHd6LscxC.jpg', options, (res) => {
  if (res.statusCode === 200) {
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`SUCCESS: Downloaded loki.jpg (${fs.statSync(target).size} bytes)`);
    });
  } else {
    console.error(`Status ${res.statusCode}`);
  }
});
