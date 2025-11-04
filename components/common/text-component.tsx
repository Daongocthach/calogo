import { useTranslation } from 'react-i18next'
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native'

import { FONT_FAMILIES } from '@/constants/ui'
import { useTheme } from '@/hooks'
import { ThemeColorKeys } from '@/types'

interface TextComponentProps extends TextProps {
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
  text?: string
  size?: number
  lineHeight?: number
  color?: ThemeColorKeys
  fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold'
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  type?: 'default' | 'title' | 'subtitle' | 'link'
}

const TextComponent = ({
  children,
  style,
  text,
  size,
  fontWeight = 'regular',
  type = 'default',
  textAlign,
  color,
  lineHeight,
  ...props
}: TextComponentProps) => {
  if (!text && !children) return null
  const colors = useTheme()
  const { t } = useTranslation()

  const getFontFamily = (fontFamily: typeof fontWeight) => {
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
          color: colors.text,
          fontSize: size,
          fontFamily: getFontFamily(fontWeight),
          textAlign: textAlign ?? 'left',
        },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        style,
      ]}
    >
      {text ? t(text) : children}
    </Text>
  )
}

export default TextComponent

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
  },
});