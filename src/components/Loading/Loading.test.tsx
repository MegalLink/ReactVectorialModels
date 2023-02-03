import { render, screen } from '@testing-library/react'
import { Loading } from './Loading'

describe('Test Loading component', () => {
  const renderComponent = () => {
    render(<Loading />)
  }

  afterEach(() => {
    jest.resetAllMocks()
  })
  it('should render component', () => {
    renderComponent()
    console.log(screen)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })
})
