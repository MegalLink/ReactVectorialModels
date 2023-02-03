import { render, screen } from '@testing-library/react'
import { MainHeader } from './MainHeader'
import * as StoreHooks from '../../store/store-hook'
import { initialState } from '../../store/reducers/pokemon-reducer'

jest.mock('../../store/store-hook', () => ({
  useAppSelector: jest.fn(),
}))

describe('Test MainHeader component', () => {
  const renderComponent = () => {
    render(<MainHeader />)
  }

  const mockStoreHooks = () => {
    jest
      .spyOn(StoreHooks, 'useAppSelector')
      .mockImplementation((state) => state({ pokemon: { ...initialState, savedPokemons: [] } }))
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render component', () => {
    mockStoreHooks()
    renderComponent()
    expect(screen.getByText(/pokemon app/i)).toBeInTheDocument()
  })
})
