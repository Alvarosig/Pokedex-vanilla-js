const pokemonOl = document.querySelector("#pokemonLi");
const loadMore = document.querySelector("#loadMore");
const limit = 8;
let offset = 0;

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
function loadPokemonItems(offset, limit) {
  pokeApi.getPokemonsApi(offset, limit).then((pokemons = []) => {
    if (pokemons) {
      const newHtml = pokemons.map(convertPokemonToLi).join("");
      pokemonOl.innerHTML += newHtml;

    } else {
      console.log("No pokemons returned from the API");
    }
  });
}

loadPokemonItems(offset, limit);

loadMore.addEventListener("click", () => {
  offset += limit;
  loadPokemonItems(offset, limit);
});