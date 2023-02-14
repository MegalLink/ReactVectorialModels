import { renderHook } from '@testing-library/react'
import { GetPokemonResponse } from '../../../shared/interfaces/get-pokemon-response'
import { usePokemonForm, UsePokemonForm } from './usePokemonForm'
import * as ReactRouter from 'react-router-dom'
import * as StoreHooks from '../../../store/store-hook'
import * as HookForm from 'react-hook-form'
import { Mock } from 'ts-mockery'
import { act } from 'react-dom/test-utils'
import { PokemonAppState } from '../../../shared/interfaces/app-state'
import { initialState } from '../../../store/reducers/pokemon-reducer'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}))

jest.mock('../../../store/store-hook', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}))

jest.mock('react-hook-form', () => ({
  useForm: jest.fn(),
}))

describe('Test usePokemonForm hook', () => {
  const pokemon = Mock.of<GetPokemonResponse>({
    name: 'Pikachu',
  })

  const mockStoreHooks = (mockedState: Partial<PokemonAppState>) => {
    const hookSpies = {
      dispatch: jest.fn(),
    }
    jest.spyOn(StoreHooks, 'useAppDispatch').mockReturnValue(hookSpies.dispatch)
    jest
      .spyOn(StoreHooks, 'useAppSelector')
      .mockImplementation((state) => state({ pokemon: { ...initialState, ...mockedState } }))

    return hookSpies
  }

  const mockReactRouter = (pokemonID: string) => {
    jest.spyOn(ReactRouter, 'useParams').mockImplementation(() => ({
      pokemonId: pokemonID,
    }))
  }

  const mockHookForm = () => {
    const hookSpies = {
      useForm: {
        reset: jest.fn(),
        setValue: jest.fn(),
      },
    }
    const useFormValues: HookForm.UseFormReturn = {
      ...jest.requireActual('react-hook-form'),
      ...hookSpies.useForm,
    }
    jest.spyOn(HookForm, 'useForm').mockImplementation(() => useFormValues)

    return hookSpies
  }

  const renderUsePokemonForm = () =>
    renderHook<UsePokemonForm, GetPokemonResponse>((): UsePokemonForm => usePokemonForm())

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call 0 times dispatch when "pokemonId param is empty"', () => {
    mockReactRouter('')
    mockHookForm()
    const { dispatch } = mockStoreHooks({})
    const {
      useForm: { reset },
    } = mockHookForm()
    renderUsePokemonForm()
    expect(dispatch).toHaveBeenCalledTimes(0)
    expect(reset).toHaveBeenCalledTimes(0)
  })

  it('should call 1 time dispatch when "pokemonId" param is not empty', () => {
    mockReactRouter('pikachu')
    mockHookForm()
    const { dispatch } = mockStoreHooks({})
    const {
      useForm: { reset },
    } = mockHookForm()
    renderUsePokemonForm()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(reset).toHaveBeenCalledTimes(0)
  })

  it('should call 1 time dispatch when "pokemonId" param is not empty', () => {
    mockReactRouter('pikachu')
    const {
      useForm: { reset },
    } = mockHookForm()
    const { dispatch } = mockStoreHooks({ pokemonToEdit: pokemon })
    renderUsePokemonForm()
    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(reset).toHaveBeenCalledTimes(1)
  })

  describe('actions', () => {
    it('should call "onSubmit"', () => {
      mockReactRouter('pikachu')
      mockHookForm()
      const { dispatch } = mockStoreHooks({})
      const { result } = renderUsePokemonForm()
      act(() => {
        result.current.actions.onSubmit(pokemon)
      })
      expect(dispatch).toHaveBeenCalledTimes(1)
    })
  })
})
