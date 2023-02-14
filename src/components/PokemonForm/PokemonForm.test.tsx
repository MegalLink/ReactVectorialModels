import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as PokemonFormHook from './hooks/usePokemonForm'
import { PokemonForm } from './PokemonForm'

jest.mock('../SectionFormInformation/SectionFormInformation', () => ({
  SectionInformation: () => {
    return <div data-testid='section-information' />
  },
}))

jest.mock('../SectionFormStats/SectionFormStats', () => ({
  SectionStats: () => {
    return <div data-testid='section-stats' />
  },
}))

jest.mock('../HeaderForm/HeaderForm', () => ({
  HeaderForm: () => {
    return <div data-testid='header-form' />
  },
}))

jest.mock('./hooks/usePokemonForm', () => ({
  usePokemonForm: jest.fn(),
}))

describe('Test PokemonForm component', () => {
  const mockUsePokemonFormHook = () => {
    const hookSpies = {
      reset: jest.fn(),
      setValue: jest.fn(),
      handleSubmit: jest.fn(),
    }

    const hookValues: PokemonFormHook.UsePokemonForm = {
      methods: { ...jest.requireActual('react-hook-form'), ...hookSpies },
      actions: {
        onSubmit: jest.fn(),
      },
    }
    jest.spyOn(PokemonFormHook, 'usePokemonForm').mockReturnValue(hookValues)

    return hookValues
  }

  const renderComponent = () => {
    render(<PokemonForm />)
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render component', () => {
    mockUsePokemonFormHook()
    renderComponent()
    expect(screen.getByTestId('section-information')).toBeInTheDocument()
    expect(screen.getByTestId('section-stats')).toBeInTheDocument()
    expect(screen.getByTestId('header-form')).toBeInTheDocument()
  })

  describe('acts', () => {
    it('should call "onSubmit" action when Crear/Editar button is called', async () => {
      const {
        methods: { handleSubmit },
      } = mockUsePokemonFormHook()
      renderComponent()
      fireEvent.click(screen.getByText('Crear/Editar'))
      await waitFor(() => {
        expect(handleSubmit).toHaveBeenCalledTimes(1)
      })
    })
  })
})
