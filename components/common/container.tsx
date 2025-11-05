import { ReactNode } from 'react'
import { ScrollView, View, ViewStyle } from 'react-native'
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import { Edge, SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context'

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
        paddingHorizontal: 12,
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
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={[
          {
            flex: 1,
            backgroundColor: colors.background,
            height: '100%',
            width: '100%',
            paddingBottom: 5,
          },
          style,
        ]}
        edges={['left', 'right', ...(isBottomTab ? [] : ['bottom']) as Edge[]]}
        {...props}
      >
        {renderContent()}
      </SafeAreaView>
    </Animated.View>
  )
}

export default Container
