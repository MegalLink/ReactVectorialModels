import React from 'react'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import { Tab } from '@mui/material'
import { InputTab } from '../InputTab/InputTab'
import { useAppSelector } from '../../store/store-hook'
import { TabEnum } from '../../shared/enums/tab'
import { ConfigTab } from '../ConfigTab/ConfigTab'
import { OutputTab } from '../OutputTab/OutputTab'
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
  const { tab } = useAppSelector((store) => store.vectorialData)

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', height: 300 }}>
      <Tabs
        centered
        orientation='horizontal'
        value={tab}
        aria-label='Horizontal tabs'
        sx={{ borderRight: 1, borderColor: 'divider' }}
        variant='fullWidth'
      >
        <Tab label='Input' {...selectTab(TabEnum.INPUT)} />
        <Tab label='Config' {...selectTab(TabEnum.CONFIG)} />
        <Tab label='Output' {...selectTab(TabEnum.OUTPUT)} />
      </Tabs>
      <TabPanel value={tab} index={TabEnum.INPUT}>
        <InputTab />
      </TabPanel>
      <TabPanel value={tab} index={TabEnum.CONFIG}>
        <ConfigTab />
      </TabPanel>
      <TabPanel value={tab} index={TabEnum.OUTPUT}>
        <OutputTab />
      </TabPanel>
    </Box>
  )
}
