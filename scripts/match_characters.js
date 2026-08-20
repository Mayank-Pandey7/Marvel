const fs = require('fs');

const charsFile = fs.readFileSync('data/characters.ts', 'utf8');
const idMatches = charsFile.match(/id:\s*"([^"]+)"/g) || [];
const ids = idMatches.map(m => m.replace(/id:\s*"/, '').replace('"', ''));

const files = fs.readdirSync('public/images/characters');
console.log('Total Character IDs in data/characters.ts:', ids.length);
console.log('Total files in public/images/characters:', files.length);

const aliasMap = {
  'iron-man': 'tony-stark.jpg',
  'captain-america': 'steve-rogers.jpg',
  'hulk': 'bruce-banner.jpg',
  'black-widow': 'natasha-romanoff.jpg',
  'hawkeye': 'clint-barton.jpg',
  'ant-man': 'scott-lang.jpg',
  'wasp': 'hope-van-dyne.jpg',
  'winter-soldier': 'bucky-barnes.jpg',
  'falcon': 'sam-wilson.jpg',
  'scarlet-witch': 'wanda-maximoff.jpg',
  'wanda': 'wanda-maximoff.jpg',
  'spider-man': 'peter-parker.jpg',
  'spiderman': 'peter-parker.jpg',
  'star-lord': 'peter-quill.jpg',
  'black-panther': 'tchalla.jpg',
  'war-machine': 'james-rhodes.jpg',
  'daredevil': 'matt-murdock.jpg',
  'punisher': 'frank-castle.jpg',
  'kingpin': 'wilson-fisk.jpg',
  'magneto': 'erik-lehnsherr.jpg',
  'professor-x': 'charles-xavier.jpg',
  'mister-fantastic': 'reed-richards.jpg',
  'invisible-woman': 'sue-storm.jpg',
  'human-torch': 'johnny-storm.jpg',
  'the-thing': 'ben-grimm.jpg',
  'red-guardian': 'alexei-shostakov.jpg',
  'quicksilver': 'pietro-maximoff.jpg',
  'kang': 'kang-the-conqueror.jpg',
  'doctor-octopus': 'doc-ock.jpg',
  'wenwu': 'xu-wenwu.jpg',
  'xialing': 'xu-xialing.jpg',
  'taskmaster': 'antonia-dreykov.jpg',
  'echo': 'maya-lopez.jpg',
  'shangchi': 'shang-chi.jpg',
};

const matched = [];
const missing = [];

for (const id of ids) {
  let mappedFile = aliasMap[id] || `${id}.jpg`;
  if (files.includes(mappedFile)) {
    matched.push({ id, file: mappedFile });
  } else if (files.includes(`${id}.png`)) {
    matched.push({ id, file: `${id}.png` });
  } else {
    // Check if any file starts with or contains id
    const candidate = files.find(f => f.replace(/\.[^.]+$/, '') === id || f.includes(id));
    if (candidate) {
      matched.push({ id, file: candidate });
    } else {
      missing.push(id);
    }
  }
}

console.log('Matched:', matched.length);
console.log('Missing count:', missing.length);
console.log('Missing IDs:', missing);
