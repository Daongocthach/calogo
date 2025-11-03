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
  weight?: TextStyle['fontWeight']
  font?: 'regular' | 'medium' | 'semibold' | 'bold'
  color?: ThemeColorKeys
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
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
  type,
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
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
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
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
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
    color: '#0a7ea4',
  },
});