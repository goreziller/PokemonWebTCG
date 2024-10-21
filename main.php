<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokemon TCG</title>
    <link rel="stylesheet" href="./css/design_main.css">
</head>
<body>
    <h1>Willkommen zurück, <?php include("Hauptmenü.php"); name(); ?></h1>
    <form action="hauptmenü.php" method="POST">
        <div class="container">
            <div class="cardfolder">
                <img src="./bilder/Pokemonordner.jfif" alt="Pokemon Ordner">
                <button name="folder">Zum Kartenordner</button>
            </div>
            <div class="packs">
                <img src="./bilder/pack.jfif" alt="Pokemon Packs">
                <button name="openpacks">Packs öffnen</button>
            </div>
            <div class="shop">
                <img src="./bilder/cardshop.jfif" alt="Pokemon Cardshop">
                <button name="openshop">Zum Kartenmarkt</button>
            </div>
        </div>
        <button class="logout" name="logout">Ausloggen</button>
    </form>
</body>
</html>