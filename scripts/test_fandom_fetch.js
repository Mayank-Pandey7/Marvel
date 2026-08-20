const { execSync } = require('child_process');

function getFandomImage(pageTitle) {
  try {
    const url = `https://marvelcinematicuniverse.fandom.com/wiki/${encodeURIComponent(pageTitle)}`;
    const html = execSync(`curl.exe -sL "${url}"`, { encoding: 'utf8', maxBuffer: 15 * 1024 * 1024 });
    
    // Look for infobox image
    const figureMatch = html.match(/<figure[^>]*class="[^"]*pi-item[^"]*pi-image[^"]*"[^>]*>[\s\S]*?<img[^>]+src="([^">]+)"/i);
    if (figureMatch && figureMatch[1]) {
      // Clean url from revision/scale parameters to get high-res original
      const cleanUrl = figureMatch[1].split('/revision')[0];
      return cleanUrl;
    }
    // Fallback: look for wds-tab__content with infobox image
    const tabMatch = html.match(/<aside[^>]*class="[^"]*portable-infobox[^"]*"[\s\S]*?<img[^>]+src="([^">]+static\.wikia\.nocookie\.net\/marvelcinematicuniverse\/images\/[^">]+)"/i);
    if (tabMatch && tabMatch[1]) {
      return tabMatch[1].split('/revision')[0];
    }
    return null;
  } catch (err) {
    console.error(`Error fetching ${pageTitle}:`, err.message);
    return null;
  }
}

const testTitles = [
  'Tony_Stark',
  'Steve_Rogers',
  'Thor',
  'Bruce_Banner',
  'Natasha_Romanoff',
  'Clint_Barton',
  'Loki',
  'Wanda_Maximoff',
  'Peter_Parker_(Earth-199999)',
  'Stephen_Strange',
  'James_Barnes',
  'Sam_Wilson',
  'Scott_Lang',
  'Hope_van_Dyne',
  'T%27Challa',
  'Carol_Danvers',
  'Peter_Quill',
  'Gamora',
  'Thanos',
  'Wolverine_(Earth-10005)',
  'Laura_(Earth-10005)',
  'Deadpool_(Earth-10005)',
  'Mister_Fantastic_(Earth-838)',
  'Doctor_Doom',
  'Ultron',
  'Helmut_Zemo',
  'Gorr',
  'Mysterio',
  'Adrian_Toomes'
];

for (const t of testTitles) {
  const img = getFandomImage(t);
  console.log(`${t} => ${img}`);
}
