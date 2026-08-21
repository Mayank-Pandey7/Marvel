const fs = require('fs');

const charsFile = fs.readFileSync('data/characters.ts', 'utf8');
const charMatches = [...charsFile.matchAll(/id:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)];
console.log(`Characters in data/characters.ts: ${charMatches.length}`);
charMatches.forEach((c, i) => console.log(`${i+1}. [${c[1]}] ${c[2]}`));

const treeFile = fs.readFileSync('data/darkFamilyTree.ts', 'utf8');
const treeMatches = [...treeFile.matchAll(/id:\s*"([^"]+)",\s*name:\s*"([^"]+)"/g)];
console.log(`\nCharacters in data/darkFamilyTree.ts: ${treeMatches.length}`);
