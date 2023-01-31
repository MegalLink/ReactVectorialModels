import { GetPokemonResponse } from './get-pokemon-response'
import { PokemonInfo } from './get-pokemons-response'
import { BasicModal } from './basic-modal'
export interface PokemonAppState {
  pokemonsList: PokemonInfo[]
  savedPokemons: GetPokemonResponse[]
  pokemonToEdit: GetPokemonResponse
  basicModal: BasicModal
}
