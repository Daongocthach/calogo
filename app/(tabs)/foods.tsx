import React from 'react'

import {
  ColumnComponent,
  Container,
  FlatListComponent,
  TextInputComponent
} from '@/components'
import PlusButton from '@/components/common/plus-button'
import FoodCard from '@/components/foods/food-card'
import { mockFoods } from '@/lib'

export default function Foods() {

  return (
    <Container style={{ position: 'relative' }}>
      <ColumnComponent gap={10}>
        <TextInputComponent isSearch placeholder='search' />
        <FlatListComponent
          data={mockFoods}
          keyExtractor={(item) => item.id}
          renderItem={(item) => (
            <FoodCard {...item.item} />
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      </ColumnComponent>
      <PlusButton />
    </Container>
  )
}
