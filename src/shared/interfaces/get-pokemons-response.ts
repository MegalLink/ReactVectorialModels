export interface PokemonInfo {
  name: string
  url: string
}

export interface GetPokemonsResponse {
  count: number
  next: string
  previous?: string
  results: PokemonInfo[]
}
