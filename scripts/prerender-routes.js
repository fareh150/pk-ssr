const TOTAL_POKEMONS = 10;
const NUMBER_OF_PAGES_TO_ADD = 10;

//funcion anonima autoejecutable
( async () =>
{
  const fs = require('fs');

  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  const pokemonsPages= Array.from({ length: NUMBER_OF_PAGES_TO_ADD }, (_, i) => i + 1);

 let fileContent

 let ids= pokemonIds.map(
  id => `/pokemon/${id}`
 )

 let pages= pokemonsPages.map(
  page => `/pokemons/page/${page}`
 )

 fileContent = ids.join('\n') + '\n' + pages.join('\n');

 fs.writeFileSync('routes.txt', fileContent);

  console.log('routes.txt created now');
})();
