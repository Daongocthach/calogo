import { useState } from 'react'

import {
  Container,
  Settings,
  TabViewComponent,
  UserDetail,
} from '@/components'

const routes = [
  { key: 'profile', title: 'profile' },
  { key: 'settings', title: 'setttings' },
]

export default function ProfileScreen() {
  const [index, setIndex] = useState(0)

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'profile':
        return <UserDetail />
      case 'settings':
        return <Settings />
      default:
        return null
    }
  }

  return (
    <Container>
      <TabViewComponent
        index={index}
        setIndex={setIndex}
        renderScene={renderScene}
        routes={routes}
      />
    </Container>
  )
}