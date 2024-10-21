<?php
$servername = "localhost"; 
$username = "root";
$password = "";
$dbname = "spieler"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) 
{
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

$sql = "SELECT * FROM pokemonkarten ORDER BY RAND() LIMIT 6";
$result = $conn->query($sql);

$pokemonArray = [];
if ($result->num_rows > 0) 
{
    while ($row = $result->fetch_assoc())
    {
        $pokemonArray[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($pokemonArray);

$conn->close();
?>