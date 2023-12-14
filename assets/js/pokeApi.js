const pokeApi = {
  getPokemonsApi: async function (offset = 0, limit = 10) {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

      const req = await fetch(url);
      const bodyJson = await req.json();
      const pokemons = bodyJson.results;
      const pokemonsDetails = await this.getPokemonsDetail(pokemons);

      return pokemonsDetails;
    } catch (error) {
      console.log("Error" + error);
    }
  },

  getPokemonsDetail: async function(pokemons) {
    const pokemonsDetails = await Promise.all(
      pokemons.map(this.fetchPokemonDetail)
    );
    return pokemonsDetails;
  },

  fetchPokemonDetail: async function(pokemon) {
    const pokemonReq = await fetch(pokemon.url);
    return pokemonReq.json();
  }
};