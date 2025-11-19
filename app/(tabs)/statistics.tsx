import { useState } from 'react'

import {
  Container,
  Month,
  TabViewComponent,
  Week,
  Year,
} from '@/components'

const routes = [
  { key: 'week', title: 'week' },
  { key: 'month', title: 'month' },
  { key: 'year', title: 'year' },
]

export default function StatisticsScreen() {
  const [index, setIndex] = useState(0)

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case 'week':
        return <Week />
      case 'month':
        return <Month />
      case 'year':
        return <Year />
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