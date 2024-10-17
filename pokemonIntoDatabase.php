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
    if (!isset($_SESSION['user-id'])) {
        $response['error'] = "Benutzer nicht angemeldet.";
        echo json_encode($response);
        exit;
    }

    $userId = $_SESSION['user-id']; // Holen Sie sich die Benutzer-ID aus der Sitzung

    // Empfangen Sie die POST-Daten
    $data = json_decode(file_get_contents("php://input"), true);
    $pokemonData = $data['pokemonData']; // Erwartet ein Array von Pokémon-Daten

    // SQL-Anweisung zum Einfügen von Pokémon vorbereiten, inklusive Type1 und Type2
    $stmt = $conn->prepare("INSERT INTO pokemon (name, Bild, Hp, Attack, Defense, Speed, Type1, Type2) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    // Pokémon-Daten einfügen
    foreach ($pokemonData as $pokemon) {
        // Fallback für Type2: wenn kein zweiter Typ existiert, setze ihn auf NULL
        $type2 = isset($pokemon['type2']) ? $pokemon['type2'] : null;

        $stmt->execute([
            $pokemon['name'],
            $pokemon['bild'],
            $pokemon['hp'],
            $pokemon['attack'],
            $pokemon['defense'],
            $pokemon['speed'],
            $pokemon['type1'], // Typ 1 einfügen
            $type2             // Typ 2 einfügen, kann NULL sein
        ]);

        // Holen Sie sich die letzte eingefügte Pokémon-ID
        $pokemonId = $conn->lastInsertId();

        // Debugging-Informationen sammeln
        $response['userId'] = $userId;
        $response['pokemonId'] = $pokemonId;

        // Beziehung in der Zwischentabelle herstellen
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