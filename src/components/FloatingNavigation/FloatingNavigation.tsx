import React from 'react'
import { Fab } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useAppDispatch, useAppSelector } from '../../store/store-hook'
import { TabEnum } from '../../shared/enums/tab'
import { setInputData, setOutputData, setTab } from '../../store/reducers/vectorial-data-reducer'
import { useFormContext } from 'react-hook-form'
import { isEmpty } from 'lodash'
import SnackbarUtil from '../../shared/utils/snack-bar'
import {
  MethodResults,
  prepareDocumentsFromString,
  prepareStringToArray,
  selectMethod,
  vectorialModelPrepare,
} from '../../shared/utils/transformations'
import { VectorialMethodEnum } from '../../shared/enums/vectorial-methods'
export const FloatingNavigation = () => {
  const { tab } = useAppSelector((store) => store.vectorialData)
  const dispatch = useAppDispatch()
  const { getValues, handleSubmit } = useFormContext()

  const handleNextNavigation = () => {
    const values = getValues()

    switch (tab) {
      case TabEnum.INPUT:
        handleSubmit(
          () => {
            // on valid submit
            dispatch(setTab(TabEnum.CONFIG))
          },
          () => {
            // on invalid submit
            SnackbarUtil.error('Hay campos con errores o incompletos')
          },
        )()
        break
      case TabEnum.CONFIG:
        if (!isEmpty(values.documents)) {
          const documents = prepareDocumentsFromString(
            values.documents,
            values.documentsSeparator,
            values.wordSeparator,
          )

          const query = prepareStringToArray(values.query, values.wordSeparator)
          const stopWords = prepareStringToArray(values.stopWords, values.wordSeparator)
          const vocabulary = prepareStringToArray(values.vocabulary, values.wordSeparator)
          const data = vectorialModelPrepare(documents, query, stopWords, vocabulary)
          const vectorialMethod: VectorialMethodEnum = values.vectorialMethod
          dispatch(setInputData(data))
          const outputData: MethodResults = selectMethod(data, vectorialMethod)
          dispatch(setOutputData(outputData))
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
