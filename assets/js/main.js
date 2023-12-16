const pokemonOl = document.querySelector("#pokemonLi");
const loadMore = document.querySelector("#loadMore");
const search = document.querySelector("#search");
const buttonSearch = document.querySelector("#search-btn");
const rollBtn = document.querySelector("#roll-btn");
const dialog = document.querySelector("#pokemonDialog");

const limit = 8;
let offset = 0;

let allPokemons = []; // Array global para armazenar todos os Pokémons

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

function openModalWithPokemon(pokemon) {
  // Cria um novo elemento de diálogo
  const dialog = document.createElement('dialog');
  dialog.setAttribute('id', 'pokemonDialog');
  dialog.setAttribute('class', 'dialog');
  dialog.setAttribute('open', '');

  // Preenche o diálogo com as informações do Pokémon
  dialog.innerHTML = `
    <div class="modal-content">
        <div class="close-box">
            <button id="closeDialog" class="closeDialog">
                <i class="fa-solid fa-xmark"></i>
            </button>
            <h2 id="pokemonName">${pokemon.name}</h2>
        </div>
        <ol class="types">
           ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join("")}
         </ol>
        <img id="pokemonImage" src="${pokemon.photo}" alt="${pokemon.name}" class="${pokemon.type}">

        <div class = "info" style="display : flex; justify-content: space-around">
          <div class="key">
            <p class="poke-id">
            <span class="id">ID</span>
            </p>
            <p id="poke-height">
            <span class="height">Height</span>
            </p>
            <p class="poke-weight">
            <span class="weight">Weight</span>
            </p>
            <p class="poke-abilities">
              <span class="abilities">Abilities</span>
            </p>
          </div>

          <div class="value">
            <p>#${pokemon.id}</p>
            <p>${pokemon.height} ft</p>
            <p>${pokemon.weight} lbs</p>
            <p style="text-transform: capitalize">${pokemon.abilities.map(ability => ability).join(", ")} </p>
          </div>
        </div>
    </div>
  `;

  // Adiciona o diálogo ao corpo do documento
  document.body.appendChild(dialog);

  // Adiciona um evento de clique ao botão de fechar para remover o diálogo
  document.querySelector("#closeDialog").addEventListener("click", () => {
    dialog.remove();
  });
}

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemonsApi(offset, limit).then((pokemons = []) => {
    if (pokemons) {
      allPokemons = allPokemons.concat(pokemons); // Adiciona os novos Pokémons ao array global
      const newHtml = pokemons.map(convertPokemonToLi).join("");
      pokemonOl.innerHTML += newHtml;

      // Adiciona um evento de clique a cada item da lista de Pokémon
      document.querySelectorAll(".pokemon").forEach((pokemonLi, index) => {
        pokemonLi.addEventListener("click", () => {
          openModalWithPokemon(allPokemons[index]);
        });
      });
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