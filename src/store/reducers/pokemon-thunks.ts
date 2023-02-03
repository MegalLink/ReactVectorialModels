import { createAsyncThunk } from '@reduxjs/toolkit'
import { GetPokemonResponse } from '../../shared/interfaces/get-pokemon-response'
import { GetPokemonsResponse } from '../../shared/interfaces/get-pokemons-response'
import axios from '../../shared/utils/axios'

export const getPokemons = createAsyncThunk<GetPokemonsResponse>('getPokemons', async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=5&offset=0')
  return response.data
})

export const getPokemonByName = createAsyncThunk<GetPokemonResponse, string>(
  'getPokemonByName',
  async (name: string) => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return response.data
  },
)

export const getPokemonByUrl = createAsyncThunk<GetPokemonResponse, string>(
  'getPokemon',
  async (url: string) => {
    const response = await axios.get<GetPokemonResponse>(url)
    return response.data
  },
)
