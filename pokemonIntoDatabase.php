<?php
    $servername = "localhost"; // oder die IP-Adresse Ihres Servers
    $username = "root"; // Ihr MySQL-Benutzername
    $password = ""; // Ihr MySQL-Passwort
    $dbname = "pokemon_db"; // Der Name Ihrer Datenbank

    // Verbindung zur Datenbank herstellen
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Überprüfen Sie die Verbindung
    if ($conn->connect_error) {
        die("Verbindung fehlgeschlagen: " . $conn->connect_error);
    }

    // Empfangen Sie die POST-Daten
    $data = json_decode(file_get_contents("php://input"), true);
    $pokemonIds = $data['pokemonIds'];

    // Bereiten Sie die SQL-Anweisung vor
    $stmt = $conn->prepare("INSERT INTO pokemon (pokemon_id) VALUES (?)");

    // Fügen Sie die Pokémon-IDs hinzu
    foreach ($pokemonIds as $id) {
        $stmt->bind_param("i", $id); // "i" steht für Integer
        $stmt->execute();
    }

    // Schließen Sie die Verbindung
    $stmt->close();
    $conn->close();

    echo json_encode(["message" => "Pokémon erfolgreich hinzugefügt!"]);
?>