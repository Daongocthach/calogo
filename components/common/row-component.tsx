import React, { ReactNode } from 'react'
import {
  FlexAlignType,
  StyleProp,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'

interface RowComponentBaseProps {
  children: ReactNode
  justify?:
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
  alignItems?: FlexAlignType
  onPress?: () => void
  wrap?: boolean
  gap?: number
  style?: StyleProp<ViewStyle>
}

type RowComponentProps = RowComponentBaseProps &
  (ViewProps | TouchableOpacityProps)

const RowComponent = React.forwardRef<View, RowComponentProps>(
  (
    {
      children,
      justify = 'flex-start',
      alignItems = 'center',
      onPress,
      style,
      gap = 0,
      wrap = false,
      ...rest
    },
    ref
  ) => {
    const baseStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems,
      justifyContent: justify,
      gap,
      flexWrap: wrap ? 'wrap' : 'nowrap',
    }

    if (onPress) {
      return (
        <TouchableOpacity
          ref={ref}
          style={[baseStyle, style]}
          onPress={onPress}
          activeOpacity={0.7}
          {...(rest as TouchableOpacityProps)}
        >
          {children}
        </TouchableOpacity>
      )
    }

    return (
      <View ref={ref} style={[baseStyle, style]} {...(rest as ViewProps)}>
        {children}
      </View>
    )
  }
)

export default RowComponent
