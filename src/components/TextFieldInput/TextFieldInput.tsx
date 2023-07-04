import React from 'react'
import { TextField } from '@mui/material'
import { FieldDataType, FieldNameEnum } from '../../shared/enums/document-data-type'
import { getSampleData, getTitle } from '../../shared/constants/document-data-type-get'
import { RegisterOptions, useFormContext } from 'react-hook-form'
import { get, isEmpty } from 'lodash'

interface TextFieldInputProps {
  fieldName: FieldNameEnum
  dataType: FieldDataType
  options?: RegisterOptions
}
export const TextFieldInput: React.FC<TextFieldInputProps> = ({ dataType, fieldName, options }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <TextField
      id='outlined-textarea'
      label={getTitle(dataType)}
      placeholder={getSampleData(dataType)}
      sx={{ minWidth: 450 }}
      error={!isEmpty(get(errors, fieldName))}
      helperText={`${get(errors, `${fieldName}.message`, '')}`}
      multiline={false}
      {...register(fieldName, options)}
    />
  )
}
