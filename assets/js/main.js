const pokemonOl = document.querySelector("#pokemonLi");

function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon">

    <span class="number">#${pokemon.order}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">

    <ol class="types">
      ${convertPokemonTypesToLi(pokemon.types).join('')}
    </ol>

    <img src="${pokemon.sprites.other.dream_world.front_default}" 
    alt="${pokemon.name}">
    
    </div>
  </li>
  `;
}

function convertPokemonTypesToLi(pokemonTypes) {
  return pokemonTypes.map((typeSlot) => `<li class="type">${typeSlot.type.name}</li>`)
}

pokeApi.getPokemonsApi().then((pokemons = []) => {
  if (pokemons) {

    pokemonOl.innerHTML += pokemons.map(convertPokemonToLi).join("");

  } else {
    console.log("No pokemons returned from the API");
  }
});