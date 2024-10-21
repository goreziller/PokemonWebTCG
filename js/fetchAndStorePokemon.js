const fetchAndStorePokemon = async () => 
    {
    try 
    {
        const response = await fetch('checkAndFetchPokemon.php');
        const data = await response.json();
        console.log(data.message);
    } 
    catch (error) 
    {
        console.error('Fehler beim Abrufen oder Speichern von Pokémon-Daten:', error);
    }
};

fetchAndStorePokemon();