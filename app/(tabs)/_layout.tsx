import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'

import { HapticTab, Header, IconComponent } from '@/components'
import { useTheme } from '@/hooks'

const screens = [
  {
    name: 'index',
    title: 'meals',
    icon: 'Utensils' as const,
  },
  {
    name: 'foods',
    title: 'foods',
    icon: 'Apple' as const,
  },
  {
    name: 'statistics',
    title: 'statistics',
    icon: 'ChartNoAxesColumn' as const,
  },
  {
    name: 'profile',
    title: 'profile',
    icon: 'UserRound' as const,
  },
]

export default function TabLayout() {
  const { t } = useTranslation()
  const colors = useTheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      {screens.map((screen) => (
        <Tabs.Screen
          key={screen.name}
          name={screen.name}
          options={{
            header: () => <Header title={screen.title}/>,
            title: t(screen.title),
            tabBarIcon: ({ color }) => (
              <IconComponent size={24} name={screen.icon} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  )
}
