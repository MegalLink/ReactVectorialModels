import React from 'react'

import { HorizontalTabs } from '../../components/Tabs/HorizontalTab'
import { MainHeader } from '../../components/MainHeader/MainHeader'
import { Modal } from '../../components/Modal/Modal'

export function MainPage() {
  return (
    <div>
      <Modal />
      <MainHeader />
      <HorizontalTabs />
    </div>
  )
}
