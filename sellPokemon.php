<?php
$pokemonArray = [];

function generateRandomPrices($basePrice, $numDays) 
{
    $prices = [];
    $price = $basePrice;

    for ($i = 0; $i < $numDays; $i++) 
    {
        $priceChange = rand(-5, 8);
        $price = max(1, $price + $priceChange); 
        $prices[] = $price;
    }

    return $prices;
}

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

$basePrices = 
[
    'common' => 5,
    'uncommon' => 10,
    'rare' => 15,
    'epic' => 25,
    'legendary' => 40,
];

$rarityKeys = array_keys($basePrices);

$priceData = [];
if (!empty($pokemonArray)) {
    $pokemon = $pokemonArray[0];
    foreach ($rarityKeys as $rarity) 
    {
        $basePrice = $basePrices[$rarity];

        $priceData[strtolower($pokemon['Name']) . '_' . strtolower($rarity)] = generateRandomPrices($basePrice, 30);
    }
}

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

function getBackgroundColor($type1, $type2, $type_colors) 
{
    $color1 = $type_colors[$type1] ?? '#FFFFFF'; 
    if ($type2) 
    {
        $color2 = $type_colors[$type2] ?? '#FFFFFF'; 
        return "background: linear-gradient(to right, $color1, $color2);";
    }
    return "background-color: $color1;";
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

            $pokemon = $pokemonArray[0];
            $type1 = strtolower($pokemon['Type1']);
            $type2 = strtolower($pokemon['Type2']);
            $hp = $pokemon['Hp'];
            $statAttack = $pokemon['Attack']; 
            $statDefense = $pokemon['Defense']; 
            $statSpeed = $pokemon['Speed'];
            $imgSrc = htmlspecialchars($pokemon['Bild']);
            $pokeName = htmlspecialchars($pokemon['Name']);

            $backgroundColor = getBackgroundColor($type1, $type2, $typeColor);
            ?>
            
            <?php foreach ($rarityKeys as $rarity): ?>
                <?php 
                    $style = $RarityStyles[$rarity];
                    $pokeKey = strtolower($pokeName) . '_' . strtolower($rarity);
                    $prices = $priceData[$pokeKey];
                ?>
                <div class="card" style="border-color: <?= $style['borderColor']; ?>; <?= $backgroundColor; ?>" 
                     onmouseover="showPriceChart(event, '<?= $pokeKey; ?>')" 
                     onmouseout="hidePriceChart()">
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
                    <button class="sell-button">Verkaufen</button>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>Keine Pokémon gefunden. Bitte versuche es erneut.</p>
        <?php endif; ?>
    </div>

    <div id="chart-container" style="display:none; position: absolute;">
        <canvas id="priceChart"></canvas>
    </div>

    <button class="back-button" onclick="window.history.back();">Zurück</button>

    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script>
        const priceData = <?php echo !empty($priceData) ? json_encode($priceData) : '{}'; ?>;
        let chart = null;

        function showPriceChart(event, pokemonKey) 
        {
            const chartContainer = document.getElementById('chart-container');
            const ctx = document.getElementById('priceChart').getContext('2d');

            if (!priceData[pokemonKey]) 
            {
                console.error(`Keine Preisverlauf-Daten für ${pokemonKey} gefunden.`);
                return;
            }

            const prices = priceData[pokemonKey];
            const dates = Array.from({ length: prices.length }, (_, i) => `Tag ${i + 1}`);

            chartContainer.style.display = 'block';
            chartContainer.style.left = event.pageX - 80 + 'px';
            chartContainer.style.top = event.pageY + 'px';

            if (chart) 
            {
                chart.data.labels = dates;
                chart.data.datasets[0].data = prices;
                chart.update();
            } 
            else 
            {
                chart = new Chart(ctx, 
                {
                    type: 'line',
                    data: 
                    {
                        labels: dates,
                        datasets: 
                        [{
                            label: `Preisverlauf für ${pokemonKey.replace(/_/g, ' ').toUpperCase()}`,
                            data: prices,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false,
                        }]
                    },
                    options: 
                    {
                        responsive: true,
                        plugins: 
                        {
                            legend: 
                            {
                            labels: 
                            {
                                color: 'white'
                            }
                        },
                        tooltip: 
                        {
                            titleColor: 'white',
                            bodyColor: 'white'
                        }
                        },
                        scales: {
                            y: 
                            {
                                beginAtZero: true,
                                grid:
                                {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks:
                                {
                                    color: 'white'
                                }
                            },
                            x:
                            {
                                grid:
                                {
                                    color: 'rgba(255, 255, 255, 0.1)'
                                },
                                ticks:
                                {
                                    color: 'white'
                                }
                            }
                        }
                    }
                });
            }
        }

        function hidePriceChart() 
        {
            const chartContainer = document.getElementById('chart-container');
            chartContainer.style.display = 'none';
            if (chart) 
            {
                chart.destroy();
                chart = null;
            }
        }
    </script>
</body>
</html>
