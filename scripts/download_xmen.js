const fs = require('fs');
const path = require('path');
const https = require('https');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'posters');

const downloads = [
  { file: 'x-men-2000.jpg', url: 'https://image.tmdb.org/t/p/w500/bRDAc4GogyS9ci3ow7UnInOcriN.jpg' },
  { file: 'x2-2003.jpg', url: 'https://image.tmdb.org/t/p/w500/bst4alFUXCxISwdRUKSMhhkrX1M.jpg' }
];

downloads.forEach((d) => {
  const dest = path.join(targetDir, d.file);
  const file = fs.createWriteStream(dest);
  
  const options = {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
  };

  https.get(d.url, options, (res) => {
    if (res.statusCode === 200) {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`SUCCESS: ${d.file} (${fs.statSync(dest).size} bytes)`);
      });
    } else {
      console.log(`FAIL: ${d.file} (Status ${res.statusCode})`);
    }
  }).on('error', (err) => {
    console.error(`ERROR: ${d.file} - ${err.message}`);
  });
});
