const pokeApi = {
  getPokemonsApi: async function (offset = 0, limit = 8) {
    try {
      const pokemons = await this.fetchPokemons(offset, limit);
      const pokemonsDetails = await this.fetchDetailsForAllPokemons(pokemons);

      return pokemonsDetails;
    } catch (error) {
      console.log("Error" + error);
    }
  },

  searchPokemonsApi: async function (searchValue, offset = 0, limit = 151) {
    try {
      const pokemons = await this.fetchPokemons(offset, limit);
      const filteredPokemons = pokemons.filter(pokemon => {
        const name = pokemon.name.toUpperCase();
        return name.includes(searchValue.toUpperCase());
      });
      const pokemonsDetails = await this.fetchDetailsForAllPokemons(filteredPokemons);

      return pokemonsDetails;
    } catch (error) {
      console.log("Error" + error);
    }
  },

  fetchPokemons: async function(offset, limit) {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const req = await fetch(url);
    const bodyJson = await req.json();
    return bodyJson.results;
  },

  fetchDetailsForAllPokemons: async function(pokemons) {
    return Promise.all(pokemons.map(pokemon => this.fetchPokemonDetail(pokemon)));
  },

  fetchPokemonDetail: async function(pokemon) {
    const pokemonReq = await fetch(pokemon.url);
    const response =  await pokemonReq.json();
    return this.convertPokeApiDetailToPokemon(response);
  },

  convertPokeApiDetailToPokemon: function (pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    pokemon.type = pokemon.types[0];
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
    pokemon.height = pokeDetail.height;
    pokemon.weight = pokeDetail.weight;
    pokemon.abilities = pokeDetail.abilities.map((abilitiesSlot) => abilitiesSlot.ability.name)
    return pokemon;
  }
};