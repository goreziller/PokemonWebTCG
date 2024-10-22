let currentPage = 0;
const cardsPerPage = 6;
let allPokemonCards = [];

const pages = document.querySelectorAll('.page');
const prevButton = document.getElementById('prevButton');
const nextButton = document.getElementById('nextButton');
const navigation = document.getElementById('navigation');
const book = document.querySelector('.book');
const pokemonCardsContainer = document.getElementById("pokemonCardsContainer");

function openBook() 
{
    book.classList.toggle('open');
    if (book.classList.contains('open')) 
    {
        loadUserPokemonCards();
        updatePage();
        navigation.style.display = "flex";
        navigation.classList.add('active');
        book.querySelector('.cover-left').style.transform = 'rotateY(-180deg)';
        book.querySelector('.cover-right').style.transform = 'rotateY(180deg)';
    } 
    else 
    {
        navigation.classList.remove('active');
        navigation.style.display = "none";
        book.querySelector('.cover-left').style.transform = 'rotateY(0deg)';
        book.querySelector('.cover-right').style.transform = 'rotateY(0deg)';
    }
}

function updatePage() 
{
    pages.forEach((page, index) =>
    {
        page.classList.remove('active');
        if (index === currentPage) 
        {
            page.classList.add('active');
            renderCardsForCurrentPage();
        }
    });

    prevButton.disabled = currentPage === 0;
    nextButton.disabled = currentPage === Math.ceil(allPokemonCards.length / cardsPerPage) - 1;

    if (prevButton.disabled) 
    {
        prevButton.classList.add('disabled');
    } 
    else 
    {
        prevButton.classList.remove('disabled');
    }

    if (nextButton.disabled) 
    {
        nextButton.classList.add('disabled');
    } 
    else 
    {
        nextButton.classList.remove('disabled');
    }
}

function nextPage() 
{
    if (currentPage < Math.ceil(allPokemonCards.length / cardsPerPage) - 1) 
    {
        currentPage++;
        updatePage();
    }
}

function prevPage() 
{
    if (currentPage > 0) 
    {
        currentPage--;
        updatePage();
    }
}

function renderCardsForCurrentPage() 
{
    pokemonCardsContainer.innerHTML = "";
    const start = currentPage * cardsPerPage;
    const end = start + cardsPerPage;
    const cardsToShow = allPokemonCards.slice(start, end); 

    cardsToShow.forEach(pokemon => 
    {
        const cardElement = document.createElement("div");
        cardElement.className = "card";
        cardElement.innerHTML = `
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

        const rarity = pokemon.Rarity.toLowerCase();
        if (rarityStyles[rarity]) 
        {
            cardElement.style.borderColor = rarityStyles[rarity].borderColor;
        } 
        else 
        {
            cardElement.style.borderColor = "#000";
        }

        const typeContainer = cardElement.querySelector('.types');
        const types = []; 

        const type1 = document.createElement('span');
        type1.textContent = pokemon.Type1.charAt(0).toUpperCase() + pokemon.Type1.slice(1);
        type1.style.backgroundColor = typeColors[pokemon.Type1.toLowerCase()] || '#000'; 
        type1.style.color = "#fff";
        typeContainer.appendChild(type1);
        types.push({ type: { name: pokemon.Type1.toLowerCase() } });

        if (pokemon.Type2) 
        {
            const type2 = document.createElement('span');
            type2.textContent = pokemon.Type2.charAt(0).toUpperCase() + pokemon.Type2.slice(1);
            type2.style.backgroundColor = typeColors[pokemon.Type2.toLowerCase()] || '#000'; 
            type2.style.color = "#fff";
            typeContainer.appendChild(type2);
            types.push({ type: { name: pokemon.Type2.toLowerCase() } });
        }

        pokemonCardsContainer.appendChild(cardElement);
        styleCard(types, cardElement);
    });
}

const loadUserPokemonCards = async () => 
{
    try 
    {
        const response = await fetch("./getUserPokemon.php", 
        {
            method: "GET",
            headers: 
            {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) 
        {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) 
        {
            console.error("Fehler:", data.error);
            alert("Fehler beim Laden der Pokémon-Karten: " + data.error);
            return;
        }

        allPokemonCards = data.pokemonCards || [];
        currentPage = 0;
        updatePage();

    } 
    catch (error) 
    {
        console.error("Fehler beim Abrufen der Pokémon-Karten:", error);
        alert("Fehler beim Abrufen der Pokémon-Karten: " + error.message);
    }
};

const styleCard = (types, card) => 
{
    if (types.length === 2) 
    {
        const primaryColor = typeColors[types[0].type.name];
        const secondaryColor = typeColors[types[1].type.name];
        card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, ${secondaryColor} 36%)`;
    } 
    else if (types.length === 1) 
    {
        const primaryColor = typeColors[types[0].type.name];
        card.style.background = `radial-gradient(circle at 50% 0%, ${primaryColor} 36%, #ffffff 36%)`;
    } 
    else 
    {
        card.style.background = `#ffffff`;
    }

    const typeSpans = card.querySelectorAll(".types span");
    typeSpans.forEach((typeSpan, index) => 
    {
        if (types[index]) 
        {
            const color = typeColors[types[index].type.name];
            typeSpan.style.backgroundColor = color || '#ffffff';
        }
    });
};

const typeColors = 
{
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

const rarityStyles = 
{
    common: { borderColor: "#bebebe" },
    uncommon: { borderColor: "#1eff00" },
    rare: { borderColor: "#0070dd" },
    epic: { borderColor: "#a335ee" },
    legendary: { borderColor: "#ff8000" }
};

loadUserPokemonCards();