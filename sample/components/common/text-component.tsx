import { useTranslation } from 'react-i18next'

import { FONT_FAMILIES } from '@/constants/ui'
import { useTheme } from '@/hooks'
import { ThemeColors } from '@/types'
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native'

interface TextComponentProps extends TextProps {
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
  text?: string
  size?: number
  weight?: TextStyle['fontWeight']
  font?: 'regular' | 'medium' | 'semibold' | 'bold'
  color?: keyof ThemeColors | string & {}
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  lineHeight?: number
}

const TextComponent = ({
  children,
  style,
  text,
  size,
  weight,
  font = 'regular',
  textAlign,
  color,
  lineHeight,
  ...props
}: TextComponentProps) => {
  if (!text && !children) return null
  const colors = useTheme()
  const { t } = useTranslation()

  const getFontFamily = (fontFamily: typeof font) => {
    switch (fontFamily) {
      case 'medium':
        return FONT_FAMILIES.MEDIUM
      case 'semibold':
        return FONT_FAMILIES.SEMIBOLD
      case 'bold':
        return FONT_FAMILIES.BOLD
      default:
        return FONT_FAMILIES.REGULAR
    }
  }

  return (
    <Text
      {...props}
      style={[
        {
          color: color ? color : colors.text,
          fontSize: size,
          fontFamily: getFontFamily(font),
          fontWeight: weight ?? 'normal',
          textAlign: textAlign ?? 'left',
        },
        style,
      ]}
    >
      {text ? t(text) : children}
    </Text>
  )
}

export default TextComponent

const styles = StyleSheet.create({
  
})