import React, { useState, FC } from 'react'
import { Box } from '@mui/material'
import { MuiFileInput } from 'mui-file-input'
import { DocumentDataType } from '../../shared/enums/document-data-type'
import { getLabelFromFile } from '../../shared/constants/document-data-type-get'
import { get } from 'lodash'

interface FileInputProps {
  // onSendData: (data: string) => void;
  dataType: DocumentDataType
}

export const FileInput: FC<FileInputProps> = ({ dataType }) => {
  const [file, setFile] = useState<File | null>(null)
  const [content, setContent] = useState('')

  const handleChange = (file: File | null) => {
    console.log('File', file)
    const reader = new FileReader()
    reader.onloadend = () => {
      const content: string = get(reader, 'result', '') as string
      console.log('reader', content)
      setContent(content)
    }

    setFile(file)
    if (file !== null) {
      reader.readAsText(file)
    } else {
      setContent('')
    }
  }

  React.useEffect(() => {
    console.log('content', content)
  }, [content])

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
