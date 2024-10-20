<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') 
{
    $pokemon_name = $_POST['pokemon_name'];
    // Hier die Logik für den Kauf des Pokémon implementieren
    echo "Du hast $pokemon_name gekauft!";
}
?>