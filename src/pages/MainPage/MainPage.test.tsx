import { render, screen } from '@testing-library/react'
import { MainPage } from './MainPage'

jest.mock('../../components/Tabs/HorizontalTab', () => ({
  HorizontalTabs: () => {
    return <div data-testid='horizontal-tab' />
  },
}))

jest.mock('../../components/MainHeader/MainHeader', () => ({
  MainHeader: () => {
    return <div data-testid='header' />
  },
}))

describe('Test MainPage component', () => {
  const renderComponent = () => {
    render(<MainPage />)
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render component', () => {
    renderComponent()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('horizontal-tab')).toBeInTheDocument()
    // THIS TWO TOOLS ARE VERY USEFULL SO USE IT
    // DEBUG JUST PRINT IN CONSOLE WHAT THE HTML CONTAINS
    screen.debug()
    // LOG CREATE A PLAYGROUND URL WITH YOUR SCREEN OR YOU CAN PASS AS ARGUMENT A ELEMENT screen.logTestingPlaygroundURL(screen.getByTestId('header'))
    // screen.logTestingPlaygroundURL()
  })
})
