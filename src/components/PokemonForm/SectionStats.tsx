import React from 'react'
import { Grid, TextField, Autocomplete } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import Card from '@mui/material/Card'

const stats = [
  { value: 65, label: 'A' },
  { value: 66, label: 'B' },
  { value: 67, label: 'C' },
]

export default function SectionStats() {
  const { control } = useFormContext()
  return (
    <Card sx={{ p: '10px', mt: '10px' }}>
      <Grid item xs={12}>
        <Controller
          control={control}
          name='stats'
          render={({ field: { ref, onChange, ...field } }) => (
            <Autocomplete
              multiple
              options={stats}
              disabled={true}
              getOptionLabel={(option) => option.label}
              onChange={(_, data) => onChange(data)}
              renderInput={(params) => (
                <TextField
                  {...field}
                  {...params}
                  fullWidth
                  inputRef={ref}
                  variant='filled'
                  label='stats'
                />
              )}
            />
          )}
        />
      </Grid>
    </Card>
  )
}
