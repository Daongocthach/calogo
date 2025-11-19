import { useTheme } from "@/hooks"
import useStore from '@/store'
import { BlurView } from 'expo-blur'
import React, { ReactNode } from 'react'
import { StyleProp, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native'

interface CardContainerProps extends TouchableOpacityProps {
    children?: ReactNode
    cardColor?: string
    style?: StyleProp<ViewStyle>
    isBlur?: boolean
    blurIntensity?: number
}

const CardContainer = ({
    children,
    style,
    cardColor,
    isBlur,
    blurIntensity = 100,
    ...rest
}: CardContainerProps) => {
    const { darkMode } = useStore()
    const { colors } = useTheme()

    if (isBlur) {
        return (
            <TouchableOpacity
                {...rest}
                activeOpacity={0.9}
                style={[{
                    borderRadius: 8,
                    overflow: 'hidden'
                }, style]}
            >
                <BlurView
                    intensity={blurIntensity}
                    tint={darkMode ? "dark" : "systemChromeMaterial"}
                    style={{
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <TouchableOpacity
                        style={[{
                            borderRadius: 8,
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }]}
                    >
                        {children}
                    </TouchableOpacity>
                </BlurView>
            </TouchableOpacity>
        )
    }

    return (
        <TouchableOpacity
            {...rest}
            activeOpacity={0.9}
            style={[{
                flexDirection: 'column',
                borderWidth: 1,
                borderColor: colors.outlineVariant,
                backgroundColor: colors.background,
                padding: 20,
                borderRadius: 10,
                shadowColor: colors.shadow,
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
            }, style]}
        >
            {children}
        </TouchableOpacity>
    )
}

export default CardContainer
