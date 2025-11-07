import { icons } from 'lucide-react-native'
import React from 'react'
import { View } from 'react-native'

import {
  CardContainer,
  ColumnComponent,
  Container,
  FlatListComponent,
  IconComponent,
  RowComponent,
  TextComponent,
} from '@/components'
import PlusButton from '@/components/common/plus-button'
import { Food, mockFoodCategories, mockFoods } from '@/lib'

const CategoryIcon = ({
  icon,
  iconColor,
  backgroundColor,
}: {
  icon: keyof typeof icons
  iconColor?: string
  backgroundColor: string
}) => (
  <View style={{ padding: 10, backgroundColor, borderRadius: 100 }}>
    <IconComponent name={icon} size={16} color={iconColor} />
  </View>
)

export default function Foods() {
  const foodsByCategory = mockFoodCategories.map((cat) => ({
    ...cat,
    items: mockFoods.filter((f) => f.category_id === cat.id),
  }))

  return (
    <Container>
      <FlatListComponent
        data={foodsByCategory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardContainer>
            <ColumnComponent gap={15}>
              <RowComponent justify="space-between">
                <RowComponent gap={10}>
                  <CategoryIcon
                    icon={item.icon as keyof typeof icons}
                    iconColor={item.color ?? '#fff'}
                    backgroundColor={`${item.color}30`}
                  />
                  <ColumnComponent>
                    <TextComponent text={item.name} type="title1" />
                    <TextComponent
                      text={item.description ?? ''}
                      type="caption"
                      color="textSecondary"
                    />
                  </ColumnComponent>
                </RowComponent>
              </RowComponent>

              <ColumnComponent gap={8}>
                {item.items.length > 0 ? (
                  item.items.map((food: Food) => (
                    <RowComponent
                      key={food.id}
                      justify="space-between"
                      alignItems='center'
                      style={{
                        borderBottomWidth: 0.5,
                        borderColor: '#E5E7EB',
                        paddingVertical: 4,
                      }}
                    >
                      <ColumnComponent>
                        <TextComponent text={food.name} type="title2" />
                        <TextComponent
                          text={`${food.calories} kcal / ${food.unit}`}
                          type="caption"
                          color="textSecondary"
                        />
                      </ColumnComponent>
                      <ColumnComponent alignItems="flex-end">
                        <TextComponent
                          text={`${food.protein.toFixed(1)}g P`}
                          type="label"
                        />
                        <TextComponent
                          text={`${food.fat.toFixed(1)}g F | ${food.carbs.toFixed(1)}g C`}
                          type="caption"
                          color="textSecondary"
                        />
                      </ColumnComponent>
                    </RowComponent>
                  ))
                ) : (
                  <TextComponent
                    text="No foods in this category"
                    type="label"
                    textAlign="center"
                    color="textSecondary"
                  />
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
