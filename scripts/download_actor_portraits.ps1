$destDir = "e:\Projects\mcuverse\public\images\characters"

$actors = @(
    @{ file = "hawkeye.jpg"; id = "17604-jeremy-renner" },
    @{ file = "bruce-banner.jpg"; id = "103-mark-ruffalo" },
    @{ file = "hulk.jpg"; id = "103-mark-ruffalo" },
    @{ file = "captain-marvel.jpg"; id = "60073-brie-larson" },
    @{ file = "moon-knight.jpg"; id = "25063-oscar-isaac" },
    @{ file = "gorr.jpg"; id = "3894-christian-bale" },
    @{ file = "mysterio.jpg"; id = "131-jake-gyllenhaal" },
    @{ file = "zemo.jpg"; id = "1129-daniel-bruhl" },
    @{ file = "ronan.jpg"; id = "12984-lee-pace" },
    @{ file = "cassandra-nova.jpg"; id = "2100140-emma-corrin" },
    @{ file = "ultron.jpg"; id = "13240-james-spader" },
    @{ file = "the-watcher.jpg"; id = "2054-jeffrey-wright" },
    @{ file = "vulture.jpg"; id = "2232-michael-keaton" },
    @{ file = "high-evolutionary.jpg"; id = "1260846-chukwudi-iwuji" },
    @{ file = "beast.jpg"; id = "12073-kelsey-grammer" },
    @{ file = "red-hulk.jpg"; id = "3-harrison-ford" },
    @{ file = "galactus.jpg"; id = "43883-ralph-ineson" },
    @{ file = "ms-marvel.jpg"; id = "2534241-iman-vellani" }
)

foreach ($actor in $actors) {
    $actorId = $actor.id
    $actorFile = $actor.file
    $url = "https://www.themoviedb.org/person/$actorId"
    Write-Host "Fetching $actorId..."
    $html = curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" $url
    if ($html -match '<meta property="og:image" content="([^"]+)"') {
        $imgUrl = $Matches[1]
        Write-Host "Found image: $imgUrl"
        $dest = Join-Path $destDir $actorFile
        curl.exe -sL -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" $imgUrl -o $dest
        $size = (Get-Item $dest).Length
        Write-Host "Saved $actorFile ($size bytes)"
    } else {
        Write-Host "Could not find image for $actorId"
    }
    Start-Sleep -Milliseconds 300
}
Write-Host "Done!"
