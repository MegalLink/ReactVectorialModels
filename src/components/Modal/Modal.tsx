import * as React from 'react'
import Button from '@mui/material/Button'
import { useAppSelector } from '../../store/store-hook'
import { isEmpty, get } from 'lodash'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />
})

export function Modal() {
  const { basicModal } = useAppSelector((store) => {
    return store.pokemon
  })

  return (
    <Dialog
      TransitionComponent={Transition}
      open={basicModal.isOpen}
      onClose={get(basicModal, 'handleClose')}
    >
      {!isEmpty(basicModal.title) && <DialogTitle>{get(basicModal, 'title')}</DialogTitle>}
      <DialogContent>
        {!isEmpty(basicModal.description) && (
          <DialogContentText>{get(basicModal, 'description')}</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {!isEmpty(basicModal.primaryButton) && (
          <Button onClick={get(basicModal, 'primaryButton.handleClick')}>
            {get(basicModal, 'primaryButton.btnText')}
          </Button>
        )}

        {!isEmpty(basicModal.secondaryButton) && (
          <Button onClick={get(basicModal, 'secondaryButton.handleClick')}>
            {get(basicModal, 'secondaryButton.btnText')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
