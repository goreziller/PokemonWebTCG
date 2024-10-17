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

const legendaryPokemonNames = 
[
  "articuno", "zapdos", "moltres", "mewtwo", "mew", "raikou", "entei", "suicune", "lugia", "ho-oh",
  "regirock", "regice", "registeel", "latios", "latias", "kyogre", "groudon", "rayquaza",
  "uxie", "mesprit", "azelf", "dialga", "palkia", "heatran", "giratina", "cresselia", "regigigas",
  "cobalion", "terraktion", "virizion", "tornadus", "thundurus", "reshiram", "zekrom", "landorus", "kyurem",
  "keldeo", "xerneas", "yveltal", "zygarde", "tapu koko", "tapu lele", "tapu bulu", "tapu fini", "cosmog",
  "cosmoem", "solgaleo", "lunala", "necrozma", "zacian", "zamazenta", "eternatus", "kabfu", "urshifu",
  "glastrier", "spectrier", "calyrex", "regieleki", "regidrago", "enamorus"
];

const url = "https://pokeapi.co/api/v2/pokemon/";
const btn = document.getElementById("btn");

let selectedPokemonIds = []; // Array zum Speichern der ausgewählten Pokémon-IDs

let getPokeData = () => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = ''; // Leere den Kartencontainer

  // Generiere zufällige IDs für Pokémon
  let ids = Array.from({ length: 6 }, () => Math.floor(Math.random() * 1000) + 1);

  // Fetch die Daten für die Pokémon
  ids.forEach(id => {
    const finalUrl = url + id;
    fetch(finalUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          generateCard(data);
        }
      });
  });
};

// Generiere die Karte
let generateCard = (data) => {
  const hp = data.stats[0].base_stat;
  const imgSrc = data.sprites.other.dream_world.front_default;
  const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
  const statAttack = data.stats[1].base_stat;
  const statDefense = data.stats[2].base_stat;
  const statSpeed = data.stats[5].base_stat;

  // Erstelle ein neues Karten-Element
  const card = document.createElement("div");
  card.classList.add("card");

  if (legendaryPokemonNames.includes(data.name.toLowerCase())) {
    card.classList.add("rainbow-box"); // Füge die rainbow-box Klasse hinzu
  }

  // Setze den Inhalt der Karte
  card.innerHTML = `
    <p class="hp">
        <span>HP</span>
        ${hp}
    </p>
    <img src=${imgSrc} />
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
  appendTypes(data.types, card);
  styleCard(data.types, card);

  // Füge Click-Event-Listener zur Karte hinzu
  card.addEventListener("click", () => {
    card.classList.toggle("selected"); // Toggle die Markierung
    const pokemonId = data.id; // ID des Pokémon
    if (card.classList.contains("selected")) {
      selectedPokemonIds.push(pokemonId); // Füge ID zur Liste hinzu
    } else {
      selectedPokemonIds = selectedPokemonIds.filter(id => id !== pokemonId); // Entferne ID aus der Liste
    }
  });

  // Füge die neue Karte zum Kartencontainer hinzu
  document.getElementById("card-container").appendChild(card);
};

let appendTypes = (types, card) => {
  const typesContainer = card.querySelector(".types");
  typesContainer.innerHTML = ''; // Leere vorherige Typen
  types.forEach((item) => {
    let span = document.createElement("SPAN");
    span.textContent = item.type.name;
    typesContainer.appendChild(span);
  });
};

let styleCard = (types, card) => {
  if (types.length === 2) {
    const primaryColor = typeColor[types[0].type.name];
    const secondaryColor = typeColor[types[1].type.name];
    card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, ${secondaryColor} 36%)`;
  } else {
    const primaryColor = typeColor[types[0].type.name];
    card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, #ffffff 36%)`;
  }

  const typeSpans = card.querySelectorAll(".types span");
  typeSpans.forEach((typeSpan, index) => {
    const color = typeColor[types[index].type.name];
    typeSpan.style.backgroundColor = color;
  });
};

// Neue Funktion zum Hinzufügen der ausgewählten Pokémon zur Datenbank
const fetchPokemonData = async (pokemonId) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
  const data = await response.json();
  return {
      name: data.name,
      bild: data.sprites.front_default,
      hp: data.stats[0].base_stat,
      attack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      speed: data.stats[5].base_stat
  };
};

const addSelectedPokemonToDatabase = async () => {
  if (selectedPokemonIds.length === 0) {
      alert("Bitte wähle mindestens ein Pokémon aus.");
      return;
  }

  const pokemonDataArray = [];

  for (const id of selectedPokemonIds) {
      const pokemonData = await fetchPokemonData(id);
      pokemonDataArray.push(pokemonData);
  }

  fetch("pokemonIntoDatabase.php", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({ pokemonData: pokemonDataArray })
  })
  .then(response => response.json())
  .then(data => 
    {
      if (data.error) 
      {
          console.error("Fehler beim Hinzufügen der Pokémon:", data.error);
          alert("Fehler beim Hinzufügen der Pokémon: " + data.error);
      } 
      else 
      {
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
const backBtn = document.getElementById("back-btn");

btn.addEventListener("click", () => {
    // Ihre Logik zum Auswählen von Karten
    addSelectedPokemonToDatabase(); // Beispiel: Funktion zum Hinzufügen von Pokémon
});

// Funktion, um zurück zum Hauptmenü zu navigieren
backBtn.addEventListener("click", () => {
    window.location.href = "main.php";
});

getPokeData(); // Erneutes Abrufen der Pokémon-Daten