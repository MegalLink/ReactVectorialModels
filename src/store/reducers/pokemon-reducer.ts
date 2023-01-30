import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { GetPokemonResponse } from "../../interfaces/get-pokemon-response";
import { GetPokemonsResponse } from "../../interfaces/get-pokemons-response";
import { PokemonAppState } from "../../interfaces/app-state";
import { BasicModal } from "../../interfaces/basic-modal";
import {
  deleteLocalPokemon,
  getLocalPokemons,
  setLocalPokemon,
} from "../../local-storage/local-storage";

const localSavedPokemons = getLocalPokemons();
const defaultPokemon: GetPokemonResponse = {
  height: 0,
  id: 0,
  name: "",
  weight: 0,
  sprites: { other: { dream_world: { front_default: "" } } },
  stats: [],
  types: [],
};
export const defaultBasicModal: BasicModal = {
  handlePrimaryButton: () => {},
  handleSecondaryButton: () => {},
  title: "",
  description: "",
  primaryBtnText: "",
  secondaryBtnText: "",
  isOpen: false,
};

const initialState: PokemonAppState = {
  pokemonsList: [],
  savedPokemons: localSavedPokemons,
  pokemonToEdit: defaultPokemon,
  basicModal: defaultBasicModal,
};

export const getPokemons = createAsyncThunk<GetPokemonsResponse>(
  "getPokemons",
  async () => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=5&offset=0`
    );
    return response.data;
  }
);

export const getPokemonByName = createAsyncThunk<GetPokemonResponse, string>(
  "getPokemonByName",
  async (name: string) => {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name}`
    );
    return response.data;
  }
);

export const getPokemonByUrl = createAsyncThunk<GetPokemonResponse, string>(
  "getPokemon",
  async (url: string) => {
    const response = await axios.get<GetPokemonResponse>(url);
    return response.data;
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    deletePokemon(state, action) {
      deleteLocalPokemon(action.payload);
      state.savedPokemons = getLocalPokemons();
    },
    setBasicModal(state, action) {
      state.basicModal = action.payload;
    },
    resetPokemonToEdit(state) {
      state.pokemonToEdit = defaultPokemon;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.fulfilled, (state: PokemonAppState, action) => {
        state.pokemonsList = action.payload.results;
      })
      .addCase(getPokemonByUrl.fulfilled, (state, action) => {
        setLocalPokemon(action.payload);
        state.savedPokemons = getLocalPokemons();
      })
      .addCase(getPokemonByName.fulfilled, (state, action) => {
        state.pokemonToEdit = action.payload;
      });
  },
});

export const { deletePokemon, resetPokemonToEdit } = pokemonSlice.actions;
export default pokemonSlice.reducer;
