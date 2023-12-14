const pokemonOl = document.querySelector("#pokemonLi");

pokeApi.getPokemonsApi().then((pokemons) => {
  if (pokemons) {
    for (let i = 0; i < pokemons.length; i++) {
      const pokemon = pokemons[i];
      pokemonOl.innerHTML += convertPokemonToLi(pokemon);
    }
  } else {
    console.log("No pokemons returned from the API");
  }
});

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
