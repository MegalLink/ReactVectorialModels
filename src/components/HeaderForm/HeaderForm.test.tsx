import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { HeaderForm } from './HeaderForm'
import * as ReactRouter from 'react-router-dom'

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

jest.mock('react-hook-form', () => ({
  useFormContext: () => ({
    reset: () => jest.fn(),
  }),
}))

describe('Test FormPokemonPage component', () => {
  const mockReactRouter = () => {
    const navigate = jest.fn()
    jest.spyOn(ReactRouter, 'useNavigate').mockImplementation(() => navigate)
    return { navigate }
  }

  const renderComponent = () => {
    render(<HeaderForm title='hello' />)
  }

  beforeEach(() => {
    mockReactRouter()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render component', () => {
    renderComponent()
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('should call reset and navigate when back button is pressed', async () => {
    const { navigate } = mockReactRouter()
    renderComponent()
    expect(screen.getByText('hello')).toBeInTheDocument()
    fireEvent.click(screen.getByTestId('go-back'))

    await waitFor(() => expect(navigate).toHaveBeenCalledTimes(1))
  })
})
