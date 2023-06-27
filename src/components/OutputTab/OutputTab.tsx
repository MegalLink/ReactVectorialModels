import React from 'react'
import { Container, Paper, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { useAppSelector } from '../../store/store-hook'
import { CustomTable } from '../Table/Table'

export const OutputTab = () => {
  const { inputData, outputData } = useAppSelector((store) => store.vectorialData)
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
          Output
        </Typography>
        <CustomTable />
      </Paper>
    </Container>
  )
}
