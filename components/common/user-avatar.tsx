import { Image, StyleSheet, View } from 'react-native'

import { useTheme } from '@/hooks'
import useStore from '@/store'
import { getShortName } from '@/utils'
import TextComponent from './text-component'

const UserAvatar = ({
  avatarSize = 50,
  avatarUrl = '',
  userName = '',
  isMe = false,
  avatarColor,
}: {
  avatarSize?: number
  avatarUrl?: string
  userName?: string
  isMe?: boolean,
  avatarColor?: string
}) => {
  const colors = useTheme()
  const { userData } = useStore()
  const shortName = getShortName(isMe ? userData?.full_name : (userName ?? ''))

  if (avatarUrl) {
    return (
      <Image
        source={{ uri: avatarUrl }}
        style={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          backgroundColor: colors.primary,
        }}
        resizeMode="cover"
      />
    )
  }
  if (isMe && userData?.avatar) {
    return (
      <Image
        source={{ uri: userData.avatar }}
        style={{
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
          backgroundColor: colors.primary,
        }}
        resizeMode="cover"
      />
    )
  }

  return (
    <View
      style={[
        styles.fallbackAvatar,
        {
          backgroundColor: avatarColor ?? colors.primary,
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
        },
      ]}
    >
      <TextComponent style={styles.shortName} size={avatarSize * 0.3}>{shortName}</TextComponent>
    </View>
  )
}

const styles = StyleSheet.create({
  fallbackAvatar: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shortName: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
})

export default UserAvatar
