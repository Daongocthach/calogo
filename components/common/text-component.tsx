import { useTranslation } from 'react-i18next'
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native'

import { useTheme } from '@/hooks'
import { useGetColorByKey } from '@/hooks/use-get-color-by-key'
import { FONT_FAMILIES } from '@/lib/constants/ui'
import { ThemeColorKeys } from '@/lib/types'

type TextType =
  | 'display'
  | 'title1'
  | 'title2'
  | 'body'
  | 'caption'
  | 'label'
  | 'link'

interface TextComponentProps extends TextProps {
  children?: React.ReactNode
  style?: StyleProp<TextStyle>
  text?: string
  size?: number
  lineHeight?: number
  color?: ThemeColorKeys
  fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold'
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  type?: TextType
}

const TextComponent = ({
  children,
  style,
  text,
  size,
  fontWeight = 'regular',
  type = 'body',
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

  const resolvedColor =
    color
      ? getColorByKey(color)
      : ['caption', 'label'].includes(type)
        ? colors.icon
        : colors.text

  return (
    <Text
      {...props}
      style={[
        {
          color: resolvedColor,
          textAlign: textAlign ?? 'left',
          fontFamily: getFontFamily(fontWeight),
          fontSize: size,
          lineHeight,
        },
        styles[type],
        style,
      ]}
    >
      {text ? t(text) : children}
    </Text>
  )
}

export default TextComponent

const styles = StyleSheet.create({
  display: {
    fontSize: 20,
    lineHeight: 25,
    fontFamily: FONT_FAMILIES.SEMIBOLD,
  },
  title1: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: FONT_FAMILIES.SEMIBOLD,
  },
  title2: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: FONT_FAMILIES.MEDIUM,
  },
  body: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: FONT_FAMILIES.REGULAR,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: FONT_FAMILIES.REGULAR,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    fontFamily: FONT_FAMILIES.REGULAR,
  },
  link: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: FONT_FAMILIES.REGULAR,
    textDecorationLine: 'underline',
  },
})
