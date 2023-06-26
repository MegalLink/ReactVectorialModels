import * as React from 'react'
import { CssBaseline } from '@mui/material'
import { Header } from './components/Header/Header'
import { HorizontalTabs } from './components/Tabs/Tabs'
import { FloatingNavigation } from './components/FloatingNavigation/FloatingNavigation'
export default function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <HorizontalTabs />
      <FloatingNavigation/>
    </React.Fragment>
  )
}
