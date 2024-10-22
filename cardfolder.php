<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokémon Kartenbuch</title>
    <link rel="stylesheet" href="./css/design_cardfolder.css">
</head>
<body>
    <div class="book" onclick="openBook()">
        <div class="cover-left"></div>
        <div class="pages">
            <div class="page active">
                <div class="pokemon-cards-container" id="pokemonCardsContainer"></div>
            </div>
            <div class="page">
                <div class="pokemon-cards-container" id="pokemonCardsContainer2"></div>
            </div>
            <div class="page">
                <div class="pokemon-cards-container" id="pokemonCardsContainer2"></div>
            </div>
            <div class="page">
                <div class="pokemon-cards-container" id="pokemonCardsContainer2"></div>
            </div>
            <div class="page">
                <div class="pokemon-cards-container" id="pokemonCardsContainer2"></div>
            </div>
        </div>
        <div class="cover-right"></div>
        <div class="navigation" id="navigation">
            <button class="nav-button" onclick="prevPage(); event.stopPropagation();" id="prevButton">Vorherige Seite</button>
            <button class="nav-button" onclick="nextPage(); event.stopPropagation();" id="nextButton">Nächste Seite</button>
            <button class="nav-button" onclick="location.href='main.php'; event.stopPropagation();">Zum Hauptmenü</button>
        </div>
    </div>

    <script src="./js/cardfolderscript.js"></script>
</body>
</html>
