<?php

$host = 'localhost'; // Datenbank-Host
$db = 'spieler'; // Datenbank-Name
$user = 'root'; // Datenbank-Benutzer
$pass = ''; // Datenbank-Passwort

// Erstellen der Datenbankverbindung
$conn = new mysqli($host, $user, $pass, $db);

// Überprüfen der Verbindung
if ($conn->connect_error) {
    die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
}

// Bestimmen der Generation basierend auf dem Button
$generation = 1; // Standardwert
$id_start = 1; // Start-ID
$id_end = 151; // End-ID

if (isset($_POST['gen1'])) { $id_start = 1; $id_end = 151; $generation = 1;} // Generation 1
if (isset($_POST['gen2'])) { $id_start = 152; $id_end = 251; $generation = 2;} // Generation 2
if (isset($_POST['gen3'])) { $id_start = 252; $id_end = 386; $generation = 3;} // Generation 3
if (isset($_POST['gen4'])) { $id_start = 387; $id_end = 493; $generation = 4;} // Generation 4
if (isset($_POST['gen5'])) { $id_start = 494; $id_end = 649; $generation = 5;} // Generation 5
if (isset($_POST['gen6'])) { $id_start = 650; $id_end = 721; $generation = 6;} // Generation 6
if (isset($_POST['gen7'])) { $id_start = 722; $id_end = 809; $generation = 7;} // Generation 7
if (isset($_POST['gen8'])) { $id_start = 810; $id_end = 898; $generation = 8;} // Generation 8
if (isset($_POST['gen9'])) { $id_start = 899; $id_end = 1000; $generation = 9;} // Generation 9 (Pseudowert für IDs, hier kannst du die maximalen IDs anpassen)

// Abfrage der Pokémon für die gewählte Generation
$sql = "SELECT id, name, bild, type1, type2 FROM pokemonkarten WHERE id BETWEEN ? AND ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ii", $id_start, $id_end);
$stmt->execute();
$result = $stmt->get_result();

// Pokémon in ein Array speichern
$pokemon_list = [];
while ($row = $result->fetch_assoc()) {
    $pokemon_list[] = [
        'id' => $row['id'],     
        'name' => $row['name'],
        'bild' => $row['bild'],
        'type1' => $row['type1'],
        'type2' => $row['type2']
    ];
}

$stmt->close();
$conn->close();



$type_colors = [
    "normal" => "#a8a77a",
    "grass" => "#7ac74c",
    "fire" => "#ee8130",
    "water" => "#6390f0",
    "bug" => "#a6b91a",
    "dragon" => "#6f35fc",
    "electric" => "#f7d02c",
    "fairy" => "#d685ad",
    "fighting" => "#c22e28",
    "flying" => "#a98ff3",
    "ground" => "#e2bf65",
    "ghost" => "#735797",
    "ice" => "#96d9d6",
    "poison" => "#a33ea1",
    "psychic" => "#f95587",
    "rock" => "#b6a136",
    "steel" => "#b7b7ce",
    "dark" => "#705746",
];

// Funktion zur Bestimmung des Hintergrunds
function getBackgroundColor($type1, $type2, $type_colors) {
    $color1 = $type_colors[$type1] ?? '#FFFFFF'; // Standardfarbe (weiß) falls Typ nicht gefunden
    if ($type2) {
        $color2 = $type_colors[$type2] ?? '#FFFFFF'; // Standardfarbe (weiß) falls Typ nicht gefunden
        return "background: linear-gradient(to right, $color1, $color2);"; // Farbverlauf für zwei Typen
    }
    return "background-color: $color1;"; // Einfache Hintergrundfarbe
}
?>

<!DOCTYPE html>
<html lang="de">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pokémon Generation <?php echo ($generation); ?></title>
    <link rel="stylesheet" href="./css/design_market.css">
</head>
<body>
<h1>Pokémon Generation <?php echo ($generation); ?></h1>
<div class="pokemon-grid">
    <?php foreach ($pokemon_list as $pokemon): ?>
        <div class="pokemon-item" style="<?php echo getBackgroundColor($pokemon['type1'], $pokemon['type2'], $type_colors); ?>">
            <h3><?php echo ucfirst(htmlspecialchars($pokemon['name']) . " Nr." . $pokemon['id']); ?></h3>
            <img src="<?php echo htmlspecialchars($pokemon['bild']); ?>" alt="<?php echo htmlspecialchars($pokemon['name']); ?>">
            <div class="button-container">
                <form action="buyPokemon.php" method="POST">
                    <input type="hidden" name="pokemon_name" value="<?php echo htmlspecialchars($pokemon['name']); ?>">
                    <button type="submit">Kaufen</button>
                </form>
                <form action="sellPokemon.php" method="POST">
                    <input type="hidden" name="pokemon_name" value="<?php echo htmlspecialchars($pokemon['name']); ?>">
                    <button type="submit">Verkaufen</button>
                </form>
            </div>
        </div>
    <?php endforeach; ?>
</div>
<a href="shop.php" class="back-button">Zurück zur Auswahl</a>
</body>