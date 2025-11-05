import { icons } from 'lucide-react-native'
import React from 'react'
import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { ThemeColorKeys } from '@/lib'
import Icon from './icon-component'
import RowComponent from './row-component'
import TextComponent from './text-component'

type IconLabelProps = {
    gap?: number
    style?: StyleProp<ViewStyle>
    iconName?: keyof typeof icons
    label?: string
    color?: ThemeColorKeys
    size?: number
    fontWeight?: 'regular' | 'medium' | 'semibold' | 'bold'
    textStyle?: StyleProp<TextStyle>
    numberOfLines?: number
    onPress?: () => void
}

const IconLabel = ({
    gap = 10,
    style,
    iconName,
    label,
    color,
    size = 16,
    fontWeight: font = 'medium',
    onPress,
    textStyle,
    numberOfLines,
}: IconLabelProps) => {
    return (
        <RowComponent
            gap={gap}
            style={style}
            onPress={onPress}
        >
            {iconName && (
                <Icon name={iconName} size={size} color={color || "onSurfaceVariant"} />
            )}
            {label && (
                <TextComponent
                    numberOfLines={numberOfLines}
                    size={size * 0.8125}
                    color={color || "onSurfaceVariant"}
                    text={label}
                    style={textStyle}
                    fontWeight={font}
                />
            )}
        </RowComponent>
    )
}

export default IconLabel