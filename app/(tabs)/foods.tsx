import { icons } from 'lucide-react-native'
import React from 'react'
import { View } from 'react-native'

import { CardContainer, ColumnComponent, Container, FlatListComponent, IconComponent, RowComponent, TextComponent } from '@/components'
import CircularProgressRing from '@/components/common/circle-progress'
import PlusButton from '@/components/common/plus-button'
import NutritionSummary from '@/components/meals/nutrion-summary'

const FoodCard = ({
  icon,
  iconColor,
  backgroundColor
}: {
  icon: keyof typeof icons,
  iconColor?: string,
  backgroundColor: string
}) => (
  <View style={{ padding: 10, backgroundColor, borderRadius: 100 }}>
    <IconComponent
      name={icon}
      size={15}
      color={iconColor}
    />
  </View>
)

export default function Foods() {

  return (
    <Container>
      <FlatListComponent
        data={mockMeals}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <ColumnComponent alignItems='center' gap={10} style={{ marginBottom: 10 }} >
            <CircularProgressRing value={1540} goal={2000} size={120} strokeWidth={10} />
            <NutritionSummary remaining={460} protein={78} fat={52} />
          </ColumnComponent>
        }
        renderItem={({ item }: { item: meal }) => (
          <CardContainer>
            <ColumnComponent gap={15}>
              <RowComponent justify='space-between'>
                <RowComponent gap={10}>
                  <MealIcon
                    icon={item?.icon as keyof typeof icons}
                    iconColor={item?.iconColor}
                    backgroundColor={item?.backgroundColor}
                  />
                  <TextComponent text={item?.type} type='title1' />
                </RowComponent>
                <TextComponent text={`${item.totalCalories} kcal`} type='label' />
              </RowComponent>
              <ColumnComponent gap={10}>
                {item.food.length > 0 ? (
                  item.food.map((foodItem, index) => (
                    <RowComponent key={`${foodItem.name}-${index}`} justify='space-between'>
                      <ColumnComponent>
                        <TextComponent text={foodItem?.name} type='title2' />
                        <TextComponent text={foodItem?.quantity} type='caption' />
                      </ColumnComponent>
                      <TextComponent text={`${foodItem?.calories} kcal`} type='label' />
                    </RowComponent>
                  ))
                ) : (
                  <TextComponent text='No snacks added yet' type='label' textAlign='center' />
                )}
              </ColumnComponent>
            </ColumnComponent>
          </CardContainer>
        )}
      />
      <PlusButton />
    </Container>
  )
}