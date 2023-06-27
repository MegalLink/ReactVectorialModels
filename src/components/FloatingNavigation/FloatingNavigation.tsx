import React from 'react'
import { Fab } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useAppDispatch, useAppSelector } from '../../store/store-hook'
import { TabEnum } from '../../shared/enums/tab'
import { setInputData, setTab } from '../../store/reducers/vectorial-data-reducer'
import { useFormContext } from 'react-hook-form'
import { isEmpty } from 'lodash'
import SnackbarUtil from '../../shared/utils/snack-bar'
import {
  prepareDocumentsFromString,
  prepareStringToArray,
  vectorialModelPrepare,
} from '../../shared/utils/transformations'
export const FloatingNavigation = () => {
  const { tab } = useAppSelector((store) => store.vectorialData)
  const dispatch = useAppDispatch()
  const { handleSubmit, getValues } = useFormContext()

  const handleNextNavigation = () => {
    const values = getValues()

    switch (tab) {
      case TabEnum.INPUT:
        console.log('values', values)
        if (
          !isEmpty(values.documents) &&
          !isEmpty(values.query) &&
          !isEmpty(values.documentsSeparator) &&
          !isEmpty(values.wordSeparator)
        ) {
          dispatch(setTab(TabEnum.CONFIG))
          break
        }
        SnackbarUtil.error('Hay campos incompletos')
        break
      case TabEnum.CONFIG:
        // TODO REFACTOR THIS SHOULD NOT VALIDATE
        if (!isEmpty(values.documents)) {
          const documents = prepareDocumentsFromString(
            values.documents,
            values.documentsSeparator,
            values.wordSeparator,
          )

          console.log('prparedDocuments', documents)
          const query = prepareStringToArray(values.query, values.wordSeparator)
          console.log('prepare query', query)
          const stopWords = prepareStringToArray(values.stopWords, values.wordSeparator)
          console.log('preparedStopWords', stopWords)
          // TODO SEND VOCABULARY
          const data = vectorialModelPrepare(documents, query, stopWords)
          console.log('vectorialModelPrepare', data)
          dispatch(setInputData(data))
          dispatch(setTab(TabEnum.OUTPUT))
        }
        break
      default:
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
