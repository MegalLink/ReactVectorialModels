import * as React from 'react'
import { CssBaseline } from '@mui/material'
import { Header } from './components/Header/Header'
import { HorizontalTabs } from './components/Tabs/Tabs'
import { FloatingNavigation } from './components/FloatingNavigation/FloatingNavigation'
import { FormProvider, useForm } from 'react-hook-form'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtil } from './shared/utils/snack-bar'

export interface FormValues {
  documents: string
  query: string
  stopWords?: string
  vocabulary?: string
  documentsSeparator: string
  wordSeparator: string
  vectorialMethod: number
}

export default function App() {
  const methods = useForm<FormValues>({
    mode: 'onSubmit',
    defaultValues: {
      documents: '',
      query: '',
      stopWords: '',
      vocabulary: '',
      documentsSeparator: '',
      wordSeparator: '',
      vectorialMethod: 0,
    },
  })

  return (
    <React.Fragment>
      <SnackbarProvider maxSnack={5} autoHideDuration={2000}>
        <SnackbarUtil />
        <FormProvider {...methods}>
          <CssBaseline />
          <Header />
          <HorizontalTabs />
          <FloatingNavigation />
        </FormProvider>
      </SnackbarProvider>
    </React.Fragment>
  )
}
