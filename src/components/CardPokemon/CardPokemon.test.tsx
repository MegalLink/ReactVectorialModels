import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Mock } from 'ts-mockery'
import { GetPokemonResponse } from '../../shared/interfaces/get-pokemon-response'
import { CardPokemon } from './CardPokemon'
import * as CustomHook from './hooks/useCardPokemon'

jest.mock('./hooks/useCardPokemon', () => ({
  useCardPokemon: jest.fn(),
}))

describe('Test CardPokemon component', () => {
  const pokemon = Mock.of<GetPokemonResponse>({
    name: 'Pikachu',
    sprites: { other: { dream_world: { front_default: 'my-image' } } },
  })

  const renderComponent = (pokemon: GetPokemonResponse) => {
    render(<CardPokemon pokemon={pokemon} />)
  }

  const mockUseCardPokemonHook = () => {
    const hookValues: CustomHook.UseCardPokemon = {
      handleDelete: jest.fn(),
      handleUpdate: jest.fn(),
    }

    jest.spyOn(CustomHook, 'useCardPokemon').mockReturnValue(hookValues)
    return hookValues
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render component', () => {
    mockUseCardPokemonHook()
    renderComponent(pokemon)
    expect(screen.getByText(pokemon.name)).toBeInTheDocument()
  })

  describe('actions', () => {
    it('should call handleDelete function when "Eliminar" button is pressed', async () => {
      const { handleDelete } = mockUseCardPokemonHook()
      renderComponent(pokemon)

      fireEvent.click(screen.getByText('Eliminar'))
      await waitFor(() => {
        expect(handleDelete).toHaveBeenCalledTimes(1)
      })
    })

    it('should call handleUpdate function when "Modificar" button is pressed', async () => {
      const { handleUpdate } = mockUseCardPokemonHook()
      renderComponent(pokemon)

      fireEvent.click(screen.getByText('Modificar'))
      await waitFor(() => {
        expect(handleUpdate).toHaveBeenCalledTimes(1)
      })
    })
  })
})
