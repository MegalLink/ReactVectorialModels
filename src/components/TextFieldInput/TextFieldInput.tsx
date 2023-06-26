import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { FieldDataType, FieldNameEnum } from '../../shared/enums/document-data-type'
import { getSampleData, getTitle } from '../../shared/constants/document-data-type-get'
import { useFormContext } from 'react-hook-form'

interface TextFieldInputProps {
  fieldName: FieldNameEnum
  dataType: FieldDataType
}
export const TextFieldInput: React.FC<TextFieldInputProps> = ({ dataType, fieldName }) => {
  const { register } = useFormContext()

  return (
    <TextField
      id='outlined-textarea'
      label={getTitle(dataType)}
      placeholder={getSampleData(dataType)}
      sx={{ minWidth: 450 }}
      multiline={false}
      {...register(fieldName)}
    />
  )
}
