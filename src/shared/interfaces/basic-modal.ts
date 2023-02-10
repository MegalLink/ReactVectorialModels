export interface BasicModal {
  primaryButton?: ModalButton
  secondaryButton?: ModalButton
  handleClose?: () => void
  title?: string
  description?: string
  isOpen: boolean
}

export interface ModalButton {
  btnText: string
  handleClick: () => void
}
