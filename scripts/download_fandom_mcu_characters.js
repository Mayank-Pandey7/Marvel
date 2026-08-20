const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'images', 'characters');

const characterWikiPages = [
  // Original Avengers
  { file: 'tony-stark.jpg', page: 'Tony_Stark' },
  { file: 'steve-rogers.jpg', page: 'Steve_Rogers' },
  { file: 'thor.jpg', page: 'Thor' },
  { file: 'bruce-banner.jpg', page: 'Bruce_Banner' },
  { file: 'hulk.jpg', page: 'Hulk' },
  { file: 'natasha-romanoff.jpg', page: 'Natasha_Romanoff' },
  { file: 'hawkeye.jpg', page: 'Clint_Barton' },
  { file: 'clint-barton.jpg', page: 'Clint_Barton' },

  // Asgard
  { file: 'loki.jpg', page: 'Loki' },
  { file: 'odin.jpg', page: 'Odin' },
  { file: 'frigga.jpg', page: 'Frigga' },
  { file: 'hela.jpg', page: 'Hela' },
  { file: 'bor.jpg', page: 'Bor' },
  { file: 'laufey.jpg', page: 'Laufey' },
  { file: 'jane-foster.jpg', page: 'Jane_Foster' },
  { file: 'love.jpg', page: 'Love' },

  // Multiverse / TVA
  { file: 'sylvie.jpg', page: 'Sylvie_Laufeydottir' },
  { file: 'he-who-remains.jpg', page: 'He_Who_Remains' },
  { file: 'victor-timely.jpg', page: 'Victor_Timely' },
  { file: 'kang-the-conqueror.jpg', page: 'Kang' },
  { file: 'immortus.jpg', page: 'Immortus' },
  { file: 'ravonna-renslayer.jpg', page: 'Ravonna_Renslayer' },
  { file: 'the-watcher.jpg', page: 'Uatu' },

  // Maximoff / Vision
  { file: 'wanda-maximoff.jpg', page: 'Wanda_Maximoff' },
  { file: 'vision.jpg', page: 'Vision' },
  { file: 'white-vision.jpg', page: 'White_Vision' },
  { file: 'pietro-maximoff.jpg', page: 'Pietro_Maximoff' },
  { file: 'billy-maximoff.jpg', page: 'Billy_Maximoff' },
  { file: 'tommy-maximoff.jpg', page: 'Tommy_Maximoff' },
  { file: 'oleg-maximoff.jpg', page: 'Oleg_Maximoff' },
  { file: 'iryna-maximoff.jpg', page: 'Iryna_Maximoff' },
  { file: 'agatha-harkness.jpg', page: 'Agatha_Harkness' },

  // Spiders
  { file: 'peter-parker.jpg', page: 'Spider-Man' },
  { file: 'spider-man-tobey.jpg', page: 'Peter_Parker_(Earth-96283)' },
  { file: 'spider-man-andrew.jpg', page: 'Peter_Parker_(Earth-120703)' },
  { file: 'may-parker.jpg', page: 'May_Parker' },
  { file: 'green-goblin.jpg', page: 'Norman_Osborn_(Earth-96283)' },
  { file: 'doc-ock.jpg', page: 'Otto_Octavius_(Earth-96283)' },
  { file: 'mysterio.jpg', page: 'Mysterio' },
  { file: 'vulture.jpg', page: 'Adrian_Toomes' },

  // Mystics
  { file: 'doctor-strange.jpg', page: 'Doctor_Strange' },
  { file: 'wong.jpg', page: 'Wong' },
  { file: 'ancient-one.jpg', page: 'Ancient_One' },
  { file: 'clea.jpg', page: 'Clea' },
  { file: 'america-chavez.jpg', page: 'America_Chavez' },

  // Super Soldiers / Black Widow Legacy
  { file: 'bucky-barnes.jpg', page: 'Bucky_Barnes' },
  { file: 'sam-wilson.jpg', page: 'Sam_Wilson' },
  { file: 'peggy-carter.jpg', page: 'Peggy_Carter' },
  { file: 'abraham-erskine.jpg', page: 'Abraham_Erskine' },
  { file: 'alexei-shostakov.jpg', page: 'Red_Guardian' },
  { file: 'yelena-belova.jpg', page: 'Yelena_Belova' },
  { file: 'melina-vostokoff.jpg', page: 'Melina_Vostokoff' },
  { file: 'dreykov.jpg', page: 'Dreykov' },
  { file: 'red-skull.jpg', page: 'Red_Skull' },
  { file: 'zemo.jpg', page: 'Helmut_Zemo' },

  // Stark Family
  { file: 'howard-stark.jpg', page: 'Howard_Stark' },
  { file: 'maria-stark.jpg', page: 'Maria_Stark' },
  { file: 'pepper-potts.jpg', page: 'Pepper_Potts' },
  { file: 'morgan-stark.jpg', page: 'Morgan_Stark' },
  { file: 'james-rhodes.jpg', page: 'James_Rhodes' },

  // Ant-Man & Pym
  { file: 'scott-lang.jpg', page: 'Scott_Lang' },
  { file: 'hope-van-dyne.jpg', page: 'Hope_van_Dyne' },
  { file: 'hank-pym.jpg', page: 'Hank_Pym' },
  { file: 'janet-van-dyne.jpg', page: 'Janet_van_Dyne' },
  { file: 'cassie-lang.jpg', page: 'Cassie_Lang' },

  // Wakanda
  { file: 'tchalla.jpg', page: 'T%27Challa' },
  { file: 'shuri.jpg', page: 'Shuri' },
  { file: 'ramonda.jpg', page: 'Ramonda' },
  { file: 'nakia.jpg', page: 'Nakia' },
  { file: 'tchaka.jpg', page: 'T%27Chaka' },
  { file: 'toussaint.jpg', page: 'Toussaint' },
  { file: 'namor.jpg', page: 'Namor' },
  { file: 'killmonger.jpg', page: 'Erik_Killmonger' },

  // Guardians & Cosmic
  { file: 'peter-quill.jpg', page: 'Peter_Quill' },
  { file: 'gamora.jpg', page: 'Gamora' },
  { file: 'drax.jpg', page: 'Drax' },
  { file: 'rocket-raccoon.jpg', page: 'Rocket_Raccoon' },
  { file: 'groot.jpg', page: 'Groot' },
  { file: 'mantis.jpg', page: 'Mantis' },
  { file: 'nebula.jpg', page: 'Nebula' },
  { file: 'yondu-udonta.jpg', page: 'Yondu_Udonta' },
  { file: 'ego.jpg', page: 'Ego' },
  { file: 'meredith-quill.jpg', page: 'Meredith_Quill' },
  { file: 'high-evolutionary.jpg', page: 'High_Evolutionary' },
  { file: 'ronan.jpg', page: 'Ronan_the_Accuser' },
  { file: 'thanos.jpg', page: 'Thanos' },
  { file: 'eros.jpg', page: 'Eros' },
  { file: 'alars.jpg', page: 'A%27Lars' },
  { file: 'captain-marvel.jpg', page: 'Carol_Danvers' },
  { file: 'ms-marvel.jpg', page: 'Kamala_Khan' },
  { file: 'gorr.jpg', page: 'Gorr' },

  // Mutants & Fox Reality
  { file: 'deadpool.jpg', page: 'Deadpool_(Earth-10005)' },
  { file: 'wolverine.jpg', page: 'Wolverine_(Earth-10005)' },
  { file: 'charles-xavier.jpg', page: 'Charles_Xavier_(Earth-10005)' },
  { file: 'erik-lehnsherr.jpg', page: 'Erik_Lehnsherr_(Earth-10005)' },
  { file: 'gambit.jpg', page: 'Gambit_(Earth-10005)' },
  { file: 'x-23.jpg', page: 'Laura_(Earth-10005)' },
  { file: 'beast.jpg', page: 'Hank_McCoy_(Earth-10005)' },
  { file: 'cassandra-nova.jpg', page: 'Cassandra_Nova' },

  // Fantastic Four
  { file: 'reed-richards.jpg', page: 'Mister_Fantastic_(Earth-838)' },
  { file: 'sue-storm.jpg', page: 'Invisible_Woman_(Earth-TRN1431)' },
  { file: 'johnny-storm.jpg', page: 'Johnny_Storm_(Earth-10005)' },
  { file: 'ben-grimm.jpg', page: 'Thing_(Earth-TRN1431)' },
  { file: 'franklin-richards.jpg', page: 'Franklin_Richards' },
  { file: 'galactus.jpg', page: 'Galactus_(Earth-TRN1431)' },
  { file: 'doctor-doom.jpg', page: 'Doctor_Doom' },

  // Villains & Street
  { file: 'ultron.jpg', page: 'Ultron' },
  { file: 'red-hulk.jpg', page: 'Thaddeus_Ross' },
  { file: 'matt-murdock.jpg', page: 'Daredevil' },
  { file: 'frank-castle.jpg', page: 'Punisher' },
  { file: 'wilson-fisk.jpg', page: 'Kingpin' },
  { file: 'maya-lopez.jpg', page: 'Echo' },
  { file: 'moon-knight.jpg', page: 'Moon_Knight' },

  // Ten Rings
  { file: 'shang-chi.jpg', page: 'Shang-Chi' },
  { file: 'xu-wenwu.jpg', page: 'Xu_Wenwu' },
  { file: 'xu-xialing.jpg', page: 'Xu_Xialing' },
  { file: 'ying-li.jpg', page: 'Ying_Li' },

  // Eternals
  { file: 'ikaris.jpg', page: 'Ikaris' },
  { file: 'sersi.jpg', page: 'Sersi' },
  { file: 'thena.jpg', page: 'Thena' },
  { file: 'ajak.jpg', page: 'Ajak' },
  { file: 'gilgamesh.jpg', page: 'Gilgamesh' }
];

function extractInfoboxImage(html) {
  // First priority: find Infobox image url
  const infoboxMatch = html.match(/https:\/\/static\.wikia\.nocookie\.net\/marvelcinematicuniverse\/images\/[a-z0-9\/]+[a-zA-Z0-9_\-]+_Infobox\.(?:jpg|png|jpeg)/i);
  if (infoboxMatch) {
    return infoboxMatch[0];
  }

  // Second priority: find any image in the portable-infobox
  const piMatch = html.match(/<aside[^>]*class="[^"]*portable-infobox[^"]*"[\s\S]*?https:\/\/(static\.wikia\.nocookie\.net\/marvelcinematicuniverse\/images\/[^"\s\?]+)/i);
  if (piMatch) {
    return 'https://' + piMatch[1].split('/revision')[0];
  }

  // Third priority: any wikia image on page
  const generalMatch = html.match(/https:\/\/static\.wikia\.nocookie\.net\/marvelcinematicuniverse\/images\/[a-z0-9\/]+[a-zA-Z0-9_\-]+\.(?:jpg|png|jpeg)/i);
  if (generalMatch && !generalMatch[0].includes('Site-') && !generalMatch[0].includes('favicon')) {
    return generalMatch[0];
  }
  return null;
}

let downloadedCount = 0;

for (const char of characterWikiPages) {
  try {
    const url = `https://marvelcinematicuniverse.fandom.com/wiki/${char.page}`;
    const cmd = `curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" "${url}"`;
    const html = execSync(cmd, { encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });

    const imgUrl = extractInfoboxImage(html);
    if (imgUrl) {
      const dest = path.join(targetDir, char.file);
      // Download with high resolution (scale-to-width-down/600)
      const downloadUrl = `${imgUrl}/revision/latest/scale-to-width-down/600`;
      execSync(`curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" "${downloadUrl}" -o "${dest}"`);
      const size = fs.statSync(dest).size;
      if (size > 3000) {
        console.log(`✓ ${char.file} <= ${char.page} (${size} bytes)`);
        downloadedCount++;
      } else {
        console.log(`✗ ${char.file} too small (${size} bytes)`);
      }
    } else {
      console.log(`✗ No infobox image found for ${char.page}`);
    }
  } catch (err) {
    console.error(`✗ Error for ${char.page}: ${err.message}`);
  }
}

console.log(`\n🎉 Successfully downloaded ${downloadedCount}/${characterWikiPages.length} MCU Fandom character images!`);
