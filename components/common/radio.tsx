import { useTheme } from "@/hooks"
import { ThemeColorKeys } from "@/lib"
import { View } from "react-native"

interface RadioCircleProps {
  selected: boolean
  size?: number
  innerSize?: number
  color?: ThemeColorKeys
}

export default function RadioCircle({
  selected,
  size = 20,
  innerSize = 10,
  color,
}: RadioCircleProps) {
  const { colors } = useTheme()
  const activeColor = color || colors.primary

  return (
    <View
      style={{
        width: size,
        height: size,
        borderWidth: 2,
        borderRadius: size,
        borderColor: selected ? activeColor : colors.onSurfaceVariant,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {selected && (
        <View
          style={{
            width: innerSize,
            height: innerSize,
            borderRadius: innerSize,
            backgroundColor: activeColor,
          }}
        />
      )}
    </View>
  )
}
