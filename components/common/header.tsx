import { useRouter } from 'expo-router'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import IMAGES from '@/assets/images'
import { useTheme } from "@/hooks"
import { format } from 'date-fns'
import ColumnComponent from './column-component'
import Icon from './icon-component'
import ImageComponent from './image-component'
import RowComponent from './row-component'
import TextComponent from './text-component'

type HeaderProps = {
  title: string,
  isMealsScreen?: boolean,
}

const Header = ({
  title,
  isMealsScreen
}: HeaderProps) => {
  const router = useRouter()
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        backgroundColor: colors.background,
        paddingTop: insets.top,
        paddingHorizontal: 16,
      }}>
      <RowComponent
        justify='space-between'
        gap={5}
        style={{
          borderBottomWidth: 2.5,
          borderBottomColor: colors.surface,
          paddingVertical: 5,
          height: 60,
        }}>
        <RowComponent
          onPress={() => router.back()}
          justify='space-between'
          style={{ flex: 1 }}
        >
          <View style={{ width: 20 }}>
            {isMealsScreen ?
              <ImageComponent
                source={IMAGES.ICON}
                style={{ width: 50, height: 40, resizeMode: 'contain' }}
              />
              :
              <Icon name="ArrowLeft" size={25} color="onBackground" />
            }
          </View>
          {isMealsScreen ? (
            <ColumnComponent>
              <TextComponent
                numberOfLines={1}
                text='today'
                textAlign='center'
                type='display'
              />
              <TextComponent
                numberOfLines={1}
                style={{ color: colors.onSurfaceVariant, flex: 1 }}
                text={format(new Date(), 'MMMM dd, yyyy')}
                fontWeight='medium'
                textAlign='center'
              />
            </ColumnComponent>
          ) : (
            <TextComponent
              numberOfLines={1}
              text={title}
              textAlign='center'
              type='display'
            />
          )}
          <View style={{ width: 20 }}>
            {isMealsScreen ?
              <Icon name="CalendarDays" size={20} color="icon" />
              :
              null
            }
          </View>
        </RowComponent>
      </RowComponent>
    </View>
  )
}

export default Header