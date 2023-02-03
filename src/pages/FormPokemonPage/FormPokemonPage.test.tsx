import { render, screen } from '@testing-library/react'
import { FormPokemonPage } from './FormPokemonPage'

jest.mock('../../components/PokemonForm/PokemonForm', () => () => {
  return <div data-testid='pokemon-form' />
})

describe('Test FormPokemonPage component', () => {
  const renderComponent = () => {
    render(<FormPokemonPage />)
  }
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render component', () => {
    renderComponent()
    expect(screen.getByTestId('pokemon-form')).toBeInTheDocument()
  })
})
