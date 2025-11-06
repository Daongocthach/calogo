import TextComponent from '@/components/common/text-component'
import { useTheme } from '@/hooks'
import React from 'react'
import { StyleSheet, View } from 'react-native'

interface NutritionBoxProps {
  value: string | number
  label: string
  highlight?: boolean
  unit?: string
}

interface NutritionSummaryProps {
  remaining: number
  protein: number
  fat: number
}

const NutritionSummary = ({ remaining, protein, fat }: NutritionSummaryProps) => {
  const { colors } = useTheme()

  const Box = ({ value, label, highlight, unit }: NutritionBoxProps) => (
    <View style={[styles.box, { backgroundColor: colors.surfaceVariant }]}>
      <TextComponent
        type="title1"
        color={highlight ? 'primary' : undefined}
        fontWeight={highlight ? 'semibold' : 'bold'}
      >
        {value}
        {unit}
      </TextComponent>
      <TextComponent type="caption" color="icon">
        {label}
      </TextComponent>
    </View>
  )

  return (
    <View style={styles.container}>
      <Box value={remaining} label="Remaining" highlight />
      <Box value={protein} label="Protein" unit="g" />
      <Box value={fat} label="Fat" unit="g" />
    </View>
  )
}

export default NutritionSummary

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  box: {
    flex: 1,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
    maxWidth: 100,
  },
})
