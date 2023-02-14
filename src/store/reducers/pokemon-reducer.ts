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
import { defaultBasicModal, defaultPokemon } from '../../shared/constants/app-state'

const localSavedPokemons = getLocalPokemons()

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
      // necessary restore first entire modal to avoid combined modals at call
      state.basicModal = defaultBasicModal
      state.basicModal = action.payload
    },
    resetPokemonToEdit(state) {
      state.pokemonToEdit = defaultPokemon
    },
    dismissModal(state) {
      state.basicModal.isOpen = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.fulfilled, (state: PokemonAppState, action) => {
        SnackbarUtil.success('Success 🎉')
        state.pokemonsList = action.payload.results
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

export const { deletePokemon, resetPokemonToEdit, setBasicModal, dismissModal } =
  pokemonSlice.actions
export default pokemonSlice.reducer
