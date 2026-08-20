const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const exactInMovieImages = [
  {
    name: 'Hulk',
    file: 'hulk.jpg',
    urls: [
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/59/Hulk_AIW_Profile.jpg',
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/a/a4/Hulk_Infobox.png',
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/87/Smart_Hulk_Infobox.png'
    ]
  },
  {
    name: 'Loki Laufeyson',
    file: 'loki.jpg',
    urls: [
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b5/Loki_Infobox.png',
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/d6/Loki_Thor_Ragnarok_Profile.jpg'
    ]
  },
  {
    name: 'Doctor Strange',
    file: 'doctor-strange.jpg',
    urls: [
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/4/4f/Doctor_Strange_Infobox.png',
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b8/Doctor_Strange_Infobox.jpg',
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/d/df/Strange_MoM_Profile.jpeg'
    ]
  },
  {
    name: 'Logan / Wolverine',
    file: 'wolverine.jpg',
    urls: [
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/8a/Wolverine_D%26W_Infobox.png',
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/7/7b/Wolverine_Profile.jpg'
    ]
  },
  {
    name: 'Dr. Hank McCoy / Beast',
    file: 'beast.jpg',
    urls: [
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/5a/Beast_Infobox.png',
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/b/b5/Hank_McCoy_The_Marvels.png'
    ]
  },
  {
    name: 'Thanos',
    file: 'thanos.jpg',
    urls: [
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/27/Thanos_Infobox.png',
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/52/Thanos_IW_Infobox.png'
    ]
  },
  {
    name: 'Gorr the God Butcher',
    file: 'gorr.jpg',
    urls: [
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/88/Gorr_Infobox.jpg',
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/9/91/Gorr_Infobox.png'
    ]
  },
  {
    name: 'The High Evolutionary',
    file: 'high-evolutionary.jpg',
    urls: [
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/2/2c/High_Evolutionary_Infobox.png',
      'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/8/89/High_Evolutionary_Profile.png'
    ]
  }
];

for (const char of exactInMovieImages) {
  let saved = false;
  for (const url of char.urls) {
    try {
      const dest = path.join(targetDir, char.file);
      const downloadUrl = `${url}/revision/latest/scale-to-width-down/600`;
      console.log(`Trying ${char.name} from ${url}...`);
      execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${downloadUrl}" -o "${dest}"`);
      const size = fs.statSync(dest).size;
      if (size > 8000) {
        console.log(`✓ SAVED ${char.name} (${char.file}): ${size} bytes!`);
        saved = true;
        break;
      }
    } catch (err) {
      console.error(`  Error downloading ${char.name}: ${err.message}`);
    }
  }
  if (!saved) {
    console.log(`✗ Failed to download live action image for ${char.name}`);
  }
}
console.log('Finished 8 in-movie character updates!');
