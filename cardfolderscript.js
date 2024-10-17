let currentPage = 0;
const pages = document.querySelectorAll('.page');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const navigation = document.getElementById('navigation');
const book = document.querySelector('.book');
const pokemonCardsContainer = document.getElementById("pokemonCardsContainer");

// Buch öffnen
function openBook() {
    book.classList.toggle('open');
    // Karten nur anzeigen, wenn das Buch geöffnet ist
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
        // Buchdeckel zurücksetzen
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
    // Buttons aktivieren/deaktivieren
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

        // Container für die Pokémon-Karten
        const pokemonCardsContainer = document.getElementById("pokemonCardsContainer");
        pokemonCardsContainer.innerHTML = ""; // Leeren Sie den Container

        // appendTypes(data.types, card);
        // styleCard(data.types, card);

        // const appendTypes = (types, card) => {
        //     const typesContainer = card.querySelector(".types");
        //     typesContainer.innerHTML = ''; // Leere vorherige Typen
        
        //     // Überprüfen, ob Typen vorhanden sind
        //     if (types.length === 0) {
        //         typesContainer.innerHTML = '<span>Keine Typen</span>'; // Hinweis, wenn keine Typen vorhanden sind
        //         return;
        //     }
        
        //     // Typen zur Karte hinzufügen
        //     types.forEach((item) => {
        //         const span = document.createElement("span");
        //         span.textContent = item.type.name.charAt(0).toUpperCase() + item.type.name.slice(1); // Erster Buchstabe groß
        //         span.classList.add('type'); // CSS-Klasse hinzufügen für das Styling
        //         typesContainer.appendChild(span);
        //     });
        // };
        
        // // Funktion zum Stylen der Karte basierend auf den Typen
        // const styleCard = (types, card) => {
        //     if (types.length === 0) {
        //         card.style.background = '#ffffff'; // Standardfarbe, wenn keine Typen vorhanden sind
        //         return;
        //     }
        
        //     const primaryColor = typeColor[types[0].type.name];
        //     if (types.length === 2) {
        //         const secondaryColor = typeColor[types[1].type.name];
        //         card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, ${secondaryColor} 36%)`;
        //     } else {
        //         card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, #ffffff 36%)`;
        //     }
        // };

        // Überprüfen, ob Pokémon-Karten vorhanden sind
        if (data.pokemonCards && data.pokemonCards.length > 0) {
            data.pokemonCards.forEach(pokemon => {
                // Erstellen eines neuen Karten-Elements
                const cardElement = document.createElement("div");
                cardElement.className = "card"; // CSS-Klasse für das Styling
                cardElement.innerHTML = 
                `
                    <p class="hp">
                        <span>HP</span>
                        ${pokemon.Hp}
                    </p>
                    <img src=${pokemon.Bild} />
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
                // Fügen Sie die Karte zum Container hinzu
                pokemonCardsContainer.appendChild(cardElement);
            });
        } else {
            // Wenn keine Pokémon-Karten gefunden wurden
            pokemonCardsContainer.innerHTML = "<p>Keine Pokémon-Karten gefunden.</p>";
        }
    } catch (error) {
        // Fehlerbehandlung
        console.error("Fehler beim Abrufen der Pokémon-Karten:", error);
        alert("Fehler beim Abrufen der Pokémon-Karten.");
    }
};

// Rufen Sie die Funktion auf, um die Karten zu laden
loadUserPokemonCards();
