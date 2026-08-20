const fs = require('fs');

const path = 'C:\\Users\\user\\.gemini\\antigravity\\brain\\7e2b35f5-02a6-44f2-ad52-85df607ef0f3\\.system_generated\\steps\\1294\\content.md';
const text = fs.readFileSync(path, 'utf8');

const regex = /<img[^>]+(?:src|srcset)="([^">]+)"[^>]*alt="([^">]*)"/g;
let m;
while ((m = regex.exec(text)) !== null) {
  const [_, url, alt] = m;
  if (/Hugh Jackman|Dafne Keen|Wolverine|Laura|Logan/i.test(alt) || /Hugh Jackman|Dafne Keen/i.test(url)) {
    console.log(alt, '-->', url);
  }
}

// Also check general profile card patterns
const personRegex = /href="\/person\/(\d+-[^"]+)"[\s\S]*?<img[^>]+src="([^">]+)"/g;
while ((m = personRegex.exec(text)) !== null) {
  if (/hugh-jackman|dafne-keen/i.test(m[1])) {
    console.log('Person:', m[1], '-->', m[2]);
  }
}
