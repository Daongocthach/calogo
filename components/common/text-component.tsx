import { useTranslation } from 'react-i18next'
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native'

import { useTheme } from '@/hooks'
import { useGetColorByKey } from '@/hooks/use-get-color-by-key'
import { FONT_FAMILIES } from '@/lib/constants/ui'
import { ThemeColorKeys } from '@/lib/types'

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
  const { colors } = useTheme()
  const { t } = useTranslation()
  const { getColorByKey } = useGetColorByKey()

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
          color: color ? getColorByKey(color) : colors.text,
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
    fontSize: 14,
    lineHeight: 15,
    fontFamily: FONT_FAMILIES.REGULAR,
  },
  title: {
    fontSize: 18,
    lineHeight: 28,
    fontFamily: FONT_FAMILIES.SEMIBOLD,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILIES.REGULAR,
  },
  link: {
    lineHeight: 15,
    fontSize: 14,
    fontFamily: FONT_FAMILIES.REGULAR,
  },
});