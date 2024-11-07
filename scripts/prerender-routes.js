const TOTAL_POKEMONS = 151;
const NUMBER_OF_PAGES_TO_ADD = 20;

//funcion anonima autoejecutable
( async () =>
{
  const fs = require('fs');

  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  const pokemonsPages= Array.from({ length: NUMBER_OF_PAGES_TO_ADD }, (_, i) => i + 1);

 let fileContent

 let ids= pokemonIds.map(
  id => `/pokemons/${id}`
 ).join('\n')

 let pages= pokemonsPages.map(
  page => `/pokemons/page/${page}`
 ).join('\n')

 //Links por nombre del pokemon
 const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`)
 .then(res => res.json())

 const pokemonNameToAdd = pokemonNameList.results.map(
  pokemon => `/pokemons/${pokemon.name}`
 ).join('\n')

 fileContent = ids + '\n' + pages + '\n' + pokemonNameToAdd;

 fs.writeFileSync('routes.txt', fileContent);

  console.log('routes.txt created now');
})();
