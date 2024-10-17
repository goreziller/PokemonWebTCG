let currentPage = 0;
const pages = document.querySelectorAll('.page');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const navigation = document.getElementById('navigation');
const book = document.querySelector('.book');
const pokemonCardsContainer = document.getElementById("pokemonCardsContainer");

// Farbcodes für die Typen
const typeColors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dark: '#705848',
    dragon: '#7038F8',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
    normal: '#A8A878'
};

// Buch öffnen
function openBook() {
    book.classList.toggle('open');
    if (book.classList.contains('open')) {
        loadUserPokemonCards(); // Lade die Pokémon-Karten
        updatePage();
        navigation.style.display = "flex";
        navigation.classList.add('active'); // Navigation aktivieren
        // Buchdeckel animieren
        book.querySelector('.cover-left').style.transform = 'rotateY(-180deg)';
        book.querySelector('.cover-right').style.transform = 'rotateY(180deg)';
    } else {
        navigation.classList.remove('active'); // Navigation deaktivieren
        navigation.style.display = "none";
        book.querySelector('.cover-left').style.transform = 'rotateY(0deg)';
        book.querySelector('.cover-right').style.transform = 'rotateY(0deg)';
    }
}

// Seiten aktualisieren
function updatePage() {
    pages.forEach((page, index) => {
        page.classList.remove('active');
        if (index === currentPage) {
            page.classList.add('active');
        }
    });
    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === pages.length - 1;
}

// Seitenwechsel nach links
function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        updatePage();
    }
}

// Seitenwechsel nach rechts
function prevPage() {
    if (currentPage > 0) {
        currentPage--;
        updatePage();
    }
}

// Initiales Update beim Laden der Seite
updatePage();

// Funktion zum Laden der Pokémon-Karten
const loadUserPokemonCards = async () => {
    try {
        const response = await fetch("./getUserPokemon.php", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        // Überprüfung auf Fehler in der Antwort
        if (data.error) {
            console.error("Fehler:", data.error);
            alert("Fehler beim Laden der Pokémon-Karten: " + data.error);
            return;
        }

        pokemonCardsContainer.innerHTML = ""; // Leeren Sie den Container

        // Überprüfen, ob Pokémon-Karten vorhanden sind
        if (data.pokemonCards && data.pokemonCards.length > 0) {
            data.pokemonCards.forEach(pokemon => {
                const cardElement = document.createElement("div");
                cardElement.className = "card"; // CSS-Klasse für das Styling
                cardElement.innerHTML = 
                `
                    <p class="hp">
                        <span>HP</span>
                        ${pokemon.Hp}
                    </p>
                    <img src="${pokemon.Bild}" />
                    <h2 class="poke-name">${pokemon.Name}</h2>
                    <div class="types"></div>
                    <div class="stats">
                        <div>
                            <h3>${pokemon.Attack}</h3>
                            <p>Attack</p>
                        </div>
                        <div>
                            <h3>${pokemon.Defense}</h3>
                            <p>Defense</p>
                        </div>
                        <div>
                            <h3>${pokemon.Speed}</h3>
                            <p>Speed</p>
                        </div>
                    </div>
                `;

                // Typen zur Karte hinzufügen
                const typeContainer = cardElement.querySelector('.types');
                const types = []; // Array für die Typen

                // Typ 1 hinzufügen
                const type1 = document.createElement('span');
                type1.textContent = pokemon.Type1.charAt(0).toUpperCase() + pokemon.Type1.slice(1);
                type1.style.backgroundColor = typeColors[pokemon.Type1.toLowerCase()] || '#000'; // Fallback-Farbe
                type1.style.color = "#fff"; // Weißer Text
                typeContainer.appendChild(type1);
                types.push({ type: { name: pokemon.Type1.toLowerCase() } }); // Typ in Array hinzufügen

                // Typ 2 hinzufügen (falls vorhanden)
                if (pokemon.Type2) {
                    const type2 = document.createElement('span');
                    type2.textContent = pokemon.Type2.charAt(0).toUpperCase() + pokemon.Type2.slice(1);
                    type2.style.backgroundColor = typeColors[pokemon.Type2.toLowerCase()] || '#000'; // Fallback-Farbe
                    type2.style.color = "#fff"; // Weißer Text
                    typeContainer.appendChild(type2);
                    types.push({ type: { name: pokemon.Type2.toLowerCase() } }); // Typ in Array hinzufügen
                }

                // Fügen Sie die Karte zum Container hinzu
                pokemonCardsContainer.appendChild(cardElement);

                // Stile der Karte basierend auf den Typen anwenden
                styleCard(types, cardElement);
            });
        } else {
            pokemonCardsContainer.innerHTML = "<p>Keine Pokémon-Karten gefunden.</p>";
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Pokémon-Karten:", error);
        alert("Fehler beim Abrufen der Pokémon-Karten.");
    }
};

// Funktion zum Anwenden von Stilen auf die Karte
const styleCard = (types, card) => {
    if (types.length === 2) {
        const primaryColor = typeColors[types[0].type.name];
        const secondaryColor = typeColors[types[1].type.name];
        card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, ${secondaryColor} 36%)`;
    } else if (types.length === 1) {
        const primaryColor = typeColors[types[0].type.name];
        card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, #ffffff 36%)`;
    } else {
        card.style.background = `#ffffff`; // Standardfarbe für Karten ohne Typen
    }

    const typeSpans = card.querySelectorAll(".types span");
    typeSpans.forEach((typeSpan, index) => {
        // Überprüfen, ob der Typ vorhanden ist, bevor wir darauf zugreifen
        if (types[index]) {
            const color = typeColors[types[index].type.name];
            typeSpan.style.backgroundColor = color || '#ffffff'; // Fallback auf Weiß, wenn keine Farbe vorhanden ist
        }
    });
};

// Rufen Sie die Funktion auf, um die Karten zu laden
loadUserPokemonCards();