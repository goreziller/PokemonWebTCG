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

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

let getPokeData = () => {
    // Generate a random number between 1 and 150
    let id = Math.floor(Math.random() * 250) + 1;
    // Combine the pokeapi url with pokemon id
    const finalUrl = url + id;
    // Fetch generated URL
    fetch(finalUrl)
        .then((response) => response.json())
        .then((data) => {
            generateCard(data);
        });
};

// Generate Card
let generateCard = (data) => {
    // Get necessary data and assign it to variables
    console.log(data);
    const hp = data.stats[0].base_stat;
    const imgSrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name[0].toUpperCase() + data.name.slice(1);
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;

    // Set themeColor based on pokemon type
    const themeColor = typeColor[data.types[0].type.name];
    console.log(themeColor);
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
    appendTypes(data.types);
    styleCard(data.types);
};

let appendTypes = (types) => {
    types.forEach((item) => {
        let span = document.createElement("SPAN");
        span.textContent = item.type.name;
        document.querySelector(".types").appendChild(span);
    });
};

let styleCard = (types) => {
    // Set background based on the first type
    const primaryColor = typeColor[types[0].type.name];
    card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, #ffffff 36%)`;

    // Style each type span with the corresponding color
    const typeSpans = card.querySelectorAll(".types span");
    typeSpans.forEach((typeSpan, index) => {
        const color = typeColor[types[index].type.name];
        typeSpan.style.backgroundColor = color;
    });
};

btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);