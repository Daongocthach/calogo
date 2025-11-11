import { useRouter } from 'expo-router'
import { icons } from 'lucide-react-native'
import React from 'react'
import { View } from 'react-native'

import {
  CardContainer,
  CircularProgress,
  ColumnComponent,
  IconComponent,
  NutritionSummary,
  ParallaxScrollView,
  PlusButton,
  RowComponent,
  TextComponent
} from '@/components'
import ButtonComponent from '@/components/common/button-component'

type meal = {
  id: number,
  type: string,
  icon: string,
  iconColor: string,
  backgroundColor: string,
  totalCalories: number
  food: {
    name: string,
    quantity: string,
    calories: number
  }[]
}

const mockMeals = [
  {
    id: 1,
    type: "Breakfast",
    icon: "Sun",
    iconColor: "#EAB308",
    backgroundColor: "#FFE5B4",
    totalCalories: 420,
    food: [
      {
        name: "Oatmeal with berries",
        quantity: "1 cup",
        calories: 280,
      },
      {
        name: "Greek yogurt",
        quantity: "150g",
        calories: 140,
      },
    ],
  },
  {
    id: 2,
    type: "Lunch",
    icon: "Hamburger",
    iconColor: "#F97316",
    backgroundColor: "#FFEDD5",
    totalCalories: 680,
    food: [
      {
        name: "Grilled chicken salad",
        quantity: "1 serving",
        calories: 380,
      },
      {
        name: "Quinoa",
        quantity: "100g",
        calories: 220,
      },
      {
        name: "Avocado",
        quantity: "1/2 medium",
        calories: 80,
      },
    ],
  },
  {
    id: 3,
    type: "Dinner",
    icon: "Utensils",
    iconColor: "#A855F7",
    backgroundColor: "#F3E8FF",
    totalCalories: 440,
    food: [
      {
        name: "Baked salmon",
        quantity: "120g",
        calories: 280,
      },
      {
        name: "Steamed broccoli",
        quantity: "1 cup",
        calories: 55,
      },
      {
        name: "Brown rice",
        quantity: "1/2 cup",
        calories: 105,
      },
    ],
  },
  {
    id: 4,
    type: "Snacks",
    icon: "Apple",
    iconColor: "#22C55E",
    backgroundColor: "#DCFCE7",
    totalCalories: 0,
    food: [],
  },
]

const MealIcon = ({
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

export default function HomeScreen() {
  const router = useRouter()

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <ParallaxScrollView
        headerImage={
          <ColumnComponent alignItems='center' gap={10}>
            <CircularProgress value={1540} goal={2000} size={120} strokeWidth={10} />
            <NutritionSummary remaining={460} protein={78} fat={52} />
          </ColumnComponent>
        }
      >
        <>
          {mockMeals.map((item: meal) => (
            <CardContainer key={item.id}>
              <ColumnComponent gap={15}>
                <RowComponent justify='space-between'>
                  <RowComponent gap={10}>
                    <MealIcon
                      icon={item.icon as keyof typeof icons}
                      iconColor={item.iconColor}
                      backgroundColor={item.backgroundColor}
                    />
                    <TextComponent text={item.type} type='title1' />
                  </RowComponent>
                  <TextComponent text={`${item.totalCalories} kcal`} type='label' />
                </RowComponent>

                <ColumnComponent gap={10}>
                  {item.food.length > 0 ? (
                    item.food.map((foodItem, index) => (
                      <RowComponent key={`${foodItem.name}-${index}`} justify='space-between'>
                        <ColumnComponent>
                          <TextComponent text={foodItem.name} type='title2' />
                          <TextComponent text={foodItem.quantity} type='caption' />
                        </ColumnComponent>
                        <TextComponent text={`${foodItem.calories} kcal`} type='label' />
                      </RowComponent>
                    ))
                  ) : (
                    <TextComponent
                      text='No snacks added yet'
                      type='label'
                      textAlign='center'
                    />
                  )}
                </ColumnComponent>
              </ColumnComponent>
            </CardContainer>
          ))}
        </>
      </ParallaxScrollView>
      <PlusButton />
      <ButtonComponent onPress={() => router.push('/welcome')} />
    </View>
  )
}