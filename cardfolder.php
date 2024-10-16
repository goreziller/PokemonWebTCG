<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokémon Kartenbuch</title>
    <link rel="stylesheet" href="./design_cardfolder.css">
</head>
<body>

    <div class="book" onclick="openBook()">
        <div class="cover-left"></div>

        <!-- Buchseiten -->
        <div class="pages">
            <!-- Erste Seite mit 6 Karten -->
            <div class="page active">
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/SM35/SM35_EN_SM35_02.png" alt="Pikachu Karte">
                    <div class="card-details">
                        <h2>Pikachu</h2>
                        <p>Typ: Elektro</p>
                    </div>
                </div>
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/XY12/XY12_EN_65.png" alt="Glurak Karte">
                    <div class="card-details">
                        <h2>Glurak</h2>
                        <p>Typ: Feuer</p>
                    </div>
                </div>
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/SWSH04/SWSH04_EN_001.png" alt="Bisasam Karte">
                    <div class="card-details">
                        <h2>Bisasam</h2>
                        <p>Typ: Pflanze</p>
                    </div>
                </div>
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/SM5/SM5_EN_10.png" alt="Schiggy Karte">
                    <div class="card-details">
                        <h2>Schiggy</h2>
                        <p>Typ: Wasser</p>
                    </div>
                </div>
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/XY10/XY10_EN_49.png" alt="Mew Karte">
                    <div class="card-details">
                        <h2>Mew</h2>
                        <p>Typ: Psycho</p>
                    </div>
                </div>
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/SM5/SM5_EN_45.png" alt="Relaxo Karte">
                    <div class="card-details">
                        <h2>Relaxo</h2>
                        <p>Typ: Normal</p>
                    </div>
                </div>
            </div>

            <!-- Zweite Seite mit 6 weiteren Karten -->
            <div class="page">
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/SM7/SM7_EN_84.png" alt="Jirachi Karte">
                    <div class="card-details">
                        <h2>Jirachi</h2>
                        <p>Typ: Stahl</p>
                    </div>
                </div>
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/XY9/XY9_EN_27.png" alt="Zapdos Karte">
                    <div class="card-details">
                        <h2>Zapdos</h2>
                        <p>Typ: Elektro</p>
                    </div>
                </div>
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/SM3/SM3_EN_19.png" alt="Mewtu Karte">
                    <div class="card-details">
                        <h2>Mewtu</h2>
                        <p>Typ: Psycho</p>
                    </div>
                </div>
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/SM5/SM5_EN_48.png" alt="Lugia Karte">
                    <div class="card-details">
                        <h2>Lugia</h2>
                        <p>Typ: Psycho</p>
                    </div>
                </div>
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/SM5/SM5_EN_47.png" alt="Garados Karte">
                    <div class="card-details">
                        <h2>Garados</h2>
                        <p>Typ: Wasser</p>
                    </div>
                </div>
                <div class="card">
                    <img src="https://assets.pokemon.com/assets/cms2/img/cards/web/XY12/XY12_EN_66.png" alt="Sichlor Karte">
                    <div class="card-details">
                        <h2>Sichlor</h2>
                        <p>Typ: Käfer</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="cover-right"></div>
    </div>

    <div class="navigation" id="navigation">
        <button class="nav-button" onclick="prevPage()" id="prevButton">Zurück</button>
        <button class="nav-button" onclick="nextPage()" id="nextButton">Weiter</button>
    </div>

    <script src="./cardfolderscript.js"></script>
</body>
</html>
