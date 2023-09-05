import {
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { FieldNameEnum } from '../../shared/enums/document-data-type'
import { VectorialMethodEnum } from '../../shared/enums/vectorial-methods'
import { isEmpty } from 'lodash'

export const ConfigTab = () => {
  const { getValues, control } = useFormContext()
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
          Preview
        </Typography>
        <Typography>Documentos: {values.documents}</Typography>
        <Typography>Consulta: {values.query}</Typography>
        <Typography>
          Separador de palabras: {values.wordSeparator === ' ' ? 'ESPACIO' : values.wordSeparator}
        </Typography>
        <Typography>Separador de documentos: {values.documentsSeparator}</Typography>
        {!isEmpty(values.vocabulary) && <Typography>Vocabulario: {values.vocabulary}</Typography>}
        {!isEmpty(values.stopWords) && <Typography>Stop Words: {values.stopWords}</Typography>}
      </Paper>

      <Container
        sx={{
          minWidth: 450,
          padding: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          gap: 5,
        }}
      >
        <Typography variant='h6' component='div'>
          Escoja el metodo vectorial
        </Typography>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Metodo Vectorial</InputLabel>
          <Controller
            name={FieldNameEnum.VECTORIAL_METHOD}
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                label='Metodo Vectorial'
                {...field}
              >
                <MenuItem value={VectorialMethodEnum.BASIC}>Similitud simple</MenuItem>
                <MenuItem value={VectorialMethodEnum.WORD_DOCUMENT_LENGTH}>
                  Similitud relevancia # de palabras
                </MenuItem>
                <MenuItem value={VectorialMethodEnum.NORMALIZATION}>Normalización</MenuItem>
                <MenuItem value={VectorialMethodEnum.TF_IDF}>
                  Frecuencia de Termino (TF_IDF)
                </MenuItem>
                {/* <MenuItem value={VectorialMethodEnum.PROBABILISTIC}>
                  Probabilistico (POR TERMINAR)
            </MenuItem>*/}
              </Select>
            )}
          />
        </FormControl>
      </Container>
    </Container>
  )
}
