import React, { useState } from 'react'
import { FileInput } from '../FileInput/FileInput'
import { FieldDataType, FieldNameEnum } from '../../shared/enums/document-data-type'
import { Paper, Stack, Typography } from '@mui/material'
import { CustomSwitch } from '../CustomSwitch/CustomSwitch'
import { TextFieldInput } from '../TextFieldInput/TextFieldInput'
import { getTitle } from '../../shared/constants/document-data-type-get'

interface InputContainerProps {
  dataType: FieldDataType
  fieldName: FieldNameEnum
}

export const InputContainer: React.FC<InputContainerProps> = ({ dataType, fieldName }) => {
  const [isFromFile, setIsFromFile] = useState(false)
  const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFromFile(event.target.checked)
  }

  return (
    <Paper variant='outlined' sx={{ padding: 2 }}>
      <Stack direction='row' sx={{ mb: 2 }}>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          {getTitle(dataType)}
        </Typography>
        <CustomSwitch checked={isFromFile} onChange={handleSwitch} />
      </Stack>
      {isFromFile ? (
        <FileInput dataType={dataType} fieldName={fieldName} />
      ) : (
        <TextFieldInput dataType={dataType} fieldName={fieldName} />
      )}
    </Paper>
  )
}