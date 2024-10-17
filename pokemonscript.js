const typeColor = {
  normal: "#a8a77a",
  grass: "#7ac74c",
  fire: "#ee8130",
  water: "#6390f0",
  bug: "#a6b91a",
  dragon: "#6f35fc",
  electric: "#f7d02c",
  fairy: "#d685ad",
  fighting: "#c22e28",
  flying: "#a98ff3",
  ground: "#e2bf65",
  ghost: "#735797",
  ice: "#96d9d6",
  poison: "#a33ea1",
  psychic: "#f95587",
  rock: "#b6a136",
  steel: "#b7b7ce",
  dark: "#705746",
};

const legendaryPokemonNames = [
  "articuno", "zapdos", "moltres", "mewtwo", "mew", "raikou", "entei", "suicune", "lugia", "ho-oh",
  "regirock", "regice", "registeel", "latios", "latias", "kyogre", "groudon", "rayquaza",
  "uxie", "mesprit", "azelf", "dialga", "palkia", "heatran", "giratina", "cresselia", "regigigas",
  "cobalion", "terraktion", "virizion", "tornadus", "thundurus", "reshiram", "zekrom", "landorus", "kyurem",
  "keldeo", "xerneas", "yveltal", "zygarde", "tapu koko", "tapu lele", "tapu bulu", "tapu fini", "cosmog",
  "cosmoem", "solgaleo", "lunala", "necrozma", "zacian", "zamazenta", "eternatus", "kabfu", "urshifu",
  "glastrier", "spectrier", "calyrex", "regieleki", "regidrago", "enamorus"
];

const btn = document.getElementById("btn");
let selectedPokemonIds = []; // Array to store selected Pokémon IDs
let loadedPokemonData = []; // Hier werden die geladenen Pokémon-Daten gespeichert

// Function to fetch Pokémon data from the database
let getPokeData = async () => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ''; // Clear the card container

  try {
    const response = await fetch("getPokemonData.php"); // API endpoint
    const data = await response.json();

    // Log the fetched data for verification
    console.log("Fetched Pokémon data: ", data);

    // Check if the fetched data is an array
    if (data && Array.isArray(data)) {
      loadedPokemonData = data;
      data.forEach(pokemon => {
        if (pokemon) {
          generateCard(pokemon); // Generate a card for each Pokémon
        } else {
          console.error("Invalid Pokémon data:", pokemon);
        }
      });
    } else {
      console.error("Failed to fetch Pokémon data.");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// Funktion zum Hinzufügen ausgewählter Pokémon zur Datenbank
const addSelectedPokemonToDatabase = async () => {
  if (selectedPokemonIds.length === 0) {
    alert("Bitte wähle mindestens ein Pokémon aus.");
    return;
  }

  console.log("Selected Pokémon IDs:", selectedPokemonIds); // Debugging: IDs der ausgewählten Pokémon

  // Array, um die ausgewählten Pokémon-Daten zu speichern
  const selectedPokemonData = [];

  // Iteriere über die IDs der ausgewählten Pokémon
  for (const id of selectedPokemonIds) {
    // Wandelt die ID in eine Zahl um, falls nötig, um sicherzustellen, dass der Vergleich korrekt ist
    const pokemon = loadedPokemonData.find(p => parseInt(p.ID) === parseInt(id));

    console.log(`Suche Pokémon mit ID: ${id}`, pokemon); // Debugging: Ausgabe der gesuchten ID und des gefundenen Pokémon
    
    if (pokemon) {
      const pokemonData = {
        name: pokemon.Name,
        bild: pokemon.Bild,
        hp: pokemon.Hp,
        attack: pokemon.Attack,
        defense: pokemon.Defense,
        speed: pokemon.Speed,
        type1: pokemon.Type1,
        type2: pokemon.Type2
      };
      selectedPokemonData.push(pokemonData);
    } else {
      console.error(`Pokémon mit ID ${id} nicht in den geladenen Daten gefunden.`);
    }
  }

  // Wenn keine Pokémon-Daten gefunden wurden, Fehlermeldung anzeigen
  if (selectedPokemonData.length === 0) {
    alert("Es konnten keine Pokémon-Daten gefunden werden.");
    return;
  }

  // POST-Anfrage an die PHP-Datei senden
  fetch("pokemonIntoDatabase.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pokemonData: selectedPokemonData }) // Sende die Pokémon-Daten an die PHP-Datei
  })
  .then(response => response.json())
  .then(data => {
    if (data.error) {
      console.error("Fehler beim Hinzufügen der Pokémon:", data.error);
      alert("Fehler beim Hinzufügen der Pokémon: " + data.error);
    } else {
      console.log("Pokémon erfolgreich hinzugefügt:", data.message);
      alert("Pokémon erfolgreich hinzugefügt!");
      selectedPokemonIds = []; // Leere die Liste nach dem Hinzufügen
    }
  })
  .catch(error => {
    console.error("Fehler beim Hinzufügen der Pokémon:", error);
    alert("Fehler beim Hinzufügen der Pokémon.");
  });
};

// Generate the Pokémon card
let generateCard = (data) => {
  const hp = data.Hp || "N/A"; // Check if HP exists
  const imgSrc = data.Bild || "default-image.png"; // Use the 'Bild' property or a placeholder
  const pokeName = data.Name || "Unknown Pokémon"; // Use the 'Name' property or a fallback
  const statAttack = data.Attack || "N/A";
  const statDefense = data.Defense || "N/A";
  const statSpeed = data.Speed || "N/A";
  const pokeID = data.ID || "N/A"; // Add the ID as well

  // Create a new card element
  const card = document.createElement("div");
  card.classList.add("card");

  if (legendaryPokemonNames.includes(pokeName.toLowerCase())) {
    card.classList.add("rainbow-box"); // Add rainbow-box class for legendary Pokémon
  }

  // Set the inner HTML of the card
  card.innerHTML = `
    <p class="hp">
      <span>HP</span>
      ${hp}
    </p>
    <img src="${imgSrc}" alt="${pokeName} image" />
    <h2 class="poke-name">${pokeName}</h2>
    <div class="types"></div>
    <div class="stats">
        <div>
            <h3>${statAttack}</h3>
            <p>Attack</p>
        </div>
        <div>
            <h3>${statDefense}</h3>
            <p>Defense</p>
        </div>
        <div>
            <h3>${statSpeed}</h3>
            <p>Speed</p>
        </div>
    </div>
  `;

  // Add types and styling
  const types = [data.Type1, data.Type2].filter(Boolean); // Filter out null or empty values
  appendTypes(types, card);
  styleCard(types, card);

  // Add a click event listener to the card
  card.addEventListener("click", () => {
    card.classList.toggle("selected"); // Toggle the selected state
    const pokemonId = data.ID; // Use the ID from the data
    if (card.classList.contains("selected")) {
      selectedPokemonIds.push(pokemonId); // Add ID to the list
    } else {
      selectedPokemonIds = selectedPokemonIds.filter(id => id !== pokemonId); // Remove ID from the list
    }
  });

  // Append the new card to the card container
  document.getElementById("card-container").appendChild(card);
};


// Function to append types to the card
let appendTypes = (types, card) => {
  const typesContainer = card.querySelector(".types");
  typesContainer.innerHTML = ''; // Clear previous types
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item; // Set the type
    typesContainer.appendChild(span);
  });
};

// Function to style the card based on the Pokémon's types
let styleCard = (types, card) => {
  if (types.length === 2) {
    const primaryColor = typeColor[types[0].toLowerCase()];
    const secondaryColor = typeColor[types[1].toLowerCase()];
    card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, ${secondaryColor} 36%)`;
  } else {
    const primaryColor = typeColor[types[0].toLowerCase()];
    card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, #ffffff 36%)`;
  }

  const typeSpans = card.querySelectorAll(".types span");
  typeSpans.forEach((typeSpan, index) => {
    const color = typeColor[types[index].toLowerCase()];
    typeSpan.style.backgroundColor = color;
  });
};

// Event listener for adding selected Pokémon to the database
btn.addEventListener("click", () => {
  addSelectedPokemonToDatabase(); // Example: Function to add Pokémon
});

const backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", () => {
  window.location.href = "main.php";
});

// Initialize the Pokémon data
getPokeData();
