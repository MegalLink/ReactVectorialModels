import React from 'react'
import { render, screen } from '@testing-library/react'
import { MainPage } from './MainPage'

jest.mock('../../components/Tabs/HorizontalTab', () => () => {
  return <div data-testid='horizontal-tab' />
})

jest.mock('../../components/Header/Header', () => () => {
  return <div data-testid='header' />
})

describe('Test MainPage component', () => {
  const renderComponent = () => {
    render(<MainPage />)
  }

  it('should render component', () => {
    renderComponent()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('horizontal-tab')).toBeInTheDocument()
  })
})
