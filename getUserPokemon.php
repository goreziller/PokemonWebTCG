<?php
session_start(); // Starten Sie die Sitzung, um auf die Benutzer-ID zuzugreifen

$servername = "localhost"; // oder die IP-Adresse Ihres Servers
$username = "root"; // Ihr MySQL-Benutzername
$password = ""; // Ihr MySQL-Passwort
$dbname = "spieler"; // Der Name Ihrer Datenbank

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json'); // Setzen Sie den Header für JSON-Antworten

$response = []; // Array für die Antwort

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Überprüfen Sie, ob der Benutzer angemeldet ist
    if (!isset($_SESSION['user-id'])) 
    {
        $response['error'] = "Benutzer nicht angemeldet.";
        echo json_encode($response);
        exit;
    }

    $userId = $_SESSION['user-id']; // Holen Sie sich die Benutzer-ID aus der Sitzung

    // SQL-Abfrage, um alle Pokémon-Karten für den Benutzer abzurufen, inklusive Type1 und Type2
    $stmt = $conn->prepare("
        SELECT p.ID, p.Name, p.Bild, p.Hp, p.Attack, p.Defense, p.Speed, p.Type1, p.Type2
        FROM pokemon p
        JOIN benutzerpokemonkarten up ON p.id = up.PokemonKartenNr
        WHERE up.BenutzerNr = ?
    ");
    $stmt->execute([$userId]);

    $pokemonCards = $stmt->fetchAll(PDO::FETCH_ASSOC);

    if ($pokemonCards) 
    {
        // Füge die Pokémon-Karten mit Typen zur Antwort hinzu
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

// Geben Sie die Antwort als JSON aus
echo json_encode($response);

// Verbindung schließen
$conn = null;
?>