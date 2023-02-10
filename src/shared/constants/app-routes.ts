export const APP_ROUTE = {
  index: '/',
  createPokemon: 'create',
  updatePokemon: 'update/:pokemonId',
  updatePokemonNavigate: (pokemonId: string) => `update/${pokemonId}`,
}
