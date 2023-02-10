import { BasicModal } from '../interfaces/basic-modal'
import { GetPokemonResponse } from '../interfaces/get-pokemon-response'

export const defaultPokemon: GetPokemonResponse = {
  height: 0,
  id: 0,
  name: '',
  weight: 0,
  sprites: { other: { dream_world: { front_default: '' } } },
  stats: [],
  types: [],
}

export const defaultBasicModal: BasicModal = {
  isOpen: false,
}
