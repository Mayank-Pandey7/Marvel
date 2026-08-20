const { execSync } = require('child_process');

const html = execSync('curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "https://marvelcinematicuniverse.fandom.com/wiki/Tony_Stark"', { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
console.log('HTML length with browser UA:', html.length);

const infoboxImages = html.match(/class="[^"]*pi-image-thumbnail[^"]*"[^>]*src="([^"]+)"/g) || [];
console.log('Infobox thumbnail matches:', infoboxImages);

// Also check all wikia images
const allWikia = [...html.matchAll(/(https:\/\/static\.wikia\.nocookie\.net\/marvelcinematicuniverse\/images\/[^"\s]+)/g)].map(m => m[1]);
console.log('Total MCU Wikia images:', allWikia.length);
console.log('Sample images:', allWikia.slice(0, 5));
