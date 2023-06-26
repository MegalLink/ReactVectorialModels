import React from 'react'
import { Fab } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useAppDispatch, useAppSelector } from '../../store/store-hook'
import { TabEnum } from '../../shared/enums/tab'
import { setTab } from '../../store/reducers/vectorial-data-reducer'
import { SubmitHandler, useFormContext } from 'react-hook-form'
import { FormValues } from '../../App'
export const FloatingNavigation = () => {
  const { tab } = useAppSelector((store) => store.vectorialData)
  const dispatch = useAppDispatch()
  const { handleSubmit } = useFormContext()

  const handleNextNavigation = () => {
    switch (tab) {
      case TabEnum.INPUT:
        console.log('here')
        handleSubmit((d) => console.log('handle submit', d))()
        dispatch(setTab(TabEnum.CONFIG))
        break
      case TabEnum.CONFIG:
        dispatch(setTab(TabEnum.OUTPUT))
        break
    }
  }

  const handleBackNavigation = () => {
    switch (tab) {
      case TabEnum.OUTPUT:
        dispatch(setTab(TabEnum.CONFIG))
        break
      case TabEnum.CONFIG:
        dispatch(setTab(TabEnum.INPUT))
        break
    }
  }

  return (
    <>
      {tab !== TabEnum.INPUT && (
        <Fab
          variant='extended'
          onClick={(e) => handleBackNavigation()}
          sx={{ position: 'fixed', left: 40, bottom: 40 }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} />
          Atras
        </Fab>
      )}
      {tab !== TabEnum.OUTPUT && (
        <Fab
          variant='extended'
          onClick={(e) => handleNextNavigation()}
          color='primary'
          sx={{ position: 'fixed', right: 40, bottom: 40 }}
        >
          <ArrowForwardIcon sx={{ mr: 1 }} />
          Siguiente
        </Fab>
      )}
    </>
  )
}
