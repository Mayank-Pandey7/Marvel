const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

// Read all characters from characters.ts
const charsFile = fs.readFileSync('data/characters.ts', 'utf8');
const charMatches = [...charsFile.matchAll(/{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)];

// Read all nodes from darkFamilyTree.ts
const treeFile = fs.readFileSync('data/darkFamilyTree.ts', 'utf8');
const treeMatches = [...treeFile.matchAll(/{\s*id:\s*"([^"]+)",\s*name:\s*"([^"]+)",[\s\S]*?photoUrl:\s*"\/images\/characters\/([^"]+)"/g)];

const characterMap = new Map();

for (const m of charMatches) {
  characterMap.set(m[1], { name: m[2], file: `${m[1]}.jpg` });
}

for (const m of treeMatches) {
  characterMap.set(m[1], { name: m[2], file: m[3] });
}

// Add common aliases & titles for accurate Fandom Search
const searchQueries = {
  'iron-man': 'Iron Man Tony Stark',
  'captain-america': 'Captain America Steve Rogers',
  'thor': 'Thor Odinson',
  'hulk': 'Hulk Bruce Banner',
  'bruce-banner': 'Bruce Banner Hulk',
  'black-widow': 'Black Widow Natasha Romanoff',
  'hawkeye': 'Hawkeye Clint Barton',
  'loki': 'Loki (Earth-616)',
  'wanda': 'Scarlet Witch Wanda Maximoff',
  'scarlet-witch': 'Scarlet Witch Wanda Maximoff',
  'wanda-maximoff': 'Scarlet Witch Wanda Maximoff',
  'vision': 'Vision',
  'white-vision': 'White Vision',
  'doctor-strange': 'Doctor Strange Stephen Strange',
  'spider-man': 'Spider-Man Peter Parker',
  'spider-man-maguire': 'Spider-Man Peter Parker (Earth-96283)',
  'spider-man-garfield': 'Spider-Man Peter Parker (Earth-120703)',
  'spider-man-tobey': 'Spider-Man Peter Parker (Earth-96283)',
  'spider-man-andrew': 'Spider-Man Peter Parker (Earth-120703)',
  'bucky-barnes': 'Winter Soldier Bucky Barnes',
  'winter-soldier': 'Winter Soldier Bucky Barnes',
  'sam-wilson': 'Falcon Sam Wilson',
  'falcon': 'Falcon Sam Wilson',
  'ant-man': 'Ant-Man Scott Lang',
  'scott-lang': 'Ant-Man Scott Lang',
  'wasp': 'Wasp Hope van Dyne',
  'hope-van-dyne': 'Wasp Hope van Dyne',
  'black-panther': 'Black Panther T\'Challa',
  'tchalla': 'Black Panther T\'Challa',
  'shuri': 'Black Panther Shuri',
  'peter-quill': 'Star-Lord Peter Quill',
  'star-lord': 'Star-Lord Peter Quill',
  'gamora': 'Gamora',
  'thanos': 'Thanos',
  'deadpool': 'Deadpool (Earth-10005)',
  'wolverine': 'Wolverine (Earth-10005)',
  'x-23': 'Laura (Earth-10005)',
  'gambit': 'Gambit (Earth-10005)',
  'charles-xavier': 'Professor X Charles Xavier',
  'professor-x': 'Professor X Charles Xavier',
  'erik-lehnsherr': 'Magneto Erik Lehnsherr',
  'magneto': 'Magneto Erik Lehnsherr',
  'beast': 'Hank McCoy (Earth-10005)',
  'reed-richards': 'Mister Fantastic',
  'mister-fantastic': 'Mister Fantastic',
  'sue-storm': 'Invisible Woman',
  'invisible-woman': 'Invisible Woman',
  'johnny-storm': 'Human Torch',
  'human-torch': 'Human Torch',
  'ben-grimm': 'Thing (Earth-TRN1431)',
  'the-thing': 'Thing (Earth-TRN1431)',
  'doctor-doom': 'Doctor Doom',
  'galactus': 'Galactus',
  'cassandra-nova': 'Cassandra Nova',
  'red-hulk': 'Red Hulk Thaddeus Ross',
  'ultron': 'Ultron',
  'zemo': 'Helmut Zemo',
  'ronan': 'Ronan the Accuser',
  'gorr': 'Gorr the God Butcher',
  'mysterio': 'Mysterio Quentin Beck',
  'vulture': 'Vulture Adrian Toomes',
  'green-goblin': 'Green Goblin Norman Osborn',
  'doc-ock': 'Doctor Octopus Otto Octavius',
  'captain-marvel': 'Captain Marvel Carol Danvers',
  'ms-marvel': 'Ms. Marvel Kamala Khan',
  'moon-knight': 'Moon Knight Marc Spector',
  'the-watcher': 'Uatu The Watcher',
  'he-who-remains': 'He Who Remains',
  'kang-the-conqueror': 'Kang the Conqueror',
  'victor-timely': 'Victor Timely',
  'daredevil': 'Daredevil Matt Murdock',
  'matt-murdock': 'Daredevil Matt Murdock',
  'punisher': 'Punisher Frank Castle',
  'frank-castle': 'Punisher Frank Castle',
  'kingpin': 'Kingpin Wilson Fisk',
  'wilson-fisk': 'Kingpin Wilson Fisk',
  'shang-chi': 'Shang-Chi',
  'wenwu': 'Xu Wenwu',
  'xu-wenwu': 'Xu Wenwu',
  'xialing': 'Xu Xialing',
  'xu-xialing': 'Xu Xialing',
  'alexei-shostakov': 'Red Guardian Alexei Shostakov',
  'red-guardian': 'Red Guardian Alexei Shostakov',
  'yelena-belova': 'Black Widow Yelena Belova'
};

function searchAndDownload(charId, charName, fileName) {
  try {
    const query = searchQueries[charId] || charName;
    const searchUrl = `https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json`;
    const searchJsonStr = execSync(`curl.exe -sL -A "Mozilla/5.0" "${searchUrl}"`, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });
    const searchRes = JSON.parse(searchJsonStr);
    
    if (!searchRes.query || !searchRes.query.search || searchRes.query.search.length === 0) {
      console.log(`✗ No search results for ${query}`);
      return false;
    }

    const bestPage = searchRes.query.search[0].title;
    const pageUrl = `https://marvelcinematicuniverse.fandom.com/wiki/${encodeURIComponent(bestPage.replace(/ /g, '_'))}`;
    const html = execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${pageUrl}"`, { encoding: 'utf8', maxBuffer: 25 * 1024 * 1024 });

    let imgUrl = null;
    const infoboxMatch = html.match(/https:\/\/static\.wikia\.nocookie\.net\/marvelcinematicuniverse\/images\/[a-z0-9\/]+[a-zA-Z0-9_\-]+_Infobox\.(?:jpg|png|jpeg)/i);
    if (infoboxMatch) {
      imgUrl = infoboxMatch[0];
    } else {
      const piMatch = html.match(/<aside[^>]*class="[^"]*portable-infobox[^"]*"[\s\S]*?https:\/\/(static\.wikia\.nocookie\.net\/marvelcinematicuniverse\/images\/[^"\s\?]+)/i);
      if (piMatch) {
        imgUrl = 'https://' + piMatch[1].split('/revision')[0];
      }
    }

    if (imgUrl) {
      const dest = path.join(targetDir, fileName);
      const downloadUrl = `${imgUrl}/revision/latest/scale-to-width-down/600`;
      execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${downloadUrl}" -o "${dest}"`);
      const size = fs.statSync(dest).size;
      if (size > 3000) {
        console.log(`✓ ${fileName} <= "${bestPage}" (${size} bytes)`);
        return true;
      }
    }
    console.log(`✗ Could not extract infobox image for "${bestPage}"`);
    return false;
  } catch (err) {
    console.error(`✗ Error for ${charId}:`, err.message);
    return false;
  }
}

console.log(`Processing ${characterMap.size} MCU characters from Fandom Wiki...`);
let count = 0;
for (const [id, info] of characterMap.entries()) {
  const ok = searchAndDownload(id, info.name, info.file);
  if (ok) count++;
}
console.log(`\n🎉 Successfully updated ${count}/${characterMap.size} characters from MCU Fandom Wiki!`);
