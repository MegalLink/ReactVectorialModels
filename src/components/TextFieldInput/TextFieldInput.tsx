import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { DocumentDataType } from '../../shared/enums/document-data-type'
import { getSampleData, getTitle } from '../../shared/constants/document-data-type-get'

interface TextFieldInputProps {
  // onSendData: (data: string) => void;
  dataType: DocumentDataType
}
export const TextFieldInput:React.FC<TextFieldInputProps> = ({dataType}) => {
  const [value,setValue]=useState('')
  
  return (
    <TextField
      id='outlined-textarea'
      label={getTitle(dataType)}
      placeholder={getSampleData(dataType)}
      sx={{ minWidth: 450 }}
      multiline={false}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
      }}
    />
  )
}
