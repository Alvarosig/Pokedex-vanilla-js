const pokemonOl = document.querySelector("#pokemonLi");

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

    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" 
    alt="${pokemon.name}">
    
    </div>
  </li>
  `;
}

pokeApi.getPokemonsApi().then((pokemons = []) => {
  if (pokemons) {

    pokemonOl.innerHTML += pokemons.map(convertPokemonToLi).join("");

  } else {
    console.log("No pokemons returned from the API");
  }
});