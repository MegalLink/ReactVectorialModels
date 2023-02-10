import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MyPokemonsAccordion } from './MyPokemons'
import * as ReactRouter from 'react-router-dom'
import { PokemonAppState } from '../../shared/interfaces/app-state'
import * as StoreHooks from '../../store/store-hook'
import { initialState } from '../../store/reducers/pokemon-reducer'
import { GetPokemonResponse } from '../../shared/interfaces/get-pokemon-response'
import { Mock } from 'ts-mockery'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

jest.mock('../../store/store-hook', () => ({
  useAppSelector: jest.fn(),
}))

jest.mock('../CardPokemon/CardPokemon', () => ({
  CardPokemon: () => {
    return <div data-testid='card-pokemon' />
  },
}))

describe('Test MyPokemonsAccordion component', () => {
  const mockReactRouter = () => {
    const navigate = jest.fn()
    jest.spyOn(ReactRouter, 'useNavigate').mockImplementation(() => navigate)
    return { navigate }
  }

  const mockStoreHooks = (mockedState: Partial<PokemonAppState>) => {
    jest
      .spyOn(StoreHooks, 'useAppSelector')
      .mockImplementation((state) => state({ pokemon: { ...initialState, ...mockedState } }))
  }

  const renderComponent = () => {
    render(<MyPokemonsAccordion />)
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render component with empty list pokemon', () => {
    mockReactRouter()
    mockStoreHooks({})
    renderComponent()
    expect(screen.getByText('Add a pokemon :D')).toBeInTheDocument()
  })

  it('should render component with filled list pokemon', () => {
    const pokemon = Mock.of<GetPokemonResponse>({
      name: 'Pikachu',
      id: 1,
    })

    mockReactRouter()
    mockStoreHooks({ savedPokemons: [pokemon] })
    renderComponent()
    expect(screen.getByText(pokemon.name)).toBeInTheDocument()
  })

  describe('acts', () => {
    it('should call navigate when Create own Pokemon button is clicked', async () => {
      const { navigate } = mockReactRouter()
      mockStoreHooks({})
      renderComponent()
      fireEvent.click(screen.getByText('Create own pokemon'))

      await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1))
    })

    it('should call handleChange when expandIcon is clicked', async () => {
      const pokemon = Mock.of<GetPokemonResponse>({
        name: 'Pikachu',
        id: 1,
      })

      mockReactRouter()
      mockStoreHooks({ savedPokemons: [pokemon] })
      renderComponent()
      fireEvent.click(screen.getByTestId(`${pokemon.name}-accordion`))
      // test branch when its false, it dont render anithing different
      fireEvent.click(screen.getByTestId(`${pokemon.name}-accordion`))

      await waitFor(() => expect(screen.getByTestId('card-pokemon')).toBeInTheDocument())
    })
  })
})
