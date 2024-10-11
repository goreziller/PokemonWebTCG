<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokemon TCG</title>
    <link rel="stylesheet" href="design_main.css">
</head>
<body>
    <h1>Willkommen zurück, <?php include("Hauptmenü.php"); name(); ?></h1>
    <form action="hauptmenü.php" method="POST">
        <div class="container">
            <div class="cardfolder">
                <img src="Pokemonordner.jfif" alt="Pokemon Ordner">
                <button name="folder">Zum Kartenordner</button>
            </div>
            <div class="packs">
                <img src="pack.jfif" alt="Pokemon Packs">
                <button name="openpacks">Packs öffnen</button>
            </div>
            <div class="shop">
                <img src="cardshop.jfif" alt="Pokemon Cardshop">
                <button name="openshop">Zum Kartenmarkt</button>
            </div>
        </div>
    </form>
</body>
</html>