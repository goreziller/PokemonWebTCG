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
        <!-- Buchseiten -->
        <div class="pages">
            <!-- Erste Seite mit dynamisch geladenen Karten -->
            <div class="page active">
                <div class="pokemon-cards-container" id="pokemonCardsContainer"></div>
            </div>
            <!-- Zweite Seite mit weiteren dynamisch geladenen Karten -->
            <div class="page">
                <div class="pokemon-cards-container" id="pokemonCardsContainer2"></div>
            </div>
        </div>
        <div class="cover-right"></div>
        <div class="navigation" id="navigation">
        <button class="nav-button" onclick="prevPage()" id="prevButton">Vorehrige Seite</button>
        <button class="nav-button" onclick="nextPage()" id="nextButton">Nächste Seite</button>
        <button class="nav-button" location.href='main.php'>Zum Hauptmenü</button>
    </div>
</div>

<script src="./js/cardfolderscript.js"></script>

</body>
</html>
