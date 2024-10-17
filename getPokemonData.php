<?php
// Datenbankverbindung
$servername = "localhost"; // Ändere dies entsprechend deiner Konfiguration
$username = "root"; // Datenbank-Benutzername
$password = ""; // Datenbank-Passwort
$dbname = "spieler"; // Datenbankname

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Überprüfen der Verbindung
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// SQL-Abfrage zum Abrufen von 6 zufälligen Pokémon
$sql = "SELECT * FROM pokemonkarten ORDER BY RAND() LIMIT 6";
$result = $conn->query($sql);

$pokemonArray = [];
if ($result->num_rows > 0) {
    // Daten in ein Array einfügen
    while ($row = $result->fetch_assoc()) {
        $pokemonArray[] = $row;
    }
}

// JSON-Antwort
header('Content-Type: application/json');
echo json_encode($pokemonArray);

// Verbindung schließen
$conn->close();
?>