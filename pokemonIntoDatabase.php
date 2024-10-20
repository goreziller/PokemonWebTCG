<?php
session_start(); 

$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "spieler"; 

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$response = [];

try 
{
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    
    if (!isset($_SESSION['user-id'])) 
    {
        $response['error'] = "Benutzer nicht angemeldet.";
        echo json_encode($response);
        exit;
    }

    $userId = $_SESSION['user-id'];

    // Empfangen Sie die POST-Daten
    $data = json_decode(file_get_contents("php://input"), true);
    $pokemonData = $data['pokemonData'];

    if (empty($pokemonData)) 
    {
        $response['error'] = "Keine Pokémon-Daten empfangen.";
        echo json_encode($response);
        exit;
    }

    $stmt = $conn->prepare("INSERT INTO pokemon (name, Bild, Hp, Attack, Defense, Speed, Type1, Type2, Rarity) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    foreach ($pokemonData as $pokemon) 
    {
        $type2 = isset($pokemon['type2']) ? $pokemon['type2'] : null;

        if (!isset($pokemon['rarity'])) 
        {
            $response['error'] = "Rarität für Pokémon '" . $pokemon['name'] . "' nicht gefunden.";
            echo json_encode($response);
            exit;
        }

        $stmt->execute([
            $pokemon['name'],
            $pokemon['bild'],
            $pokemon['hp'],
            $pokemon['attack'],
            $pokemon['defense'],
            $pokemon['speed'],
            $pokemon['type1'], 
            $type2,            
            $pokemon['rarity'] 
        ]);

        $pokemonId = $conn->lastInsertId();

        $response['userId'] = $userId;
        $response['pokemonId'] = $pokemonId;

        $stmtRelation = $conn->prepare("INSERT INTO benutzerpokemonkarten (BenutzerNr, PokemonKartenNr) VALUES (?, ?)");
        $stmtRelation->execute([$userId, $pokemonId]);
    }

    $response['message'] = "Pokémon erfolgreich hinzugefügt!";
    
} 
catch (PDOException $e) 
{
    $response['error'] = "Fehler bei der Datenbankoperation: " . $e->getMessage();
} 
catch (Exception $e) 
{
    $response['error'] = $e->getMessage();
}

echo json_encode($response);

$conn = null;
?>