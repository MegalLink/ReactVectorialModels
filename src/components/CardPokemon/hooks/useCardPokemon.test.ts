import { renderHook } from '@testing-library/react'
import { GetPokemonResponse } from '../../../shared/interfaces/get-pokemon-response'
import { useCardPokemon, UseCardPokemon } from './useCardPokemon'
import * as ReactRouter from 'react-router-dom'
import * as StoreHooks from '../../../store/store-hook'
import { Mock } from 'ts-mockery'
import { act } from 'react-dom/test-utils'
import { APP_ROUTE } from '../../../shared/constants/app-routes'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

jest.mock('../../../store/store-hook', () => ({
  useAppDispatch: jest.fn(),
}))

describe('Test useCardPokemon hook', () => {
  const pokemon = Mock.of<GetPokemonResponse>({
    name: 'Pikachu',
  })

  const mockStoreHooks = () => {
    const hookSpies = {
      dispatch: jest.fn(),
    }
    jest.spyOn(StoreHooks, 'useAppDispatch').mockReturnValue(hookSpies.dispatch)
    return hookSpies
  }

  const mockReactRouter = () => {
    const hookSpies = {
      navigate: jest.fn(),
    }
    jest.spyOn(ReactRouter, 'useNavigate').mockImplementation(() => hookSpies.navigate)
    return hookSpies
  }

  const renderUseCardPokemon = (pokemon: GetPokemonResponse) =>
    renderHook<UseCardPokemon, GetPokemonResponse>((): UseCardPokemon => useCardPokemon(pokemon))

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call navigate when handleUpdate function is called', () => {
    const { navigate } = mockReactRouter()
    const { result } = renderUseCardPokemon(pokemon)

    act(() => {
      result.current.handleUpdate(pokemon.name)
    })

    expect(navigate).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(APP_ROUTE.updatePokemonNavigate(pokemon.name))
  })

  it('should call dispatch when handleDelete function is called', () => {
    const { dispatch } = mockStoreHooks()
    const { result } = renderUseCardPokemon(pokemon)

    act(() => {
      result.current.handleDelete()
    })
    expect(dispatch).toHaveBeenCalledTimes(1)
  })
})
