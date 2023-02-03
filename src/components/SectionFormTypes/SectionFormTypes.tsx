import React from 'react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Button, Grid, TextField, Select, MenuItem } from '@mui/material'
import Card from '@mui/material/Card'

export default function SectionTypes() {
  const { control } = useFormContext()
  const {
    fields: members,
    append: appendMemberRow,
    remove: removeMemberRow,
  } = useFieldArray({
    control,
    name: 'types',
  })

  const addNewMemeber = () => appendMemberRow({ email: '', role: 'user' })
  console.count('app rerender')

  return (
    <Card sx={{ p: '10px', mt: '10px' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {members.map((field, index) => (
            <Grid container key={field.id} spacing={1} alignItems='center'>
              <Grid item xs={6}>
                <Controller
                  control={control}
                  // must use . for the object key!!!
                  name={`members.${index}.email`}
                  defaultValue=''
                  render={({ field }) => <TextField {...field} type='email' fullWidth />}
                />
              </Grid>
              <Grid item xs={4}>
                <Controller
                  control={control}
                  // must use . for the object key!!!
                  name={`members.${index}.role`}
                  defaultValue='user'
                  render={({ field }) => (
                    <Select {...field} fullWidth>
                      <MenuItem value='user'>Member</MenuItem>
                      <MenuItem value='admin'>Admin</MenuItem>
                    </Select>
                  )}
                />
              </Grid>
              <Grid item xs={2}>
                <Button color='error' variant='text' onClick={() => removeMemberRow(index)}>
                  Delete
                </Button>
              </Grid>
            </Grid>
          ))}
          <Button sx={{ mt: '10px' }} variant='contained' onClick={addNewMemeber}>
            Add type
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}
