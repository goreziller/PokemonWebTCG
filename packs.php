<!DOCTYPE html>
<html lang="en">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Pokemon Card Generator</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="./css/design_packs.css" />
    <style>
        <?php include("./design_packs.css")?>
    </style>
</head>
<body>
  <img src="./bilder/packOpener.png" alt="Titelbild" class="title-image" />
    <div class="container">
        <div class="card-container" id="card-container">
            <div class="card" id="card1"></div>
            <div class="card" id="card2"></div>
            <div class="card" id="card3"></div>
            <div class="card" id="card4"></div>
            <div class="card" id="card5"></div>
            <div class="card" id="card6"></div>
        </div>
        <div class="button-container">
            <button id="btn">Karten auswählen</button>
            <button id="back-btn">Zurück zum Hauptmenü</button>
        </div>
    </div>
    <script src="./js/pokemonscript.js"></script>
</body>
</html>