import React, { useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  FormControlLabel,
  Modal,
  Paper,
  Switch,
  Typography,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../store/store-hook'
import { CustomTable } from '../Table/Table'
import { setOutputData } from '../../store/reducers/vectorial-data-reducer'
import { resultWithFeedback } from '../../shared/utils/transformations'
import { useFormContext } from 'react-hook-form'
import { VectorialMethodEnum } from '../../shared/enums/vectorial-methods'

export const OutputTab = () => {
  const { inputData, outputData } = useAppSelector((store) => store.vectorialData)
  const dispatch = useAppDispatch()
  const { getValues } = useFormContext()
  const { vectorialMethod } = getValues()
  const vocabulary = inputData.vocabulary
  const weigthMatrix: number[][] = outputData.documentsWeight
  const weightMatrixHeader: string[] = ['#Documento', ...vocabulary]
  const modelResult: number[] = outputData.result
  const modelResultHeader: string[] = ['#Documento', 'Similitud', 'Contenido', 'Option']
  const queryHeader: string[] = ['index', ...vocabulary]
  const querySolved: any[][] = [[...inputData.queryWeight]]
  const data = prepareData(inputData.originalDocuments, modelResult)
  const [relevantDocumentsIndex, setRelevantDocumentsIndex] = useState<number[]>([])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const handleSwitchCHange = (e: React.ChangeEvent<HTMLInputElement>, elementIndex: number) => {
    if (e.target.checked) {
      setRelevantDocumentsIndex([...relevantDocumentsIndex, elementIndex])
    } else {
      const indexToDelete = relevantDocumentsIndex.indexOf(elementIndex)
      setRelevantDocumentsIndex(relevantDocumentsIndex.splice(indexToDelete - 1, 1))
    }
  }

  const calculateResultAgain = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const allDocumentsIndex = Array.from({ length: outputData.documentsWeight.length }, (_, i) => i)
    const noRelevantDocumentsIndex = allDocumentsIndex.filter((number) => {
      return relevantDocumentsIndex.indexOf(number) === -1
    })

    const newOutputData = resultWithFeedback(
      outputData,
      relevantDocumentsIndex,
      noRelevantDocumentsIndex,
    )
    dispatch(setOutputData(newOutputData))
  }

  const showDocumentModal = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>, content: string) => {
    e.preventDefault()
    setModalContent(content)
    setIsOpenModal(true)
  }

  const closeModal = () => {
    setIsOpenModal(false)
    setModalContent('')
  }

  function prepareData(documents: string[][], result: any[]): any[] {
    const prepared = documents.map((row, index) => {
      const documentContent = row.join(' ')
      const rowResult = [
        result[index],
        <Typography key={index} onClick={(e) => showDocumentModal(e, documentContent)}>
          {documentContent}
        </Typography>,
        <FormControlLabel
          key={index}
          control={<Switch onChange={(e) => handleSwitchCHange(e, index)} />}
          label='Es relevante'
        />,
      ]

      return rowResult
    })

    return prepared
  }

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
      <Paper sx={{ minWidth: 450, padding: 2, display: 'flex', flexDirection: 'column' }}>
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
        {vectorialMethod === VectorialMethodEnum.TF_IDF ? (
          <CustomTable header={modelResultHeader} title='Tabla de resultados' data={data} />
        ) : (
          <CustomTable
            header={['#Documento', 'Similitud']}
            title='Tabla de resultados'
            data={modelResult}
          />
        )}

        {vectorialMethod === VectorialMethodEnum.TF_IDF && (
          <Button
            sx={{ alignSelf: 'flex-end' }}
            variant='contained'
            onClick={(e) => calculateResultAgain(e)}
          >
            Consultar nuevamente
          </Button>
        )}
      </Paper>
      <Modal
        open={isOpenModal}
        onClose={closeModal}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Card sx={{ minWidth: 400 }}>
          <CardContent>
            <Typography variant='h5' color='text.primary' gutterBottom>
              Contenido de documento
            </Typography>
            <Typography component='div'>{modalContent}</Typography>
          </CardContent>
          <CardActions>
            <Button size='small' onClick={closeModal}>
              Cerrar
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </Container>
  )
}
