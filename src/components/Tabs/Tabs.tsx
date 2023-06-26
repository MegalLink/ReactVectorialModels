import React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import { Tab } from '@mui/material'
import { InputTab } from '../InputTab/InputTab'
import { useAppSelector } from '../../store/store-hook'
interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ mt: 2, p: 2 }}>{children}</Box>}
    </div>
  )
}

function selectTab(index: number) {
  return {
    id: `horizontal-tab-${index}`,
    'aria-controls': `horizontal-tabpanel-${index}`,
  }
}

export function HorizontalTabs() {
  const {tab} = useAppSelector((store)=>store.vectorialData)


  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', height: 300 }}>
      <Tabs
        centered
        orientation='horizontal'
        value={value}
        onChange={handleChange}
        aria-label='Horizontal tabs'
        sx={{ borderRight: 1, borderColor: 'divider' }}
        variant='fullWidth'
      >
        <Tab label='Input' {...selectTab(0)} />
        <Tab label='Config' {...selectTab(1)} />
        <Tab label='Output' {...selectTab(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <InputTab />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h1>Soy el h2</h1>
      </TabPanel>
    </Box>
  )
}
