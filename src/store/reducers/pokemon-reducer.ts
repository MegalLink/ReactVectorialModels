import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { GetPokemonResponse } from '../../shared/interfaces/get-pokemon-response'
import { PokemonAppState } from '../../shared/interfaces/app-state'
import { BasicModal } from '../../shared/interfaces/basic-modal'
import {
  deleteLocalPokemon,
  getLocalPokemons,
  setLocalPokemon,
} from '../../shared/utils/local-storage/pokemon'
import SnackbarUtil from '../../shared/utils/snack-bar'
import { getPokemonByName, getPokemonByUrl, getPokemons } from './pokemon-thunks'

const localSavedPokemons = getLocalPokemons()
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
  handlePrimaryButton: () => {},
  handleSecondaryButton: () => {},
  title: '',
  description: '',
  primaryBtnText: '',
  secondaryBtnText: '',
  isOpen: false,
}

export const initialState: PokemonAppState = {
  pokemonsList: [],
  savedPokemons: localSavedPokemons,
  pokemonToEdit: defaultPokemon,
  basicModal: defaultBasicModal,
}

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    deletePokemon(state, action: PayloadAction<GetPokemonResponse>) {
      deleteLocalPokemon(action.payload)
      state.savedPokemons = getLocalPokemons()
    },
    setBasicModal(state, action: PayloadAction<BasicModal>) {
      state.basicModal = action.payload
    },
    resetPokemonToEdit(state) {
      state.pokemonToEdit = defaultPokemon
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.fulfilled, (state: PokemonAppState, action) => {
        state.pokemonsList = action.payload.results
        SnackbarUtil.success('Success 🎉')
      })
      .addCase(getPokemonByUrl.fulfilled, (state, action) => {
        setLocalPokemon(action.payload)
        state.savedPokemons = getLocalPokemons()
      })
      .addCase(getPokemonByName.fulfilled, (state, action) => {
        state.pokemonToEdit = action.payload
      })
  },
})

export const { deletePokemon, resetPokemonToEdit, setBasicModal } = pokemonSlice.actions
export default pokemonSlice.reducer
