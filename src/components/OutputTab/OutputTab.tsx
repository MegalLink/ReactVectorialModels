import React from 'react'
import { Chip, Container, Paper, Typography } from '@mui/material'
import { useAppSelector } from '../../store/store-hook'
import { CustomTable } from '../Table/Table'

export const OutputTab = () => {
  const { inputData, outputData } = useAppSelector((store) => store.vectorialData)
  const vocabulary = inputData.vocabulary
  console.log('vocabulario', vocabulary)

  const weigthMatrix: number[][] = outputData.weightMatrix
  const weightMatrixHeader: string[] = ['#Documento', ...vocabulary]
  const modelResult: number[] = outputData.result
  const modelResultHeader: string[] = ['#Documento', 'Similitud']
  const queryHeader: string[] = ['index', ...vocabulary]
  const querySolved: any[][] = [[...inputData.queryWeight]]

  return (
    <Container
      maxWidth='sm'
      sx={{
        paddingTop: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <Paper sx={{ minWidth: 450, padding: 2 }}>
        <Typography variant='h6' component='div'>
          Resultados{' '}
          <Chip
            sx={{ marginLeft: '5%' }}
            label={`Tempo en ms ${outputData.time}`}
            color='primary'
          />
        </Typography>
        <CustomTable header={queryHeader} title='Query' data={querySolved} />
        <CustomTable header={weightMatrixHeader} title='Tabla de pesos' data={weigthMatrix} />
        <CustomTable header={modelResultHeader} title='Tabla de resultados' data={modelResult} />
      </Paper>
    </Container>
  )
}
