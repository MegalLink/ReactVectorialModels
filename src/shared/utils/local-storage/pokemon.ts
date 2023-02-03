import { GetPokemonResponse } from '../../interfaces/get-pokemon-response'

enum LocalStorageKeys {
  POKEMON_INFO = 'pokemon/pokemon-response',
}

export const getLocalPokemons = (): GetPokemonResponse[] => {
  const emptyListring = '[]'
  return JSON.parse(localStorage.getItem(LocalStorageKeys.POKEMON_INFO) ?? emptyListring)
}

export const setLocalPokemon = (newValue: GetPokemonResponse) => {
  const currentValues: GetPokemonResponse[] = getLocalPokemons()
  const exist = currentValues.find((value) => JSON.stringify(value) === JSON.stringify(newValue))

  if (!exist) {
    currentValues.push(newValue)
  }

  localStorage.setItem(LocalStorageKeys.POKEMON_INFO, JSON.stringify(currentValues))
}

export const deleteLocalPokemon = (deleteValue: GetPokemonResponse) => {
  const currentValues: GetPokemonResponse[] = getLocalPokemons()
  const filteredValues = currentValues.filter(
    (value) => JSON.stringify(value) !== JSON.stringify(deleteValue),
  )

  localStorage.setItem(LocalStorageKeys.POKEMON_INFO, JSON.stringify(filteredValues))
}
