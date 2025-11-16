import { icons } from 'lucide-react-native'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native'

import { useTheme } from "@/hooks"
import { FONT_FAMILIES } from '@/lib/constants'
import Icon from './icon-component'
import TextComponent from './text-component'

interface CustomTextInputProps extends TextInputProps {
  style?: TextInputProps['style']
  viewStyle?: ViewStyle
  isSearch?: boolean
  isPassword?: boolean
  errorMessage?: string
  isDropdown?: boolean
  isClear?: boolean
  onClear?: () => void
  leftIcon?: keyof typeof icons
  leftIconSize?: number
  onPressInLeftIcon?: () => void
  rightIcon?: keyof typeof icons
  rightIconSize?: number
  label?: string
  textAlignVertical?: 'center' | 'top' | 'bottom' | 'auto'
  labelColor?: string
  labelStyle?: TextStyle
}

const TextInputComponent = ({
  isSearch = false,
  isPassword = false,
  isDropdown = false,
  isClear = false,
  onClear,
  errorMessage,
  leftIcon,
  leftIconSize = 22,
  onPressInLeftIcon,
  rightIcon,
  rightIconSize = 22,
  style,
  viewStyle,
  label,
  textAlignVertical = 'center',
  labelColor,
  labelStyle,
  ...props
}: CustomTextInputProps) => {
  const { t } = useTranslation()
  const { colors } = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const focusBorderColor = isFocused ? colors.primary : colors.outlineVariant
  const focusIconColor = isFocused ? colors.primary : colors.onSurface

  const renderLeftIcon = () => {
    if (isSearch) {
      return (
        <Icon
          name="Search"
          size={leftIconSize}
          color={focusIconColor}
          style={styles.leftIcon}
        />
      )
    }
    if (leftIcon) {
      return (
        <TouchableOpacity onPress={onPressInLeftIcon}>
          <Icon
            name={leftIcon}
            size={leftIconSize}
            color={focusIconColor}
            style={styles.leftIcon}
          />
        </TouchableOpacity>
      )
    }
    return null
  }

  const canShowClear =
    (isSearch || !!isClear) &&
    typeof props.value === 'string' &&
    props.value.length > 0 &&
    props.editable !== false

  const handleClear = () => {
    if (onClear) {
      onClear()
    } else {
      props.onChangeText?.('')
    }
  }

  return (
    <View style={{ flexGrow: 1 }}>
      {label &&
        <TextComponent
          text={label}
          type="label"
          size={14}
          style={[{ marginBottom: 8 }, labelStyle]}
          color={labelColor || "onSurface"}
        />
      }
      <View
        style={[
          styles.container,
          {
            borderColor: focusBorderColor,
            borderWidth: isFocused ? 2 : 1,
          },
          viewStyle
        ]}
      >
        {renderLeftIcon()}

        <TextInput
          {...props}
          placeholderTextColor={colors.onSurfaceVariant}
          secureTextEntry={isPassword && !showPassword}
          value={props.value}
          placeholder={t(props.placeholder ?? '')}
          onFocus={(e) => {
            setIsFocused(true)
            props.onFocus?.(e)
          }}
          onBlur={(e) => {
            setIsFocused(false)
            props.onBlur?.(e)
          }}
          style={[
            styles.input,
            {
              color: colors.onBackground,
              fontFamily: FONT_FAMILIES.REGULAR,
              textAlignVertical: textAlignVertical,
              paddingRight: canShowClear || rightIcon ? 30 : 0
            },
            style,
          ]}
        />

        {canShowClear && (
          <TouchableOpacity
            onPress={handleClear}
            style={{
              position: 'absolute',
              right: isPassword || rightIcon ? 36 : 10,
              top: '50%',
              transform: [{ translateY: -12 }],
              width: 24,
              height: 24,
              borderRadius: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.level2,
            }}
            hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
          >
            <Icon name="X" size={14} color="onSurface" />
          </TouchableOpacity>
        )}

        {rightIcon && (
          <Icon
            name={rightIcon}
            size={rightIconSize}
            color={focusIconColor}
            style={styles.rightIcon}
          />
        )}

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'EyeOff' : 'Eye'}
              size={18}
              color={focusIconColor}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
        )}

        {isDropdown && (
          <Icon
            name="ChevronDown"
            size={20}
            color={focusIconColor}
            style={styles.rightIcon}
          />
        )}
      </View>

      {errorMessage && (
        <TextComponent
          text={errorMessage}
          style={{
            color: colors.error,
            marginTop: 6,
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 10,
    position: "relative",
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontFamily: FONT_FAMILIES.REGULAR,
  },
})

export default TextInputComponent
