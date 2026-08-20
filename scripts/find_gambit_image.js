const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const searchUrl = 'https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=Remy_LeBeau_Gambit_Deadpool_Wolverine&srnamespace=6&format=json';
const res = JSON.parse(execSync(`curl.exe -sL -A "Mozilla/5.0" "${searchUrl}"`, { encoding: 'utf8' }));
console.log('Gambit search matches:', res.query.search.map(s => s.title));

// Also search Gambit Profile
const search2 = JSON.parse(execSync('curl.exe -sL -A "Mozilla/5.0" "https://marvelcinematicuniverse.fandom.com/api.php?action=query&list=search&srsearch=Gambit+Profile&srnamespace=6&format=json"', { encoding: 'utf8' }));
console.log('Gambit search 2:', search2.query.search.map(s => s.title));
