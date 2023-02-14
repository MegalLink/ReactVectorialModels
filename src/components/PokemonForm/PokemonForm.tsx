import React from 'react'
import { FormProvider } from 'react-hook-form'
import { Box, Button } from '@mui/material'
import { SectionInformation } from '../SectionFormInformation/SectionFormInformation'
import { HeaderForm } from '../HeaderForm/HeaderForm'
import { SectionStats } from '../SectionFormStats/SectionFormStats'
import { usePokemonForm } from './hooks/usePokemonForm'

export function PokemonForm() {
  const {
    methods,
    actions: { onSubmit },
  } = usePokemonForm()

  return (
    <div>
      <FormProvider {...methods}>
        <HeaderForm title={'Create'} />
        <Box>
          <SectionInformation />
          <SectionStats />
          <Button
            type='button'
            variant='contained'
            sx={{ width: '100%', mt: '10px' }}
            color='primary'
            onClick={methods.handleSubmit(onSubmit)}
          >
            Crear/Editar
          </Button>
        </Box>
      </FormProvider>
    </div>
  )
}
