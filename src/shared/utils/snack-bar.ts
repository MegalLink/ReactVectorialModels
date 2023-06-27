import { useSnackbar, VariantType, WithSnackbarProps } from 'notistack'
import React from 'react'

let useSnackbarRef: WithSnackbarProps
export const SnackbarUtil: React.FC = () => {
  useSnackbarRef = useSnackbar()
  return null
}

export default {
  success(msg: string) {
    this.snackbar(msg, 'success')
  },
  warning(msg: string) {
    this.snackbar(msg, 'warning')
  },
  info(msg: string) {
    this.snackbar(msg, 'info')
  },
  error(msg: string) {
    this.snackbar(msg, 'error')
  },
  snackbar(msg: string, variant: VariantType = 'default') {
    useSnackbarRef.enqueueSnackbar(msg, {
      variant,
      preventDuplicate: true,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'center',
      },
    })
  },
}