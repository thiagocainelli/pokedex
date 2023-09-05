const pokeContainer = document.querySelector('#pokeContainer'); // Localizando o container que ficarão os cards
const pokemonCount = 150 // Quantidade de pokemons que queremos exibir (total são 1281)

// Objeto colors que terá como key = os tipos /e/ como value = as cores.
const colors = { 
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'    
}

// Salvando os tipos usando a key do objeto colors:
const mainTypes = Object.keys(colors) 



// Percorrendo pelos ids e pegando cada um deles
async function fetchPokemons() {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)
    }
}



// Função para consumir a PokeAPI completa:
async function getPokemons (id) {
    const response = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemons = await response.json()

    createPokemonCard(pokemons)
}


// Função para criar os cards dos pokemons:
function createPokemonCard (poke) {
    const card = document.createElement('div')
    card.classList.add('pokemon')

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors[type]

    card.style.backgroundColor = color

    const pokemonInnerHTML = `
    <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png"alt="${name}"> 
    </div>
    <div class="info">
        <span class="number">#${id}</span>
        <h3 class="name">${name}</h3>
        <small class="type">Type: <span><strong>${type}</strong></span></small>
    </div>
    `

    card.innerHTML = pokemonInnerHTML
    pokeContainer.appendChild(card)
}



fetchPokemons()