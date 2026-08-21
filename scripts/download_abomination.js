const { execSync } = require('child_process');
const fs = require('fs');

const apiUrl = 'https://marvelcinematicuniverse.fandom.com/api.php?action=query&titles=Abomination&prop=pageimages&pithumbsize=1000&format=json';
const imgJson = execSync(`curl.exe -s -A "Mozilla/5.0" "${apiUrl}"`, { encoding: 'utf8' });
const imgData = JSON.parse(imgJson);
const pages = imgData.query?.pages || {};
const pageId = Object.keys(pages)[0];
const thumbUrl = pages[pageId]?.thumbnail?.source;
if (thumbUrl) {
  const cleanUrl = thumbUrl.split('/revision/')[0];
  execSync(`curl.exe -sL -A "Mozilla/5.0" "${cleanUrl}" -o "public/images/characters/abomination.jpg"`);
  console.log('✓ Saved abomination.jpg:', fs.statSync('public/images/characters/abomination.jpg').size, 'bytes');
}
