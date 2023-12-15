const pokemonOl = document.querySelector("#pokemonLi");
const loadMore = document.querySelector("#loadMore");
const search = document.querySelector("#search");
const buttonSearch = document.querySelector("#search-btn");
const rollBtn = document.querySelector("#roll-btn");
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

buttonSearch.addEventListener("click", async () => {
  const searchValue = document.querySelector("#search").value?.trim();
  const response = !!searchValue ? await pokeApi.searchPokemonsApi(searchValue) : await pokeApi.getPokemonsApi(offset, limit)
  const newHtml = response.map(convertPokemonToLi).join("");
  pokemonOl.innerHTML = newHtml;
  loadMore.disabled = true;
});

rollBtn.addEventListener("click", async () => {
  if(buttonSearch){
    const pokemons = await pokeApi.getPokemonsApi(offset, limit);
    const newHtml = pokemons.map(convertPokemonToLi).join("");
    pokemonOl.innerHTML = newHtml;
  }
})