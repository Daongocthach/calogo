import { useTheme } from '@/hooks/use-theme'
import { ThemeColors } from '@/types'
import MaskedView from '@react-native-masked-view/masked-view'
import { LinearGradient } from 'expo-linear-gradient'
import { icons } from 'lucide-react-native'
import { ViewStyle } from 'react-native'


type IconComponentProps = {
  name: keyof typeof icons
  color?: keyof ThemeColors | (string & {})
  size?: number
  style?: ViewStyle
  gradientColors?: [string, string, ...string[]]
}

const IconComponent = ({
  name,
  color,
  size = 24,
  style,
  gradientColors = undefined,
}: IconComponentProps) => {
  const colors = useTheme()
  const LucideIcon = icons[name]
  if (!LucideIcon) return null

  if (gradientColors && gradientColors.length > 1) {
    return (
      <MaskedView
        maskElement={
          <LucideIcon
            color="black"
            width={size}
            height={size}
            style={style}
          />
        }
      >
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ width: size, height: size }}
        />
      </MaskedView>
    )
  }

  return (
    <LucideIcon
      color={color ? color : colors.icon}
      width={size}
      height={size}
      style={style}
    />
  )
}

export default IconComponent
