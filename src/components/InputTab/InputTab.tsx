import React, { useEffect } from 'react'
import {
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { FieldDataType, FieldNameEnum } from '../../shared/enums/document-data-type'
import { InputContainer } from '../InputContainer/InputContainer'
import { useFormContext } from 'react-hook-form'
import { get, isEmpty } from 'lodash'

export const InputTab = () => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext()
  const [withVocabulary, setWithVocabulary] = React.useState(false)
  const [withStopWords, setWithStopWords] = React.useState(false)

  console.log('my error', !isEmpty(get(errors, FieldNameEnum.DOCUMENTS_SEPARATOR)))
  useEffect(() => {
    console.log('errors', errors)
  }, [errors])
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
      <InputContainer
        dataType={FieldDataType.DOCUMENTS}
        fieldName={FieldNameEnum.DOCUMENTS}
        options={{ required: 'Los documentos son obligatorios' }}
      />
      <InputContainer
        dataType={FieldDataType.QUERY}
        fieldName={FieldNameEnum.QUERY}
        options={{ required: 'El query es obligatorio' }}
      />
      <FormGroup aria-label='position' row>
        <FormControlLabel
          checked={withVocabulary}
          control={
            <Checkbox
              onChange={(e) => {
                setWithVocabulary(e.target.checked)
                if (!e.target.checked) {
                  setValue(FieldNameEnum.VOCABULARY, '')
                }
              }}
            />
          }
          label='Con Vocabulario'
          labelPlacement='start'
        />
        <FormControlLabel
          checked={withStopWords}
          control={
            <Checkbox
              onChange={(e) => {
                setWithStopWords(e.target.checked)
                if (!e.target.checked) {
                  setValue(FieldNameEnum.STOP_WORDS, '')
                }
              }}
            />
          }
          label='Con stop words'
          labelPlacement='start'
        />
      </FormGroup>
      {withVocabulary && (
        <InputContainer dataType={FieldDataType.VOCABULARY} fieldName={FieldNameEnum.VOCABULARY} />
      )}
      {withStopWords && (
        <InputContainer dataType={FieldDataType.STOP_WORDS} fieldName={FieldNameEnum.STOP_WORDS} />
      )}

      <Paper
        sx={{
          minWidth: 450,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 5,
        }}
      >
        <Typography variant='h6' component='div'>
          Configuracion separadores
        </Typography>
        <Container sx={{ display: 'flex', gap: 2 }}>
          <TextField
            id='outlined-textarea'
            label='Separador de documentos'
            placeholder='; | " "'
            error={!isEmpty(get(errors, FieldNameEnum.DOCUMENTS_SEPARATOR))}
            helperText={`${get(errors, `${FieldNameEnum.DOCUMENTS_SEPARATOR}.message`, '')}`}
            {...register(FieldNameEnum.DOCUMENTS_SEPARATOR, {
              required: 'El separador de documentos es obligatorio',
              maxLength: { value: 1, message: 'Solo un caracter es permitido como separador' },
            })}
          />
          <TextField
            id='outlined-textarea'
            label='Separador de palabras'
            placeholder=', | ;'
            error={!isEmpty(get(errors, FieldNameEnum.WORD_SEPARATOR))}
            helperText={`${get(errors, `${FieldNameEnum.WORD_SEPARATOR}.message`, '')}`}
            {...register(FieldNameEnum.WORD_SEPARATOR, {
              required: 'El separador de palabras es obligatorio',
              maxLength: { value: 1, message: 'Solo un caracter es permitido como separador' },
            })}
          />
        </Container>
      </Paper>
    </Container>
  )
}
