const pokemonOl = document.querySelector("#pokemonLi");

function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon ${pokemon.type}">

    <span class="number">#${pokemon.id}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">

    <ol class="types">
      ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
    </ol>

    <img src="${pokemon.photo}" 
    alt="${pokemon.name}">
    
    </div>
  </li>
  `;
}

//Utilizando a API e manipulando o DOM
pokeApi.getPokemonsApi().then((pokemons = []) => {
  if (pokemons) {

    pokemonOl.innerHTML += pokemons.map(convertPokemonToLi).join("");

  } else {
    console.log("No pokemons returned from the API");
  }
});