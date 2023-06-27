import React from 'react'
import { Container, Paper, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useAppSelector } from '../../store/store-hook'

export const OutputTab = () => {
  const { inputData } = useAppSelector((store) => store.vectorialData)
  const { getValues } = useFormContext()
  const values = getValues()

  return (
    <Container
      maxWidth='sm'
      sx={{
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <Paper sx={{ minWidth: 450, padding: 2 }}>
        <Typography variant='h6' component='div'>
          Output: {inputData.documentsWeigth}
        </Typography>
      </Paper>
    </Container>
  )
}
