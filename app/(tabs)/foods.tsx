import React from 'react'

import {
  CardContainer,
  CategoryIcon,
  ColumnComponent,
  FlatListComponent,
  RowComponent,
  TextComponent,
  TextInputComponent
} from '@/components'
import ButtonComponent from '@/components/common/button-component'
import PlusButton from '@/components/common/plus-button'
import { Food, mockFoods } from '@/lib'
import { View } from 'react-native'

export default function Foods() {

  return (
    <View style={{ position: 'relative' }}>
      <TextInputComponent isSearch placeholder='search' />

      <FlatListComponent
        data={mockFoods}
        keyExtractor={(item) => item.id}
        // ListHeaderComponent={
        //   <View style={{ backgroundColor: 'white' }}>
        //   <TextInputComponent isSearch placeholder='search'/>
        //   </View>
        // }
        // stickyHeaderIndices={[0]}
        renderItem={({ item }: { item: Food }) => (
          <CardContainer>
            <RowComponent justify="space-between">
              <RowComponent gap={10}>
                <CategoryIcon
                  icon={"Leaf"}
                  iconColor={"#22C55E"}
                  backgroundColor={`#22C55E30`}
                />
                <ColumnComponent>
                  <TextComponent text={item.name} type="title1" />
                  <TextComponent
                    text={"165 cal per 100g"}
                    type="caption"
                    color="textSecondary"
                  />
                </ColumnComponent>
              </RowComponent>

              <RowComponent gap={10}>
                <ButtonComponent icon='Trash' />
                <ButtonComponent icon='Pencil' />
              </RowComponent>
            </RowComponent>

          </CardContainer>
        )}
      />
      {/* <FlatListComponent
        data={mockFoods}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Food }) => (
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
      /> */}

      <PlusButton />
    </View>
  )
}
