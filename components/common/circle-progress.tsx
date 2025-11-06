import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Circle, Defs, LinearGradient, Stop, Svg } from 'react-native-svg'

import { useTheme } from '@/hooks'
import TextComponent from './text-component'

interface CircularProgressRingProps {
  value: number
  goal: number
  size?: number
  strokeWidth?: number
  unit?: string
}

const CircularProgressRing = ({
  value,
  goal,
  size = 140,
  strokeWidth = 10,
  unit = 'kcal',
}: CircularProgressRingProps) => {
  const { colors } = useTheme()
  const center = size / 2
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const progress = Math.min(value / goal, 1)
  const strokeDashoffset = circumference * (1 - progress)

  const gradientId = useMemo(() => `grad-${Math.random()}`, [])

  const formattedValue = value.toLocaleString()
  const formattedGoal = goal.toLocaleString()

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={size} height={size}>
        <Defs>
          <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={colors.primary} stopOpacity={1} />
            <Stop offset="100%" stopColor={colors.primary} stopOpacity={1} />
          </LinearGradient>
        </Defs>

        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.outlineVariant}
          strokeWidth={strokeWidth}
          fill="none"
        />

        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          originX={center}
          originY={center}
        />
      </Svg>

      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <TextComponent
          type="title1"
          size={size * 0.25}
          text={formattedValue}
        />
        <TextComponent
          type="caption"
          size={size * 0.12}
          color="icon"
        >
          / {formattedGoal} {unit}
        </TextComponent>
      </View>
    </View>
  )
}

export default CircularProgressRing
