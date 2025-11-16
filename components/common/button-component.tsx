import { LinearGradient } from 'expo-linear-gradient'
import { icons } from "lucide-react-native"
import { ReactNode, useMemo } from "react"
import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"

import { useGetColorByKey } from "@/hooks/use-get-color-by-key"
import { ThemeColorKeys } from '@/lib/types'
import Icon from "./icon-component"
import TextComponent from "./text-component"

interface ButtonComponentProps extends TouchableOpacityProps {
  children?: ReactNode
  buttonStyle?: TouchableOpacityProps["style"]
  textStyle?: StyleProp<TextStyle>
  text?: string
  textSize?: number
  icon?: keyof typeof icons
  iconSize?: number
  iconColor?: ThemeColorKeys
  backgroundColor?: ThemeColorKeys
  disabled?: boolean
  loading?: boolean
  outline?: boolean
  ghost?: boolean
  clear?: boolean
  isLinearGradient?: boolean
  linearGradientColors?: string[]
}

function ButtonComponent({
  children,
  buttonStyle,
  textStyle,
  text,
  textSize = 14,
  icon,
  iconSize = 18,
  iconColor,
  backgroundColor = "primary",
  disabled = false,
  loading = false,
  outline = false,
  ghost = false,
  clear = false,
  isLinearGradient = false,
  linearGradientColors = ['#31cce8', '#6ae1da'],
  ...props
}: ButtonComponentProps) {
  const { getColorByKey } = useGetColorByKey()
  const isIconOnly = !!icon && !text && !children

  const { bgColor, borderColor, contentColor, padding, borderWidth } = useMemo(() => {
    const bg = ghost ? 'transparent' :
      (disabled || loading)
        ? getColorByKey("surfaceDisabled")
        : isIconOnly || outline
          ? "transparent"
          : clear
            ? getColorByKey("surface")
            : getColorByKey(backgroundColor)

    const border = (disabled || ghost)
      ? "transparent"
      : getColorByKey(backgroundColor)

    const color = iconColor
      ? getColorByKey(iconColor)
      : (disabled
        ? getColorByKey("onSurfaceDisabled")
        : (ghost || isIconOnly || outline)
          ? getColorByKey(backgroundColor)
          : clear
            ? getColorByKey("onSurface")
            : getColorByKey("onPrimary"))

    return {
      bgColor: bg,
      borderColor: border,
      contentColor: color,
      padding: ghost ? 0 : isIconOnly ? 0 : 10,
      borderWidth: outline ? 1 : 0
    }
  }, [disabled, loading, ghost, isIconOnly, outline, clear, backgroundColor, iconColor, getColorByKey])

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      {...props}
    >
      <LinearGradient
        colors={
          isLinearGradient
            ? [linearGradientColors[0], linearGradientColors[1]]
            : [bgColor!, bgColor!]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
            borderColor: borderColor,
            borderWidth,
            height: 48,
            opacity: disabled ? 0.6 : 1,
            padding,
          },
          buttonStyle,
        ]}
      >
        {loading ? (
          ghost ? (
            <ActivityIndicator color={contentColor} size={iconSize} />
          ) : (
            <ActivityIndicator color={contentColor} style={{ marginRight: 8 }} />
          )
        ) : (
          icon && (
            <Icon
              name={icon}
              size={iconSize}
              color={contentColor ?? getColorByKey("onPrimary")}
              style={{ marginRight: text || children ? 8 : 0 }}
            />
          )
        )}
        {text && (
          <TextComponent
            style={[{ color: contentColor }, textStyle]}
            text={text}
            size={textSize}
            fontWeight={'medium'}
            numberOfLines={1}
          />
        )}
        {children}
      </LinearGradient>
    </TouchableOpacity>
  )
}

export default ButtonComponent
