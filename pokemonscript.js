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

// Function to add Pokémon to the database (if needed)
const addPokemonToDatabase = async (data) => {
  const type1 = data.type1;
  const type2 = data.type2;

  const pokemonData = {
    name: data.Name,
    bild: data.Bild,
    hp: data.Hp,
    attack: data.Attack,
    defense: data.Defense,
    speed: data.Speed,
    type1: type1,
    type2: type2
  };

  await fetch("pokemonIntoDatabase.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pokemonData: pokemonData })
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

// Initialize the Pokémon data
getPokeData();
