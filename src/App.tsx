import * as React from 'react'
import { CssBaseline } from '@mui/material'
import { Header } from './components/Header/Header'
import { HorizontalTabs } from './components/Tabs/Tabs'
import { FloatingNavigation } from './components/FloatingNavigation/FloatingNavigation'
import { FormProvider, useForm } from 'react-hook-form'

export interface FormValues {
  documents: string
  query: string
  stopWords?: string
  vocabulary?: string
}

export default function App() {
  const methods = useForm<FormValues>({
    defaultValues: { documents: '' },
  })

  return (
    <React.Fragment>
      <FormProvider {...methods}>
        <CssBaseline />
        <Header />
        <HorizontalTabs />
        <FloatingNavigation />
      </FormProvider>
    </React.Fragment>
  )
}
