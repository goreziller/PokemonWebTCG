const typeColor = 
{
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

const raritys = 
{
  common: 0.4,
  uncommon: 0.3,
  rare: 0.15,
  epic: 0.1,
  legendary: 0.05
};

const rarityStyles = 
{
  common: 
  {
    borderColor: "#bebebe",
  },
  uncommon: {
    borderColor: "#00ff00", 
  },
  rare:{
    borderColor: "#f0f8ff"
  },
  epic: {
    borderColor: "#a020f0",
  },
  legendary: 
  {
    borderColor: "#ffffe0",
  }
};

const epicPokemonNames = 
[
  "mew", "celebi", "jirachi", "deoxys-normal", "manaphy", "phione", "darkrai", "shaymin", "arceus",
  "victini", "keldeo", "meloetta", "genesect", "diancie", "hoopa", "volcanion", "magearna", "marshadow",
  "zeraora", "meltan", "melmetal", "zarude"
]

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

const btn = document.getElementById("btn");
let selectedPokemonIds = [];
let loadedPokemonData = []; 

const getPokemonRarity = (pokemon) => 
{
  if(epicPokemonNames.includes(pokemon.Name.toLowerCase()))
  {
    return 'epic';
  }
  else if (legendaryPokemonNames.includes(pokemon.Name.toLowerCase())) 
  {
    return 'legendary';
  }
  
  return 'common'; // Standardrarität
};

let getPokeData = async () =>
{
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = '';

  try 
  {
    const response = await fetch("getPokemonData.php");
    const data = await response.json();

    console.log("Fetched Pokémon data: ", data);

    if (data && Array.isArray(data)) 
    {
      loadedPokemonData = data;
      data.forEach(pokemon => 
      {
        if (pokemon) 
        {
          generateCard(pokemon);
        } 
        else 
        {
          console.error("Invalid Pokémon data:", pokemon);
        }
      });
    } 
    else 
    {
      console.error("Failed to fetch Pokémon data.");
    }
  } 
  catch (error) 
  {
    console.error("Error fetching data:", error);
  }
};

const addSelectedPokemonToDatabase = async () => 
{
  if (selectedPokemonIds.length === 0) 
  {
    alert("Bitte wähle mindestens ein Pokémon aus.");
    return;
  }

  console.log("Selected Pokémon IDs:", selectedPokemonIds);

  const selectedPokemonData = [];

  for (const id of selectedPokemonIds) 
  {
    const pokemon = loadedPokemonData.find(p => parseInt(p.ID) === parseInt(id));

    console.log(`Suche Pokémon mit ID: ${id}`, pokemon);
    
    if (pokemon) 
    {
      const pokemonData = 
      {
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
    } 
    else 
    {
      console.error(`Pokémon mit ID ${id} nicht in den geladenen Daten gefunden.`);
    }
  }

  if (selectedPokemonData.length === 0) 
  {
    alert("Es konnten keine Pokémon-Daten gefunden werden.");
    return;
  }

  fetch("pokemonIntoDatabase.php", 
  {
    method: "POST",
    headers: 
    {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ pokemonData: selectedPokemonData })
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
      selectedPokemonIds = [];
    }
  })
  .catch(error => 
  {
    console.error("Fehler beim Hinzufügen der Pokémon:", error);
    alert("Fehler beim Hinzufügen der Pokémon.");
  });
};

let generateCard = (data) => 
{
  const hp = data.Hp || "N/A"; 
  const imgSrc = data.Bild || "default-image.png"; 
  const pokeName = data.Name || "Unknown Pokémon";
  const statAttack = data.Attack || "N/A";
  const statDefense = data.Defense || "N/A";
  const statSpeed = data.Speed || "N/A";

  const rarity = getPokemonRarity(data); // Rarität des Pokémon bestimmen

  const card = document.createElement("div");
  card.classList.add("card");

  card.style.borderColor = rarityStyles[rarity].borderColor;

  if (legendaryPokemonNames.includes(pokeName.toLowerCase())) 
  {
    card.classList.add("rainbow-box");
  }

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

  const types = [data.Type1, data.Type2].filter(Boolean);
  appendTypes(types, card);
  styleCard(types, card);

  card.addEventListener("click", () => 
  {
    card.classList.toggle("selected"); 
    const pokemonId = data.ID; 
    if (card.classList.contains("selected")) 
    {
      selectedPokemonIds.push(pokemonId); 
    } 
    else 
    {
      selectedPokemonIds = selectedPokemonIds.filter(id => id !== pokemonId);
    }
  });

  document.getElementById("card-container").appendChild(card);
};

let appendTypes = (types, card) => 
{
  const typesContainer = card.querySelector(".types");
  typesContainer.innerHTML = ''; 
  types.forEach((item) => 
  {
    let span = document.createElement("SPAN");
    span.textContent = item; 
    typesContainer.appendChild(span);
  });
};

let styleCard = (types, card) => 
{
  if (types.length === 2) 
  {
    const primaryColor = typeColor[types[0].toLowerCase()];
    const secondaryColor = typeColor[types[1].toLowerCase()];
    card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, ${secondaryColor} 36%)`;
  } 
  else 
  {
    const primaryColor = typeColor[types[0].toLowerCase()];
    card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, #ffffff 36%)`;
  }

  const typeSpans = card.querySelectorAll(".types span");
  typeSpans.forEach((typeSpan, index) => {
    const color = typeColor[types[index].toLowerCase()];
    typeSpan.style.backgroundColor = color;
  });
};

btn.addEventListener("click", () => 
{
  addSelectedPokemonToDatabase(); 
});

const backBtn = document.getElementById("back-btn");
backBtn.addEventListener("click", () => 
{
  window.location.href = "main.php";
});

getPokeData();