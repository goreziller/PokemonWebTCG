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

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if (!isset($_SESSION['user-id'])) 
    {
        $response['error'] = "Benutzer nicht angemeldet.";
        echo json_encode($response);
        exit;
    }

    $userId = $_SESSION['user-id']; 

    $stmt = $conn->prepare("
        SELECT p.ID, p.Name, p.Bild, p.Hp, p.Attack, p.Defense, p.Speed, p.Type1, p.Type2, p.Rarity
        FROM pokemon p
        JOIN benutzerpokemonkarten up ON p.id = up.PokemonKartenNr
        WHERE up.BenutzerNr = ?
    ");
    $stmt->execute([$userId]);

    $pokemonCards = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($pokemonCards) 
    {
        $response['pokemonCards'] = $pokemonCards;
    } 
    else 
    {
        $response['message'] = "Keine Pokémon-Karten gefunden.";
    }
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