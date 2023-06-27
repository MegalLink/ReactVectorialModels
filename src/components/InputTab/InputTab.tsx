import React from 'react'
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

export const InputTab = () => {
  const { register } = useFormContext()
  const [withVocabulary, setWithVocabulary] = React.useState(false)
  const [withStopWords, setWithStopWords] = React.useState(false)

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
      <InputContainer dataType={FieldDataType.DOCUMENTS} fieldName={FieldNameEnum.DOCUMENTS} />
      <InputContainer dataType={FieldDataType.QUERY} fieldName={FieldNameEnum.QUERY} />
      <FormGroup aria-label='position' row>
        <FormControlLabel
          checked={withVocabulary}
          control={
            <Checkbox
              onChange={(e) => {
                setWithVocabulary(e.target.checked)
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
            {...register(FieldNameEnum.DOCUMENTS_SEPARATOR)}
          />
          <TextField
            id='outlined-textarea'
            label='Separador de palabras'
            placeholder=', | ;'
            {...register(FieldNameEnum.WORD_SEPARATOR)}
          />
        </Container>
      </Paper>
    </Container>
  )
}
