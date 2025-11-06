import { ReactNode } from 'react'
import { ScrollView, View, ViewStyle } from 'react-native'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import { SafeAreaViewProps } from 'react-native-safe-area-context'

import { useTheme } from '@/hooks'

interface Props extends SafeAreaViewProps {
  children: ReactNode
  isScroll?: boolean
  isImageBackground?: boolean
  style?: ViewStyle
  contentContainerStyle?: ViewStyle
  blurRadius?: number
  isBottomTab?: boolean
  noHeader?: boolean
  animation?: 'fade' | 'slide' | 'none'
}

const Container = ({
  children,
  isScroll,
  isImageBackground,
  style,
  contentContainerStyle,
  blurRadius = 0,
  isBottomTab = false,
  noHeader = false,
  animation = 'slide',
  ...props
}: Props) => {
  const { colors } = useTheme()

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

  const renderContent = () => (
    <ContentWrapper {...(contentProps as any)}>{children}</ContentWrapper>
  )

  const entering =
    animation === 'fade' ? FadeInRight.duration(250) : FadeInRight.duration(500)
  const exiting =
    animation === 'fade' ? FadeOutLeft.duration(200) : FadeOutLeft.duration(250)

  return (
    <Animated.View
      entering={entering}
      exiting={exiting}
      style={{
        flex: 1,
        paddingHorizontal: 12,
        backgroundColor: colors.background
      }}
    >
      {renderContent()}
    </Animated.View>
  )
}

export default Container
