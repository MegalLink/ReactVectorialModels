import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { isUndefined } from 'lodash'
import { Box, CircularProgress, Container, Typography } from '@mui/material'

interface CustomTableProps {
  header: string[]
  data: any[] | any[][]
  title: string
}

export const CustomTable: React.FC<CustomTableProps> = ({ header, title, data }) => {
  if (isUndefined(data) || isUndefined(data[0])) {
    console.log('header inside', header)
    console.log('rows', data)
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Container
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
      <Typography variant='h6'>{title} </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              {header.map((item, index) => (
                <TableCell key={index}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(data) &&
              data.map((value, index) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  {Array.isArray(value) ? (
                    value.map((internalValue, idx) => (
                      <TableCell key={idx}>{internalValue}</TableCell>
                    ))
                  ) : (
                    <TableCell>{value}</TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
