<?php
header('Content-Type: application/json');

try 
{
    $pdo = new PDO('mysql:host=localhost;dbname=spieler', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} 
catch (PDOException $e) 
{
    echo json_encode(['error' => 'Datenbankverbindung fehlgeschlagen: ' . $e->getMessage()]);
    exit;
}

$stmt = $pdo->query("SELECT COUNT(*) FROM pokemonkarten");
$count = $stmt->fetchColumn();

if ($count < 942) 
{
    $offset = 941;
    $limit = 59;  
    $url = "https://pokeapi.co/api/v2/pokemon?limit=$limit&offset=$offset"; 
    
    $response = @file_get_contents($url);
    if ($response === FALSE) 
    {
        echo json_encode(['error' => 'Fehler beim Abrufen der Daten von der API.']);
        exit;
    }
    
    $pokemonData = json_decode($response, true)['results'];
    
    foreach ($pokemonData as $pokemon) 
    {
        $name = $pokemon['name'];
        $pokeUrl = $pokemon['url'];
        $pokeResponse = @file_get_contents($pokeUrl);
        
        if ($pokeResponse === FALSE) 
        {
            echo json_encode(['error' => 'Fehler beim Abrufen der Pokémon-Daten.']);
            continue;
        }
        
        $pokeDetails = json_decode($pokeResponse, true);
        
        $type1 = $pokeDetails['types'][0]['type']['name'];
        $type2 = isset($pokeDetails['types'][1]) ? $pokeDetails['types'][1]['type']['name'] : null;

        $stmt = $pdo->prepare("INSERT INTO pokemonkarten (name, bild, hp, attack, defense, speed, type1, type2) VALUES (:name, :bild, :hp, :attack, :defense, :speed, :type1, :type2)");
        $stmt->execute([
            ':name' => $pokeDetails['name'],
            ':bild' => $pokeDetails['sprites']['front_default'],
            ':hp' => $pokeDetails['stats'][0]['base_stat'],
            ':attack' => $pokeDetails['stats'][1]['base_stat'],
            ':defense' => $pokeDetails['stats'][2]['base_stat'],
            ':speed' => $pokeDetails['stats'][5]['base_stat'],
            ':type1' => $type1,
            ':type2' => $type2
        ]);
    }
    echo json_encode(['message' => 'Pokémon-Daten erfolgreich abgerufen und gespeichert.']);
} 
else 
{
    echo json_encode(['message' => 'Daten sind bereits vorhanden.']);
}
?>
