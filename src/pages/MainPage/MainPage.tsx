import React from 'react'

import { HorizontalTabs } from '../../components/Tabs/HorizontalTab'
import { MainHeader } from '../../components/MainHeader/MainHeader'

export function MainPage() {
  return (
    <div>
      <MainHeader />
      <HorizontalTabs />
    </div>
  )
}
