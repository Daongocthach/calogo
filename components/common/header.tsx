import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from "@/hooks"
import Icon from './icon-component'
import RowComponent from './row-component'
import TextComponent from './text-component'

type HeaderProps = {
  title: string
}

const Header = ({
  title,
}: HeaderProps) => {
  const router = useRouter()
  const colors = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <View style={{ backgroundColor: colors.background, paddingTop: insets.top }}>
      <RowComponent
        justify='space-between'
        gap={5}
        style={{
          paddingHorizontal: 12,
          borderBottomWidth: 1.25,
          borderBottomColor: colors.surface,
          paddingVertical: 5,
          marginBottom: 10,
        }}>
        <RowComponent
          onPress={() => router.back()}
          justify='flex-start'
          gap={10}
          style={{ flex: 1 }}
        >
          <Icon name="ArrowLeft" size={30} color="primary" />
          <TextComponent
            numberOfLines={1}
            style={{ color: colors.onSurfaceVariant, width: '80%' }}
            text={title}
            lineHeight={30}
            font={'medium'}
            size={18}
          />
        </RowComponent>
      </RowComponent>
    </View>
  )
}

export default Header