const pokeApi = {
  getPokemonsApi: async function (offset = 0, limit = 10) {
    try {
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

      const req = await fetch(url);
      const bodyJson = await req.json();
      const pokemons = await bodyJson.results;

      return pokemons;
    } catch (error) {
      console.log("Error" + error);
    }
  },
};
