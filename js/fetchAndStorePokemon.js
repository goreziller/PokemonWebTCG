const fetchAndStorePokemon = async () => {
    try {
        const response = await fetch('checkAndFetchPokemon.php');
        const data = await response.json();
        console.log(data.message); // Nachricht aus dem PHP-Skript anzeigen
    } catch (error) {
        console.error('Fehler beim Abrufen oder Speichern von Pokémon-Daten:', error);
    }
};

// Aufruf der Funktion, um die Pokémon-Daten zu prüfen und ggf. zu speichern
fetchAndStorePokemon();