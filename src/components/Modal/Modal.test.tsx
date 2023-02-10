import { render, screen } from '@testing-library/react'
import * as StoreHooks from '../../store/store-hook'
import { initialState } from '../../store/reducers/pokemon-reducer'
import { Modal } from './Modal'
import { BasicModal } from '../../shared/interfaces/basic-modal'
import { PokemonAppState } from '../../shared/interfaces/app-state'

jest.mock('../../store/store-hook', () => ({
  useAppSelector: jest.fn(),
}))

describe('Test Modal component', () => {
  const renderComponent = () => {
    render(<Modal />)
  }

  const mockStoreHooks = (mockedState: Partial<PokemonAppState>) => {
    jest
      .spyOn(StoreHooks, 'useAppSelector')
      .mockImplementation((state) => state({ pokemon: { ...initialState, ...mockedState } }))
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should render modal with all options', () => {
    const modal: BasicModal = {
      isOpen: true,
      handleClose: () => {},
      title: 'some title',
      description: 'some description',
      primaryButton: {
        btnText: 'Aceptar',
        handleClick: () => {},
      },
      secondaryButton: {
        btnText: 'Cancelar',
        handleClick: () => {},
      },
    }
    mockStoreHooks({ basicModal: modal })
    renderComponent()
    expect(screen.getByText(modal.title!))
    expect(screen.getByText(modal.description!))
    expect(screen.getByText(modal.primaryButton!.btnText))
    expect(screen.getByText(modal.secondaryButton!.btnText))
  })
})
