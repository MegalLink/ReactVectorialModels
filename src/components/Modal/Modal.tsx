import * as React from 'react'
import Button from '@mui/material/Button'
import { useAppSelector } from '../../store/store-hook'
import { isEmpty } from 'lodash'
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
      onClose={basicModal.handleClose}
    >
      {!isEmpty(basicModal.title) && <DialogTitle>{basicModal.title}</DialogTitle>}
      <DialogContent>
        {!isEmpty(basicModal.description) && (
          <DialogContentText>{basicModal.description}</DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        {!isEmpty(basicModal.primaryButton) && (
          <Button onClick={basicModal.primaryButton!.handleClick}>
            {basicModal.primaryButton?.btnText}
          </Button>
        )}

        {!isEmpty(basicModal.secondaryButton) && (
          <Button onClick={basicModal.secondaryButton!.handleClick}>
            {basicModal.secondaryButton?.btnText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
