import React, { useState, FC } from 'react'
import { Box } from '@mui/material'
import { MuiFileInput } from 'mui-file-input'
import { FieldDataType, FieldNameEnum } from '../../shared/enums/document-data-type'
import { getLabelFromFile } from '../../shared/constants/document-data-type-get'
import { get } from 'lodash'
import { useFormContext } from 'react-hook-form'

interface FileInputProps {
  fieldName: FieldNameEnum
  dataType: FieldDataType
}

export const FileInput: FC<FileInputProps> = ({ dataType, fieldName }) => {
  const [file, setFile] = useState<File | null>(null)
  const { setValue } = useFormContext()

  const handleChange = (file: File | null) => {
    console.log('File', file)
    const reader = new FileReader()
    reader.onloadend = () => {
      const content: string = get(reader, 'result', '') as string
      console.log('reader', content)
      setValue(fieldName, content)
    }

    setFile(file)
    if (file !== null) {
      reader.readAsText(file)
    }
  }

  return (
    <Box>
      <MuiFileInput
        placeholder={getLabelFromFile(dataType)}
        value={file}
        onChange={handleChange}
        sx={{ minWidth: 450 }}
      />
    </Box>
  )
}
