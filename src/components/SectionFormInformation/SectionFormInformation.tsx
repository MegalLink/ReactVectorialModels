import React from 'react'
import { Grid, TextField } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import Card from '@mui/material/Card'
import { get, isEmpty } from 'lodash'

export default function SectionInformation() {
  const {
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <Card sx={{ p: '10px' }}>
      <Grid sx={{ mb: '10px' }}>
        <TextField
          type='number'
          fullWidth
          variant='filled'
          defaultValue={0}
          label='id'
          {...register('id', {
            required: 'Campo requerido',
            validate: {
              positive: (v) => v > 0 || 'debe ser mayor que 0',
            },
          })}
          error={!isEmpty(errors.id)}
          helperText={`${get(errors, 'id.message', '')}`}
        />
      </Grid>
      <Grid sx={{ mb: '10px' }}>
        <TextField
          fullWidth
          variant='filled'
          defaultValue=''
          label='pokemon name'
          {...register('name', {
            required: 'Campo requerido',
          })}
          error={!isEmpty(errors.name)}
          helperText={`${get(errors, 'name.message', '')}`}
        />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            type='number'
            fullWidth
            variant='filled'
            label='height'
            {...register('height', {
              required: 'Campo requerido',
              validate: {
                positive: (v) => v > 0 || 'debe ser mayor que 0',
              },
            })}
            error={!isEmpty(errors.height)}
            helperText={`${get(errors, 'height.message', '')}`}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type='number'
            fullWidth
            variant='filled'
            label='weight'
            {...register('weight', {
              required: 'Campo requerido',
              validate: {
                positive: (v) => v > 0 || 'debe ser mayor que 0',
              },
            })}
            error={!isEmpty(errors.weight)}
            helperText={`${get(errors, 'weight.message', '')}`}
          />
        </Grid>
      </Grid>
    </Card>
  )
}
