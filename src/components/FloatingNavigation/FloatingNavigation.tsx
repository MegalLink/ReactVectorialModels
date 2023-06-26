import { Fab } from '@mui/material'
import React from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useAppSelector } from '../../store/store-hook';
export const FloatingNavigation = () => {
  const {tab} = useAppSelector((store)=>store.vectorialData)

  return (
    <>
      <Fab variant='extended' sx={{position:"fixed",
        left:40,
        bottom:40   
    }}>
        <ArrowBackIcon sx={{ mr: 1 }} />
        Atras
      </Fab>

      <Fab variant='extended' color='primary'  sx={{position:"fixed",right:40,bottom:40}}>
        <ArrowForwardIcon sx={{ mr: 1 }} />
        Siguiente
      </Fab>
    </>
  )
}
