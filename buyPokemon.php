<?php
$pokemonArray = [];

if ($_SERVER['REQUEST_METHOD'] == 'POST') 
{
    $host = 'localhost';
    $db = 'spieler'; 
    $user = 'root';
    $pass = '';

    $conn = new mysqli($host, $user, $pass, $db);

    if ($conn->connect_error) 
    {
        die("Verbindung zur Datenbank fehlgeschlagen: " . $conn->connect_error);
    }

    $pokemon_name = $conn->real_escape_string($_POST['pokemon_name']);

    $sql = "SELECT * FROM pokemonkarten WHERE name = '$pokemon_name'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) 
    {
        while ($row = $result->fetch_assoc()) 
        {
            $pokemonArray[] = $row;
        }
    }

    $conn->close();
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo !empty($pokemonArray) ? htmlspecialchars($pokemonArray[0]['Name']) : ''; ?></title>
    <link rel="stylesheet" href="./css/design_buy&sellPokemon.css">
</head>
<body>
<h1><?php echo !empty($pokemonArray) ? htmlspecialchars($pokemonArray[0]['Name']) : ''; ?></h1>
    <div class="card-container">
        <?php if (!empty($pokemonArray)): ?>
            <?php 
            $RarityStyles = 
            [
                'common' => ['borderColor' => "#bebebe"],
                'uncommon' => ['borderColor' => "#1eff00"],
                'rare' => ['borderColor' => "#0070dd"],
                'epic' => ['borderColor' => "#a335ee"],
                'legendary' => ['borderColor' => "#ff8000"],
            ];

            $typeColor = 
            [
                'normal' => "#a8a77a",
                'grass' => "#7ac74c",
                'fire' => "#ee8130",
                'water' => "#6390f0",
                'bug' => "#a6b91a",
                'dragon' => "#6f35fc",
                'electric' => "#f7d02c",
                'fairy' => "#d685ad",
                'fighting' => "#c22e28",
                'flying' => "#a98ff3",
                'ground' => "#e2bf65",
                'ghost' => "#735797",
                'ice' => "#96d9d6",
                'poison' => "#a33ea1",
                'psychic' => "#f95587",
                'rock' => "#b6a136",
                'steel' => "#b7b7ce",
                'dark' => "#705746",
            ];

            $rarityKeys = array_keys($RarityStyles);
            ?>
            <?php foreach ($pokemonArray as $pokemon): ?>
                <?php 
                    $type1 = strtolower($pokemon['Type1']);
                    $type2 = strtolower($pokemon['Type2']);

                    for ($i = 0; $i < 5; $i++):
                        $rarity = $rarityKeys[$i % count($rarityKeys)];
                        $style = $RarityStyles[$rarity];

                        $hp = $pokemon['Hp'];
                        $statAttack = $pokemon['Attack']; 
                        $statDefense = $pokemon['Defense']; 
                        $statSpeed = $pokemon['Speed'];
                        $imgSrc = htmlspecialchars($pokemon['Bild']);
                        $pokeName = htmlspecialchars($pokemon['Name']);

                        echo '<div class="card" style="border-color: ' . $style['borderColor'] . ';';

                        if (!empty($type2)) 
                        {
                            $primaryColor = $typeColor[$type1] ?? "#ffffff";
                            $secondaryColor = $typeColor[$type2] ?? "#ffffff"; 
                            echo 'background: radial-gradient(circle at 50% 0%, ' . $primaryColor . ' 36%, ' . $secondaryColor . ' 36%);';
                        } 
                        else 
                        {
                            $primaryColor = $typeColor[$type1] ?? "#ffffff";
                            echo 'background: radial-gradient(circle at 50% 0%, ' . $primaryColor . ' 36%, #ffffff 36%);';
                        }
                        echo '">';
                ?>
                    <p class="hp">
                        <span>HP</span>
                        <?= $hp; ?>
                    </p>
                    <img src="<?= $imgSrc; ?>" alt="<?= $pokeName; ?> image" />
                    <h2 class="poke-name"><?= $pokeName; ?></h2>
                    <div class="types">
                        <span style="background-color: <?= $typeColor[$type1]; ?>;"><?= ucfirst($type1); ?></span>
                        <?php if (!empty($type2)): ?>
                            <span style="background-color: <?= $typeColor[$type2]; ?>;"><?= ucfirst($type2); ?></span>
                        <?php endif; ?>
                    </div>
                    <div class="stats">
                        <div>
                            <h3><?= $statAttack; ?></h3>
                            <p>Attack</p>
                        </div>
                        <div>
                            <h3><?= $statDefense; ?></h3>
                            <p>Defense</p>
                        </div>
                        <div>
                            <h3><?= $statSpeed; ?></h3>
                            <p>Speed</p>
                        </div>
                    </div>
                    <p>Rarity: <?= htmlspecialchars($rarity); ?></p>
                    <button class="buy-button">Kaufen</button>
                </div>
                <?php endfor; ?>
            <?php endforeach; ?>
        <?php else: ?>
            <p>Keine Pokémon gefunden. Bitte versuche es erneut.</p>
        <?php endif; ?>
    </div>

    <button class="back-button" onclick="window.history.back();">Zurück</button>
</body>
</html>
