import React, { ReactNode } from "react"
import {
  Platform,
  ScrollView,
  StatusBar,
  View,
  ViewStyle,
} from "react-native"
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated"
import {
  SafeAreaViewProps,
  useSafeAreaInsets,
} from "react-native-safe-area-context"

import { useTheme } from "@/hooks"

interface Props extends SafeAreaViewProps {
  children: ReactNode
  isScroll?: boolean
  isImageBackground?: boolean
  style?: ViewStyle
  contentContainerStyle?: ViewStyle
  blurRadius?: number
  isBottomTab?: boolean
  noHeader?: boolean
  animation?: "fade" | "slide" | "none"

  safeTop?: boolean
  safeBottom?: boolean
}

const Container = ({
  children,
  isScroll = false,
  style,
  contentContainerStyle,
  blurRadius = 0,
  isBottomTab = false,
  noHeader = false,
  animation = "slide",
  safeTop = true,
  safeBottom = true,
  ...props
}: Props) => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  const ContentWrapper = isScroll ? ScrollView : View
  const contentProps = {
    contentContainerStyle: [
      {
        paddingHorizontal: 0,
        flex: isScroll ? undefined : 1,
      },
      contentContainerStyle,
    ],
  }

  const entering =
    animation === "fade"
      ? FadeInRight.duration(250)
      : FadeInRight.duration(500)
  const exiting =
    animation === "fade"
      ? FadeOutLeft.duration(200)
      : FadeOutLeft.duration(250)

  return (
    <Animated.View
      entering={entering}
      exiting={exiting}
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          paddingTop: safeTop ? insets.top : 0,
          paddingBottom: safeBottom ? insets.bottom : 0,
          paddingHorizontal: 12,
        },
        style,
      ]}
    >
      {Platform.OS === "android" && safeTop && (
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
      )}

      <ContentWrapper {...(contentProps as any)}>{children}</ContentWrapper>
    </Animated.View>
  )
}

export default Container
