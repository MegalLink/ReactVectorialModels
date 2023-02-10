import pokemonReducer, {
  deletePokemon,
  dismissModal,
  initialState,
  resetPokemonToEdit,
  setBasicModal,
} from './pokemon-reducer'
import { AnyAction } from '@reduxjs/toolkit'
import { Mock } from 'ts-mockery'
import { GetPokemonResponse } from '../../shared/interfaces/get-pokemon-response'
import { BasicModal } from '../../shared/interfaces/basic-modal'

jest.mock('../../shared/utils/snack-bar')

describe('test apiReducer', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem')
    jest.spyOn(Storage.prototype, 'getItem')
    Storage.prototype.setItem = jest.fn()
    Storage.prototype.getItem = jest.fn()
  })
  it('should return the api initial state', () => {
    expect(pokemonReducer(undefined, {} as AnyAction)).toEqual(initialState)
  })

  it('should deletePokemon from local storage', () => {
    const payload = Mock.of<GetPokemonResponse>({})

    expect(pokemonReducer(initialState, deletePokemon(payload))).toEqual({
      ...initialState,
      savedPokemons: [],
    })
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)
  })

  it('should set basic modal', () => {
    const payload = Mock.of<BasicModal>({ title: 'Hello world' })
    expect(pokemonReducer(initialState, setBasicModal(payload))).toEqual({
      ...initialState,
      basicModal: payload,
    })
  })

  it('should dismiss basic modal', () => {
    expect(pokemonReducer(initialState, dismissModal())).toEqual({
      ...initialState,
    })
  })

  it('should reset pokemon to edit', () => {
    expect(pokemonReducer(initialState, resetPokemonToEdit())).toEqual({
      ...initialState,
    })
  })
})
