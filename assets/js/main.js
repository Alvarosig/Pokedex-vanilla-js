const pokemonOl = document.querySelector("#pokemonLi");

async function getPokemonsApi() {
  try {
    const offset = 0;
    const limit = 10;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    const req = await fetch(url);
    const bodyJson = await req.json();
    const pokemons = await bodyJson.results;

    for (let i = 0; i < pokemons.length; i++) {
      const pokemon = pokemons[i];
      pokemonOl.innerHTML += convertPokemonToLi(pokemon);
    }
  } catch (error) {
    console.log("Error" + error);
  }
}

function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon">

    <span class="number">#001</span>
    <span class="name">${pokemon.name}</span>

   <div class="detail">

    <ol class="types">
      <li class="type">Folha</li>
      <li class="type">Veneno</li>
    </ol>

    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" 
    alt="${pokemon.name}">
    
    </div>
  </li>
  `;
}

getPokemonsApi();
