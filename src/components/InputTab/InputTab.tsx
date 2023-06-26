import React from 'react'
import { Container } from '@mui/material'
import { FieldDataType, FieldNameEnum } from '../../shared/enums/document-data-type'
import { InputContainer } from '../InputContainer/InputContainer'

export const InputTab = () => {
  const [filesData, setData] = React.useState([])

  /*  const setDataFromChild = (data) => {
    setData(data);
  };*/

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
    </Container>
  )
}
