export const APP_ROUTE = {
  INDEX: '/',
  CREATE_POKEMON: 'create',
  UPDATE_POKEMON: 'update/:pokemonId',
  UPDATE_POKEMON_NAVIGATE: (pokemonId: string) => `update/${pokemonId}`,
}
