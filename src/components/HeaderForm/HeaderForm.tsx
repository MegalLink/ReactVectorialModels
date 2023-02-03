import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'

interface HeaderFormProps {
  title: string
}

export function HeaderForm({ title }: HeaderFormProps) {
  const navigate = useNavigate()
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static' sx={{ mb: 2 }}>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <IconButton
            data-testid='go-back'
            aria-label='go-back'
            onClick={() => {
              navigate(-1)
            }}
          >
            <ArrowBackIcon
              sx={{
                color: 'white',
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
